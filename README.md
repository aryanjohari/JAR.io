JAR.io - Just Another Reason I'm Obsessed
A personalized web app for my one-year anniversary with Sakshi, featuring an encrypted terminal chat, memory map, and relationship chatbot. Built with React, Tailwind CSS, Flask, and AWS Lambda, deployed in Mumbai (ap-south-1) for low latency.
Setup

Backend:

cd backend
python -m venv venv
source venv/bin/activate (Mac/Linux) or venv\Scripts\activate (Windows)
pip install -r requirements.txt


Frontend:

cd frontend
npm install
npm run dev


Run Locally:

Backend: python backend/app.py
Frontend: npm run dev in frontend/



Deployment

Deploy backend to AWS Lambda: zappa deploy prod

