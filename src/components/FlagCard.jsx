import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { recipesByAreaFetcher } from "../redux/actions/mainPage";
import { nationalityToCC } from "../services/nationalityToCC";

const FlagCard = ({ area, loadRecipes, isItFood }) => {
  const flagSource = `https://www.countryflags.io/${nationalityToCC[area]}/shiny/64.png`;
  return(
    <div style={{ height: '160px', width: '300', margin: '50px', justifyContent: 'center', textAlign: 'center' }}>
      <Link to='/main' onClick={() => loadRecipes(area, isItFood)}>
        <img
          src={flagSource}
          style={{ height: '100px' }}
          alt={`${area} flag`}
        />
        <h3>{area} food</h3>
      </Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadRecipes: (area, isItFood) => dispatch(recipesByAreaFetcher(area, isItFood)),
});

export default connect(null, mapDispatchToProps) (FlagCard);
