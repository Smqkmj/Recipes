import React, { Fragment, useEffect, useState, } from "react";

const ListRecipes = () => {

    const [recipes, setRecipes] = useState([])

    //delete recipe function

    async function deleteRecipe(id){
        try {
           const res= await fetch(`http://localhost:5000/recipes/${id}`,{
               method:"DELETE"
           })

           setRecipes(recipes.filter(recipe=>recipe.recipe_id!==id))
        } catch (err) {
            console.error(err.message)
        }
    }

    async function getRecipes() {
        const res = await fetch("http://localhost:5000/recipes")
        const recipeArray = await res.json()
        setRecipes(recipeArray)

    }
    useEffect(() => {
        getRecipes()
    }, [])

    console.log(recipes)
    return <Fragment>
        <table className="table mt-5">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {

                    recipes.map((recipe) => (
                        <tr key={recipe.recipe_id}>
                            <td>{recipe.description}</td>
                            <td>Edit</td>
                            <td><button className="btn btn-danger" onClick={()=>deleteRecipe(recipe.recipe_id)}>Delete</button></td>
                        </tr>

                    )
                    )
                }
                {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
       */}

            </tbody>
        </table>
    </Fragment>
}

export default ListRecipes;