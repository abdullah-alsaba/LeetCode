// You are given two integers num1 and num2 representing an inclusive range [num1, num2].

// The waviness of a number is defined as the total count of its peaks and valleys:

// A digit is a peak if it is strictly greater than both of its immediate neighbors.
// A digit is a valley if it is strictly less than both of its immediate neighbors.
// The first and last digits of a number cannot be peaks or valleys.
// Any number with fewer than 3 digits has a waviness of 0.
// Return the total sum of waviness for all numbers in the range [num1, num2].

var totalWaviness = function (num1, num2) {
  let total = 0;
  for (let num = num1; num <= num2; num++) {
    let str = String(num);

    if (str.length < 3) {
      continue;
    } else {
      let peak = 0;
      let valley = 0;
      for (let i = 1; i < str.length - 1; i++) {
        if (
          Number(str[i]) > Number(str[i - 1]) &&
          Number(str[i]) > Number(str[i + 1])
        ) {
          peak++;
        }
         if (
           Number(str[i]) < Number(str[i - 1]) &&
           Number(str[i]) < Number(str[i + 1])
         ) {
           valley++;
         }
      }
      const totalWave = peak + valley;
      total += totalWave;
    }
  }
  return total;
};


// Fast One:


var totalWaviness = function (num1, num2) {
  function calc(x) {
    if (x < 0) return 0;

    const digits = String(x);
    const memo = new Map();

    function dp(pos, prev2, prev1, started, tight) {
     
      if (pos === digits.length) {
        return [1, 0];
      }

      const key = `${pos}-${prev2}-${prev1}-${started}-${tight}`;

      if (memo.has(key)) {
        return memo.get(key);
      }

      const limit = tight ? Number(digits[pos]) : 9;

      let count = 0;
      let waviness = 0;

      for (let d = 0; d <= limit; d++) {
        let nextPrev2 = prev2;
        let nextPrev1 = prev1;
        let nextStarted = started;
        let add = 0;

        if (!started && d === 0) {
         
        } else if (!started) {
          
          nextStarted = true;
          nextPrev1 = d;
        } else {
         
          if (
            prev2 !== 10 &&
            ((prev1 > prev2 && prev1 > d) || (prev1 < prev2 && prev1 < d))
          ) {
            add = 1;
          }

          nextPrev2 = prev1;
          nextPrev1 = d;
        }

        const nextTight = tight && d === limit;

        const [nextCount, nextWaviness] = dp(
          pos + 1,
          nextPrev2,
          nextPrev1,
          nextStarted,
          nextTight,
        );

        count += nextCount;

        waviness += nextWaviness + nextCount * add;
      }

      const result = [count, waviness];

      memo.set(key, result);

      return result;
    }

    return dp(0, 10, 10, false, true)[1];
  }

  return calc(num2) - calc(num1 - 1);
};

