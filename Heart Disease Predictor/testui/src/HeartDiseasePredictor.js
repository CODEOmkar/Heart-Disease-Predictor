import { useState } from "react";
import "./styles.css";

export default function HeartDiseasePredictor() {
  const [formData, setFormData] = useState({
    age: "", sex: "", cp: "", trestbps: "", chol: "", fbs: "",
    restecg: "", thalach: "", exang: "", oldpeak: "", slope: "", ca: "", thal: ""
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = (data) => {
  const errors = [];

  if (!(data.age > 0 && data.age < 120)) errors.push("Age must be between 1 and 120");
  if (![0, 1].includes(Number(data.sex))) errors.push("Sex must be 0 (Female) or 1 (Male)");
  if (![0, 1, 2, 3].includes(Number(data.cp))) errors.push("CP must be between 0 and 3");
  if (!(data.trestbps > 0 && data.trestbps < 300)) errors.push("Trestbps must be a realistic value");
  if (!(data.chol > 0 && data.chol < 1000)) errors.push("Chol must be a realistic value");
  if (![0, 1].includes(Number(data.fbs))) errors.push("FBS must be 0 or 1");
  if (![0, 1, 2].includes(Number(data.restecg))) errors.push("RestECG must be 0, 1, or 2");
  if (!(data.thalach > 0 && data.thalach < 250)) errors.push("Thalach must be realistic");
  if (![0, 1].includes(Number(data.exang))) errors.push("Exang must be 0 or 1");
  if (!(data.oldpeak >= 0 && data.oldpeak < 10)) errors.push("Oldpeak must be realistic");
  if (![0, 1, 2].includes(Number(data.slope))) errors.push("Slope must be 0, 1, or 2");
  if (![0, 1, 2, 3, 4].includes(Number(data.ca))) errors.push("CA must be 0-4");
  if (![0, 1, 2, 3].includes(Number(data.thal))) errors.push("Thal must be 0-3");

  return errors;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = validateInput(formData);
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      ...formData, 
      age: Number(formData.age), sex: Number(formData.sex),
      cp: Number(formData.cp), trestbps: Number(formData.trestbps), chol: Number(formData.chol),
      fbs: Number(formData.fbs), restecg: Number(formData.restecg), thalach: Number(formData.thalach),
      exang: Number(formData.exang), oldpeak: parseFloat(formData.oldpeak), slope: Number(formData.slope),
      ca: Number(formData.ca), thal: Number(formData.thal) 
    })
  });

  const data = await response.json();
  setResult(data);
};

  return (
    <div className="container">

      <div className="info-section">
        <h2>Parameter Information :</h2>
        <ul>
          <li><strong>age</strong>: Age of the person in years</li>
          <li><strong>sex</strong>: 1 = Male, 0 = Female</li>
          <li><strong>cp</strong>: Chest pain type (0–3)
            <ul>
              <li>0 = Asymtomatic</li>
              <li>1 = Atypical angina</li>
              <li>2 = Non-anginal</li>
              <li>3 = Angina</li>
            </ul>
          </li>
          <li><strong>trestbps</strong>: Resting blood pressure (mm Hg)</li>
          <li><strong>chol</strong>: Serum cholesterol (mg/dl)</li>
          <li><strong>fbs</strong>: Fasting blood sugar &gt; 120 mg/dl (1 = True, 0 = False)</li>
          <li><strong>restecg</strong>: Resting ECG (Electrocaardiographic) results (0–2)
            <ul>
              <li>0 = Normal</li>
              <li>1 = ST-T wave abnormality (T wave &gt; 0.05 mV)</li>
              <li>2 = Left ventricular hypertrophy</li>
            </ul>
          </li>
          <li><strong>thalach</strong>: Maximum heart rate achieved</li>
          <li><strong>exang</strong>: Exercise-induced angina (1 = Yes, 0 = No)</li>
          <li><strong>oldpeak</strong>: ST depression induced by exercise</li>
          <li><strong>slope</strong>: Slope of the peak exercise ST segment (0–2)
            <ul>
              <li>0 = Upsloping</li>
              <li>1 = Flat</li>
              <li>2 = Downsloping</li>
            </ul>
          </li>
          <li><strong>ca</strong>: Number of major vessels colored by fluoroscopy (0–4)</li>
          <li><strong>thal</strong>: Thalassemia (0-3)
            <ul>
              <li>0 = Normal</li>
              <li>1 = Fixed defect</li>
              <li>2 = Reversible defect</li>
              <li>3 = NULL - Not described</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="form-box">
        <h2>Heart Attack Predictor</h2>
        <form onSubmit={handleSubmit} className="grid-container">
          {Object.keys(formData).map((key) => (
            <div key={key} className="input-group">
              <label>{key.replace("_", " ")}</label>
              <input
                type="number"
                name={key}
                placeholder={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">Predict</button>
          </div>
        </form>
        {result && (
          <div className="result-box">
            <p>Prediction: <span className={result.prediction === 1 ? "danger" : "safe"}>{result.prediction === 1 ? "Heart Disease Detected" : "No Heart Disease"}</span></p>
            <p>Probability: <span className="probability">{result.probability.toFixed(2)}</span></p>
          </div>
        )}
      </div>
      
    </div>
  );
}
