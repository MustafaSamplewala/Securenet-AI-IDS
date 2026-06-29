from flask import request
from flask import redirect
from flask import flash
from werkzeug.utils import secure_filename
from flask_login import login_user
from flask_login import logout_user
from flask_login import login_required

from database.models import db
from database.models import User

from auth.forms import RegisterForm
from auth.forms import LoginForm

from auth.utils import hash_password
from auth.utils import verify_password
from flask import render_template

from ml.predict import predict_csv
from services import save_prediction

import os

from app import app


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login",methods=["GET","POST"])
def login():

    form=LoginForm()

    if form.validate_on_submit():

        user=User.query.filter_by(
            email=form.email.data
        ).first()

        if user and verify_password(
            user.password,
            form.password.data
        ):

            login_user(user)

            return redirect("/dashboard")

        flash("Invalid Login")

    return render_template(
        "auth/login.html",
        form=form
    )

@app.route("/upload", methods=["GET", "POST"])
@login_required
def upload():

    if request.method == "POST":

        if "file" not in request.files:

            flash("No file selected.", "danger")

            return render_template(
                "dashboard_layout/upload.html",
                uploaded=False
            )

        file = request.files["file"]

        if file.filename == "":

            flash("Please choose a CSV file.", "danger")

            return render_template(
                "dashboard_layout/upload.html",
                uploaded=False
            )

        if not file.filename.lower().endswith(".csv"):

            flash("Only CSV files are allowed.", "danger")

            return render_template(
                "dashboard_layout/upload.html",
                uploaded=False
            )

        try:

            filename = secure_filename(file.filename)

            filepath = os.path.join(
                app.config["UPLOAD_FOLDER"],
                filename
            )

            file.save(filepath)

            # Run ML prediction
            df = predict_csv(filepath)

            for _, row in df.iterrows():

                save_prediction(

                    protocol=row["protocol_type"],

                    service=row["service"],

                    flag=row["flag"],

                    result=row["Prediction"],

                    confidence=row["Confidence"]

                )

            # Statistics
            total = len(df)

            normal = len(
                df[df["Prediction"] == "Normal"]
            )

            attack = len(
                df[df["Prediction"] == "Attack"]
            )

            preview = (
                df.head(10)
                .to_dict(orient="records")
            )

            flash(
                "CSV uploaded and analyzed successfully.",
                "success"
            )

            return render_template(
                "dashboard_layout/upload.html",
                uploaded=True,
                filename=filename,
                total_records=total,
                normal_count=normal,
                attack_count=attack,
                preview=preview
            )

        except Exception as e:

            flash(str(e), "danger")

            return render_template(
                "dashboard_layout/upload.html",
                uploaded=False
            )

    return render_template(
        "dashboard_layout/upload.html",
        uploaded=False
    )

@app.route("/register",methods=["GET","POST"])
def register():

    form=RegisterForm()

    if form.validate_on_submit():

        user=User(

            name=form.name.data,

            email=form.email.data,

            password=hash_password(
                form.password.data
            )

        )

        db.session.add(user)

        db.session.commit()

        flash("Registration Successful")

        return redirect("/login")

    return render_template(
        "auth/register.html",
        form=form
    )


from database.models import Prediction

@app.route("/dashboard")
@login_required
def dashboard():

    total = Prediction.query.count()

    normal = Prediction.query.filter_by(
        result="Normal"
    ).count()

    attack = Prediction.query.filter_by(
        result="Attack"
    ).count()

    recent = Prediction.query.order_by(
        Prediction.created_at.desc()
    ).limit(10).all()

    return render_template(

        "dashboard_layout/dashboard.html",

        total=total,

        normal=normal,

        attack=attack,

        recent=recent

    )


@app.route("/predict", methods=["GET", "POST"])
@login_required
def predict():

    result = None
    confidence = 0
    form_data = None

    if request.method == "POST":

        form_data = request.form.to_dict()

        # Your prediction logic here
        # result = ...
        # confidence = ...

    return render_template(
        "dashboard_layout/predict.html",
        result=result,
        confidence=confidence,
        form_data=form_data
    )


from database.models import Prediction

@app.route("/history")
@login_required
def history():

    search = request.args.get("search")

    query = Prediction.query

    if search:

        query = query.filter(

            (Prediction.protocol.contains(search)) |

            (Prediction.service.contains(search)) |

            (Prediction.result.contains(search))

        )

    history = query.order_by(

        Prediction.created_at.desc()

    ).all()

    return render_template(

        "dashboard_layout/history.html",

        history=history

    )

@app.route("/reports")
@login_required
def reports():

    total = Prediction.query.count()

    normal = Prediction.query.filter_by(
        result="Normal"
    ).count()

    attack = Prediction.query.filter_by(
        result="Attack"
    ).count()

    return render_template(

        "dashboard_layout/reports.html",

        total=total,

        normal=normal,

        attack=attack

    )

@app.route("/settings")
@login_required
def settings():

    return render_template(
        "dashboard_layout/settings.html"
    )

@app.route("/logout")
@login_required
def logout():

    logout_user()

    return redirect("/")

from flask_login import login_required, current_user
from database.models import Prediction

@app.route("/profile")
@login_required
def profile():

    total = Prediction.query.count()

    normal = Prediction.query.filter_by(
        result="Normal"
    ).count()

    attack = Prediction.query.filter_by(
        result="Attack"
    ).count()

    return render_template(
        "dashboard_layout/profile.html",
        total=total,
        normal=normal,
        attack=attack
    )

from flask import send_file

from report_generator import generate_pdf

from database.models import Prediction

@app.route("/download/pdf")
@login_required
def download_pdf():

    records=Prediction.query.all()

    pdf=generate_pdf(records)

    return send_file(
        pdf,
        as_attachment=True
    )

import pandas as pd

@app.route("/download/csv")
@login_required
def download_csv():

    records=Prediction.query.all()

    data=[]

    for row in records:

        data.append({

            "Protocol":row.protocol,

            "Service":row.service,

            "Flag":row.flag,

            "Result":row.result,

            "Confidence":row.confidence,

            "Date":row.created_at

        })

    df=pd.DataFrame(data)

    path="reports/report.csv"

    df.to_csv(path,index=False)

    return send_file(
        path,
        as_attachment=True
    )

@app.route("/download/excel")
@login_required
def download_excel():

    records=Prediction.query.all()

    data=[]

    for row in records:

        data.append({

            "Protocol":row.protocol,

            "Service":row.service,

            "Flag":row.flag,

            "Result":row.result,

            "Confidence":row.confidence,

            "Date":row.created_at

        })

    df=pd.DataFrame(data)

    path="reports/report.xlsx"

    df.to_excel(path,index=False)

    return send_file(
        path,
        as_attachment=True
    )