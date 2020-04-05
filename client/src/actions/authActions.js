import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(res => history.push('/login'))
      .catch(err => 
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
}

//Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const {token} = res.data;
      //save to localstorage
      //set token to axios auth header
      setAuthToken(token);
      //Decode the token to get the user data
      const decoded = jwt_decode(token);
      //Dispatch set_current_user 
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}