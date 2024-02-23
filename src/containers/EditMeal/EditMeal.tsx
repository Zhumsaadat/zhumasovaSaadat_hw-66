import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiMeal } from '../../type';
import AddNewMeal from '../AddNewMeal/AddNewMeal';

const EditMeal: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [meal, setMeal] = useState<ApiMeal | null>(null);
    const [isUpdating, setUpdating] = useState(false);

    const fetchOneMeal = useCallback(async () => {
        const {data: editMeal} = await axiosApi.get<ApiMeal | null>('/meal/' + id + '.json');

        if (!editMeal) {
            navigate('/404', {replace: true});
        } else {
            setMeal(editMeal);
        }
    }, [id, navigate]);

    useEffect(() => {
        void fetchOneMeal();
    }, [fetchOneMeal]);

    const updateMeal = async (meal: ApiMeal) => {
        try {
            setUpdating(true);
            await axiosApi.put('/meal/' + id + '.json', meal)
            navigate('/');
        } finally {
            setUpdating(false);
        }

    };

    const existingMeal = meal && {
        ...meal,
    };

    return (
        <div className="row mt-2">
            <div className="col">
                {existingMeal && (
                    <AddNewMeal
                        upDate={updateMeal}
                        isEdit existingMeal={existingMeal}
                        isLoading={isUpdating}
                    />
                )}
            </div>
        </div>
    );
};

export default EditMeal;