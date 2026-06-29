import joblib
import pandas as pd

from ml.preprocess import preprocess

model = joblib.load("models/intrusion_model.pkl")


def predict_dataframe(df):

    X = preprocess(df, training=False)

    prediction = model.predict(X)

    confidence = model.predict_proba(X).max(axis=1)

    return prediction, confidence


def predict_single(data):

    df = pd.DataFrame([data])

    prediction, confidence = predict_dataframe(df)

    result = "Normal"

    if prediction[0] == 1:
        result = "Attack"

    return result, round(confidence[0] * 100, 2)


def predict_csv(path):

    df = pd.read_csv(path)

    original = df.copy()

    prediction, confidence = predict_dataframe(df)

    original["Prediction"] = prediction

    original["Confidence"] = confidence * 100

    original["Prediction"] = original["Prediction"].replace({
        0: "Normal",
        1: "Attack"
    })

    return original