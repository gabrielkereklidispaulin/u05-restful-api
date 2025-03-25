require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const mongoose = require("mongoose");
const Character = require("./models/Character");

const app = express(); 
const PORT = process.env.PORT || 4000; 

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB!"))
.catch(err => console.error("MongoDB connection error:", err)); 

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get all characters
app.get("/characters", async (req, res) => {
  try {
    const characters = await Character.find(); 
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Server error", error});
  }
});

// Get specific character by id
app.get("/characters/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id); 
    if (!character) return res.status(404).json({ error: "Character not found" });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}); 

// Create new character
app.post("/characters", async (req, res) => {
  const { name, weight_class, movement_speed, original_game_series } = req.body;

  if (!name || !weight_class || !movement_speed || !original_game_series) {
    return res.status(400).json({ message: "Missing required fields: name, weight_class, movement_speed, original_game_series" });
  }
  try {
    const newCharacter = new Character(req.body); 
    await newCharacter.save(); 
    res.status(201).json(newCharacter); 
  } catch (error) {
    res.status(500).json({ message: "Failed to create character", error }); 
  }
});


// Update character
app.put("/characters/:id", async (req, res) => {
  const { name, weight_class, movement_speed, original_game_series } = req.body;
  if (!name || !weight_class || !movement_speed || !original_game_series) {
    return res.status(400).json({ message: "Missing required fields: name, weight_class, movement_speed, original_game_series" });
  }
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }
    res.json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: "Failed to update character", error });
  }
});

// Delete character
app.delete("/characters/:id", async (req, res) => {
  try {
      const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
      if (!deletedCharacter) return res.status(404).json({ message: "Character not found" });
      res.json({ message: "Character deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});