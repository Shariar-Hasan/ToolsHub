
// *****************all variable********************
const calculationBtn = document.getElementById("calculationBtn");
const addDataBtn = document.getElementById("addDataBtn");
const resetAllBtn = document.getElementById("resetAllBtn");
const clusteredDataElement = document.getElementById("clusteredData");
const itemTable = document.getElementById("item-table");
const classStatusTbody = document.getElementById("class-status-tbody");
const classNameInput = document.getElementById("className");
const valueInput = document.getElementById("value");
const isCenterInput = document.getElementById("isCenter");

// ***************all funstions*********************
const addData = () => {
  const className = classNameInput.value;
  const value = parseFloat(valueInput.value);
  const isCenter = isCenterInput.checked;
  console.log(isCenter);
  if (!(className && value)) {
    Swal.fire({
      icon: "error",
      title: "Empty Input",
      text: "Classname or Value is empty",
    });
    return;
  }
  data.push({ className, value, isCenter });
  if (isCenter) centers.push({ className, value });
  classNameInput.value = "";
  valueInput.value = "";
  isCenterInput.checked = false;
  updateClassStatusTable();
};
const calculate = () => {
  if (data.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Empty data",
      text: "No Data avaiable",
    });
    return;
  }
  if (centers.length < 2) {
    Swal.fire({
      icon: "error",
      title: "Input needed",
      text: "Minimum 2 centers should be selected",
    });
    return;
  }
  clusterTable.style.display = "block";
  itemTable.style.display = "none";
  updateClusteredData();
};
const resetAll = () => {
  clusterTable.style.display = "none";
  itemTable.style.display = "block";
  data = [];
  centers = [];
  updateClassStatusTable();
};

const updateClassStatusTable = () => {
  console.log(data);
  let result = "";
  data.forEach((item) => {
    result += `<tr>
        <td scope="row" data-row-count="${data.length - 1}">${
      item.className
    }</td>
        <td>${item.value}</td>
        <td class="text-center">${item.isCenter ? "Centroid" : "X"}</td>
        </tr>`;
  });
  classStatusTbody.innerHTML = result;
};

// ************************************
// event listeners
resetAll();
calculationBtn.addEventListener("click", calculate);
addDataBtn.addEventListener("click", addData);
resetAllBtn.addEventListener("click", resetAll);
