/** You are given an integer array nums and two integers, x and k. You can perform the following operation any number of times (including zero):

Increase or decrease any element of nums by 1.
Return the minimum number of operations needed to have at least k non-overlapping subarrays of size exactly x in nums, where all elements within each subarray are equal. */



var minOperations = function (nums, x, k) {
  const costs = [];

  
  for (let i = 0; i <= nums.length - x; i++) {
    const subArray = nums.slice(i, i + x);
    subArray.sort((a, b) => a - b);

    const median = subArray[Math.floor(subArray.length / 2)];

    let totalMoves = 0;

    for (let j = 0; j < subArray.length; j++) {
      const moves = Math.abs(subArray[j] - median);
      totalMoves += moves;
    }

    costs.push(totalMoves);
  }

  
  const dp = Array.from({ length: nums.length + 1 }, () =>
    Array(k + 1).fill(Infinity),
  );

  for (let i = 0; i <= nums.length; i++) {
    dp[i][0] = 0;
  }

  for (let i = 1; i <= nums.length; i++) {
    for (let j = 1; j <= k; j++) {
      dp[i][j] = dp[i - 1][j];

      if (i >= x && dp[i - x][j - 1] !== Infinity) {
        dp[i][j] = Math.min(dp[i][j], dp[i - x][j - 1] + costs[i - x]);
      }
    }
  }

  return dp[nums.length][k];
};


// Fast Version


var minOperations = function (nums, x, k) {
  const n = nums.length;

  // Coordinate Compression
  const values = [...new Set([...nums].sort((a, b) => a - b))];
  const m = values.length;

  const rank = new Map();
  values.forEach((v, i) => rank.set(v, i + 1));

  // Fenwick Trees
  const countTree = new Float64Array(m + 1);
  const sumTree = new Float64Array(m + 1);

  function update(tree, i, delta) {
    while (i <= m) {
      tree[i] += delta;
      i += i & -i;
    }
  }

  function query(tree, i) {
    let sum = 0;

    while (i > 0) {
      sum += tree[i];
      i -= i & -i;
    }

    return sum;
  }

  // Find kth smallest element
  function findKth(kth) {
    let index = 0;
    let bit = 1;

    while (bit * 2 <= m) {
      bit *= 2;
    }

    for (; bit > 0; bit >>= 1) {
      const next = index + bit;

      if (next <= m && countTree[next] < kth) {
        index = next;
        kth -= countTree[next];
      }
    }

    return index + 1;
  }

  // Calculate current window cost
  function getCost(totalSum) {
    const medianIndex = findKth(Math.ceil(x / 2));
    const median = values[medianIndex - 1];

    const leftCount = query(countTree, medianIndex);
    const leftSum = query(sumTree, medianIndex);

    const rightCount = x - leftCount;
    const rightSum = totalSum - leftSum;

    return median * leftCount - leftSum + rightSum - median * rightCount;
  }

  // Calculate all sliding window costs
  const costs = new Float64Array(n - x + 1);

  let totalSum = 0;

  for (let i = 0; i < x; i++) {
    const v = nums[i];
    const r = rank.get(v);

    update(countTree, r, 1);
    update(sumTree, r, v);

    totalSum += v;
  }

  costs[0] = getCost(totalSum);

  for (let i = 1; i <= n - x; i++) {
    const remove = nums[i - 1];
    const add = nums[i + x - 1];

    update(countTree, rank.get(remove), -1);
    update(sumTree, rank.get(remove), -remove);

    update(countTree, rank.get(add), 1);
    update(sumTree, rank.get(add), add);

    totalSum += add - remove;

    costs[i] = getCost(totalSum);
  }

  // Dynamic Programming
  let prev = new Float64Array(n + 1);

  for (let j = 1; j <= k; j++) {
    const curr = new Float64Array(n + 1);
    curr.fill(Infinity);

    for (let i = 1; i <= n; i++) {
      // Skip current element
      curr[i] = curr[i - 1];

      // Select a window of size x
      if (i >= x && prev[i - x] !== Infinity) {
        curr[i] = Math.min(curr[i], prev[i - x] + costs[i - x]);
      }
    }

    prev = curr;
  }

  return prev[n];
};
