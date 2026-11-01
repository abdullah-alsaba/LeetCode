// Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

// In one move, you can increment n - 1 elements of the array by 1.


var minMoves = function (nums) {

    let min = Math.min(...nums)
    let diffMIn = 0 
    for (let i = 0; i < nums.length; i++) {
        let difMin = nums[i] - min 
        const total = diffMIn + difMin 

        diffMIn = total

    
        
    }
    return diffMIn

};