import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.9:3333" //a base url muda de acordo com ambiente que estou ou o sdispositivo, com a porta definida no node
});

export default api;
