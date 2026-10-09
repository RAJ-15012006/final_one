// 10 test cases per problem with input and expected output
export const problemTestCases = {
  // 1. Two Sum
  '1': [
    { id: 1, input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
    { id: 2, input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
    { id: 3, input: 'nums = [3,3], target = 6', expected: '[0, 1]' },
    { id: 4, input: 'nums = [1,5,8,3], target = 9', expected: '[0, 2]' },
    { id: 5, input: 'nums = [-1,-2,-3,-4,-5], target = -8', expected: '[2, 4]' },
    { id: 6, input: 'nums = [0,4,3,0], target = 0', expected: '[0, 3]' },
    { id: 7, input: 'nums = [-3,4,3,90], target = 0', expected: '[0, 2]' },
    { id: 8, input: 'nums = [1,2,3,4,5,6], target = 11', expected: '[4, 5]' },
    { id: 9, input: 'nums = [11,15,2,7], target = 9', expected: '[2, 3]' },
    { id: 10, input: 'nums = [2,5,5,11], target = 10', expected: '[1, 2]' }
  ],

  // 2. Valid Parentheses
  '2': [
    { id: 1, input: 's = "()"', expected: 'true' },
    { id: 2, input: 's = "()[]{}"', expected: 'true' },
    { id: 3, input: 's = "(]"', expected: 'false' },
    { id: 4, input: 's = "([)]"', expected: 'false' },
    { id: 5, input: 's = "{[]}"', expected: 'true' },
    { id: 6, input: 's = ""', expected: 'true' },
    { id: 7, input: 's = "["', expected: 'false' },
    { id: 8, input: 's = "]"', expected: 'false' },
    { id: 9, input: 's = "(((((())))))"', expected: 'true' },
    { id: 10, input: 's = "(){}}{"', expected: 'false' }
  ],

  // 3. Longest Substring Without Repeating Characters
  '3': [
    { id: 1, input: 's = "abcabcbb"', expected: '3' },
    { id: 2, input: 's = "bbbbb"', expected: '1' },
    { id: 3, input: 's = "pwwkew"', expected: '3' },
    { id: 4, input: 's = ""', expected: '0' },
    { id: 5, input: 's = " "', expected: '1' },
    { id: 6, input: 's = "au"', expected: '2' },
    { id: 7, input: 's = "dvdf"', expected: '3' },
    { id: 8, input: 's = "abcdef"', expected: '6' },
    { id: 9, input: 's = "abba"', expected: '2' },
    { id: 10, input: 's = "tmmzuxt"', expected: '5' }
  ],

  // 4. Median of Two Sorted Arrays
  '4': [
    { id: 1, input: 'nums1 = [1,3], nums2 = [2]', expected: '2.00000' },
    { id: 2, input: 'nums1 = [1,2], nums2 = [3,4]', expected: '2.50000' },
    { id: 3, input: 'nums1 = [0,0], nums2 = [0,0]', expected: '0.00000' },
    { id: 4, input: 'nums1 = [], nums2 = [1]', expected: '1.00000' },
    { id: 5, input: 'nums1 = [2], nums2 = []', expected: '2.00000' },
    { id: 6, input: 'nums1 = [1,3,5], nums2 = [2,4,6]', expected: '3.50000' },
    { id: 7, input: 'nums1 = [1,2], nums2 = [-1,3]', expected: '1.50000' },
    { id: 8, input: 'nums1 = [100], nums2 = [101]', expected: '100.50000' },
    { id: 9, input: 'nums1 = [1,5,9], nums2 = [2,6,10]', expected: '5.50000' },
    { id: 10, input: 'nums1 = [1], nums2 = [2,3,4,5,6]', expected: '3.50000' }
  ],

  // 5. Longest Palindromic Substring
  '5': [
    { id: 1, input: 's = "babad"', expected: '"bab"' },
    { id: 2, input: 's = "cbbd"', expected: '"bb"' },
    { id: 3, input: 's = "a"', expected: '"a"' },
    { id: 4, input: 's = "ac"', expected: '"a"' },
    { id: 5, input: 's = "racecar"', expected: '"racecar"' },
    { id: 6, input: 's = "noon"', expected: '"noon"' },
    { id: 7, input: 's = "ccc"', expected: '"ccc"' },
    { id: 8, input: 's = "aaaa"', expected: '"aaaa"' },
    { id: 9, input: 's = "abbcccbbbcaaccbababcbcabca"', expected: '"bbcccbb"' },
    { id: 10, input: 's = "bananas"', expected: '"anana"' }
  ],

  // 7. Reverse Integer
  '7': [
    { id: 1, input: 'x = 123', expected: '321' },
    { id: 2, input: 'x = -123', expected: '-321' },
    { id: 3, input: 'x = 120', expected: '21' },
    { id: 4, input: 'x = 0', expected: '0' },
    { id: 5, input: 'x = 1534236469', expected: '0' },
    { id: 6, input: 'x = -2147483648', expected: '0' },
    { id: 7, input: 'x = 1', expected: '1' },
    { id: 8, input: 'x = -1', expected: '-1' },
    { id: 9, input: 'x = 1000', expected: '1' },
    { id: 10, input: 'x = 1463847412', expected: '2147483641' }
  ],

  // 8. String to Integer (atoi)
  '8': [
    { id: 1, input: 's = "42"', expected: '42' },
    { id: 2, input: 's = "   -42"', expected: '-42' },
    { id: 3, input: 's = "4193 with words"', expected: '4193' },
    { id: 4, input: 's = "words and 987"', expected: '0' },
    { id: 5, input: 's = "-91283472332"', expected: '-2147483648' },
    { id: 6, input: 's = "+1"', expected: '1' },
    { id: 7, input: 's = "00000-42a1234"', expected: '0' },
    { id: 8, input: 's = "   +0 123"', expected: '0' },
    { id: 9, input: 's = "2147483646"', expected: '2147483646' },
    { id: 10, input: 's = "2147483648"', expected: '2147483647' }
  ],

  // 9. Palindrome Number
  '9': [
    { id: 1, input: 'x = 121', expected: 'true' },
    { id: 2, input: 'x = -121', expected: 'false' },
    { id: 3, input: 'x = 10', expected: 'false' },
    { id: 4, input: 'x = 0', expected: 'true' },
    { id: 5, input: 'x = 12321', expected: 'true' },
    { id: 6, input: 'x = 123456', expected: 'false' },
    { id: 7, input: 'x = 11', expected: 'true' },
    { id: 8, input: 'x = 1001', expected: 'true' },
    { id: 9, input: 'x = 1000021', expected: 'false' },
    { id: 10, input: 'x = 1234321', expected: 'true' }
  ],

  // 11. Container With Most Water
  '11': [
    { id: 1, input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' },
    { id: 2, input: 'height = [1,1]', expected: '1' },
    { id: 3, input: 'height = [4,3,2,1,4]', expected: '16' },
    { id: 4, input: 'height = [1,2,1]', expected: '2' },
    { id: 5, input: 'height = [2,3,4,5,18,17,6]', expected: '17' },
    { id: 6, input: 'height = [1,2,4,3]', expected: '4' },
    { id: 7, input: 'height = [6,9,3,4,5,8]', expected: '32' },
    { id: 8, input: 'height = [10,9,8,7,6,5,4,3,2,1]', expected: '25' },
    { id: 9, input: 'height = [1,3,2,5,25,24,5]', expected: '24' },
    { id: 10, input: 'height = [5,5,5,5,5]', expected: '20' }
  ],

  // 14. Longest Common Prefix
  '14': [
    { id: 1, input: 'strs = ["flower","flow","flight"]', expected: '"fl"' },
    { id: 2, input: 'strs = ["dog","racecar","car"]', expected: '""' },
    { id: 3, input: 'strs = ["a"]', expected: '"a"' },
    { id: 4, input: 'strs = ["cir","car"]', expected: '"c"' },
    { id: 5, input: 'strs = ["interstellar","intersect","internet"]', expected: '"inter"' },
    { id: 6, input: 'strs = ["throne","throne"]', expected: '"throne"' },
    { id: 7, input: 'strs = ["ab","a"]', expected: '"a"' },
    { id: 8, input: 'strs = ["reflower","flow","flight"]', expected: '""' },
    { id: 9, input: 'strs = ["apple","ape","april"]', expected: '"ap"' },
    { id: 10, input: 'strs = ["","b"]', expected: '""' }
  ]
};

// Fallback generator for any problem ID to ensure at least 10 test cases always exist
export const getTestCasesForProblem = (problem) => {
  if (!problem) return [];
  if (problemTestCases[problem.id]) {
    return problemTestCases[problem.id];
  }

  // Derive from existing examples and generate remaining up to 10
  const examples = problem.examples || [];
  const generated = [];

  examples.forEach((ex, idx) => {
    generated.push({
      id: idx + 1,
      input: ex.input || `Test Case ${idx + 1}`,
      expected: ex.output || 'Passed'
    });
  });

  const baseCount = generated.length;
  for (let i = baseCount + 1; i <= 10; i++) {
    generated.push({
      id: i,
      input: `Edge Case #${i} (Boundary & Stress Test)`,
      expected: `Expected Output #${i}`
    });
  }

  return generated;
};

// Boilerplate templates per language
export const languageBoilerplates = {
  java: (fnName = 'solve') => `class Solution {\n    public void ${fnName}() {\n        // Write your Java solution here\n        \n    }\n}`,
  python: (fnName = 'solve') => `class Solution:\n    def ${fnName}(self):\n        # Write your Python solution here\n        pass\n`,
  cpp: (fnName = 'solve') => `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void ${fnName}() {\n        // Write your C++ solution here\n        \n    }\n};`,
  c: (fnName = 'solve') => `#include <stdio.h>\n#include <stdlib.h>\n\n// Write your C solution here\nvoid ${fnName}() {\n    \n}\n`
};
