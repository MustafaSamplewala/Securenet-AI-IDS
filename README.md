
# 🛡️ SecureNet AI IDS
### AI-Powered Intrusion Detection System using Machine Learning

SecureNet AI IDS is a web-based Intrusion Detection System developed using **Flask**, **Machine Learning**, and **SQLite**. The system analyzes network traffic data and classifies it as **Normal Traffic** or **Attack Traffic** using a trained Random Forest model.

The application provides an intuitive dashboard, CSV upload functionality, prediction history, report generation, and user authentication for secure access.

---

## 🚀 Features

### 🔐 User Authentication
- User Registration
- Secure Login
- Password Hashing
- Session Management
- Logout Functionality

### 🤖 AI-Based Intrusion Detection
- Random Forest Classifier
- KDD Cup 99 Dataset
- Binary Classification
- Confidence Score Prediction
- Real-Time Prediction

### 📊 Dashboard Analytics
- Total Predictions
- Normal Traffic Count
- Attack Traffic Count
- Model Accuracy
- Pie Chart Visualization
- Bar Chart Visualization

### 📂 CSV Upload & Batch Prediction
- Upload Network Traffic Dataset
- Bulk Prediction
- Automatic Database Storage
- Prediction Preview

### 📜 Prediction History
- Search Functionality
- Traffic Classification Records
- Confidence Scores
- Timestamp Tracking

### 📑 Reports
- PDF Report Export
- Excel Report Export
- CSV Report Export

### ⚙️ User Settings
- Profile Management
- Dark/Light Theme Toggle
- System Information
- Model Information

---

# 🏗️ System Architecture

```
User
 │
 ▼
Flask Web Application
 │
 ├── Authentication Module
 │
 ├── Dashboard Module
 │
 ├── Upload Module
 │
 ├── Prediction Module
 │
 ├── Report Module
 │
 ▼
Machine Learning Model
(Random Forest)
 │
 ▼
SQLite Database
```

---

# 🛠️ Technologies Used

## Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Chart.js
- Font Awesome

## Backend
- Python
- Flask
- Flask SQLAlchemy
- Flask Login
- Flask WTF

## Machine Learning
- Scikit-Learn
- Pandas
- NumPy
- Joblib

## Database
- SQLite

## Reporting
- Pandas
- OpenPyXL
- ReportLab

---

# 📂 Project Structure

```bash
SecureNet_AI_IDS/
│
├── app.py
├── config.py
├── requirements.txt
│
├── database/
│   ├── models.py
│
├── ml/
│   ├── train.py
│   ├── predict.py
│   ├── preprocess.py
│   ├── random_forest_model.pkl
│
├── auth/
│   ├── forms.py
│   ├── utils.py
│
├── services/
│   ├── services.py
│   ├── report_generator.py
│
├── routes/
│   ├── routes.py
│
├── templates/
│   ├── layouts/
│   │   ├── base.html
│   │   └── auth_base.html
│   │
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   │
│   ├── dashboard/
│   │   ├── dashboard.html
│   │   ├── predict.html
│   │   ├── upload.html
│   │   ├── history.html
│   │   ├── reports.html
│   │   ├── profile.html
│   │   └── settings.html
│   │
│   ├── index.html
│   ├── 404.html
│   └── 500.html
│
├── static/
│   ├── css/
│   │   ├── style.css
│   │   ├── dashboard.css
│   │   ├── auth.css
│   │   ├── theme.css
│   │   ├── responsive.css
│   │   └── animations.css
│   │
│   ├── js/
│   │   ├── charts.js
│   │   ├── history.js
│   │   ├── upload.js
│   │   ├── sidebar.js
│   │   └── theme.js
│   │
│   └── images/
│       ├── logo.png
│       ├── cyber.png
│       └── avatar.png
│
├── uploads/
├── reports/
└── instance/
    └── ids.db
```

---

# 📥 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/SecureNet_AI_IDS.git
cd SecureNet_AI_IDS
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Application

```bash
python app.py
```

Application will run on:

```text
http://127.0.0.1:5000
```

---

# 🧠 Machine Learning Model

### Algorithm

Random Forest Classifier

### Dataset

KDD Cup 99 Dataset

### Accuracy

99.86%

### Classification

- Normal Traffic
- Attack Traffic

---

# 📊 Dashboard Statistics

The dashboard provides:

- Total Predictions
- Normal Traffic Count
- Attack Traffic Count
- Prediction Accuracy
- Traffic Distribution Chart
- Prediction Summary Chart

---

# 🔒 Security Features

- Password Hashing
- Session Authentication
- Secure Login System
- Route Protection
- User Validation
- Error Handling Pages

---

# 📤 Report Generation

The system supports:

### PDF Report
Contains:
- Prediction Summary
- Attack Statistics
- Confidence Scores

### Excel Report
Contains:
- Full Prediction History

### CSV Report
Contains:
- Exported Traffic Data

---

# 📸 Screenshots

### Dashboard
- Statistics Cards
- Pie Chart
- Bar Chart
- Recent Predictions

### Upload Module
- CSV Upload
- Prediction Preview

### History Module
- Search Records
- Prediction Logs

### Reports Module
- PDF Export
- Excel Export
- CSV Export

---

# 🎯 Future Enhancements

- Real-Time Network Packet Monitoring
- Deep Learning Integration
- Multi-Class Attack Detection
- Email Alerts
- Live Threat Dashboard
- Cloud Deployment
- API Integration
- SIEM Integration

---

# 👨‍💻 Developer

**Mustafa Dawood Samplewala**

B.Tech CSE (AI & ML)  
Sandip University, Nashik

### Skills
- Machine Learning
- Python Development
- Flask Web Development
- Data Analytics
- Cyber Security

---

# 📜 License

This project is developed for educational and academic purposes as a Final Year Engineering Project.

---

# ⭐ Project Status

✅ Completed  
✅ Machine Learning Integrated  
✅ Authentication Implemented  
✅ Dashboard Implemented  
✅ Report Generation Implemented  
✅ Responsive Design Implemented  
✅ Dark/Light Theme Supported  

**Version:** 2.0
