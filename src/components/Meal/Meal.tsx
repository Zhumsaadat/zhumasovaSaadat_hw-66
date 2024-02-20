import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiMeal } from '../../type';

interface Props {
    meal: ApiMeal;
}

const Meal: React.FC<Props> = ({meal}) => {
    const param = useParams();
    return (
            <div className=" border border-black row py-3 my-3">
                <div className="col-6">
                    <span className="text-muted">{meal.category}</span>
                    <div>{meal.description}</div>
                </div>
                <strong className="col-3">{meal.calories}</strong>
                <div className="col-3 column-gap-2">
                    <Link to="/edit" >Edit</Link>
                    <button>Delete</button>
                </div>
            </div>

    );
};

export default Meal;