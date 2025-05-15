import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import BASE_URL from "../config";
export default function GetStartedScreen({ navigation }) {
  const [availableSpots, setAvailableSpots] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/parking`);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Parking data fetched:", data);
        setAvailableSpots(data.availableSpots);
      } catch (error) {
        console.error("Error fetching parking data:", error);
        setError("Failed to fetch parking data. Please try again.");
      }
    };

    fetchParkingData();
  }, []);

  const handleReserve = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/parking/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setAvailableSpots(data.availableSpots);
        setIsReserved(true);
      } else {
        console.error("Error reserving spot:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error reserving spot:", error);
    }
  };

  const handleFreeSpace = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/parking/free`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setAvailableSpots(data.availableSpots);
        setIsReserved(false);
      } else {
        console.error("Error freeing space:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error freeing space:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/parking.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Need a Spot? Say no more</Text>
        <Text style={styles.subtitle}>
          {availableSpots !== null
            ? `There are ${availableSpots} empty places!`
            : "Loading..."}
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                availableSpots > 0 && !isReserved ? "green" : "gray",
            },
          ]}
          disabled={availableSpots === 0 || isReserved}
          onPress={handleReserve}
        >
          <Text style={styles.buttonText}>Reserve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isReserved ? "blue" : "gray" },
          ]}
          disabled={!isReserved}
          onPress={handleFreeSpace}
        >
          <Text style={styles.buttonText}>I Freed My Space</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "orange" }]}
          onPress={() => navigation.navigate("ParkingHeatmap")}
        >
          <Text style={styles.buttonText}>View Heatmap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "orange" }]}
          onPress={() => navigation.navigate("PredictionChat")}
        >
          <Text style={styles.buttonText}>Go to Prediction</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
