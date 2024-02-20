import React, { ReactEventHandler, useState } from 'react';
import { Meal } from '../../type';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import ButtonSpinner from '../../components/ButtonSpinner/ButtonSpinner';
import { CATEGORIES } from '../../Helpers/Helpers';

const AddNewMeal: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [meal, setMeal] = useState<Meal>({
        category: "",
        description: "",
        calories: 0,
    });

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axiosApi.post('/meal.json', meal);
            navigate("/");
        } finally {
            setMeal({
                category: "",
                description: "",
                calories: 0,
            })
            setLoading(false);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setMeal(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        console.log(meal)
    };


    return (
        <>
            <h2 className="mt-2">Add new meal</h2>
            <form className="mt-3">
                <div className="mb-3">
                    <select id="disabledSelect" className="form-select" name="category" onChange={onChange} required>
                        <option>Disabled select</option>
                        {CATEGORIES.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <input type="text"
                           required
                           id="disabledTextInput"
                           className="form-control"
                           placeholder="Disabled input"
                           name="description"
                           onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label><input type="number" name="calories" onChange={onChange} required /> <strong>kcal</strong></label>
                </div>
                <button onClick={onSubmit} type="submit" className="btn btn-primary">{loading && <ButtonSpinner />} Submit</button>
            </form>
        </>

    );
};

export default AddNewMeal;