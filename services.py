from database.models import db, Prediction

def save_prediction(protocol,
                    service,
                    flag,
                    result,
                    confidence):

    record = Prediction(
        protocol=protocol,
        service=service,
        flag=flag,
        result=result,
        confidence=confidence
    )

    db.session.add(record)

    db.session.commit()