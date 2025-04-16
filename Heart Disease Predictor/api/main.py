from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Person import Person
import pickle
import numpy as np

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("heart_disease.pkl", "rb") as f:
    model = pickle.load(f)

@app.post("/predict")
def predict(person: Person):
    features = np.array([[person.age, person.sex, person.cp, person.trestbps, person.chol,
                          person.fbs, person.restecg, person.thalach, person.exang,
                          person.oldpeak, person.slope, person.ca, person.thal]])
    
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]  

    return {"prediction": int(prediction), "probability": float(probability)}

# uvicorn main:app --reload
