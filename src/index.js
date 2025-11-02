// Imports your SCSS stylesheet
import "./styles/index.scss";

const year = document.getElementById("year");
const make = document.getElementById("make");
const model = document.getElementById("model");

let carData = [];

// Fetch car data from the JSON file
fetch("car-dataset.json")
  .then((response) => response.json())
  .then((data) => {
    carData = data;
    populateYearSelect();
  })
  .catch((error) => console.error("Error fetching car data:", error));
