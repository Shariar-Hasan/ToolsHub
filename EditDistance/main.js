const resultElement = document.getElementById("result");
const word1Element = document.getElementById("word1");
const word2Element = document.getElementById("word2");

function defaultSet() {
  word1Element.value = "computer";
  word2Element.value = "computing";
}
document.getElementById("edistance-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const word1 = word1Element.value;
  const word2 = word2Element.value;
  const { distance, operations, similerity } = editDistance(word1, word2);

  resultElement.innerHTML = `
  <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Source Word</th>
                  <th>Target Word</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-success text-center h5">
                  <td>"${word1}"</td>
                  <td>"${word2}"</td>
                </tr>
                <tr>
                  <td colspan="2">Total Operation : <span class="h5">${distance}</span></td>
                </tr>
                <tr>
                  <td colspan="2">Similerity : <span class="h5">${similerity} %</span></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <h5 class="h6">Operations:</h5>
                    <ol>
                      ${operations
                        .map(
                          (op) => `
                      <li><h6>${op}</h6></li>
                      `
                        )
                        .join("")}
                    </ol>
                  </td>
                </tr>
              </tbody>
            </table>`;
});
