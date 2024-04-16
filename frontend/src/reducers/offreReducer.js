import {
    OFFRE_LOADING,
    GET_OFFRE,
    GET_OFFRES,
    CLEAR_CURRENT_OFFER
} from "../actions/types";
const initialstate = {
    offre: null,
    offres: null,
    loading: false
};

export default function(state = initialstate, action) {
    switch (action.type) {
        case OFFRE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_OFFRE:
            return {
                ...state,
                offre: action.payload,
                loading: false
            };
        case GET_OFFRES:
            return {
                ...state,
                offres: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_OFFER:
            return {
                ...state,
                offre: null
            };
        default:
            return state;
    }
}
