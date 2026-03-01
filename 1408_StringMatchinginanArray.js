/**
 * Question--
 * Given an array of string words, return all strings in words that are a substring of another word. You can return the answer in any order.

 

Example 1:

Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.

Example 2:

Input: words = ["leet code","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leet code".

Example 3:

Input: words = ["blue","green","bu"]
Output: []
Explanation: No string of words is substring of another string.
 */

let stringMatching = function (words) {
  let result = [];
  for (let word of words) {
    for (let otherWord of words) {
      if (word !== otherWord) {
        if (otherWord.includes(word)) {
          if (!result.includes(word)) {
            result.push(word);
          }
        }
      }
    }
  }
  return result;
};

const result = stringMatching(["blue", "green", "bu"]);
console.log(result);
