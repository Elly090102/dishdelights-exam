import { useState } from "react";

export default function Recipes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [saveMessage, setSaveMessage] = useState(""); 

  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      category: "Italian",
      image: "/images/carbonara.jpg",  
      time: "30 minutes",
      ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
      instructions:
        "Boil the spaghetti until al dente. Meanwhile, fry the pancetta until crispy. Beat eggs with grated Parmesan and mix with the hot pasta, stirring quickly. Add pancetta, season with black pepper, and serve immediately.",
    },
    {
      id: 2,
      title: "Vegan Buddha Bowl",
      category: "Vegan",
      image: "/images/buddha.jpg", 
      time: "25 minutes",
      ingredients: ["Quinoa", "Chickpeas", "Avocado", "Carrots", "Tahini Sauce"],
      instructions:
        "Cook quinoa according to package instructions. Arrange cooked quinoa, chickpeas, sliced avocado, shredded carrots, and drizzle with tahini sauce. Enjoy!",
    },
    {
      id: 3,
      title: "Chicken Alfredo",
      category: "Italian",
      image: "/images/chicken.jpg", 
      time: "35 minutes",
      ingredients: ["Chicken", "Fettuccine", "Cream", "Parmesan", "Garlic"],
      instructions:
        "Cook fettuccine pasta. In a pan, cook diced chicken with garlic until golden. Add cream and Parmesan, stirring until smooth. Toss with pasta and serve warm.",
    },
    {
      id: 4,
      title: "Greek Salad",
      category: "Salad",
      image: "/images/salad.jpg", 
      time: "10 minutes",
      ingredients: ["Tomatoes", "Cucumber", "Feta Cheese", "Olives", "Olive Oil"],
      instructions:
        "Chop tomatoes and cucumbers. Mix with feta cheese and olives. Drizzle with olive oil and season with salt and pepper. Serve fresh.",
    },
  ];
  

  const filteredRecipes = recipes.filter(
    (recipe) =>
      (category === "All" || recipe.category === category) &&
      recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  const saveToFavorites = (recipe) => {
    if (favorites.some((fav) => fav.title === recipe.title)) {
      setSaveMessage(`"${recipe.title}" is already in favorites! ❤️`);
      setTimeout(() => setSaveMessage(""), 2000);
      return;
    }
  
    // Ensure the full recipe object is stored
    const updatedFavorites = [...favorites, { ...recipe }];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  
    setSaveMessage(`"${recipe.title}" added to favorites! ✅`);
    setTimeout(() => setSaveMessage(""), 2000);
  };
  
  
  return (
    <section className="recipes">
      <h2>DishDelights Recipes</h2>
      <input
        type="text"
        placeholder="Search for recipes..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className="category-filter" onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Italian">Italian</option>
        <option value="Vegan">Vegan</option>
        <option value="Salad">Salad</option>
      </select>

      {saveMessage && <div className="save-message">{saveMessage}</div>}

      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <img src={recipe.image} alt={recipe.title} className="recipe-img" />
            <h3>{recipe.title}</h3>
            <p>
              <strong>{recipe.category}</strong> - {recipe.time}
            </p>
            <button onClick={() => setSelectedRecipe(recipe)}>View Details</button>
            <button className="save-btn" onClick={() => saveToFavorites(recipe)}>
              ⭐ Save to Favorites
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedRecipe(null)}>✖</button>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-img" />
            <h2>{selectedRecipe.title}</h2>
            <h3>Cooking Time</h3>
            <p>{selectedRecipe.time}</p>
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedRecipe.instructions}</p>
            <button className="save-btn" onClick={() => saveToFavorites(selectedRecipe)}>
              ⭐ Save to Favorites
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
