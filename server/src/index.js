import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import { RecipesModel } from "./models/Recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


//database connection

mongoose.connect(
  "mongodb+srv://user:bBiGVhxrZvU1t3tj@cluster0.0fui2nx.mongodb.net/bhansa?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


//search api
app.get("/search/:key", async (req, res) => {

  let result = await RecipesModel.find({
    "$or": [

      { name: { $regex: req.params.key } },
      { ingredients: { $regex: req.params.key } }
    ]

  });
  res.json(result)
});
app.listen(3001, () => console.log("Server started"));
