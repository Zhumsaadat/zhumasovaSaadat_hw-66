import React, {  useState } from 'react';
import { Meal, MealAdd } from '../../type';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import ButtonSpinner from '../../components/ButtonSpinner/ButtonSpinner';
import { CATEGORIES } from '../../Helpers/Helpers';

interface Props{
    existingMeal?: Meal;
    upDate?: (meal: MealAdd) => void
    isEdit?: boolean;
    isLoading?: boolean;

}

const initialState: MealAdd = {
    category: '',
    description: '',
    calories: 0,
};

const AddNewMeal: React.FC<Props> = ({ isEdit, existingMeal = initialState, upDate}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [meal, setMeal] = useState<MealAdd>(existingMeal);

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isEdit) {
           upDate && upDate(meal);
        }
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
            <h2 className="mt-2">{isEdit ? 'Edit meal' : 'Add new meal'}</h2>
            <form onSubmit={onSubmit} className="mt-3">
                <div className="mb-3">
                    <select id="disabledSelect" className="form-select" name="category" value={meal.category} onChange={onChange} required>
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
                           value={meal.description}
                           onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label><input type="number" name="calories" value={meal.calories} onChange={onChange} required /> <strong>kcal</strong></label>
                </div>
                <button  type="submit" className="btn btn-primary">{loading && <ButtonSpinner />} {isEdit ? 'Update' : 'Create'}</button>
            </form>
        </>

    );
};

export default AddNewMeal;