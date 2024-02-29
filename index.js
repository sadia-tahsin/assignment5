const express = require("express");
const app = express();
const cors = require("cors"); 
const port = 3000;
app.use(express.json());
app.use(cors());

const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://user:1234@cluster0.6dfn9os.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Route to get all data from the SERVICES collection
    app.get("/services", async (req, res) => {
      try {
        const db = client.db("EVENT_MANAGEMENT");
        const collection = db.collection("services");

        // Fetch all data from the SERVICES collection
        const serviceData = await collection.find({}).toArray();

        res.json(serviceData);
      } catch (error) {
        console.error("Error fetching data from SERVICES collection:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    // Route to get a single service by ID from the SERVICES collection
app.get("/services/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the ID parameter from the request
    
    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("services");

    // Fetch the service with the specified ID from the SERVICES collection
    const serviceData = await collection.findOne({ _id:new ObjectId(id) });

    if (!serviceData) {
      // If no service is found with the specified ID, return a 404 Not Found response
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(serviceData);
  } catch (error) {
    console.error("Error fetching data from SERVICES collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


    // Route to post data to the SERVICES collection
    app.post("/addService", async (req, res) => {
      try {
        const db = client.db("EVENT_MANAGEMENT");
        const collection = db.collection("services");

        // Insert data into the SERVICES collection
        await collection.insertOne(req.body);

        res.status(201).json({
          success: true,
          message: "Data posted successfully to SERVICES collection",
        });
      } catch (error) {
        console.error("Error posting data to SERVICES collection:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Route to update data in the SERVICES collection
    app.put("/updateService/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const newData = req.body;
        console.log(newData)
        
        const { _id, ...newObject } = newData
    
        const db = client.db("EVENT_MANAGEMENT");
        const collection = db.collection("services");
    
        // Update the service document with the provided data
        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: newObject } // Update the document with the provided data
        );
    
        res.status(200).json({
          success: true,
          message: "Service document updated successfully",
        });
      } catch (error) {
        console.log(error)
        console.error("Error updating service document:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
    

app.delete("/deleteService/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("services");

    // Delete data from the SERVICES collection using ObjectId
    await collection.deleteOne({ _id:new ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "Data deleted successfully from SERVICES collection",
    });
  } catch (error) {
    console.error("Error deleting data from SERVICES collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


    // Route to get all data from the EVENTS collection
    app.get("/events", async (req, res) => {
      try {
        const db = client.db("EVENT_MANAGEMENT");
        const collection = db.collection("EVENTS");

        // Fetch all data from the EVENTS collection
        const eventData = await collection.find({}).toArray();

        res.json(eventData);
      } catch (error) {
        console.error("Error fetching data from EVENTS collection:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

        // Route to get a single service by ID from the SERVICES collection
app.get("/services/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the ID parameter from the request
    
    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("events");

    // Fetch the service with the specified ID from the SERVICES collection
    const eventData = await collection.findOne({ _id:new ObjectId(id) });

    if (!eventData) {
      // If no service is found with the specified ID, return a 404 Not Found response
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(serviceData);
  } catch (error) {
    console.error("Error fetching data from event collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
    // Route to post data to the EVENTS collection
    app.post("/addEvent", async (req, res) => {
      try {
        const db = client.db("EVENT_MANAGEMENT");
        const collection = db.collection("EVENTS");

        // Insert data into the EVENTS collection
        await collection.insertOne(req.body);

        res.status(201).json({
          success: true,
          message: "Data posted successfully to EVENTS collection",
        });
      } catch (error) {
        console.error("Error posting data to EVENTS collection:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.delete("/deleteEvent/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("EVENTS");

    // Delete data from the SERVICES collection using ObjectId
    await collection.deleteOne({ _id:new ObjectId(id) });

    res.status(200).json({
      success: true,
      message: "Data deleted successfully from SERVICES collection",
    });
  } catch (error) {
    console.error("Error deleting data from EVENTS collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

    // Route to get all data from the RECENT_EVENTS collection
app.get("/recentEvents", async (req, res) => {
  try {
    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("recentEvents");

    // Fetch all data from the RECENT_EVENTS collection
    const recentEventData = await collection.find({}).toArray();

    res.json(recentEventData);
  } catch (error) {
    console.error("Error fetching data from RECENT_EVENTS collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to post data to the RECENT_EVENTS collection
app.post("/addRecentEvent", async (req, res) => {
  try {
    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("recentEvents");

    // Insert data into the RECENT_EVENTS collection
    await collection.insertOne(req.body);

    res.status(201).json({
      success: true,
      message: "Data posted successfully to RECENT_EVENTS collection",
    });
  } catch (error) {
    console.error("Error posting data to RECENT_EVENTS collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update data in the RECENT_EVENTS collection
app.put("/updateRecentEvent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("recentEvents");

    // Update data in the RECENT_EVENTS collection
    await collection.updateOne(
      { _id: id },
      {
        $set: { ...newData }, // Update other fields if provided
      }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully in RECENT_EVENTS collection",
    });
  } catch (error) {
    console.error("Error updating data in RECENT_EVENTS collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete data from the RECENT_EVENTS collection
app.delete("/deleteRecentEvent/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const db = client.db("EVENT_MANAGEMENT");
    const collection = db.collection("recentEvents");

    // Delete data from the RECENT_EVENTS collection
    await collection.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Data deleted successfully from RECENT_EVENTS collection",
    });
  } catch (error) {
    console.error("Error deleting data from RECENT_EVENTS collection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
