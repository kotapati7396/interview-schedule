import axios from "axios";
import {
  GET_ERRORS,
  GET_OFFRE,
   GET_OFFRES,
   OFFRE_LOADING,
   CLEAR_CURRENT_OFFER,
   
} from "./types";

export const clearcurrentoffer= () => {
    return {
        type: CLEAR_CURRENT_OFFER
    };
};
export const getOffre = () => dispatch => {
    dispatch(offreLoading());
    axios
        .get("/api/offres")
        .then(res =>
            dispatch({
                type: GET_OFFRE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_OFFRE,
                payload: {}
            })
        );
};

export const createOffre = (offreData, history) => dispatch => {
    axios
        .post("/api/offres", offreData)
        .then(res => history.push("/offreDashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const offreLoading = () => {
    return {
        type: OFFRE_LOADING
    };
};


export const getOffres = () => dispatch => {
    dispatch(offreLoading());
    axios
        .get("/api/offres/all")
        .then(res =>
            dispatch({
                type: GET_OFFRES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_OFFRES,
                payload: null
            })
        );
};

export const getProfileByJtitle = jobTitle => dispatch => {
    dispatch(offreLoading());
    axios
        .get(`/api/offres/jobTitle/${jobTitle}`)
        .then(res =>
            dispatch({
                type: GET_OFFRE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_OFFRE,
                payload: null
            })
        );
};
