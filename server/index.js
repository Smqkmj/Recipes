const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


//middleware
app.use(cors())
app.use(express.json())//=>allows us to access the req.body

//ROUTES//

//get all recipes

app.get("/recipes", async (req, res) => {
    try {
        const allRecipes = await pool.query("SELECT * FROM recipes")
        res.json(allRecipes.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a recipe

app.get("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE recipes_id = $1", [id])
        res.json(recipe.rows[0])
    } catch (err) {
        console.error(err.message)

    }
})

//create a recipe

app.post("/recipes", async (req, res) => {
    try {
console.log(req.body)
        const { description } = req.body

        const newRecipe = await pool.query(
            "INSERT INTO recipes (description) VALUES ($1) RETURNING *",
            [description]);
        res.json(newRecipe.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update a recipe

app.put("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateRecipe = await pool.query(
            "UPDATE recipes SET description = $1 WHERE recipes_id = $2",
            [description, id]
        )
        res.json("Recipe was updated")
    } catch (err) {
        console.error(err.message)
    }
})

//delete a recipe

app.delete("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRecipe = await pool.query("DELETE FROM recipes WHERE recipes_id = $1", [
            id
        ])
        res.json("Recipe was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server is starting on port 5000")
})