// Imports your SCSS stylesheet
import "./styles/index.scss";

import carDataJson from './car-dataset.json';

let carData = [];


const populateOptions = (cars) => {
  const year = document.getElementById("yearSelect");
  const make = document.getElementById("makeSelect");
  const model = document.getElementById("modelSelect");
  
  const years = [...new Set(cars.map((car) => parseInt(car.year)))].sort((a, b) => b - a);
  years.forEach((yearValue) => {
    const option = document.createElement("option");
    option.value = yearValue;
    option.text = yearValue;
    year.appendChild(option);
  });
  
  year.addEventListener("change", () => {
    const selectedYear = parseInt(year.value);
    const filteredCars = cars.filter((car) => parseInt(car.year) === selectedYear);
    
    make.innerHTML = "<option disabled selected>Select Make</option>"; 
    model.innerHTML = "<option disabled selected>Select Model</option>";
    
    const makes =
    [...new Set(filteredCars.map((car) => car.Manufacturer))]
    .sort();
    
    
    makes.forEach((makeValue) => {
      const option = document.createElement("option");
      option.value = makeValue;
      option.text = makeValue.charAt(0).toUpperCase() + makeValue.slice(1).toLowerCase();
      make.appendChild(option);
    });
    make.disabled = false;
    model.disabled = true;
  });
  
  make.addEventListener("change", () => {
    const selectedYear = parseInt(year.value);
    const selectedMake = make.value;
    const filteredCars = cars.filter(
      (car) => parseInt(car.year) === selectedYear && car.Manufacturer === selectedMake
    );
    
    model.innerHTML = "<option disabled selected>Select Model</option>";
    
    const models = [...new Set(filteredCars.map((car) => car.model))].sort();
    models.forEach((modelValue) => {
      const option = document.createElement("option");
      option.value = modelValue;
      option.text = modelValue;
      model.appendChild(option);
    });
    model.disabled = false;
  });
  
  model.addEventListener("change", () => {
    const selectedCar = carData.find(
      (car) =>
       parseInt(car.year) === parseInt(year.value) &&
      car.Manufacturer === make.value &&
      car.model === model.value
    );
    
    console.log("Selected Car:", selectedCar);
  });
};

// Use imported data
carData = carDataJson;
populateOptions(carData);