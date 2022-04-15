import * as api from '../api/post';
import { GET_FAILURE, GET_SUCCESS } from '../constant/type';
export const getAll = () => async (dispatch) => {
    try {
        const { data } = await api.getAll();
        dispatch({type: GET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_FAILURE, payload: error});
    }
}