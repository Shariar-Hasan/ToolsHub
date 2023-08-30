const resultElement = document.getElementById("result");
const word1Element = document.getElementById("word1");
const word2Element = document.getElementById("word2");
const edistanceForm = document.getElementById("edistance-form");

function resetAll() {
  edistanceForm.reset();
  resultElement.innerHTML = `
  <h4 class="text-center text-danger text-3xl p-4">
    Fill up the source and target words and hit the calculate button
  </h4>`;
}
function defaultSet() {
  word1Element.value = "computer";
  word2Element.value = "computing";
}
edistanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const word1 = word1Element.value;
  const word2 = word2Element.value;
  console.log("first");
  if (!(word1 && word2)) {
    Swal.fire({
      icon: "error",
      title: "Empty Input",
      text: "Soure word or Target word is empty",
    });
    return;
  }

  const { distance, operations, similarity } = editDistance(word1, word2);

  resultElement.innerHTML = `
  <table class="table text-white overflow-hidden">
              <thead>
                <tr class="text-center bg-gray-800 text-3xl">
                  <th>Source Word</th>
                  <th>Target Word</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-success text-center h5">
                  <td><h3 class="text-2xl">"${word1}"</h3></td>
                  <td><h3 class="text-2xl">"${word2}"</h3></td>
                </tr>
                <tr>
                  <td colspan="2">
                    Total Operation : <span  class="text-xl">${distance}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    Similerity : <span class="text-xl">${similarity} %</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5  class="text-xl">Operations:</h5>
                    <ol class="list-disc pl-4">
                      ${operations
                        .map(
                          (op) => `
                      <li><h6  class="text-lg">${op}</h6></li>
                      `
                        )
                        .join("")}
                    </ol>
                  </td>
                </tr>
              </tbody>
            </table>`;
});
