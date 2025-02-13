import { useState } from "react";

export default function Favourite() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const removeFromFavorites = (title) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.title !== title);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedRecipe(null); // Close modal after removing
  };

  return (
    <div className="page-container">
      <h2 className="title">Your Favorite Recipes ❤️</h2>
      <div className="recipe-container">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3>{recipe.title}</h3>
              <p>{recipe.category} - {recipe.time}</p>
              <div className="button-container">
                <button className="details-btn" onClick={() => setSelectedRecipe(recipe)}>
                  View Details
                </button>
                <button className="remove-btn" onClick={() => removeFromFavorites(recipe.title)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite recipes yet! Save some tasty dishes to your collection. 🍽️</p>
        )}
      </div>

      {selectedRecipe && (
        <div className="modal-overlay">
          <div className="recipe-modal">
            <button className="close-btn" onClick={() => setSelectedRecipe(null)}>✖</button>
            <div className="modal-content">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-image" />
              <h3 className="modal-title">{selectedRecipe.title}</h3>
              <p className="modal-time"><strong>Cooking Time:</strong> {selectedRecipe.time}</p>
              <h4 className="modal-subheading">Ingredients</h4>
              <ul className="modal-list">
                {selectedRecipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
              <h4 className="modal-subheading">Instructions</h4>
              <p className="modal-instructions">{selectedRecipe.instructions}</p>
              <button className="remove-btn" onClick={() => removeFromFavorites(selectedRecipe.title)}>
                ❌ Remove from Favorites
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
