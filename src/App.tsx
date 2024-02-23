import './App.css';
import { NavLink, useLocation } from 'react-router-dom';
import Meal from './type';
import {Routes, Route} from 'react-router-dom';
import AddNewMeal from './containers/AddNewMeal/AddNewMeal';
import React, { useCallback, useEffect, useState } from 'react';
import Home from './containers/Home/Home';
import { ApiMeal } from './type';
import axiosApi from './axiosApi';
import EditMeal from './containers/EditMeal/EditMeal';

function App() {
    const[meals, setMeals] = useState<Meal[]>([]);
    const[loading, setLoading] = useState(false);
    const [caloriesTotal, setCaloriesTotal] = useState(0);
    const location = useLocation();


            const fetchMeals = useCallback(async () => {
                try {
                    setLoading(true);
                    const { data: apiMeals } = await axiosApi.get<ApiMeal | null>('/meal.json');

                    const newMeals: Meal[] = Object.keys(apiMeals).map(id => ({
                        id,
                        categories: apiMeals[id].categories,
                        description: apiMeals[id].description,
                        calories: parseInt(apiMeals[id].calories), // используем parseFloat для преобразования в число с плавающей запятой
                    }));

                    const getTotalCalories = await newMeals.reduce((sum, meal) => {
                        return sum + meal.calories;
                    }, 0);
                    setCaloriesTotal(getTotalCalories);
                    await setMeals(newMeals);
                } finally {
                    setLoading(false);
                }
            }, []);

    useEffect( () => {
        if (location.pathname === '/'){
            void fetchMeals();
        }

    }, [location.pathname, fetchMeals]);


  return (
    <>
      <header>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                  <NavLink to="/" className="navbar-brand" href="#">Calorie tracer</NavLink>
                  <NavLink to="/" className="nav-link">Home</NavLink>
              </div>
          </nav>

      </header>
        <main>
            <Routes>
                <Route path="/addNewMeal" element={(<AddNewMeal fetchMeals={fetchMeals} />)} />
                <Route path="/edit/:id" element={(<EditMeal />)} />
                <Route path="/" element={(<Home meals={meals} loading={loading} caloriesTotal={caloriesTotal} fetchMeals={fetchMeals}/>)} />
                <Route path="*" element={(<h1>NOT FOUNT</h1>)} />
            </Routes>
        </main>
    </>
  )
}

export default App
