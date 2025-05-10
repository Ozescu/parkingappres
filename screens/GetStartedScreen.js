import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

export default function GetStartedScreen() {
  const [availableSpots, setAvailableSpots] = useState(null);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch("http://<your-server-url>/api/parking"); 
        const data = await response.json();
        setAvailableSpots(data.availableSpots);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    fetchParkingData();
  }, []);

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
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: availableSpots > 0 ? "green" : "red" },
          ]}
          disabled={availableSpots === 0}
        >
          <Text style={styles.buttonText}>Reserve</Text>
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
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
