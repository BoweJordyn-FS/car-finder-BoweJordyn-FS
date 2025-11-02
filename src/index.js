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
    addYears();
  });

const addYears = (data) => {
  const years = [...new Set(data.map((car) => car.year))];
  years.forEach((yearValue) => {
    const option = document.createElement("option");
    option.value = yearValue;
    option.textContent = yearValue;
    year.appendChild(option);
  });
};
// When a year is selected, enable the make dropdown
year.addEventListener("change", () => {
  const selectedYear = year.value;
  make.disabled = false;
  make.innerHTML = '<option value="">Select Make</option>';

  const makes = [
    ...new Set(
      carData.filter((car) => car.year == year.value).map((car) => car.make)
    ),
  ];
  makes.forEach((makeValue) => {
    const option = document.createElement("option");
    option.value = makeValue;
    option.textContent = makeValue;
    make.appendChild(option);
  });
  model.disabled = true;
  model.innerHTML = '<option value="">Select Model</option>';
});

//when a make is selected, enable the model dropdown
make.addEventListener("change", () => {
  const selectedMake = make.value;
  const selectedYear = year.value;
  model.disabled = false;
  model.innerHTML = '<option value="">Select Model</option>';

  const models = [
    ...new Set(
      carData
        .filter((car) => car.year == selectedYear && car.make == selectedMake)
        .map((car) => car.model)
    ),
  ];
  models.forEach((modelValue) => {
    const option = document.createElement("option");
    option.value = modelValue;
    option.textContent = modelValue;
    model.appendChild(option);
  });
});
model.addEventListener("change", () => {
  const selectedModel = model.value;
  const selectedMake = make.value;
  const selectedYear = year.value;

  const selectedCar = carData.find(
    (car) =>
      car.year == selectedYear &&
      car.make == selectedMake &&
      car.model == selectedModel
  );
  console.log("Selected Car:", selectedCar);
});
