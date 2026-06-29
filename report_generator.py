from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Table
from reportlab.platypus import TableStyle

import os

def generate_pdf(records):

    os.makedirs("reports",exist_ok=True)

    pdf="reports/intrusion_report.pdf"

    document=SimpleDocTemplate(
        pdf,
        pagesize=letter
    )

    data=[
        [
            "Protocol",
            "Service",
            "Flag",
            "Result",
            "Confidence"
        ]
    ]

    for row in records:

        data.append([

            row.protocol,

            row.service,

            row.flag,

            row.result,

            f"{row.confidence:.2f}%"

        ])

    table=Table(data)

    style=TableStyle([

        ('BACKGROUND',(0,0),(-1,0),colors.grey),

        ('TEXTCOLOR',(0,0),(-1,0),colors.whitesmoke),

        ('GRID',(0,0),(-1,-1),1,colors.black),

        ('BACKGROUND',(0,1),(-1,-1),colors.beige)

    ])

    table.setStyle(style)

    document.build([table])

    return pdf