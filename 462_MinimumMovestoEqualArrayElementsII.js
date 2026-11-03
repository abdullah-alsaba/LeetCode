// Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

// In one move, you can increment or decrement an element of the array by 1.

// Test cases are designed so that the answer will fit in a 32-bit integer.


var minMoves2 = function (nums) {
  nums.sort((a, b) => a - b);

  const median = nums[Math.floor(nums.length / 2)];
  let totalMoves = 0;

  for (let i = 0; i < nums.length; i++) {
    let move = Math.abs(nums[i] - median);

    totalMoves += move;
  }

  return totalMoves;
};
