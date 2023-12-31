function updateClusteredData() {
  clusteredDataElement.innerHTML = "";

  let row = "";
  data.forEach((item) => {
    const center = findClosestCenter(item.value);
    row += `<tr><td>${item.className}</td><td>${item.value} <b>(Class: ${center.className})</b></td></tr>`;
  });
  clusteredDataElement.innerHTML = row;
}

function findClosestCenter(value) {
  let minDistance = Infinity;
  let closestCenter = null;

  for (const center of centers) {
    const distance = Math.abs(center.value - value);
    if (distance < minDistance) {
      minDistance = distance;
      closestCenter = center;
    }
  }

  return closestCenter;
}
