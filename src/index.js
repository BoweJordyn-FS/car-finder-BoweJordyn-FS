import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year");
  const makeSelect = document.getElementById("make");
  const modelSelect = document.getElementById("model");

  // Force them to start disabled
  makeSelect.disabled = true;
  modelSelect.disabled = true;

  const url =
    "https://raw.githubusercontent.com/BoweJordyn-FS/car-finder-BoweJordyn-FS/main/car-dataset.json";

  let carData = [];

  const populateYears = (data) => {
    // Normalize to trimmed strings then dedupe
    const years = Array.from(
      new Set(data.map((car) => String(car.year).trim()))
    )
      // convert to number for numeric sort, but keep as string for option value/text
      .map((y) => ({ str: y, num: Number(y) }))
      .filter((y) => !Number.isNaN(y.num))
      .sort((a, b) => b.num - a.num);

    years.forEach((y) => {
      const option = document.createElement("option");
      option.value = y.str;
      option.textContent = y.str;
      yearSelect.appendChild(option);
    });
  };

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      carData = data;
      populateYears(carData);
    })
    .catch((err) => console.error("Failed to load car dataset:", err));

  yearSelect.addEventListener("change", () => {
    const selectedYear = yearSelect.value;

    // Reset and disable next selects
    makeSelect.disabled = true;
    modelSelect.disabled = true;

    // Build make list
    const makes = [
      ...new Set(
        carData
          .filter(
            (car) => String(car.year).trim() === String(selectedYear).trim()
          )
          .map((car) => car.Manufacturer)
      ),
    ];

    makes.forEach((makeValue) => {
      const option = document.createElement("option");
      option.value = makeValue;
      option.textContent = makeValue;
      makeSelect.appendChild(option);
    });

    // Enable make dropdown
    makeSelect.disabled = false;
  });

  makeSelect.addEventListener("change", () => {
    const selectedYear = yearSelect.value;
    const selectedMake = makeSelect.value;

    modelSelect.disabled = true;
    const models = [
      ...new Set(
        carData
          .filter(
            (car) =>
              String(car.year).trim() === String(selectedYear).trim() &&
              car.Manufacturer === selectedMake
          )
          .map((car) => car.model)
      ),
    ];

    models.forEach((modelValue) => {
      const option = document.createElement("option");
      option.value = modelValue;
      option.textContent = modelValue;
      modelSelect.appendChild(option);
    });

    modelSelect.disabled = false;
  });

  modelSelect.addEventListener("change", () => {
    const selectedCar = carData.find(
      (car) =>
        String(car.year).trim() === String(yearSelect.value).trim() &&
        car.Manufacturer === makeSelect.value &&
        car.model === modelSelect.value
    );

    console.log("Selected Car:", selectedCar);
  });
});
