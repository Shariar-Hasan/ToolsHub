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
  console.log(nearestNeighbors);
  const predictedSize = nearestNeighbors[0].size;

  return predictedSize;
}

// Handle the prediction when the button is clicked
document.getElementById("tshirt-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const k = document.getElementById("kvalue").value;
  const algorithm = document.getElementById("algorithm").value;
  const predictedSize = knnPredict(k, height, weight, algorithm);

  // Display the result
  document.getElementById("result").innerHTML = `
  <p class="text-primary h4">Predicted T-Shirt Size: <span class="h1">${predictedSize}</span></p>
  <img class="w-75 px-5" src="./assets/${predictedSize}.png" alt="${predictedSize} T-Shirt">
  `;
});
