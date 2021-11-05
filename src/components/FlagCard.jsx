import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recipesByAreaFetcher } from "../redux/actions/mainPage";
import { countryFlags } from "../services/countryFlags";

const FlagCard = ({ area, isItFood }) => {
  const dispatch = useDispatch();
  const flagSource = countryFlags[area];
  return(
    <div style={{ height: '160px', width: '200px', margin: '50px', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <img
          src={flagSource}
          style={{ height: '100px' }}
          alt={`${area} flag`}
        />
        <Link to='/main'>
          <button onClick={() => dispatch(recipesByAreaFetcher(area, isItFood))} style={{ marginTop: '20px' }}>
            <h3>{area} food</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FlagCard;
