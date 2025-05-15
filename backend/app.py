from flask import Flask, request, jsonify
import joblib
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Load the model
model = joblib.load("model/parking.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        
        data = request.json
        print("Data received:", data)  

       
        if "date" not in data or "Capacity" not in data:
            return jsonify({"error": "Missing required keys: date, Capacity"}), 400

        
        date = datetime.fromisoformat(data["date"]) 
        hour = date.hour
        weekday = date.weekday()  
        month = date.month

        
        features = [[
            data["Capacity"],  
            hour,              
            weekday,          
            month              
        ]]
        print("Features prepared:", features)  

        # Make the prediction
        prediction = model.predict(features)
        print("Prediction:", prediction)  

        # Return the prediction as JSON
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        print("Error in /predict:", str(e))  
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)