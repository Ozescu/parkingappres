import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function GetStartedScreen() {
  const [availableSpots, setAvailableSpots] = useState(null);
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch(
          "https://ca1b-196-117-153-56.ngrok-free.app/api/parking"
        );
        const data = await response.json();
        console.log("Parking data fetched:", data);
        setAvailableSpots(data.availableSpots);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    fetchParkingData();
  }, []);

  const handleReserve = async () => {
    try {
      const response = await fetch(
        "https://ca1b-196-117-153-56.ngrok-free.app/api/parking/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      const response = await fetch(
        "https://ca1b-196-117-153-56.ngrok-free.app/api/parking/free",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
