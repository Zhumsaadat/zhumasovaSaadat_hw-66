import React from 'react';
import { Link } from 'react-router-dom';
import { Meal } from '../../type';

interface Props {
    meal: Meal;
    deleteMeal: React.MouseEventHandler;
}

const Meal: React.FC<Props> = ({meal, deleteMeal}) => {
    return (
            <div className=" border border-black row py-3 my-3">
                <div className="col-6">
                    <span className="text-muted">{meal.category}</span>
                    <div>{meal.description}</div>
                </div>
                <strong className="col-3">{meal.calories}</strong>
                <div className="col-3 column-gap-2">
                    <Link to={'/edit/' + meal.id} className="btn btn-primary mx-2">Edit</Link>
                    <button onClick={deleteMeal} className="btn btn-danger mx-2">Delete</button>
                </div>
            </div>

    );
};

export default Meal;