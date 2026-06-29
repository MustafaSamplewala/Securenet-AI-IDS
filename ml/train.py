import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix

from ml.preprocess import preprocess

# Load Dataset
df = pd.read_csv("dataset/kdd_train.csv")

# Preprocess
X, y, scaler, encoders = preprocess(df)

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train Model
model = RandomForestClassifier(
    n_estimators=150,
    random_state=42
)

model.fit(X_train, y_train)

prediction = model.predict(X_test)

print("=" * 60)
print("Accuracy :", accuracy_score(y_test, prediction))
print("=" * 60)

print(classification_report(y_test, prediction))

print(confusion_matrix(y_test, prediction))

# Save Model
os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/intrusion_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")
joblib.dump(encoders, "models/label_encoders.pkl")

print("Model Saved Successfully")