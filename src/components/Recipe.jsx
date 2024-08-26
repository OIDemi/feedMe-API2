import React, { useState, useEffect } from 'react'
import ModalList from './ModalList'
import fetchMeal from '../data/meals.json'

const courseMealsList = ['Any', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']

const Recipe = () => {
  const [meals, setMeals] = useState([]) // Holds the full list of meals
  const [isLoading, setIsLoading] = useState(true) // For loading screen
  const [refreshMeals, setRefreshMeals] = useState([]) // For the clear list function
  const [error, setError] = useState(false) // For error screen
  const [search, setSearch] = useState('') // For input
  const [courseMeals, setCourseMeals] = useState('Any') // For the course meals selection
  const [randomMeals, setRandomMeals] = useState(null) // To display random meals

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setMeals(fetchMeal)
        setRefreshMeals(fetchMeal)
      } catch (error) {
        setError('Error fetching data')
      }
      setIsLoading(false)
    }
    fetchMeals()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let filteredMeals = []

    if (search !== '') {
      // Search based on the input value
      filteredMeals = meals.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase())
      )
    } else if (courseMeals !== 'Any') {
      // Search based on the selected course meal, unless "Any" is selected
      filteredMeals = meals.filter((result) =>
        result.type.toLowerCase().includes(courseMeals.toLowerCase())
      )
    } else {
      // If "Any" is selected, show all meals
      filteredMeals = meals
    }

    setRefreshMeals(filteredMeals)
    setSearch('')
  }

  const randomButton = () => {
    const randomIndex = Math.floor(Math.random() * refreshMeals.length)
    setRandomMeals(refreshMeals[randomIndex])
  }
  //Clear random Meals
  const clearButton = () => {
    setRandomMeals(null)
  }
  return (
    <div>
      <div className="recipe-container mx-9 mt-5">
        <h4 className="text-center search-for-recipes">Search for Recipes</h4>
        <form
          className="flex flex-col items-center input-container"
          onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            placeholder="Enter recipe..."
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-wrap justify-center mt-4">
            {courseMealsList.map((mealType) => (
              <label key={mealType} className="mr-4">
                <input
                  type="radio"
                  name="courseMeals"
                  value={mealType}
                  checked={courseMeals === mealType}
                  onChange={(e) => setCourseMeals(e.target.value)}
                  className="mr-1"
                />
                {mealType}
              </label>
            ))}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-black text-white rounded-md p-2 mr-2">
              Search
            </button>
            <button
              type="button"
              onClick={randomButton}
              className="bg-black text-white rounded-md p-2 mr-2">
              Random Recipe
            </button>
            <button
              type="button"
              onClick={clearButton}
              className="bg-[#FF0000] text-white rounded-md p-2">
              Clear
            </button>
          </div>
        </form>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : refreshMeals.length === 0 ? (
          <p className="text-center mt-20 text-[30px]">Recipe not available.</p>
        ) : (
          <>
            {randomMeals && (
              <div className="mt-8 p-4 border text-center border-orange-800">
                <h5>{randomMeals.name}</h5>
                <p>{randomMeals.type}</p>
                <ModalList ingredients={randomMeals.ingredients} />
              </div>
            )}
            <ul className="mt-20 grid grid-cols-1 md:grid-cols-3 recipe-list">
              {refreshMeals.map((list) => {
                const { id, name, type, ingredients } = list
                return (
                  <div key={id}>
                    <div className="border-orange-800 border rounded-md m-3 text-center">
                      <h5>{name}</h5>
                      <p>{type}</p>
                      <ModalList ingredients={ingredients} />
                    </div>
                  </div>
                )
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default Recipe
