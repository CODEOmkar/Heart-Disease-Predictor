from pydantic import BaseModel

class Person(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

# Valid JSON format:
# {
#   "age": 50,
#   "sex": 1,
#   "cp": 2,
#   "trestbps": 130,
#   "chol": 240,
#   "fbs": 0,
#   "restecg": 1,
#   "thalach": 150,
#   "exang": 0,
#   "oldpeak": 2.3,
#   "slope": 1,
#   "ca": 0,
#   "thal": 2
# }