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
.catcg(err => console.error("MongoDB connection error:", err)); 

let characters = [
    {
      id: 1,
      name: "Fox",
      weight_class: "light",
      movement_speed: 10,
      original_game_series: "Star Fox",
      icon: "url-to-icon",
      image: "url-to-image",
      model: "url-to-3d-model",
      tier_ranking: "S",
      notable_players: ["Leffen", "Mang0"]
    },
    {
      id: 2,
      name: "Marth",
      weight_class: "medium",
      movement_speed: 8,
      original_game_series: "Fire Emblem",
      icon: "url-to-icon",
      image: "url-to-image",
      model: "url-to-3d-model",
      tier_ranking: "A",
      notable_players: ["Zain", "Mew2King"]
    }
  ];

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
    if (!character) return res.status(404).json({ message: "Character not found" });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}); 

// Create new character
app.post("/characters", async (req, res) => {
  try {
      const newCharacter = new Character(req.body);
      await newCharacter.save();
      res.status(201).json(newCharacter);
  } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
  }
});

// Update character
app.put("/characters/:id", async (req, res) => {
  try {
      const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCharacter) return res.status(404).json({ message: "Character not found" });
      res.json(updatedCharacter);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
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