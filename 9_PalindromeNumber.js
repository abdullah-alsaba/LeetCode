// Given an integer x, return true if x is a palindrome, and false otherwise.

var isPalindrome = function(x) {
    let reversedNum = Number(String(x).split("").reverse().join(""))
    if (x===reversedNum) {
        return true
    } else {
        return false
    }
};