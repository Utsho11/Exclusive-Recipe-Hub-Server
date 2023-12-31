const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const chef = require("./data/Chef.json");
const recipes = require("./data/Recipe.json");
const news = require("./data/News.json");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/chef", (req, res) => {
  res.send(chef);
});

app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/chef/:id", (req, res) => {
  const id = req.params.id;
  const selectedRecipes = recipes.filter(
    (recipeId) => recipeId.Chef_category == id
  );
  res.send(selectedRecipes);
});

app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  const selectedNews = recipes.filter((recipeId) => recipeId.id == id);
  res.send(selectedNews);
});

app.get("/recipes", (req, res) => {
  res.send(recipes);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2g6iibi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const database = await client.db("Exclusive-Recipe-Hub");
    const Review = database.collection("Review")
    const RequestedRecipe = database.collection("RecipeRequest")
    const Submitted_Recipe = database.collection("Submitted_Recipe")

    app.post("/review",async(req, res) => {
      const newReview = req.body;
      const result = await Review.insertOne(newReview);
      res.send(result);
    })

    app.post("/requestRecipe",async(req, res) => {
      const newRequestRecipe = req.body;
      const result = await RequestedRecipe.insertOne(newRequestRecipe);
      res.send(result);
    })

    app.post("/publish",async(req, res) => {
      const newSubmittedRecipe = req.body;
      const result = await Submitted_Recipe.insertOne(newSubmittedRecipe);
      res.send(result);
    })



    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

