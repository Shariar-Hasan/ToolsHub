const data = [];
const centers = [];
// *****************all variable********************
const calculationBtn = document.getElementById("calculationBtn");
const addDataBtn = document.getElementById("addDataBtn");
const resetAllBtn = document.getElementById("resetAllBtn");
const clusteredDataElement = document.getElementById("clusteredData");
const itemTable = document.getElementById("item-table");
const classNameInput = document.getElementById("className");
const valueInput = document.getElementById("value");
const isCenterInput = document.getElementById("isCenter");

// ***************all funstions*********************
const addData = () => {
  const className = classNameInput.value;
  const value = parseFloat(valueInput.value);
  const isCenter = isCenterInput.checked;
  if (!(className && value)) {
    Swal.fire({
      icon: "error",
      title: "Empty Input",
      text: "Classname or Value is empty",
    });
    return;
  }
  data.push({ className, value });
  if (isCenter) centers.push({ className,  value });
  classNameInput.value = "";
  valueInput.value = "";
  isCenterInput.checked = false;
  updateClassStatusTable();
  console.log({ data, centers });
};
const calculate = () => {
  console.log("calculation");
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
};

const updateClassStatusTable = () => {
  data.reduce((item, result) => {
    result += `<tr>
        <td scope="row" data-row-count="${data.length - 1}">${
      item.className
    }</td>
        <td>${item.value}</td>
        <td class="text-center"><input type="checkbox" /></td>
        </tr>`;
  }, "");
  itemTable.innerHTML = result;
};

// ************************************
// event listeners
resetAll();
calculationBtn.addEventListener("click", calculate);
addDataBtn.addEventListener("click", addData);
resetAllBtn.addEventListener("click", resetAll);
