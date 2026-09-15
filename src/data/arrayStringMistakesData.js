export const arrayStringMistakesMarkdown = `
# Array \u0026 String Manipulation Errors — Detailed Notes

Array and string questions look easy, but they are one of the biggest sources of bugs in coding interviews and competitive programming.

The problem is usually **not the algorithm**. It is small mistakes like:

- wrong index
- wrong loop boundary
- modifying the array while traversing it
- confusing \`length\` with the last index
- forgetting that strings are immutable in many languages
- incorrect slicing
- ignoring spaces/case
- losing characters while building a result
- using the wrong search condition
- accidentally creating a reference instead of a copy

These mistakes are especially common in beginner/interview problems.

---

# 1. First Understand: Array vs String

## Array

An array stores multiple values in an ordered sequence.

Example:

\`\`\`text
arr = [10, 20, 30, 40, 50]
\`\`\`

Indexes:

\`\`\`text
Value:    10   20   30   40   50
Index:     0    1    2    3    4
\`\`\`

The important rule:

> **The first index is usually 0, not 1.**

For an array of length \`n\`:

\`\`\`text
First index = 0
Last index  = n - 1
\`\`\`

JavaScript arrays are zero-indexed, and the last element is at \`length - 1\`. 

---

# 2. Error #1 — Off-by-One Error

This is probably the **#1 beginner mistake**.

Suppose:

\`\`\`text
arr = [10, 20, 30, 40, 50]
\`\`\`

Length:

\`\`\`text
5
\`\`\`

Valid indexes:

\`\`\`text
0, 1, 2, 3, 4
\`\`\`

There is **no index 5**.

### Wrong

\`\`\`python
for i in range(0, len(arr) + 1):
    print(arr[i])
\`\`\`

The loop eventually tries:

\`\`\`text
arr[5]
\`\`\`

which is invalid.

### Correct

\`\`\`python
for i in range(len(arr)):
    print(arr[i])
\`\`\`

### Easy rule

Remember:

\`\`\`text
Length = number of elements
Last index = length - 1
\`\`\`

### Example

\`\`\`text
Length = 7
Last index = 6
\`\`\`

Not 7.

---

# 3. Error #2 — Confusing Index With Value

Consider:

\`\`\`python
arr = [10, 20, 30, 40]
\`\`\`

Here:

\`\`\`text
arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
\`\`\`

\`0\`, \`1\`, \`2\`, \`3\` are **indexes**.

\`10\`, \`20\`, \`30\`, \`40\` are **values**.

A common mistake is thinking:

\`\`\`python
arr[i] == i
\`\`\`

They are completely different things.

### Remember

\`\`\`text
index → position
value → data stored at that position
\`\`\`

---

# 4. Error #3 — Using the Wrong Loop Boundary

Suppose you want to compare an element with the next element:

\`\`\`python
arr[i] and arr[i + 1]
\`\`\`

You cannot allow \`i\` to reach the final index.

For:

\`\`\`text
[10, 20, 30, 40]
\`\`\`

When:

\`\`\`text
i = 3
\`\`\`

then:

\`\`\`text
i + 1 = 4
\`\`\`

But index \`4\` does not exist.

### Wrong

\`\`\`python
for i in range(len(arr)):
    if arr[i] < arr[i + 1]:
        ...
\`\`\`

### Correct

\`\`\`python
for i in range(len(arr) - 1):
    if arr[i] < arr[i + 1]:
        ...
\`\`\`

### General rule

If your code uses:

\`\`\`text
arr[i + 1]
\`\`\`

stop before the last element.

If your code uses:

\`\`\`text
arr[i - 1]
\`\`\`

be careful with the first element.

---

# 5. Error #4 — Accessing an Empty Array/String

Always think about:

\`\`\`text
[]
\`\`\`

or:

\`\`\`text
\\"\\"
\`\`\`

before writing your algorithm.

Example:

\`\`\`python
arr = []

print(arr[0])
\`\`\`

This causes an error.

Similarly:

\`\`\`python
s = \\"\\"
print(s[0])
\`\`\`

is invalid.

### Better approach

Check first:

\`\`\`python
if len(arr) == 0:
    return
\`\`\`

or:

\`\`\`python
if not arr:
    return
\`\`\`

### Interview habit

Before coding, ask:

1. What if input is empty?
2. What if there is only one element?
3. What if all elements are equal?
4. What if the answer doesn't exist?

---

# 6. Error #5 — Modifying an Array While Iterating

This is a very common and dangerous logical mistake.

Suppose:

\`\`\`python
arr = [2, 4, 6, 8]
\`\`\`

You remove elements while moving forward through the array.

The indexes shift after deletion.

Example:

\`\`\`text
Before:
[2, 4, 6, 8]

Remove 4:

[2, 6, 8]
\`\`\`

Now \`6\` moved from index \`2\` to index \`1\`.

If your loop automatically moves to index \`2\`, you may accidentally skip \`6\`.

### Bad idea

\`\`\`python
for i in range(len(arr)):
    if condition:
        arr.pop(i)
\`\`\`

This can cause:

- skipped elements
- wrong indexes
- index errors
- incorrect output

### Better approaches

Create a new array:

\`\`\`python
result = []

for x in arr:
    if condition:
        result.append(x)
\`\`\`

Or iterate backwards when appropriate.

---

# 7. Error #6 — Forgetting That Arrays Can Be Mutable

In Python, lists are mutable.

That means:

\`\`\`python
arr[0] = 100
\`\`\`

changes the list.

Example:

\`\`\`python
arr = [10, 20, 30]

arr[0] = 99

print(arr)
\`\`\`

Output:

\`\`\`text
[99, 20, 30]
\`\`\`

Strings are different.

Python strings are immutable, meaning individual characters cannot be directly changed. 

---

# 8. Error #7 — Trying to Modify a String Directly

### Wrong

\`\`\`python
s = \\"hello\\"
s[0] = \\"H\\"
\`\`\`

This doesn't work in Python because strings are immutable. 

### Correct

Create a new string:

\`\`\`python
s = \\"hello\\"
s = \\"H\\" + s[1:]
\`\`\`

Result:

\`\`\`text
Hello
\`\`\`

Another approach:

\`\`\`python
chars = list(s)
chars[0] = \\"H\\"
s = \\"\\".join(chars)
\`\`\`

---

# 9. Error #8 — Forgetting That Strings Are Case-Sensitive

Consider:

\`\`\`text
\\"Apple\\"
\`\`\`

and:

\`\`\`text
\\"apple\\"
\`\`\`

They are different strings.

For example:

\`\`\`python
\\"Apple\\" == \\"apple\\"
\`\`\`

returns:

\`\`\`text
False
\`\`\`

### Common problem

You are checking whether a word exists:

\`\`\`python
if \\"apple\\" in text:
\`\`\`

but the actual text contains:

\`\`\`text
Apple
\`\`\`

The check may fail.

### Solution

Normalize case when the problem requires case-insensitive comparison:

\`\`\`python
text.lower()
\`\`\`

Example:

\`\`\`python
text = text.lower()
\`\`\`

Now:

\`\`\`text
\\"Apple\\" → \\"apple\\"
\`\`\`

### But be careful

Don't automatically convert everything to lowercase.

If the problem says case matters, changing case changes the meaning.

---

# 10. Error #9 — Ignoring Spaces

Consider:

\`\`\`text
\\"hello world\\"
\`\`\`

There is a space between the words.

If you are reversing characters:

\`\`\`text
hello world
\`\`\`

the space is also a character.

So you must understand what the question actually asks:

### Reverse characters

\`\`\`text
\\"hello world\\"
→
\\"dlrow olleh\\"
\`\`\`

### Reverse words

\`\`\`text
\\"hello world\\"
→
\\"world hello\\"
\`\`\`

These are **different problems**.

Don't start coding until you know which one is required.

---

# 11. Error #10 — Confusing \`split()\` and \`join()\`

This is extremely important in string manipulation.

## \`split()\`

Converts a string into an array/list.

Example:

\`\`\`python
s = \\"I love coding\\"

words = s.split()
\`\`\`

Result:

\`\`\`text
[\\"I\\", \\"love\\", \\"coding\\"]
\`\`\`

Conceptually:

\`\`\`text
String
   ↓
split()
   ↓
Array/List
\`\`\`

JavaScript's \`split()\` similarly divides a string into substrings and returns an array. 

---

## \`join()\`

Does the opposite.

\`\`\`python
words = [\\"I\\", \\"love\\", \\"coding\\"]

s = \\" \\".join(words)
\`\`\`

Result:

\`\`\`text
\\"I love coding\\"
\`\`\`

Conceptually:

\`\`\`text
Array/List
      ↓
    join()
      ↓
   String
\`\`\`

---

# 12. Error #11 — Wrong Separator in \`split()\`

Suppose:

\`\`\`python
s = \\"apple,banana,mango\\"
\`\`\`

If you do:

\`\`\`python
s.split(\\" \\")
\`\`\`

you won't get the desired result because the separator is comma, not space.

Correct:

\`\`\`python
s.split(\\",\\")
\`\`\`

Result:

\`\`\`text
[\\"apple\\", \\"banana\\", \\"mango\\"]
\`\`\`

### Always inspect the input

Look carefully at:

\`\`\`text
space
comma
semicolon
hyphen
newline
\`\`\`

The delimiter matters.

---

# 13. Error #12 — Wrong \`join()\` Separator

Suppose:

\`\`\`python
words = [\\"I\\", \\"love\\", \\"Python\\"]
\`\`\`

This:

\`\`\`python
\\"\\".join(words)
\`\`\`

produces:

\`\`\`text
\\"IlovePython\\"
\`\`\`

But:

\`\`\`python
\\" \\".join(words)
\`\`\`

produces:

\`\`\`text
\\"I love Python\\"
\`\`\`

The separator is part of your answer.

---

# 14. Error #13 — Incorrect Slicing

Slicing is another major source of mistakes.

Python:

\`\`\`python
arr[start:end]
\`\`\`

means:

\`\`\`text
start included
end excluded
\`\`\`

Example:

\`\`\`python
arr = [10, 20, 30, 40, 50]

print(arr[1:4])
\`\`\`

Output:

\`\`\`text
[20, 30, 40]
\`\`\`

Not:

\`\`\`text
[20, 30, 40, 50]
\`\`\`

### Memory trick

Think:

\`\`\`text
[start, end)
\`\`\`

Meaning:

\`\`\`text
include start
exclude end
\`\`\`

Python documentation confirms this slicing behavior for sequences. 

---

# 15. Error #14 — Confusing \`slice()\` With \`substring()\`

In JavaScript, these methods have differences.

For example:

\`\`\`javascript
let s = \\"Mozilla\\";

s.slice(2, 5);
\`\`\`

returns:

\`\`\`text
\\"zil\\"
\`\`\`

The ending index is excluded. 

\`substring()\` has different behavior for negative values and when the start index is greater than the end index. 

### Interview rule

Don't blindly switch between:

\`\`\`text
slice()
substring()
substr()
\`\`\`

Learn exactly what each one does.

Also, \`substr()\` is considered legacy in JavaScript, so prefer modern alternatives such as \`slice()\` or \`substring()\`. 

---

# 16. Error #15 — Incorrect \`indexOf()\` Check

This is a classic JavaScript mistake.

Suppose:

\`\`\`javascript
let index = str.indexOf(\\"cat\\");
\`\`\`

If \`\\"cat\\"\` doesn't exist:

\`\`\`text
index = -1
\`\`\`

MDN documents \`-1\` as the return value when the substring is not found. 

### Correct

\`\`\`javascript
if (str.indexOf(\\"cat\\") !== -1) {
    console.log(\\"Found\\");
}
\`\`\`

### Common wrong thinking

\`\`\`javascript
if (str.indexOf(\\"cat\\")) {
    ...
}
\`\`\`

Why is this bad?

Because if \`\\"cat\\"\` is at index \`0\`:

\`\`\`text
indexOf(\\"cat\\") = 0
\`\`\`

and \`0\` is falsy in JavaScript.

So your condition behaves incorrectly.

### Remember

\`\`\`text
index 0 → FOUND
index -1 → NOT FOUND
\`\`\`

---

# 17. Error #16 — Forgetting Duplicate Values

Consider:

\`\`\`text
[2, 5, 2, 7, 2]
\`\`\`

The value \`2\` appears three times.

If you use:

\`\`\`text
indexOf(2)
\`\`\`

you get only the first occurrence.

JavaScript's \`indexOf()\` returns the first matching index. 

So:

\`\`\`text
indexOf(2) → 0
\`\`\`

It does not tell you automatically about the other \`2\`s.

### If the problem asks:

> \\"Find all occurrences\\"

you need to continue searching or use another approach.

---

# 18. Error #17 — Assuming \`indexOf()\` Finds Everything

Example:

\`\`\`text
arr = [10, 20, 10, 30, 10]
\`\`\`

Calling:

\`\`\`text
indexOf(10)
\`\`\`

gives:

\`\`\`text
0
\`\`\`

But the value also occurs at:

\`\`\`text
2
4
\`\`\`

Therefore distinguish between:

\`\`\`text
find first occurrence
\`\`\`

and:

\`\`\`text
find all occurrences
\`\`\`

---

# 19. Error #18 — Accidentally Creating a Reference Instead of a Copy

This is particularly important in Python.

### Example

\`\`\`python
a = [1, 2, 3]
b = a
\`\`\`

Many beginners think:

\`\`\`text
a → [1,2,3]
b → another [1,2,3]
\`\`\`

But both variables refer to the same list.

So:

\`\`\`python
b[0] = 100
\`\`\`

can make:

\`\`\`text
a = [100, 2, 3]
b = [100, 2, 3]
\`\`\`

This behavior is a common Python gotcha with mutable objects. 

### Create a shallow copy

\`\`\`python
b = a.copy()
\`\`\`

or:

\`\`\`python
b = a[:]
\`\`\`

Now changing \`b\` doesn't directly modify \`a\`.

---

# 20. Error #19 — Shallow Copy vs Deep Copy

This becomes important when arrays contain other arrays/objects.

Example:

\`\`\`python
a = [[1, 2], [3, 4]]
b = a.copy()
\`\`\`

The outer list is copied, but the nested lists are still shared.

So:

\`\`\`python
b[0][0] = 99
\`\`\`

can also affect:

\`\`\`python
a
\`\`\`

### Key idea

\`\`\`text
Shallow copy
    ↓
copies outer container
    ↓
nested objects may still be shared
\`\`\`

Don't assume \`.copy()\` automatically creates a completely independent structure.

---

# 21. Error #20 — Forgetting Empty Strings During Splitting

Consider:

\`\`\`text
\\"apple,,banana\\"
\`\`\`

There are two commas together.

Depending on the language and method, you may get an empty element between them.

For example conceptually:

\`\`\`text
apple
\\"\\"
banana
\`\`\`

This matters in:

- CSV-like data
- user input
- parsing
- delimiters
- competitive programming

Never assume input is \\"clean\\" unless the problem guarantees it.

---

# 22. Error #21 — Losing Characters While Building a String

Suppose you want to reverse a string.

A common logical mistake is accidentally skipping the first or last character.

For:

\`\`\`text
\\"HELLO\\"
\`\`\`

indexes are:

\`\`\`text
H E L L O
0 1 2 3 4
\`\`\`

Reverse order:

\`\`\`text
4 → 3 → 2 → 1 → 0
\`\`\`

Result:

\`\`\`text
OLLEH
\`\`\`

If your loop starts at \`len(s) - 2\`, you lose \`O\`.

If it ends at \`1\`, you lose \`H\`.

### Always write indexes on paper first.

---

# 23. Error #22 — Using the Wrong Direction

Some array problems require:

\`\`\`text
left → right
\`\`\`

Others require:

\`\`\`text
right → left
\`\`\`

For example, removing duplicates, reversing, or two-pointer problems may require careful pointer movement.

Don't randomly choose:

\`\`\`python
i += 1
\`\`\`

or:

\`\`\`python
i -= 1
\`\`\`

Ask:

> What does \`i\` represent right now?

If you can't answer that sentence, your code is probably not under control.

---

# 24. Error #23 — Incorrect Two-Pointer Movement

Two pointers are common:

\`\`\`text
left
right
\`\`\`

Example:

\`\`\`text
[1, 2, 3, 4, 5]
 ↑           ↑
left        right
\`\`\`

If checking a palindrome:

\`\`\`text
1 == 5
2 == 4
3 == 3
\`\`\`

then move:

\`\`\`text
left++
right--
\`\`\`

### Common mistakes

- moving only one pointer
- moving both pointers when you shouldn't
- crossing the pointers incorrectly
- comparing the wrong values
- forgetting the middle element

### Correct stopping idea

Often:

\`\`\`python
while left < right:
\`\`\`

rather than blindly using:

\`\`\`python
while left <= right:
\`\`\`

The correct condition depends on the problem.

---

# 25. Error #24 — Modifying the Wrong Array

Suppose:

\`\`\`python
original = [1, 2, 3, 4]
\`\`\`

and you want:

\`\`\`text
result = [2, 4]
\`\`\`

You might accidentally modify \`original\` when the problem expects it unchanged.

Before coding, determine:

\`\`\`text
Does the question want:
1. Modify original?
2. Return a new array?
3. Return only a value?
\`\`\`

This distinction matters.

---

# 26. Error #25 — Confusing \`sort()\` With Sorted Output

In many languages, sorting can modify the original array.

For example, conceptually:

\`\`\`text
original → [3,1,2]
sort → [1,2,3]
\`\`\`

If you still need the original order later, blindly sorting it can break your solution.

### Ask:

> Do I need the original array later?

If yes, make an appropriate copy first.

---

# 27. Error #26 — Assuming Sorting Solves Everything

Suppose:

\`\`\`text
[4, 1, 3, 2]
\`\`\`

You sort it:

\`\`\`text
[1, 2, 3, 4]
\`\`\`

You may make the problem easier, but you've destroyed the original ordering.

Some problems depend on:

\`\`\`text
original positions
\`\`\`

For example:

> Find two elements whose sum is X and return their original indexes.

Sorting can make finding the values easier but can make original indexes harder to track.

### Lesson

Don't use an operation just because it makes the data look easier.

Understand what information you're allowed to destroy.

---

# 28. Error #27 — Forgetting That Whitespace Is Data

These strings are different:

\`\`\`text
\\"hello\\"
\\" hello\\"
\\"hello \\"
\\"hello world\\"
\`\`\`

Spaces can cause wrong answers in:

- palindrome questions
- string comparison
- word counting
- formatting
- parsing

### Example

Question:

> Check whether the string is a palindrome ignoring spaces.

Then:

\`\`\`text
\\"nurses run\\"
\`\`\`

should be treated differently from a normal character-by-character comparison.

The requirement matters.

---

# 29. Error #28 — Not Handling Special Characters

Strings may contain:

\`\`\`text
!
@
#
$
%
.
,
?
-
_
\`\`\`

Example:

\`\`\`text
\\"hello!\\"
\`\`\`

If the question says:

> Ignore punctuation

then \`!\` must be handled appropriately.

Don't assume every character is:

\`\`\`text
A-Z
a-z
0-9
\`\`\`

unless the problem says so.

---

# 30. Error #29 — Character vs String Confusion

These look similar:

\`\`\`text
'a'
\`\`\`

and:

\`\`\`text
\\"abc\\"
\`\`\`

but one represents a single character and the other a sequence of characters.

In JavaScript:

\`\`\`javascript
'a'
\`\`\`

and:

\`\`\`javascript
\\"a\\"
\`\`\`

are both strings, but the conceptual distinction between a character and a multi-character string still matters.

In C/C++/Java, character and string types are more explicitly different.

Always understand what type your variable contains.

---

# 31. Error #30 — Forgetting \`length\` Changes After Modification

Suppose:

\`\`\`python
arr = [1, 2, 3, 4, 5]
\`\`\`

You remove elements.

The array's length changes.

If your algorithm assumes the original length throughout the process, you can get incorrect behavior.

### Important

If you modify a collection during processing, reconsider:

\`\`\`text
current length
\`\`\`

vs.

\`\`\`text
original length
\`\`\`

They may no longer be the same.

---

# 32. Error #31 — Nested Loops Creating O(n²)

Suppose:

\`\`\`python
for i in range(n):
    for j in range(n):
        ...
\`\`\`

This performs roughly:

\`\`\`text
n × n
\`\`\`

operations.

Therefore:

\`\`\`text
Time Complexity = O(n²)
\`\`\`

For:

\`\`\`text
n = 10
\`\`\`

that's manageable.

For:

\`\`\`text
n = 1,000,000
\`\`\`

it's disastrous.

### Array problems often tempt beginners into nested loops.

Before using two loops, ask:

> Can I solve this using a set, dictionary/hash map, sorting, or two pointers?

---

# 33. Error #32 — Using Extra Memory Without Thinking

Sometimes you create:

\`\`\`python
result = []
\`\`\`

when the problem specifically expects an **in-place** modification.

For example:

\`\`\`text
Input:
[1,2,3,4]

Expected:
modify the same array
\`\`\`

Creating a second array may produce the correct values but violate the problem's requirements.

Understand whether the problem requires:

\`\`\`text
O(1) extra space
\`\`\`

or allows:

\`\`\`text
O(n)
\`\`\`

---

# 34. Error #33 — Not Checking Input Constraints

Suppose a problem says:

\`\`\`text
1 ≤ n ≤ 100
\`\`\`

A simple O(n²) approach may be completely acceptable.

But if:

\`\`\`text
1 ≤ n ≤ 1,000,000
\`\`\`

O(n²) might fail.

### Before coding, look for:

\`\`\`text
n
number of strings
maximum string length
value range
number of test cases
\`\`\`

These constraints often tell you which algorithm to use.

---

# 35. Error #34 — Incorrect String Concatenation

Suppose you're building a large string repeatedly.

Conceptually:

\`\`\`python
result = \\"\\"

for char in s:
    result += char
\`\`\`

For small strings, this is fine.

For very large strings, repeated concatenation can be inefficient depending on the language/runtime.

A common Python approach is:

\`\`\`python
result = []

for char in s:
    result.append(char)

result = \\"\\".join(result)
\`\`\`

This is often cleaner for building a large result.

---

# 36. Error #35 — Not Understanding \`replace()\`

Suppose:

\`\`\`text
\\"banana\\"
\`\`\`

You replace:

\`\`\`text
\\"a\\" → \\"x\\"
\`\`\`

You don't necessarily replace only the first occurrence.

Depending on the language/method, replacement behavior can differ.

So always check:

\`\`\`text
replace one?
replace all?
regex?
case-sensitive?
\`\`\`

Don't assume.

---

# 37. Error #36 — Incorrect Palindrome Logic

A palindrome reads the same forward and backward.

Examples:

\`\`\`text
madam
racecar
level
\`\`\`

A common beginner solution:

\`\`\`python
reverse the string
compare with original
\`\`\`

This is simple and correct for many situations.

But sometimes the problem expects:

\`\`\`text
O(1) extra space
\`\`\`

Then a two-pointer approach may be better:

\`\`\`text
left → 
       ← right
\`\`\`

Compare:

\`\`\`text
s[left] == s[right]
\`\`\`

Then:

\`\`\`text
left++
right--
\`\`\`

---

# 38. Error #37 — Incorrect Anagram Logic

Two strings are anagrams if they contain the same characters with the same frequencies.

Example:

\`\`\`text
\\"listen\\"
\\"silent\\"
\`\`\`

Same letters.

A beginner may only check:

\`\`\`text
same length
\`\`\`

That's not enough.

Example:

\`\`\`text
\\"abc\\"
\\"abd\\"
\`\`\`

Same length, but not anagrams.

### Better approaches

Depending on constraints:

\`\`\`text
Sort both strings
\`\`\`

or:

\`\`\`text
Count character frequencies
\`\`\`

---

# 39. Error #38 — Forgetting Character Frequency

For:

\`\`\`text
\\"aabbc\\"
\`\`\`

frequency is:

\`\`\`text
a → 2
b → 2
c → 1
\`\`\`

If a problem asks:

> Find the first non-repeating character

you must consider frequency.

Simply checking whether a character appears somewhere else may lead to inefficient or incorrect logic.

---

# 40. Error #39 — Treating All Duplicate Problems the Same

These are different:

### Remove duplicates

\`\`\`text
[1,2,2,3]
→
[1,2,3]
\`\`\`

### Count duplicates

\`\`\`text
[1,2,2,3]
→
2 appears twice
\`\`\`

### Find duplicate

\`\`\`text
[1,2,2,3]
→
2
\`\`\`

### Find all duplicates

\`\`\`text
[1,2,2,3,3]
→
[2,3]
\`\`\`

Read the exact requirement.

---

# 41. Error #40 — Not Testing Boundary Cases

This is where many \\"working\\" solutions actually fail.

For an array problem, test:

### Case 1 — Empty

\`\`\`text
[]
\`\`\`

### Case 2 — One element

\`\`\`text
[5]
\`\`\`

### Case 3 — Two elements

\`\`\`text
[1,2]
\`\`\`

### Case 4 — All same

\`\`\`text
[5,5,5,5]
\`\`\`

### Case 5 — Already sorted

\`\`\`text
[1,2,3,4]
\`\`\`

### Case 6 — Reverse sorted

\`\`\`text
[4,3,2,1]
\`\`\`

### Case 7 — Negative values

\`\`\`text
[-5,-2,0,3]
\`\`\`

### Case 8 — Duplicates

\`\`\`text
[1,2,2,3,3]
\`\`\`

---

# 42. Important String Edge Cases

Always test:

\`\`\`text
\\"\\"
\`\`\`

\`\`\`text
\\"a\\"
\`\`\`

\`\`\`text
\\"aa\\"
\`\`\`

\`\`\`text
\\"abc\\"
\`\`\`

\`\`\`text
\\"aaa\\"
\`\`\`

\`\`\`text
\\" A \\"
\`\`\`

\`\`\`text
\\"hello world\\"
\`\`\`

\`\`\`text
\\"Hello\\"
\`\`\`

\`\`\`text
\\"hello!\\"
\`\`\`

These expose many hidden bugs.

---

# 43. Array Traversal Cheat Sheet

### Forward traversal

\`\`\`python
for i in range(len(arr)):
    print(arr[i])
\`\`\`

### Value-based traversal

\`\`\`python
for x in arr:
    print(x)
\`\`\`

### Reverse traversal

\`\`\`python
for i in range(len(arr) - 1, -1, -1):
    print(arr[i])
\`\`\`

### Adjacent elements

\`\`\`python
for i in range(len(arr) - 1):
    print(arr[i], arr[i + 1])
\`\`\`

### Two pointers

\`\`\`python
left = 0
right = len(arr) - 1

while left < right:
    ...
    left += 1
    right -= 1
\`\`\`

---

# 44. String Traversal Cheat Sheet

\`\`\`python
s = \\"hello\\"
\`\`\`

### Character traversal

\`\`\`python
for ch in s:
    print(ch)
\`\`\`

### Index traversal

\`\`\`python
for i in range(len(s)):
    print(s[i])
\`\`\`

### Reverse

\`\`\`python
s[::-1]
\`\`\`

### First character

\`\`\`python
s[0]
\`\`\`

### Last character

\`\`\`python
s[-1]
\`\`\`

### Length

\`\`\`python
len(s)
\`\`\`

---

# 45. Important Array Operations

| Operation | Typical purpose |
|---|---|
| \`arr[i]\` | Access element |
| \`arr[i] = x\` | Modify element |
| \`append()\` | Add at end |
| \`insert()\` | Add at position |
| \`pop()\` | Remove element |
| \`remove()\` | Remove by value |
| \`sort()\` | Sort |
| \`reverse()\` | Reverse |
| \`index()\` | Find first position |
| \`count()\` | Count occurrences |
| \`copy()\` | Make shallow copy |

JavaScript has analogous array operations such as \`push()\`, \`indexOf()\`, \`join()\`, \`slice()\`, etc.; importantly, methods differ in whether they mutate the original array or return a new value. 

---

# 46. Important String Operations

| Operation | Purpose |
|---|---|
| \`len()\` | Find length |
| \`lower()\` | Lowercase |
| \`upper()\` | Uppercase |
| \`strip()\` | Remove outer whitespace |
| \`split()\` | String → list |
| \`join()\` | List → string |
| \`replace()\` | Replace text |
| \`find()\` | Find position |
| \`startswith()\` | Check beginning |
| \`endswith()\` | Check ending |
| slicing | Extract part |

---

# 47. Mutation vs Non-Mutation — VERY IMPORTANT

You need to know whether an operation changes the original data.

### Example concept

\`\`\`text
Original array
     ↓
  operation
     ↓
same array changed
\`\`\`

This is **mutation**.

Other operations create a new result:

\`\`\`text
Original array
     ↓
  operation
     ↓
new array
\`\`\`

For example, JavaScript \`Array.prototype.slice()\` returns a new shallow copy and does not modify the original array. 

### Why this matters

If you accidentally mutate data, later code may use the wrong values.

---

# 48. A Simple Debugging Method

When your array/string code fails, don't randomly change lines.

Use this method.

## Step 1 — Print the input

\`\`\`python
print(arr)
\`\`\`

## Step 2 — Print the index

\`\`\`python
print(\\"i =\\", i)
\`\`\`

## Step 3 — Print the current value

\`\`\`python
print(\\"value =\\", arr[i])
\`\`\`

## Step 4 — Print important variables

\`\`\`python
print(left, right)
\`\`\`

## Step 5 — Check the boundary

Ask:

\`\`\`text
Can i become len(arr)?
Can i become -1?
Can i + 1 become invalid?
\`\`\`

## Step 6 — Test a tiny input

Instead of:

\`\`\`text
[10,20,30,40,50,60,70]
\`\`\`

try:

\`\`\`text
[1,2]
\`\`\`

Small inputs expose logic much faster.

---

# 49. The Most Important Questions to Ask Before Coding

Before solving an array/string problem, answer these:

### 1. What is the input?

\`\`\`text
Array?
String?
Multiple arrays?
\`\`\`

### 2. What exactly is the output?

\`\`\`text
Number?
Boolean?
String?
Array?
Index?
\`\`\`

### 3. Can the input be empty?

\`\`\`text
Yes / No
\`\`\`

### 4. Are duplicates allowed?

\`\`\`text
Yes / No
\`\`\`

### 5. Does case matter?

\`\`\`text
\\"ABC\\" == \\"abc\\"?
\`\`\`

### 6. Do spaces matter?

\`\`\`text
\\"abc def\\"
\`\`\`

### 7. Can I modify the original?

\`\`\`text
Yes / No
\`\`\`

### 8. What is the maximum \`n\`?

This determines complexity.

### 9. Do I need original indexes?

This affects whether sorting is safe.

### 10. Is the expected solution in-place?

If yes, extra arrays may not be acceptable.

---

# 50. Quick Example — Find Maximum

Input:

\`\`\`text
[5, 2, 9, 1, 7]
\`\`\`

### Beginner mistake

Starting with:

\`\`\`python
max_value = 0
\`\`\`

This fails if all numbers are negative.

Example:

\`\`\`text
[-5, -2, -9]
\`\`\`

Your answer could incorrectly remain:

\`\`\`text
0
\`\`\`

### Better

Use the first element:

\`\`\`python
max_value = arr[0]

for i in range(1, len(arr)):
    if arr[i] > max_value:
        max_value = arr[i]
\`\`\`

But remember: this requires the array to be non-empty.

---

# 51. Quick Example — Reverse an Array

Input:

\`\`\`text
[1,2,3,4,5]
\`\`\`

Expected:

\`\`\`text
[5,4,3,2,1]
\`\`\`

Two-pointer approach:

\`\`\`text
left                 right
 ↓                      ↓
[1, 2, 3, 4, 5]
\`\`\`

Swap:

\`\`\`text
[5, 2, 3, 4, 1]
\`\`\`

Move:

\`\`\`text
left → 
right ←
\`\`\`

Continue until:

\`\`\`text
left >= right
\`\`\`

### Common mistake

Continuing after the pointers cross can undo the swaps.

---

# 52. Quick Example — Reverse a String

Input:

\`\`\`text
\\"hello\\"
\`\`\`

Indexes:

\`\`\`text
h e l l o
0 1 2 3 4
\`\`\`

Start:

\`\`\`text
left = 0
right = 4
\`\`\`

Compare/swap:

\`\`\`text
o e l l h
\`\`\`

Then:

\`\`\`text
o l l e h
\`\`\`

Stop when:

\`\`\`text
left >= right
\`\`\`

Result:

\`\`\`text
\\"olleh\\"
\`\`\`

---

# 53. Quick Example — Remove Duplicates

Input:

\`\`\`text
[1,2,2,3,3,4]
\`\`\`

Expected:

\`\`\`text
[1,2,3,4]
\`\`\`

Possible strategies:

### Set

Fast and simple, but may not always preserve the requirements you need.

### Two pointers

Useful when the array is already sorted.

### Hash map/frequency

Useful when you need counts.

The correct approach depends on the problem constraints.

---

# 54. Array/String Error Checklist

Before submitting code, check:

\`\`\`text
☐ Did I use 0-based indexing correctly?

☐ Did I accidentally access index n?

☐ Did I handle empty input?

☐ Did I handle one-element input?

☐ Did I handle duplicates?

☐ Did I handle negative values?

☐ Did I check case sensitivity?

☐ Did I handle spaces correctly?

☐ Did I handle special characters?

☐ Did I accidentally modify the original array?

☐ Did I accidentally skip an element?

☐ Did I move my pointers correctly?

☐ Are my loop boundaries correct?

☐ Did I confuse index with value?

☐ Did I use the correct slicing boundaries?

☐ Did I confuse split() and join()?

☐ Did I check indexOf() correctly?

☐ Is my time complexity acceptable?

☐ Is my extra space acceptable?

☐ Did I test edge cases?
\`\`\`

---

# 55. Golden Rules to Remember

### Rule 1

**Array length is not the last index.**

\`\`\`text
last index = length - 1
\`\`\`

### Rule 2

**Always think about empty input.**

\`\`\`text
[]
\\"\\"
\`\`\`

### Rule 3

**Watch \`i + 1\` and \`i - 1\`.**

These are where boundary errors happen.

### Rule 4

**Don't modify a collection while traversing it unless you deliberately designed for that.**

### Rule 5

**Strings are immutable in Python.**

Build a new string instead of changing individual characters. 

### Rule 6

**Know whether your operation mutates the original data.**

### Rule 7

**\`indexOf()\` returning \`0\` means \\"found at the first position,\\" not \\"not found.\\"** 

### Rule 8

**Slicing usually means start included, end excluded.**

### Rule 9

**Don't assume spaces, case, or punctuation can be ignored.**

Read the problem statement.

### Rule 10

**Constraints determine the algorithm.**

Don't write O(n²) just because it is easy.

---

# 56. Most Common Errors — Priority Order

If you're preparing for coding interviews, focus on these first:

| Priority | Error | Importance |
|---|---|---|
| 🔴 1 | Off-by-one errors | Very High |
| 🔴 2 | Wrong loop boundaries | Very High |
| 🔴 3 | Index vs value confusion | Very High |
| 🔴 4 | Empty input | Very High |
| 🔴 5 | Modifying while iterating | Very High |
| 🔴 6 | Wrong pointer movement | Very High |
| 🔴 7 | Incorrect slicing | High |
| 🔴 8 | String immutability | High |
| 🔴 9 | Case/space handling | High |
| 🟠 10 | Duplicate handling | High |
| 🟠 11 | Reference vs copy | High |
| 🟠 12 | Wrong \`indexOf()\` check | High |
| 🟠 13 | Sorting destroys original order | Medium |
| 🟠 14 | Unnecessary O(n²) | High |
| 🟡 15 | Special characters | Medium |

---

# 57. Final Mental Model

When solving **any Array/String problem**, think in this order:

\`\`\`text
              PROBLEM
                 ↓
        Understand input/output
                 ↓
           Check constraints
                 ↓
       Identify edge cases
                 ↓
       Decide index/pointer logic
                 ↓
       Decide mutation/copy
                 ↓
       Choose data structure
                 ↓
       Write loop boundaries
                 ↓
        Dry-run with example
                 ↓
        Test edge cases
                 ↓
       Check Time Complexity
                 ↓
              SUBMIT
\`\`\`

The biggest mistake beginners make is **starting to code immediately**. Don't. Spend the first minute defining exactly what every index, pointer, and variable represents. That prevents far more bugs than debugging afterward.

For JavaScript specifically, MDN's array and string references are useful for checking exact method behavior; for Python, the official Python documentation is the better authority on indexing, slicing, mutability, and strings. 

### Sources used
- 
- 
- 
-
`;
