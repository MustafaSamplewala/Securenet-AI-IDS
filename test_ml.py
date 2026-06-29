import pandas as pd

from ml.predict import predict_dataframe

df = pd.read_csv("dataset/kdd_test.csv")

# Remove labels
df = df.drop(columns=["labels"])

sample = df.iloc[:10].copy()

prediction, confidence = predict_dataframe(sample)

print(prediction)
print(confidence)