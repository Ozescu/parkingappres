import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import BASE_URL from "../config";

export default function ParkingHeatmap() {
  const [parkingSpots, setParkingSpots] = useState([]);

  const fetchParkingSpots = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/parking/spots`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Parking spots fetched:", data);
      setParkingSpots(data.spots);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Heatmap</Text>
      <View style={styles.heatmap}>
        {parkingSpots.length === 0 ? (
          <Text>No parking spots available</Text>
        ) : (
          parkingSpots.map((spot) => (
            <View key={spot.id} style={styles.spot}>
              {spot.isOccupied ? (
                <Image
                  source={require("../assets/car.png")}
                  style={styles.carImage}
                />
              ) : (
                <Text style={styles.spotId}>{spot.id}</Text>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heatmap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "90%",
  },
  spot: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  carImage: {
    width: 50,
    height: 50,
  },
  spotId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
