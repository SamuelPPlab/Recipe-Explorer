import { Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { countryFlags } from "../services/countryFlags";
import Loading from "./Loading";

const MainRecipeDetails = ({ loading, recipe:
  { name, instructions, video, image, area, category, isAlcoholic }, children }) => {
  
  const videoEmbeder = (link) => (
    <iframe data-testid="video" title="Video de preparo" src={link} />
  );

  if (loading) return <Loading />;

  return(
    <div style={{ width: '50%' }}>
      <img src={image} alt={name} />
      <Typography variant="h1">
        {name}
      </Typography>
      {area && <img src={countryFlags[area]} alt={`${area} flag`} />}
      {area && <Typography variant="h5">
        {category}
      </Typography> }
      <Typography variant="subtitle1">
        {isAlcoholic}
      </Typography>
      {children}
      <Typography variant="body2">
        {instructions}
      </Typography>
      {(video) && videoEmbeder(video)}
    </div>
  );
};

const mapStateToProps = ({ detailReducer }) => ({
  loading: detailReducer.loading,
  recipe: detailReducer.recipe,
  error: detailReducer.error,
});

export default connect(mapStateToProps)(MainRecipeDetails);

