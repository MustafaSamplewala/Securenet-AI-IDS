import joblib
import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler


CATEGORICAL_COLUMNS = [
    "protocol_type",
    "service",
    "flag"
]


def preprocess(df, training=True):

    df = df.copy()

    encoders = {}

    if training:

        for column in CATEGORICAL_COLUMNS:

            encoder = LabelEncoder()

            df[column] = encoder.fit_transform(df[column])

            encoders[column] = encoder

        df["labels"] = df["labels"].apply(
            lambda x: 0 if x == "normal" else 1
        )

        X = df.drop("labels", axis=1)

        y = df["labels"]

        scaler = StandardScaler()

        X = scaler.fit_transform(X)

        return X, y, scaler, encoders

    else:

        # Remove target column if it exists
        if "labels" in df.columns:
            df = df.drop(columns=["labels"])

        # Load encoders
        encoders = joblib.load("models/label_encoders.pkl")

        # Encode categorical columns
        for column in CATEGORICAL_COLUMNS:
            df[column] = encoders[column].transform(df[column])

        # Ensure column order matches the training data
        expected_columns = [
            'duration','protocol_type','service','flag','src_bytes','dst_bytes',
            'land','wrong_fragment','urgent','hot','num_failed_logins',
            'logged_in','num_compromised','root_shell','su_attempted',
            'num_root','num_file_creations','num_shells',
            'num_access_files','num_outbound_cmds',
            'is_host_login','is_guest_login',
            'count','srv_count','serror_rate','srv_serror_rate',
            'rerror_rate','srv_rerror_rate',
            'same_srv_rate','diff_srv_rate','srv_diff_host_rate',
            'dst_host_count','dst_host_srv_count',
            'dst_host_same_srv_rate','dst_host_diff_srv_rate',
            'dst_host_same_src_port_rate',
            'dst_host_srv_diff_host_rate',
            'dst_host_serror_rate',
            'dst_host_srv_serror_rate',
            'dst_host_rerror_rate',
            'dst_host_srv_rerror_rate'
        ]

        df = df[expected_columns]

        scaler = joblib.load("models/scaler.pkl")

        X = scaler.transform(df)

        return X