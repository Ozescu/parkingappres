import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BASE_URL from "../config";

export default function PredictionChat() {
  const [prediction, setPrediction] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handlePredict = async () => {
    setLoading(true);
    setError(null); 
    try {
     
      const requestData = {
        date: new Date().toISOString(), 
        Capacity: 6,
      };

      const response = await fetch(`${BASE_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Prediction data:", data);

      if (data.error) {
        setError(data.error);
      } else {
        setPrediction(data.prediction);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Prediction</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePredict}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Predicting..." : "Predict Next Hour"}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      {prediction !== null && (
        <Text style={styles.result}>Predicted Occupation: {prediction}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});
