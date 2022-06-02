import axios from "axios"

const baseURL = "https://asia-east2-botfat.cloudfunctions.net/project_controller"
const axiosInstance = axios.create({
  baseURL,
  Headers: {
    'Content-type': "application/json",
    "Access-Control-Allow-Origin": "*"
  },

});

export const apiHelper = axiosInstance