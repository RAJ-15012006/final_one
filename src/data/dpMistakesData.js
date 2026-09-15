export const dpMistakesMarkdown = `
# Why Your Dynamic Programming Code Fails — Detailed Notes

Dynamic Programming (DP) is not difficult because the code is complicated. **Most DP failures happen because the state, transition, base case, or loop order is wrong.** If you memorize DP code without understanding these four things, your solution will break as soon as the question changes slightly. 

I combined the common failure points discussed across DP learning resources and interview-pattern guides into the notes below. 

---

# 1. First Understand What DP Actually Means

**Dynamic Programming = Solve smaller problems + store their answers + reuse them.**

DP is useful mainly when:

1. The same smaller problem is solved again and again.
2. The answer to a bigger problem can be built from answers to smaller problems.

### Simple example — Fibonacci

Without DP:

\`\`\`text
fib(5)
 ├── fib(4)
 │    ├── fib(3)
 │    └── fib(2)
 └── fib(3)
      ├── fib(2)
      └── fib(1)
\`\`\`

Notice \`fib(3)\` and \`fib(2)\` are calculated multiple times.

With DP:

\`\`\`text
fib(2) → calculate once
fib(3) → calculate once
fib(4) → calculate once
fib(5) → calculate once
\`\`\`

So DP saves previously calculated answers.

---

# 2. The Biggest Mistake: You Don't Know What \`dp[i]\` Means

This is probably the **#1 reason DP code goes wrong**.

Before writing code, you must be able to say:

\u003e **\\"dp[i] represents ______.\\"**

If you cannot complete that sentence clearly, you are not ready to write the DP.

### Example

For Climbing Stairs:

\`\`\`text
dp[i] = number of ways to reach stair i
\`\`\`

Therefore:

\`\`\`text
dp[i] = dp[i-1] + dp[i-2]
\`\`\`

Because you can reach stair \`i\` from:

\`\`\`text
i-1 → take 1 step
i-2 → take 2 steps
\`\`\`

### Wrong thinking

\`\`\`text
dp[i] = answer related to i
\`\`\`

That's too vague.

### Correct thinking

\`\`\`text
dp[i] = exact meaning of the answer for state i
\`\`\`

A vague state usually leads to a wrong transition. 

---

# 3. Mistake: Writing Code Before Finding the Recurrence

A common beginner approach is:

\u003e \\"Let me create a DP array first and figure out the formula while coding.\\"

That's backwards.

First find:

### Step 1 — State

\`\`\`text
What does dp[i] mean?
\`\`\`

### Step 2 — Choices

\`\`\`text
What choices do I have at state i?
\`\`\`

### Step 3 — Transition

\`\`\`text
How do those choices lead to previous states?
\`\`\`

### Step 4 — Base case

\`\`\`text
What happens at the smallest state?
\`\`\`

### Step 5 — Code

Only then write the program.

---

# 4. Mistake: Wrong Base Case

Base cases are extremely important.

Suppose:

\`\`\`text
dp[i] = number of ways to reach i
\`\`\`

For climbing stairs:

\`\`\`text
dp[0] = 1
dp[1] = 1
\`\`\`

Then:

\`\`\`text
dp[2] = dp[1] + dp[0]
      = 1 + 1
      = 2
\`\`\`

If you incorrectly write:

\`\`\`text
dp[0] = 0
\`\`\`

your entire table becomes wrong.

### Why is \`dp[0] = 1\`?

There is **one way to reach the starting point: do nothing.**

This is a common source of off-by-one errors in DP. 

---

# 5. Mistake: Off-by-One Errors

This happens when you mix:

\`\`\`text
0-indexing
\`\`\`

and

\`\`\`text
1-indexing
\`\`\`

### Example

Suppose:

\`\`\`text
dp[i] = answer using first i elements
\`\`\`

For an array containing \`n\` elements, you need:

\`\`\`text
dp[0] ... dp[n]
\`\`\`

That's:

\`\`\`text
n + 1
\`\`\`

positions.

Not:

\`\`\`text
n
\`\`\`

### Example

For:

\`\`\`text
nums = [2, 5, 7]
\`\`\`

You have:

\`\`\`text
dp[0] → first 0 elements
dp[1] → first 1 element
dp[2] → first 2 elements
dp[3] → first 3 elements
\`\`\`

Therefore:

\`\`\`text
dp size = 4
\`\`\`

not 3.

This is especially common in 2D DP such as knapsack, LCS and edit distance. 

---

# 6. Mistake: Wrong Array Size

Suppose:

\`\`\`text
dp[i]
\`\`\`

needs values from:

\`\`\`text
0 to n
\`\`\`

Then:

\`\`\`text
vector\u003cint\u003e dp(n + 1);
\`\`\`

is required.

### Wrong

\`\`\`cpp
vector\u003cint\u003e dp(n);
\`\`\`

### Correct

\`\`\`cpp
vector\u003cint\u003e dp(n + 1);
\`\`\`

Always ask:

\u003e \\"What is the smallest index and what is the largest index I will access?\\"

Then calculate the size.

---

# 7. Mistake: Wrong Transition

The transition is the **formula connecting the current state to previous states**.

Example:

\`\`\`text
House Robber
\`\`\`

At every house you have two choices:

### Choice 1: Don't rob current house

\`\`\`text
dp[i-1]
\`\`\`

### Choice 2: Rob current house

You cannot rob the previous house:

\`\`\`text
nums[i] + dp[i-2]
\`\`\`

Therefore:

\`\`\`text
dp[i] = max(
    dp[i-1],
    nums[i] + dp[i-2]
)
\`\`\`

A common mistake is writing:

\`\`\`text
dp[i] = nums[i] + dp[i-1]
\`\`\`

That accidentally allows adjacent houses.

### Lesson

Don't create the formula from memory.

Ask:

\u003e **What choices do I have at this position?**

Then derive the transition.

---

# 8. Mistake: Forgetting One Possible Choice

Many DP problems are basically:

\`\`\`text
Choice A
OR
Choice B
OR
Choice C
...
\`\`\`

If you forget one choice, your answer can look reasonable but still be wrong.

For example, in edit distance, you need to consider operations such as insertion, deletion and replacement. Forgetting a valid transition produces incorrect results. 

### Before coding, ask:

\`\`\`text
What are ALL possible decisions?
\`\`\`

Write them down.

Then convert each decision into a transition.

---

# 9. Mistake: Memoization Array Is Not Initialized Correctly

### Memoization

Memoization means:

\u003e Recursion + storing already calculated answers.

Example:

\`\`\`cpp
int solve(int n, vector\u003cint\u003e\u0026 dp) {

    if (n \u003c= 1)
        return n;

    if (dp[n] != -1)
        return dp[n];

    return dp[n] = solve(n-1, dp) + solve(n-2, dp);
}
\`\`\`

Before calling it:

\`\`\`cpp
vector\u003cint\u003e dp(n + 1, -1);
\`\`\`

Here:

\`\`\`text
-1 = not calculated yet
\`\`\`

### Common mistake

\`\`\`cpp
vector\u003cint\u003e dp(n + 1, 0);
\`\`\`

and then:

\`\`\`cpp
if (dp[n] != 0)
\`\`\`

This can be dangerous when \`0\` is itself a valid answer.

### Better rule

Choose a marker that cannot be confused with a real answer.

---

# 10. Mistake: Forgetting to Store the Answer

This is a classic memoization bug.

### Wrong

\`\`\`cpp
return solve(n-1, dp) + solve(n-2, dp);
\`\`\`

You calculated the answer but didn't save it.

### Better

\`\`\`cpp
return dp[n] = solve(n-1, dp) + solve(n-2, dp);
\`\`\`

Now the next time \`solve(n)\` is requested:

\`\`\`cpp
if (dp[n] != -1)
    return dp[n];
\`\`\`

The stored result can be reused.

---

# 11. Mistake: Memoization Check Comes Too Late

You should check whether the answer is already available **before doing expensive recursion**.

### Correct structure

\`\`\`cpp
int solve(int n) {

    if (base_case)
        return answer;

    if (already_calculated)
        return dp[n];

    // calculate
}
\`\`\`

The basic flow is:

\`\`\`text
Base case
    ↓
Already calculated?
    ↓
Yes → return stored answer
    ↓
No
    ↓
Calculate
    ↓
Store
    ↓
Return
\`\`\`

---

# 12. Mistake: Wrong Tabulation Order

Tabulation means:

\u003e Start from smaller states and build toward the final answer.

Suppose:

\`\`\`text
dp[i] depends on dp[i-1]
\`\`\`

Then you normally calculate:

\`\`\`text
dp[0]
dp[1]
dp[2]
dp[3]
...
\`\`\`

### Wrong order

Trying to calculate:

\`\`\`text
dp[5]
\`\`\`

before:

\`\`\`text
dp[4]
\`\`\`

can result in using an uninitialized or incorrect value.

The general rule is:

\u003e **Calculate dependencies before the state that depends on them.** 

---

# 13. Mistake: Wrong Loop Direction in Knapsack

This is one of the most important DP mistakes.

For **0/1 Knapsack**, each item can be used **only once**.

When using a 1D DP array, capacity is generally processed from high to low:

\`\`\`cpp
for (int j = W; j \u003e= wt[i]; j--) {
    dp[j] = max(dp[j],
                dp[j - wt[i]] + value[i]);
}
\`\`\`

Why?

Because going backward prevents the current item from being reused during the same iteration.

For **unbounded knapsack**, where an item can be used multiple times, the direction can be forward.

\`\`\`text
0/1 Knapsack
→ backward

Unbounded Knapsack
→ forward
\`\`\`

The important point is **don't memorize arrows blindly**. The loop direction depends on whether the current item is allowed to contribute again. 

---

# 14. Mistake: Confusing \\"Minimum\\", \\"Maximum\\", and \\"Count\\"

DP questions often ask for three different types of answers.

### Type 1 — Minimum

Example:

\u003e Minimum number of coins.

Usually:

\`\`\`text
min(...)
\`\`\`

### Type 2 — Maximum

Example:

\u003e Maximum profit.

Usually:

\`\`\`text
max(...)
\`\`\`

### Type 3 — Number of ways

Example:

\u003e Number of ways to reach target.

Usually:

\`\`\`text
+
\`\`\`

### Example

Minimum:

\`\`\`text
dp[x] = 1 + min(dp[x-coin])
\`\`\`

Maximum:

\`\`\`text
dp[i] = max(...)
\`\`\`

Count:

\`\`\`text
dp[i] += dp[previous]
\`\`\`

These patterns appear repeatedly across DP problems. 

---

# 15. Mistake: Using \`0\` for an Impossible State

This is extremely important in **minimum DP**.

Suppose Coin Change asks:

\u003e Minimum coins required to make amount 7.

Imagine amount 7 is impossible.

If you initialize:

\`\`\`text
dp[7] = 0
\`\`\`

then:

\`\`\`text
min(...)
\`\`\`

may incorrectly think:

\`\`\`text
0 coins
\`\`\`

is a valid solution.

That's wrong.

For impossible states, use something like:

\`\`\`text
INF
\`\`\`

or a sufficiently large number.

Example:

\`\`\`cpp
vector\u003cint\u003e dp(amount + 1, INF);

dp[0] = 0;
\`\`\`

Then:

\`\`\`text
INF = impossible
\`\`\`

This is a common DP initialization mistake. 

---

# 16. Mistake: Confusing Subarray and Subsequence

These are NOT the same.

### Subarray

Elements must be continuous.

\`\`\`text
[1, 2, 3, 4]

[2, 3] → subarray
\`\`\`

### Subsequence

Elements don't have to be continuous.

\`\`\`text
[1, 2, 3, 4]

[1, 3] → subsequence
\`\`\`

This difference completely changes the DP state and transition.

So always identify:

\`\`\`text
Subarray?
Substring?
Subsequence?
Subset?
\`\`\`

before starting.

---

# 17. Mistake: Confusing 1D DP and 2D DP

Some problems need only:

\`\`\`text
dp[i]
\`\`\`

Others need:

\`\`\`text
dp[i][j]
\`\`\`

### 1D example

Climbing Stairs:

\`\`\`text
dp[i]
\`\`\`

because the answer depends mainly on the position.

### 2D example

LCS:

\`\`\`text
dp[i][j]
\`\`\`

because you are comparing two strings.

For example:

\`\`\`text
String A → i
String B → j
\`\`\`

So:

\`\`\`text
dp[i][j]
\`\`\`

can represent:

\u003e LCS of the first \`i\` characters of A and first \`j\` characters of B.

If you try to force a 1D state onto a problem that requires two independent pieces of information, your solution will fail.

---

# 18. Mistake: Wrong Meaning of \`dp[i][j]\`

This is especially dangerous in 2D DP.

You might define:

\`\`\`text
dp[i][j] = answer for first i elements and first j elements
\`\`\`

But then accidentally code as if:

\`\`\`text
dp[i][j] = answer for indices i and j
\`\`\`

Those are different meanings.

### Example — LCS

A common convention is:

\`\`\`text
dp[i][j] =
LCS length of first i characters of string A
and first j characters of string B
\`\`\`

Therefore:

\`\`\`text
A index = i - 1
B index = j - 1
\`\`\`

This is why you frequently see:

\`\`\`cpp
if (a[i-1] == b[j-1])
\`\`\`

rather than:

\`\`\`cpp
a[i]
b[j]
\`\`\`

Mixing these conventions creates classic index errors. 

---

# 19. Mistake: Forgetting Empty String / Empty Array Cases

In string DP, the empty string is often an important state.

For example, in Edit Distance:

\`\`\`text
dp[i][0] = i
\`\`\`

because converting a string of length \`i\` into an empty string requires \`i\` deletions.

Similarly:

\`\`\`text
dp[0][j] = j
\`\`\`

because converting an empty string into a string of length \`j\` requires \`j\` insertions. 

So don't ignore:

\`\`\`text
first row
first column
\`\`\`

They often contain the base cases.

---

# 20. Mistake: Space Optimization Too Early

You may see:

\`\`\`text
2D DP → O(n × m)
\`\`\`

and immediately try:

\`\`\`text
1D DP → O(m)
\`\`\`

That's not always wise.

First make the **2D solution correct**.

Then optimize memory.

### Bad approach

\`\`\`text
I don't understand the DP
        ↓
I'll make it 1D
        ↓
Now I don't understand why it fails
\`\`\`

### Better approach

\`\`\`text
Understand state
       ↓
Write correct 2D DP
       ↓
Test it
       ↓
Understand dependencies
       ↓
Optimize to 1D if possible
\`\`\`

Also, if you need to reconstruct the actual sequence/path, aggressive space optimization can remove information you need. 

---

# 21. Mistake: Using the Wrong Initial Values

Different DP problems require different initialization.

| Problem type | Typical initialization |
|---|---|
| Maximum | \`-INF\` or suitable minimum |
| Minimum | \`INF\` |
| Count | \`0\` |
| Reachability | \`false\` |
| Boolean possibility | \`false\`, except base case |
| Ways | base state often \`1\` |

### Example

For maximum:

\`\`\`text
dp[i] = -INF
\`\`\`

can mean:

\`\`\`text
not reached yet
\`\`\`

For minimum:

\`\`\`text
dp[i] = INF
\`\`\`

can mean:

\`\`\`text
currently impossible
\`\`\`

Never assume:

\`\`\`text
dp = 0
\`\`\`

is universally correct.

---

# 22. Mistake: Returning the Wrong DP Cell

You calculated the entire table correctly but return:

\`\`\`cpp
return dp[n-1];
\`\`\`

when the answer is actually:

\`\`\`cpp
return dp[n];
\`\`\`

This happens when the state definition and indexing convention don't match.

Before returning, ask:

\u003e **What exactly does the required answer correspond to?**

If:

\`\`\`text
dp[i] = answer for first i elements
\`\`\`

then the complete array usually corresponds to:

\`\`\`text
dp[n]
\`\`\`

not:

\`\`\`text
dp[n-1]
\`\`\`

---

# 23. Mistake: Applying DP to Everything

Not every problem is DP.

Sometimes the correct technique is:

\`\`\`text
Greedy
Binary Search
Two Pointers
Sliding Window
Graph algorithms
Backtracking
Prefix Sum
Hashing
\`\`\`

Forcing DP onto a problem can make the solution unnecessarily complicated.

A good DP candidate usually has **overlapping subproblems** and some form of **optimal substructure**. 

---

# 24. Mistake: Memorizing Solutions Instead of Patterns

This is a major problem in DSA preparation.

You solve:

\`\`\`text
Climbing Stairs
\`\`\`

and memorize:

\`\`\`cpp
dp[i] = dp[i-1] + dp[i-2];
\`\`\`

Then the question changes slightly and you're stuck.

Instead learn the pattern:

\`\`\`text
Current state
      ↓
What choices do I have?
      ↓
What smaller states result?
      ↓
Combine those answers
\`\`\`

Common DP patterns include:

- Fibonacci / linear DP
- 0/1 Knapsack
- Unbounded Knapsack
- Grid DP
- Subsequence DP
- String DP
- Interval DP
- State-machine DP
- Tree DP
- Bitmask / state-compression DP

These patterns recur across many interview problems. 

---

# 25. Mistake: Not Testing Small Examples

Don't immediately test:

\`\`\`text
n = 1000
\`\`\`

Start with tiny cases.

For example:

\`\`\`text
n = 0
n = 1
n = 2
n = 3
\`\`\`

Why?

Because small inputs expose:

- wrong base cases
- wrong indexes
- wrong loop limits
- wrong initialization
- missing transitions

---

# 26. The \\"Table Check\\" Method

When your DP gives the wrong answer, **don't immediately rewrite the entire code.**

Print the DP table.

Example:

\`\`\`text
i       0   1   2   3   4   5
dp[i]   1   1   2   3   5   8
\`\`\`

Then ask:

### Check 1

Is \`dp[0]\` correct?

### Check 2

Is \`dp[1]\` correct?

### Check 3

Does \`dp[2]\` use the correct previous states?

### Check 4

Does every state follow the recurrence?

### Check 5

Is the final cell correct?

This is much faster than randomly changing code.

---

# 27. A Powerful DP Debugging Example

Suppose:

\`\`\`text
dp[i] = maximum sum without choosing adjacent elements
\`\`\`

Input:

\`\`\`text
[2, 7, 9, 3, 1]
\`\`\`

The recurrence is:

\`\`\`text
dp[i] = max(
    dp[i-1],
    nums[i] + dp[i-2]
)
\`\`\`

Think about index \`2\`:

\`\`\`text
nums[2] = 9
\`\`\`

Choices:

### Don't take 9

\`\`\`text
dp[1]
\`\`\`

### Take 9

You cannot take 7:

\`\`\`text
9 + dp[0]
\`\`\`

Therefore:

\`\`\`text
dp[2] = max(dp[1], 9 + dp[0])
\`\`\`

If your code instead uses:

\`\`\`text
9 + dp[1]
\`\`\`

you have accidentally allowed:

\`\`\`text
7 + 9
\`\`\`

which violates the problem.

This is why understanding the **choice** is more important than memorizing the formula.

---

# 28. DP Debugging Checklist

Whenever your DP code fails, go through this list **in this exact order**.

### Step 1 — Is DP actually required?

\`\`\`text
Does the problem have overlapping subproblems?
Does it have the required optimal-substructure structure?
\`\`\`

### Step 2 — Define the state

Write:

\`\`\`text
dp[i] = __________________
\`\`\`

or:

\`\`\`text
dp[i][j] = __________________
\`\`\`

If you cannot define it clearly, stop.

### Step 3 — Identify choices

Write:

\`\`\`text
Choice 1:
Choice 2:
Choice 3:
\`\`\`

### Step 4 — Derive transition

\`\`\`text
dp[current] = ?
\`\`\`

### Step 5 — Check base cases

Ask:

\`\`\`text
What happens for 0?
What happens for 1?
What happens for an empty input?
\`\`\`

### Step 6 — Check initialization

Ask:

\`\`\`text
Should it start at 0?
INF?
-INF?
false?
true?
\`\`\`

### Step 7 — Check table size

If indices go:

\`\`\`text
0 → n
\`\`\`

you probably need:

\`\`\`text
n + 1
\`\`\`

### Step 8 — Check loop direction

Especially for:

\`\`\`text
Knapsack
Subset Sum
Coin Change
\`\`\`

### Step 9 — Check dependencies

Before calculating:

\`\`\`text
dp[i]
\`\`\`

are all required previous states already calculated?

### Step 10 — Check final answer

Are you returning:

\`\`\`text
dp[n]
\`\`\`

or:

\`\`\`text
dp[n-1]
\`\`\`

or:

\`\`\`text
dp[n][m]
\`\`\`

for the correct reason?

---

# 29. The 4 Things You Must Understand Before Coding DP

If you remember only one section from these notes, remember this:

## ① STATE

**What does \`dp[i]\` represent?**

↓

## ② CHOICE

**What decisions can I make?**

↓

## ③ TRANSITION

**How do those choices produce the current answer?**

↓

## ④ BASE CASE

**What is the smallest problem whose answer I already know?**

Then:

\`\`\`text
STATE
  ↓
CHOICES
  ↓
TRANSITION
  ↓
BASE CASE
  ↓
TABLE / MEMOIZATION
  ↓
ANSWER
\`\`\`

That is the actual DP thinking process.

---

# 30. Quick DP Formula Sheet

### Fibonacci

\`\`\`text
dp[i] = dp[i-1] + dp[i-2]
\`\`\`

### Climbing Stairs

\`\`\`text
dp[i] = dp[i-1] + dp[i-2]
\`\`\`

### Maximum

\`\`\`text
dp[i] = max(previous choices)
\`\`\`

### Minimum

\`\`\`text
dp[i] = min(previous choices)
\`\`\`

### Number of Ways

\`\`\`text
dp[i] = sum(previous ways)
\`\`\`

### House Robber

\`\`\`text
dp[i] = max(
    dp[i-1],
    nums[i] + dp[i-2]
)
\`\`\`

### Coin Change — Minimum Coins

\`\`\`text
dp[x] = min(dp[x], dp[x-coin] + 1)
\`\`\`

### LCS

\`\`\`text
if a[i-1] == b[j-1]:

    dp[i][j] = dp[i-1][j-1] + 1

else:

    dp[i][j] = max(
        dp[i-1][j],
        dp[i][j-1]
    )
\`\`\`

These are **patterns, not formulas to blindly memorize**. 

---

# 31. DP Mistakes — One-Page Revision Table

| Mistake | Why it fails | Fix |
|---|---|---|
| Don't define \`dp[i]\` | State becomes unclear | Define it in one sentence |
| Wrong base case | Entire table becomes wrong | Test smallest inputs |
| Wrong transition | Solves a different problem | List all choices first |
| Wrong DP size | Index errors / missing states | Check index range |
| Off-by-one | Uses wrong element/state | Choose one indexing convention |
| Wrong initialization | Invalid states look valid | Use \`INF\`, \`-INF\`, \`0\`, etc. appropriately |
| Forget memoization | Repeats expensive work | Store calculated result |
| Wrong memo marker | Can't distinguish calculated/uncomputed | Use safe sentinel |
| Wrong loop order | Dependencies aren't ready | Follow dependency direction |
| Wrong knapsack direction | Item gets reused incorrectly | Match direction to item-use rule |
| Forget empty cases | First row/column becomes wrong | Initialize explicitly |
| Optimize space too early | Logic becomes harder to debug | Make 2D solution correct first |
| Return wrong cell | Final answer is shifted | Match return to state definition |
| Use DP unnecessarily | Solution becomes complex | Check if another technique fits |
| Memorize code | Fails on variations | Learn patterns |

---

# 32. Final Rule: Don't Debug DP by Guessing

When your DP code fails, don't do this:

\`\`\`text
Change i-1 to i
↓
Still wrong
↓
Change dp[0]
↓
Still wrong
↓
Change loop
↓
Now completely confused
\`\`\`

Instead:

\`\`\`text
1. Define state
       ↓
2. Write choices
       ↓
3. Derive transition
       ↓
4. Define base cases
       ↓
5. Check initialization
       ↓
6. Check loop order
       ↓
7. Test tiny input
       ↓
8. Print DP table
       ↓
9. Find first wrong state
\`\`\`

**The first wrong DP cell is usually where the bug starts.**

And the biggest lesson is this:

\u003e **If you cannot explain what every \`dp[i]\` or \`dp[i][j]\` means in plain English, you are not actually solving the DP problem yet—you are guessing code.**

That is the habit you need to eliminate first.

`;
