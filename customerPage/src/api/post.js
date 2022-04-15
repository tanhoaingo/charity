import axios from "axios";

const URL = 'http://localhost:8080/post';

export const getAll = () => axios.get(`${URL}/get/all`);