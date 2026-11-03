/** You are given an integer array nums.

In one move, you may increase the value of any single element nums[i] by 1.

Return the minimum total number of moves required so that all elements in nums become equal. */


var minMoves = function (nums) {
    const max = Math.max(...nums)
    let totalMoves = 0 
    
    for (let i = 0; i < nums.length; i++) {
        let moves = max - nums[i]
        
        totalMoves += moves
        
    }

    return totalMoves
};