import './App.css';
import Appbar from './components/Appbar/Appbar';
import { Link, NavLink } from 'react-router-dom';
import Meal from './components/Meal/Meal';
import {Routes, Route} from 'react-router-dom';
import AddNewMeal from './containers/AddNewMeal/AddNewMeal';
import React, { useCallback, useEffect, useState } from 'react';
import Home from './containers/Home/Home';
import { ApiMeal } from './type';
import axiosApi from './axiosApi';

function App() {
    const[meals, setMeals] = useState<Meal[]>([]);
    const[loading, setLoading] = useState(false);
    let caloriesTotal: number

    const fetchMeals = useCallback(async () => {
        try {
            setLoading(true);
            const {data: apiMeals} = await axiosApi.get<ApiMeal | null>('/meal.json');
            const newMeals = Object.keys(apiMeals).map(id => ({
                    ...apiMeals[id]
            }));

            await setMeals(newMeals);

        }finally {
            setLoading(false);
        }
    }, []);



    useEffect( () => {
        void fetchMeals()
    }, [fetchMeals]);


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
                <Route path="/addNewMeal" element={(<AddNewMeal />)} />
                <Route path="/edit/:id" element={(<AddNewMeal />)} />
                <Route path="/" element={(<Home meals={meals} loading={loading} />)} />
                <Route path="*" element={(<h1>NOT FOUNT</h1>)} />
            </Routes>
        </main>
    </>
  )
}

export default App
