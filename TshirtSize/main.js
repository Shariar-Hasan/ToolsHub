const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const kElement = document.getElementById("kvalue");
const algorithmElement = document.getElementById("algorithm");
const tShirtForm = document.getElementById("tshirt-form");

function euclideanDistance(dataPoint1, dataPoint2) {
  const heightDiff = dataPoint1.height - dataPoint2.height;
  const weightDiff = dataPoint1.weight - dataPoint2.weight;
  return Math.sqrt(heightDiff * heightDiff + weightDiff * weightDiff);
}
function manhattanDistance(point1, point2) {
  return (
    Math.abs(point1.height - point2.height) +
    Math.abs(point1.weight - point2.weight)
  );
}

function knnPredict(k, height, weight, algorithm) {
  console.log({ k, weight, height });
  const inputHeight = parseFloat(height);
  const inputweight = parseFloat(weight);
  let distances = [];
  for (const dataPoint of dataset) {
    let distance = null;
    if (algorithm === "0") {
      distance = euclideanDistance(dataPoint, {
        height: inputHeight,
        weight: inputweight,
      });
    } else {
      distance = manhattanDistance(dataPoint, {
        height: inputHeight,
        weight: inputweight,
      });
    }
    distances.push({ distance, size: dataPoint.size });
  }
  distances.sort((a, b) => a.distance - b.distance);
  const nearestNeighbors = distances.slice(0, k);
  let sizeCounts = {};
  nearestNeighbors.forEach((point) => {
    sizeCounts[point.size] = (sizeCounts[point.size] || 0) + 1;
  });

  // Find the size with the most occurrences
  const predictedSize = Object.keys(sizeCounts).reduce((a, b) =>
    sizeCounts[a] > sizeCounts[b] ? a : b
  );
  return predictedSize;
}

// Handle the prediction when the button is clicked
tShirtForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const height = parseFloat(heightElement.value);
  const weight = parseFloat(weightElement.value);
  const k = parseInt(kElement.value);
  const algorithm = algorithmElement.value;

  // error handling
  if (!(k && height && weight && algorithm)) {
    Swal.fire({
      icon: "error",
      title: "Empty Input",
      text: "Please Enter Input",
    });
    return;
  } else if (k < 1 || height < 1 || weight < 1) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please Enter valid Input",
    });
    return;
  } else if (k % 2 === 0) {
    Swal.fire({
      icon: "error",
      title: "Unsupported K Value",
      text: "Value of K must be a ODD number",
    });
    return;
  }

  const predictedSize = knnPredict(k, height, weight, algorithm);
  // Display the result
  document.getElementById("result").innerHTML = `
  <p class="text-primary h4">Predicted T-Shirt Size: <span class="h1">${predictedSize}</span></p>
  <img class="w-75 px-5" src="./assets/${predictedSize}.png" alt="${predictedSize} T-Shirt">
  `;
});

const defaultValueClicked = () => {
  heightElement.value = 175.26;
  weightElement.value = 74.8;
  kElement.value = 3;
  algorithmElement.value = "0";
};
const resetAll = () => {
  tShirtForm.reset();
  document.getElementById("result").innerHTML = `
  <img class="w-75 px-5" src="./assets/placeholder.gif" alt="Whats the size?"/>
  `;
};
