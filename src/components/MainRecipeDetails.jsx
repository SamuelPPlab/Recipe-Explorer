import React from "react";
import {  connect } from "react-redux";
import { nationalityToCC } from "../services/nationalityToCC";
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
      {area}
      {area && <img src={`https://www.countryflags.io/${nationalityToCC[area]}/shiny/64.png`} alt='' />}
      <h1>{name}</h1>
      {area && <p>{category}</p>}
      {isAlcoholic}
      {children}
      <p>{instructions}</p>
      {(video) && videoEmbeder(video)}
    </div>
  )
}

const mapStateToProps = ({ detailReducer }) => ({
  loading: detailReducer.loading,
  recipe: detailReducer.recipe,
  error: detailReducer.error,
});

export default connect(mapStateToProps)(MainRecipeDetails);

