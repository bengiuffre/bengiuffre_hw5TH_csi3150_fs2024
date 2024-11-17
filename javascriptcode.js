import { usedCars } from "./usedCars.js";

// grab each of the elementIds so they can populate on the html"
const minYearInput = document.getElementById("min-year");
const maxYearInput = document.getElementById("max-year");
const makeSelect = document.getElementById("make");
const maxMileageInput = document.getElementById("max-mileage");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const colorSelect = document.getElementById("color");
const carListings = document.getElementById("car-listings");
// setting up the make and color dropdown options"
function populateDropdowns() {
  const makes = [...new Set(usedCars.map((car) => car.make))];
  const colors = [...new Set(usedCars.map((car) => car.color))];
  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorSelect.appendChild(option);
  });
}
// shows the filtered options and can clear the filters
function displayFilteredCars(cars) {
  carListings.innerHTML = ""; 

  if (cars.length === 0) {
    carListings.textContent = "No cars match the selected criteria.";
    return;
  }
  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.classList.add("car-card");
    carCard.innerHTML = `
      <h3>${car.year} ${car.make} ${car.model}</h3>
      <p><strong>Price:</strong> $${car.price}</p>
      <p><strong>Mileage:</strong> ${car.mileage} miles</p>
      <p><strong>Color:</strong> ${car.color}</p>
      <p><strong>Gas Mileage:</strong> ${car.gasMileage}</p>
    `;
    carListings.appendChild(carCard);
  });
}
// filter car options
function filterCars(event) {
  event.preventDefault();
  const minYear = parseInt(minYearInput.value) || 0;
  const maxYear = parseInt(maxYearInput.value) || Number.MAX_SAFE_INTEGER;
  const selectedMake = makeSelect.value || "";
  const maxMileage = parseInt(maxMileageInput.value) || Number.MAX_SAFE_INTEGER;
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Number.MAX_SAFE_INTEGER;
  const selectedColor = colorSelect.value || "";
  const filteredCars = usedCars.filter((car) => {
    return (
      car.year >= minYear &&
      car.year <= maxYear &&
      (selectedMake === "" || car.make === selectedMake) &&
      car.mileage <= maxMileage &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (selectedColor === "" || car.color === selectedColor)
    );
  });
  displayFilteredCars(filteredCars);
}
// page setup and intilialize
function initialize() {
  populateDropdowns();
  document.getElementById("applyFilters").addEventListener("click", filterCars);
}
initialize();
