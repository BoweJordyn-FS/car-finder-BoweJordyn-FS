// Imports your SCSS stylesheet
import "./styles/index.scss";
import carData from './car-dataset.json';

// Fetch the car dataset
fetch("/car-dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    carData = data;
    console.log("Car data loaded:", data);
    populateOptions(carData);
  })
  .catch((error) => {
    console.error("Error loading car data", error);
  });

const populateOptions = (cars) => {
  const year = document.getElementById("yearSelect");
  const make = document.getElementById("makeSelect");
  const model = document.getElementById("modelSelect");

  const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);
  years.forEach((yearValue) => {
    const option = document.createElement("option");
    option.value = yearValue;
    option.text = yearValue;
    year.appendChild(option);
  });

  year.addEventListener("change", () => {
    const selectedYear = parseInt(year.value);
    const filteredCars = cars.filter((car) => car.year === selectedYear);

    make.innerHTML = "<option disabled selected>Select Make</option>"; // UNCOMMENT this!
    model.innerHTML = "<option disabled selected>Select Model</option>"; // UNCOMMENT this!

    const makes =
      [...new Set(filteredCars.map((car) => car.Manufacturer))]
        .sort()
        .charAt(0)
        .toUpperCase() + makes.slice(1);
    makes.forEach((makeValue) => {
      const option = document.createElement("option");
      option.value = makeValue;
      option.text = makeValue;
      make.appendChild(option);
    });
    make.disabled = false;
    model.disabled = true;
  });

  make.addEventListener("change", () => {
    const selectedYear = parseInt(year.value);
    const selectedMake = make.value;
    const filteredCars = cars.filter(
      (car) => car.year === selectedYear && car.Manufacturer === selectedMake
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
        String(car.year).trim() === String(year.value).trim() &&
        car.Manufacturer === make.value &&
        car.model === model.value
    );

    console.log("Selected Car:", selectedCar);
  });
};
