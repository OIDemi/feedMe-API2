import { useState, useEffect } from "react";
import fetchMeal from "../data/meals.json";

const Recipe = () => {
  const [meals, setMeals] = useState([]); // Holds the full list of meals
  const [isLoading, setIsLoading] = useState(true); // For loading screen
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("any");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setMeals(fetchMeal);
      } catch (error) {
        setError("Error fetching data");
      }
      setIsLoading(false);
    };
    fetchMeals();
  }, []);

  if (error)
    return <p className="text-center text-red-500">Error loading data</p>;
  if (isLoading) return <p className="text-center">Loading...</p>;

  const filteredMeals = meals.filter((list) => {
    const searchMatch = list.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch =
      sortBy === "any" || list.type.toLowerCase() === sortBy.toLowerCase();
    return searchMatch && typeMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="text-center text-2xl font-semibold mb-6 text-gray-700">
          Search for Recipes
        </h4>
        <div className="flex justify-center space-x-4 mb-6">
          <input
            className="w-1/2 md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter food here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="any">Any</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        {filteredMeals.length === 0 ? (
          <h3 className="text-center text-xl text-gray-600">
            No meals available
          </h3>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
            {filteredMeals.map((list) => (
              <li
                key={list.id}
                className="bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800">{list.name}</h3>
                <h4 className="text-sm text-gray-500">{list.type}</h4>
                <p className="text-gray-600 mt-2">{list.ingredients}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipe;
