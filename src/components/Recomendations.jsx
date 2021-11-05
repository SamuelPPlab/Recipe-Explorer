import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Paginator from "../components/Paginator";
import { swapMainPage } from "../redux/actions/mainPage";
import Loading from "./Loading";
import RecomendationCard from "./RecomendationCard";

const Recomendations = ({ recomendations, isItFood }) => {
  const [recipesShowing, setRecipesShowing] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(recomendations) {
      setRecipesShowing(recomendations.slice(0, 2));
    }
  }, [recomendations]);

  const changeRecipes = (page) => {
    setRecipesShowing(recomendations.slice((page - 1) * 2, page * 2));
  };

  if (!recomendations) return <Loading />
  const length = recomendations.length;

  return(
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            recipesShowing.map(({ name, image, isAlcoholic, category, id }) => (
              <RecomendationCard
                key={name}
                id={id}
                isItFood={isItFood}
                name={name}
                image={image}
                isAlcoholic={isAlcoholic}
                category={category}
                handleClick={() => dispatch(swapMainPage())}
              />
            ))
          }
        </div>
      </div>
      <div>
        <Paginator length={length} pageChanger={changeRecipes} pageSize={2} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ detailReducer: { recomendations }, mainPageReducer: { isItFood } }) => ({
  recomendations,
  isItFood,
});

export default connect(mapStateToProps)(Recomendations);
