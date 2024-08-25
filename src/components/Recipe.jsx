import React from 'react'
import { useState, useEffect } from 'react'
import ModalList from './ModalList'
import fetchMeal from '../data/meals.json'

const url = {fetchMeal}
const courseMealsList = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']
const Recipe = () => {
  const [meals, setMeals] = useState([]) // To hold the API and meals full list
  const [isLoading, setIsLoading] = useState(true) // for loading screen
  const [refreshMeals, setRefreshMeals] = useState([]) // for the clear list function
  const [error, setError] = useState(false) // For error screen
  const [search, setSearch] = useState('') // For input
  const [courseMeals, setCourseMeals] = useState('') //For select tag
  const [randomMeals, setRandomMeals] = useState(null) // to display random meals

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setMeals(fetchMeal)
        {/**For filtered meals */}
        setRefreshMeals(fetchMeal)
      } catch (error) {
        setError('Error fetching data')
      }
      setIsLoading(false)
    }
    fetchMeals()
  }, [])

  {
    /**Helps in real time filtering of list instead of having to click submir button on form */
  }
  useEffect(() => {
    const filteredSearch = meals.filter((result) => {
      return (
        result.name.toLowerCase().includes(search.toLowerCase()) &&
        (courseMeals === '' ||
          result.type.toLowerCase().includes(courseMeals.toLowerCase()))
      )
    })
    setRefreshMeals(filteredSearch)
  }, [courseMeals, search, meals])

  const randomButton = () => {
    const randomMeals = Math.floor(Math.random() * refreshMeals.length)
    setRandomMeals(refreshMeals[randomMeals])
  }
  return (
    <div>
      <div className="recipe-container mx-9 mt-5">
        <h4 className=" text-center search-for-recipes">Search for Recipes</h4>
        <div className="  flex justify-center input-container">
          <input
            type="text"
            value={search}
            placeholder="Enter recipe..."
            className=" px-4 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            name="courseMeals"
            value={courseMeals}
            onChange={(e) => setCourseMeals(e.target.value)}
            className="bg-black text-white rounded-r-md">
            <option value="">Any</option>
            {courseMealsList.map((meals) => {
              return <option key={meals}>{meals}</option>
            })}
          </select>
          <button
            type="button"
            onClick={randomButton}
            className="bg-black text-white rounded-md ml-3 p-2">
            Random Recipe
          </button>
        </div>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : refreshMeals.length === 0 ? (
          <p className="text-center mt-20 text-[30px]">
            Receipe not available.
          </p>
        ) : (
          <>
            {' '}
            {randomMeals && (
              <div className=" mt-8 p-4 border text-center border-orange-800">
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
                      {/**To turn it into a list */}
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
