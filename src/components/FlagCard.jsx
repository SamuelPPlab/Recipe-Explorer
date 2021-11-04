import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { recipesByAreaFetcher } from "../redux/actions/mainPage";
import { countryFlags } from "../services/countryFlags";

const FlagCard = ({ area, loadRecipes, isItFood }) => {
  const flagSource = countryFlags[area];
  const flagIMGProps = {
    src: flagSource,
    style: { height: '100px' },
  };

  return(
    <div style={{ height: '160px', width: '200px', margin: '50px', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <img alt={`${area} flag`} {...flagIMGProps} />
        <Link to='/main'>
          <button onClick={() => loadRecipes(area, isItFood)} style={{ marginTop: '20px' }}>
            <h3>{area} food</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadRecipes: (area, isItFood) => dispatch(recipesByAreaFetcher(area, isItFood)),
});

export default connect(null, mapDispatchToProps) (FlagCard);
