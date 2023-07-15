document.getElementById("edistance-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";
  const word1 = document.getElementById("word1").value;
  const word2 = document.getElementById("word2").value;
  document.getElementById("word1").value = "";
  document.getElementById("word2").value = "";
  const { distance, operations } = editDistance(word1, word2);

  resultElement.innerHTML = `
  <table class="table table-bordered">
              <thead>
                <tr>
                  <th>First Word</th>
                  <th>Second Word</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-success text-center h5">
                  <td>${word1}</td>
                  <td>${word2}</td>
                </tr>
                <tr>
                  <td colspan="2">Total Operation : ${distance}</td>
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
