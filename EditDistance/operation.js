function editDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  let maxLen = Math.max(m, n);

  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  // Backtrack to find the operations
  const operations = [];
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (word1[i - 1] === word2[j - 1]) {
      i--;
      j--;
    } else {
      if (dp[i][j] === 1 + dp[i - 1][j - 1]) {
        operations.push(`Exchange '${word1[i - 1]}' with '${word2[j - 1]}'`);
        i--;
        j--;
      } else if (dp[i][j] === 1 + dp[i][j - 1]) {
        operations.push(`Insert '${word2[j - 1]}'`);
        j--;
      } else if (dp[i][j] === 1 + dp[i - 1][j]) {
        operations.push(`Delete '${word1[i - 1]}'`);
        i--;
      }
    }
  }
  while (i > 0) {
    operations.push(`Delete '${word1[i - 1]}'`);
    i--;
  }
  while (j > 0) {
    operations.push(`Insert '${word2[j - 1]}'`);
    j--;
  }

  return {
    distance: dp[m][n],
    operations: operations.reverse(),
    similerity: (((maxLen - dp[m][n]) / maxLen) * 100).toFixed(2),
  };
}
