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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, age: Number(formData.age), sex: Number(formData.sex),
        cp: Number(formData.cp), trestbps: Number(formData.trestbps), chol: Number(formData.chol),
        fbs: Number(formData.fbs), restecg: Number(formData.restecg), thalach: Number(formData.thalach),
        exang: Number(formData.exang), oldpeak: parseFloat(formData.oldpeak), slope: Number(formData.slope),
        ca: Number(formData.ca), thal: Number(formData.thal) })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container">
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
