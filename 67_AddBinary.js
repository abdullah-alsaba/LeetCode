/**
 * Question--
 * 
 * Given two binary strings a and b, return their sum as a binary string.

 

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"

 */

let addBinary = function (a, b) {
  let i = a.length - 1; // pointer for string a
  let j = b.length - 1; // pointer for string b
  let carry = 0; // carry for addition
  let result = ""; // final binary string

  // Loop until both strings are done and no carry left
  while (i >= 0 || j >= 0 || carry > 0) {
    let sum = carry; // start with the carry

    if (i >= 0) {
      sum += a[i] === "1" ? 1 : 0; // add bit from a
      i--;
    }

    if (j >= 0) {
      sum += b[j] === "1" ? 1 : 0; // add bit from b
      j--;
    }

    result = (sum % 2) + result; // current bit
    carry = Math.floor(sum / 2); // update carry
  }

  return result;
};