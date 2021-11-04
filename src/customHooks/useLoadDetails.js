import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { detailsFetcher } from "../redux/actions/detailPage";

const useLoadDetails = (pathname) => {
  const dispatch = useDispatch();

  const id = pathname.split('/')[2];
  const isItFood = pathname.includes('foods');
  
  useEffect(() => {
    dispatch(detailsFetcher(isItFood, id));
  }, [dispatch, id, isItFood]);
};

export default useLoadDetails;
