import os
from flask import Flask, render_template
from flask_login import LoginManager
  
from config import Config
from database.models import db, User

app = Flask(__name__)
app.config.from_object("config.Config")
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

login_manager.login_view = "login"      # <-- ADD THIS
login_manager.login_message = "Please login first."

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

with app.app_context():
    db.create_all()

from auth.routes import *

if __name__ == "__main__":
    app.run(debug=True)

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"),404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template("500.html"), 500