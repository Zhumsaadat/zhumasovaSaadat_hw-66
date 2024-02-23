import React from 'react';
import Meal from '../../components/Meal/Meal';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';

interface Props {
    meals: Meal[];
    loading: boolean;
    caloriesTotal: number;
    fetchMeals: () => void;
}

const Home:React.FC<Props> = ({meals, loading, caloriesTotal, fetchMeals}) => {

    const deleteMeal = async (id: string) => {
        if (window.confirm('Do you really want to delete?')) {
            await axiosApi.delete('/meal/' + id + '.json');
            await fetchMeals();
            console.log(id)
        }
    };

    let homePage = (
        <div>
            <div className="d-flex justify-content-between my-3">
                <div>Total calories: {caloriesTotal}</div>
                <Link to="/addNewMeal" className="btn btn-primary">Add new meal</Link>
            </div>
            {meals.map((meal, index) =>
                <Meal key={index} meal={meal} deleteMeal={() => deleteMeal(meal.id)}/>
            )}
        </div>
    );

    if (loading) {
        homePage = <Spinner/>;
    }

    return <>{homePage}</>;
}

export default Home;