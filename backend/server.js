// filepath: backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;


const uri = "mongodb://localhost:27017";
const dbName = "parkingd";
const availableSpaceCollection = "data";
const spotsCollection = "spots";

app.use(cors());
app.use(express.json()); 


const FLASK_URL = "http://localhost:5000";


app.get("/", (req, res) => {
  res.send("Welcome to the Parking API! Use /api/parking to get parking data.");
});


app.get("/api/parking", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(availableSpaceCollection);

    const latestDocument = await collection
      .find()
      .sort({ date: -1 })
      .limit(1)
      .toArray();

    if (latestDocument.length > 0) {
      res.json({ availableSpots: latestDocument[0].available_space });
    } else {
      res.status(404).json({ message: "No data found" });
    }

    await client.close();
  } catch (error) {
    console.error("Error fetching parking data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/api/parking/spots", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(spotsCollection);

    const document = await collection.findOne({});
    console.log("Fetched document:", document);

    if (document && document.spots) {
      res.json({ spots: document.spots });
    } else {
      res.status(404).json({ error: "No spots found" });
    }

    await client.close();
  } catch (error) {
    console.error("Error fetching parking spots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/parking/reserve", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(availableSpaceCollection);

    const latestDocument = await collection
      .find()
      .sort({ date: -1 })
      .limit(1)
      .toArray();

    if (latestDocument.length > 0) {
      const currentSpots = latestDocument[0].available_space;

      if (currentSpots > 0) {
        await collection.updateOne(
          { _id: latestDocument[0]._id },
          { $set: { available_space: currentSpots - 1 } }
        );

        res.json({ success: true, availableSpots: currentSpots - 1 });
      } else {
        res.status(400).json({ success: false, message: "No spots available" });
      }
    } else {
      res.status(404).json({ success: false, message: "No data found" });
    }

    await client.close();
  } catch (error) {
    console.error("Error reserving parking spot:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


app.post("/api/parking/free", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(availableSpaceCollection);

    const latestDocument = await collection
      .find()
      .sort({ date: -1 })
      .limit(1)
      .toArray();

    if (latestDocument.length > 0) {
      const currentSpots = latestDocument[0].available_space;

      await collection.updateOne(
        { _id: latestDocument[0]._id },
        { $set: { available_space: currentSpots + 1 } }
      );

      res.json({ success: true, availableSpots: currentSpots + 1 });
    } else {
      res.status(404).json({ success: false, message: "No data found" });
    }

    await client.close();
  } catch (error) {
    console.error("Error freeing parking spot:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


app.post("/api/predict", async (req, res) => {
  try {
    const requestData = req.body;

    // Send the request to Flask
    const response = await axios.post(`${FLASK_URL}/predict`, requestData);

    
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask /predict:", error.message);
    res.status(500).json({ error: "Failed to fetch prediction from Flask" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
