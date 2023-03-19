import styles from '../ingredient-details/ingredient-details.module.css';

function IngredientDetails ({state}) {
    return (
        <>
            <div>
                <h1>Детали ингредиента</h1>
            </div>
            <div>
                <img src={state.image} alt={state.name}/>
                <p>{state.name}</p>
                <div>
                    <div>
                        <p>Калории,ккал</p>
                        <p>{state.calories}</p>
                    </div>
                    <div>
                        <p>Белки, г</p>
                        <p>{state.proteins}</p>
                    </div>
                    <div>
                        <p>Жиры, г</p>
                        <p>{state.fat}</p>
                    </div>
                    <div>
                        <p>Углеводы, г</p>
                        <p>{state.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IngredientDetails;