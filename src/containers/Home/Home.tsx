import React from 'react';
import Meal from '../../components/Meal/Meal';
import { Link } from 'react-router-dom';
import { ApiMeal } from '../../type';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
    meals: ApiMeal[];
    loading: boolean
}

const Home:React.FC<Props> = ({meals, loading}) => {
    let homePage = (
        <div>
            <div className="d-flex justify-content-between my-3">
                <div>Total calories</div>
                <Link to="/addNewMeal" className="btn btn-primary">Add new meal</Link>
            </div>
            {meals.map((meal, index) =>
                <Meal key={index} meal={meal}/>
            )}
        </div>
    );

    if (loading) {
        homePage = <Spinner/>;
    }

    return <>{homePage}</>;
}

export default Home;