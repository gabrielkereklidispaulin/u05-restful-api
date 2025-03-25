require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const mongoose = require("mongoose");
const app = express(); 

app.use(cors());
app.use(express.json()); 

const PORT = process.env.PORT || 4000; // ändra port? 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB!"))
.catcg(err => console.error("MongoDB connection error:", err)); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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

// ✅ Lägg till denna route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/characters", (req, res) => {
  res.json(characters);
});

app.get("/characters/:id", (req, res) => {
  const character = charaters.find (c => c.id === parseInt(req.params.id));
  if (!character) return res.status(404).json({ message: "Character not found"});
  res.json(character);
});

app.post("/characters", (req, res) => {
  const newCharacter = { id: characters.length + 1, ...req.body }; 
  characters.push(newCharacter); 
  res.status(201).json(newCharacter);
});

app.put("/characters/:id", (req, res) => {
  let character = characters.find(c => c.id === parseInt(req.params.id));
  if (!character) return res.status(404).json({ message: "Characters not found"});

  character = { id: character.id, ... req.body }; 
  characters = characters.map(c => (c.id === character.id ? character : c)); 

  res.json(character); 

}); 

app.patch("/characters/:id", (req, res) => {
  characters = characters.filter(c => c.id !== parseInt(req.params.id)); 
  res.json({ message: "Character deleted"});
});

app.delete("/characters/:id", (req, res) => {
  characters = characters.filter(c => c.id !== parseInt(req.params.id));
  res.json({ message: "Character deleted"}); 
} )