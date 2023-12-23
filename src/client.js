const axios = require("axios");

const baseUrl = "http://localhost:3002";

const getValutes = () => {
  return axios
    .get(`${baseUrl}/getValutes`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching valutes:", error.message);
      throw error;
    });
};

const getValute = (code, startDate, endDate) => {
  return axios
    .get(`${baseUrl}/getValute?code=${code}&start_date=${startDate}&end_date=${endDate}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching valute:", error.message);
      throw error;
    });
};

getValutes()
  .then((valutesData) => {
    console.log("getValutes", valutesData);
  })
  .catch((error) => {
    console.error("Error fetching valutes:", error.message);
  });

getValute('R01535', '2023-09-01T10:30:00', '2023-10-01T10:30:00')
  .then((valuteData) => {
    console.log("getValute", valuteData);
  })
  .catch((error) => {
    console.error("Error fetching valute:", error.message);
  });
