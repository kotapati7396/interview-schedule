import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userprofileReducer from './userprofileReducer';
import offreReducer from './offreReducer';


export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    profile:userprofileReducer,
    offre: offreReducer
})

