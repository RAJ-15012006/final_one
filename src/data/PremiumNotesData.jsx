import React from 'react';
import { 
  BookOutlined,
  ApiOutlined,
  BulbOutlined,
  CodeOutlined,
  PictureOutlined,
  NodeIndexOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

export const PREMIUM_CONTENT = {
  "topic-summaries": {
    "title": "TOPIC SUMMARIES",
    "desc": "Complete Foundation Notes for Programming & DSA",
    "color": "#ff6600",
    "icon": <BookOutlined />,
    "markdown": `
## 1.1 What is Programming?

Programming means giving instructions to a computer to solve a problem.

Basic flow:
**Problem → Understand Input/Output → Design Logic → Write Code → Test → Optimize**

Example problem:
> Find the largest number in an array.

Input:
\`\`\`json
[4, 9, 2, 7]
\`\`\`

Logic:
1. Assume the first number is largest.
2. Check every remaining number.
3. If a number is larger, update the answer.

Output:
\`\`\`text
9
\`\`\`

The important part is this: **coding is not mainly about remembering syntax. It is about converting a problem into steps.**

---

## 1.2 Variables and Data Types

A **variable** stores data.

\`\`\`python
age = 21
name = "Yashi"
price = 99.5
is_active = True
\`\`\`

Common data types:

| Data Type | Example | Use |
|---|---|---|
| Integer | \`10\` | Whole numbers |
| Float | \`10.5\` | Decimal numbers |
| String | \`"Hello"\` | Text |
| Boolean | \`True\`, \`False\` | Yes/No conditions |
| Array | \`[1,2,3]\` | Collection of values |
| Dictionary/Map | \`{"a": 1}\` | Key-value storage |
| Set | \`{1,2,3}\` | Unique values |

### Important rule
Before solving a problem, ask:
> **What type of data am I working with?**

That often determines the correct data structure.

---

## 1.3 Conditions

Conditions allow programs to make decisions.

\`\`\`python
if age >= 18:
    print("Adult")
else:
    print("Minor")
\`\`\`

### Common mistake
\`\`\`python
if x = 5:
\`\`\`
In many languages, assignment and comparison are different.
Comparison:
\`\`\`python
if x == 5:
\`\`\`

---

## 1.4 Loops

Loops repeat operations.

### For loop
Use when you know what you want to iterate through.

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

### While loop
Use when repetition depends on a condition.

\`\`\`python
while x > 0:
    x -= 1
\`\`\`

### The key DSA question
Whenever you see a loop, ask:
> **How many times can this run?**

That helps calculate time complexity.

---

## 1.6 Arrays

An array stores multiple values.

\`\`\`python
arr = [10, 20, 30, 40]
\`\`\`

Indexing usually starts from \`0\`.

\`\`\`text
Index:  0   1   2   3
Array: 10  20  30  40
\`\`\`

### Typical array problems
- Find maximum/minimum
- Reverse an array
- Find duplicates
- Two Sum
- Move zeros
- Rotate array
- Subarray problems

### Complexity basics

| Operation | Typical Complexity |
|---|---|
| Access by index | O(1) |
| Search | O(n) |
| Insert at end | O(1) amortized |
| Insert in middle | O(n) |
| Delete in middle | O(n) |

---

## 1.7 Strings

A string is a sequence of characters.

\`\`\`python
s = "hello"
\`\`\`

Common problems:
- Reverse string
- Check palindrome
- Count characters
- Find substring
- Longest unique substring
- Anagrams

### Important concept: Palindrome
A palindrome reads the same from both directions.

\`\`\`text
madam
racecar
\`\`\`

A common approach is **Two Pointers**:
Move inward while comparing characters.

---

## 1.8 Hashing

Hashing allows fast lookup.

In Python:
\`\`\`python
my_map = {}
my_set = set()
\`\`\`

### When should you think about HashMap/Dictionary?
If the question involves:
- frequency
- duplicates
- fast lookup
- checking whether something already exists
- finding complements
- grouping values

A hash-based approach is often useful.

---

## 1.9 Stack & Queue

### Stack
> **LIFO — Last In, First Out**
Like stacking plates.

Operations:
- Push → Add
- Pop → Remove top
- Peek/Top → See top

Common uses:
- Valid parentheses
- Undo operations
- Next Greater Element

### Queue
> **FIFO — First In, First Out**
Like people standing in a line.

- Enqueue → Add
- Dequeue → Remove

Used in:
- BFS
- Scheduling
- Task processing

---

## 1.11 Linked List

Unlike arrays, linked list elements are connected using references.

\`\`\`text
10 → 20 → 30 → NULL
\`\`\`

Each node contains: Data + Next Reference

The most important techniques are:
- Dummy node
- Slow and fast pointers
- Pointer manipulation

---

## 1.12 Recursion

Recursion means a function calls itself.

Every recursive function needs:
1. **Base case**: The condition where recursion stops.
2. **Recursive case**: The smaller version of the same problem.

Think:
\`\`\`text
Big problem
    ↓
Smaller problem
    ↓
Base case
\`\`\`

---

## 1.16 Graphs

Important algorithms:
- DFS
- BFS
- Dijkstra
- Topological Sort
- Union Find

---

## 1.17 Dynamic Programming

Dynamic Programming is useful when:
1. The problem has **overlapping subproblems**.
2. Smaller answers help build the larger answer.

Main approaches:
- **Memoization**: Top Down (Recursion + Cache)
- **Tabulation**: Bottom Up (Build answers using a table)
`
  },
  "pattern-notes": {
    "title": "PATTERN NOTES",
    "desc": "How to Recognize the Correct DSA Approach",
    "color": "#ff8c00",
    "icon": <ApiOutlined />,
    "markdown": `
This is one of the most important sections.

A weak approach is:
> “I will memorize 300 questions.”

A better approach is:
> **Understand what type of problem you are looking at and identify its pattern.**

---

## Pattern 1: Two Pointers

### When to use
Usually when you have:
- sorted arrays
- strings
- pair problems
- palindrome problems
- opposite-direction comparison

### Complexity
\`O(n)\` instead of checking every pair \`O(n²)\`

---

## Pattern 2: Sliding Window

### Use when
The problem contains:
- subarray
- substring
- contiguous elements
- longest/shortest sequence

Instead of recalculating every window, remove the old element and add the new one.

General idea:
\`\`\`text
Expand right
↓
Update answer
↓
If condition breaks
↓
Shrink left
\`\`\`

---

## Pattern 3: Fast and Slow Pointers
Use mainly for linked lists.

Example:
\`\`\`text
Slow → moves 1 step
Fast → moves 2 steps
\`\`\`

### Finding middle
When fast reaches the end, slow is near the middle.

### Detecting cycle
If a cycle exists, fast and slow eventually meet.

---

## Pattern 4: Prefix Sum

Useful when there are many:
- range sum queries
- subarray sums

Formula:
\`\`\`text
Sum(left to right) = prefix[right + 1] - prefix[left]
\`\`\`

---

## Pattern 5: Hashing

Think of HashMap when you need:
\`\`\`text
Value → Information
\`\`\`

Examples:
- Number → Frequency
- Character → Count
- Prefix sum → Index
- Element → Previously seen

When \`7\` appears, check whether its complement exists.

---

## Pattern 6: Binary Search

Use when you can repeatedly eliminate half the search space.

Classic condition:
\`\`\`text
sorted array
\`\`\`

But binary search can also work on the **answer space**.
Examples:
- Minimum possible speed
- Maximum minimum distance
- Minimum capacity

The real question is:
> *Can I decide whether a given answer is possible, and is that decision monotonic?*

---

## Pattern 7: Stack Pattern

Use when the problem involves:
- nearest greater/smaller element
- matching brackets
- undo
- previous/next element relationship

### Monotonic Stack
Keep elements in increasing or decreasing order.

---

## Pattern 8: BFS

Use BFS when you need:
- shortest path in an unweighted graph
- level-by-level traversal
- minimum number of steps

Main data structure: **Queue**

---

## Pattern 9: DFS

Use DFS when you need to explore deeply.

Main uses:
- Connected components
- Cycle detection
- Tree traversal
- Backtracking
- Path exploration

Implemented using: **Recursion or Stack**

---

## Pattern 10: Backtracking

General structure:
\`\`\`python
def backtrack():
    if base_case:
        save_answer()
        return

    for choice in choices:
        make_choice()
        backtrack()
        undo_choice()
\`\`\`

---

## Pattern 11: Greedy

At every step, make the choice that seems best **only when you can justify that this local choice leads to a globally correct solution**.

Blind spot to avoid: **“Greedy feels correct” is not proof.**

---

## Pattern 12: Dynamic Programming

Think DP when:
\`\`\`text
Can I break the problem into smaller states?
\`\`\`

Then identify:
\`\`\`text
State → Transition → Base Case → Answer
\`\`\`
`
  },
  "tricks": {
    "title": "TRICKS",
    "desc": "Pro Tips for Efficiency, Edge Cases, and Cleaner Problem Solving",
    "color": "#ffa500",
    "icon": <BulbOutlined />,
    "markdown": `
These are not “magic shortcuts.” They are habits that prevent stupid mistakes and reduce unnecessary work.

---

## 3.1 Always Read the Constraints First

Suppose:
\`\`\`text
n ≤ 10^5
\`\`\`

An \`O(n²)\` solution may be too slow.
Because: \`100,000² = 10,000,000,000\` operations.

But if:
\`\`\`text
n ≤ 20
\`\`\`
Backtracking or exponential solutions may be acceptable.

### Rough complexity guide

| Input Size | Usually Look For |
|---|---|
| n ≤ 10 | O(n!) / exponential |
| n ≤ 20 | O(2^n) |
| n ≤ 10³ | O(n²) |
| n ≤ 10⁵ | O(n log n) or O(n) |
| n ≥ 10⁶ | Usually near O(n) |

This helps eliminate bad approaches early.

---

## 3.2 Solve the Brute Force First

Do not immediately chase the “optimal” solution.

First ask:
> What is the simplest solution that definitely works?

Then:
\`\`\`text
Brute Force → Find repeated work → Remove repeated work → Choose better data structure → Optimize
\`\`\`

---

## 3.3 Dry Run Before Coding

Take a small example.

\`\`\`text
arr = [2, 7, 11, 15]
target = 9
\`\`\`

If you cannot manually explain your algorithm, your code will probably become messy.

---

## 3.4 Check These Edge Cases

Before submitting, test:
- **Empty input**: \`[]\`
- **One element**: \`[5]\`
- **Two elements**: \`[1, 2]\`
- **All same elements**: \`[3, 3, 3, 3]\`
- **Already sorted**: \`[1, 2, 3]\`
- **Reverse sorted**: \`[3, 2, 1]\`
- **Negative numbers**: \`[-5, -1, 2]\`
- **Duplicates**: \`[1, 1, 2, 2]\`
- **Very large input**

---

## 3.5 Watch for Off-by-One Errors

One of the most common bugs.

Always ask:
> Is the right boundary inclusive or exclusive?

---

## 3.6 Do Not Modify Data Accidentally

Sometimes both variables may refer to the same mutable object. Changing one can affect the other.

Be careful with:
- Lists / Arrays
- Nested arrays
- Objects

---

## 3.7 Use the Right Data Structure

A lot of inefficient code exists because the wrong data structure was chosen.

| Need | Useful Structure |
|---|---|
| Fast lookup | HashMap / Set |
| First-in-first-out | Queue |
| Last-in-first-out | Stack |
| Minimum/Maximum repeatedly | Heap |
| Parent-child relationship | Tree |

Before coding, ask:
> **What operation will happen most often?**
`
  },
  "5-line-shortcuts": {
    "title": "5-LINE SHORTCUTS",
    "desc": "Compact Templates You Should Understand, Not Blindly Memorize",
    "color": "#ff4500",
    "icon": <CodeOutlined />,
    "markdown": `
These are common logic patterns that can often be implemented in a few lines.

---

## 4.1 Reverse a String

\`\`\`python
s = "hello"
result = s[::-1]
\`\`\`
For interviews, still understand the two-pointer method because built-in shortcuts may not demonstrate the underlying logic.

---

## 4.2 Frequency Count

\`\`\`python
freq = {}

for x in arr:
    freq[x] = freq.get(x, 0) + 1
\`\`\`

Useful for duplicates, majority elements, anagrams, character counts.

---

## 4.3 Find Maximum

\`\`\`python
maximum = max(arr)
\`\`\`

Manual logic:
\`\`\`python
maximum = arr[0]
for x in arr:
    maximum = max(maximum, x)
\`\`\`

---

## 4.4 Swap Two Variables

\`\`\`python
a, b = b, a
\`\`\`

---

## 4.5 Enumerate Index and Value

\`\`\`python
for i, value in enumerate(arr):
    print(i, value)
\`\`\`

Useful when you need both the **Index + Element**.

---

## 4.6 Sort by a Specific Property

\`\`\`python
arr.sort(key=lambda x: x[1])
\`\`\`

Example: \`[(1, 5), (2, 2), (3, 8)]\`
Sort based on the second value.

---

## 4.7 Queue Shortcut

Python lists are not ideal for repeatedly removing from the front.

Prefer:
\`\`\`python
from collections import deque

q = deque()
q.append(1)
q.popleft()
\`\`\`

---

## 4.8 Common Set Operations

\`\`\`python
a = {1, 2, 3}
b = {3, 4, 5}

a & b  # Intersection
a | b  # Union
a - b  # Difference
\`\`\`
`
  },
  "visual-notes": {
    "title": "VISUAL NOTES",
    "desc": "How to Visualize Algorithms Instead of Memorizing Them",
    "color": "#ff7f50",
    "icon": <PictureOutlined />,
    "markdown": `
Many beginners fail because they look at code as random symbols. DSA becomes easier when you can mentally see what the algorithm is doing.

---

## 5.1 Array Visualization

\`\`\`text
Index:  0   1   2   3
Value: [4] [7] [2] [9]
\`\`\`

For every loop, track:
- Where is the pointer?
- What value is being processed?
- What changes after this iteration?

---

## 5.2 Two Pointer Visualization

\`\`\`text
L                 R
↓                 ↓
1   2   4   6   10
\`\`\`

If sum is too large: \`Move R ←\`
If sum is too small: \`Move L →\`

---

## 5.3 Sliding Window Visualization

\`\`\`text
[1  2  3] 4  5
 L        R

1 [2  3  4] 5
    L        R
\`\`\`

The main idea: **Remove old, Add new** instead of recalculating everything.

---

## 5.4 Recursion Visualization (Call Stack)

\`\`\`text
solve(3)
   |
solve(2)
   |
solve(1)
   |
solve(0)
\`\`\`

Then execution returns backward.

---

## 5.5 Tree Visualization

\`\`\`text
        1
       / \\
      2   3
     / \\
    4   5
\`\`\`

- **Preorder:** Root → Left → Right (1 → 2 → 4 → 5 → 3)
- **Inorder:** Left → Root → Right (4 → 2 → 5 → 1 → 3)
- **Postorder:** Left → Right → Root (4 → 5 → 2 → 3 → 1)

---

## 5.6 BFS vs DFS

### BFS Visulization
\`\`\`text
Level 0 → 1
Level 1 → 2, 3
Level 2 → 4, 5, 6
\`\`\`
Think: > **Explore everything close first.**

### DFS Visualization
\`\`\`text
1 ↓ 2 ↓ 4 ↑ 2 ↓ 5
\`\`\`
Think: > **Go deep first, then come back.**

---

## 5.7 Dynamic Programming Visualization

\`\`\`text
0 → 1 → 1 → 2 → 3 → 5
\`\`\`

Each state depends on previous states.
`
  },
  "dp-shortcuts": {
    "title": "DP SHORTCUTS",
    "desc": "Dynamic Programming Framework and Memorization Patterns",
    "color": "#ff6347",
    "icon": <NodeIndexOutlined />,
    "markdown": `
DP looks difficult because people memorize solutions instead of learning how to construct them. Use this process.

---

## Step 1: Define the State
Ask: > **What does \`dp[i]\` represent?**
Example: \`dp[i] = maximum result possible up to index i\`

## Step 2: Find the Transition
Ask: > **How can the current answer be built from previous answers?**
Example: \`dp[i] = dp[i-1] + dp[i-2]\`

## Step 3: Define Base Cases
Example: \`dp[0] = 0, dp[1] = 1\`
Without correct base cases, the entire DP can fail.

## Step 4: Identify the Final Answer
Maybe \`dp[n]\`, but sometimes \`max(dp)\`.

---

## Common DP Pattern 1: Fibonacci Type
Current answer depends on previous answers.
\`\`\`text
dp[i] = dp[i-1] + dp[i-2]
\`\`\`

## Common DP Pattern 2: 0/1 Knapsack
For every item: **Take it OR Do not take it**
State often looks like: \`dp[i][capacity]\`

## Common DP Pattern 3: Grid DP
Current cell may depend on \`Top + Left\`
\`\`\`text
dp[i][j] = dp[i-1][j] + dp[i][j-1]
\`\`\`

## Common DP Pattern 4: Subsequence DP
Think: \`At this position, what previous positions can connect to me?\`

## Common DP Pattern 5: Take or Skip
Very common.
\`\`\`text
answer = max(take, skip)
\`\`\`

---

## Memoization Template (Top-Down)

\`\`\`python
memo = {}

def solve(i):
    if i in memo: return memo[i]
    if base_case: return base_answer
    memo[i] = ...
    return memo[i]
\`\`\`

## Tabulation Template (Bottom-Up)

\`\`\`python
dp = [0] * (n + 1)
dp[0] = base_value

for i in range(1, n + 1):
    dp[i] = ...
\`\`\`

---

## DP Checklist
1. What changes?
2. What state represents the answer?
3. What smaller states are required?
4. What is the transition?
5. What are the base cases?
`
  },
  "trees-graphs-shortcuts": {
    "title": "TREES & GRAPHS SHORTCUTS",
    "desc": "Fast Recognition Guide",
    "color": "#d2691e",
    "icon": <LineChartOutlined />,
    "markdown": `
# TREES

## Tree Question Recognition

| If the question asks | You probably need |
|---|---|
| Every node | Traversal |
| Level by level | BFS + Queue |
| Path from root | DFS / Recursion |
| Maximum depth | 1 + max(left, right) |

## Recursive Tree Template

\`\`\`python
def dfs(node):
    if not node:
        return base_value

    left = dfs(node.left)
    right = dfs(node.right)

    return combine(left, right)
\`\`\`
The critical question is: > What information should the left and right subtree return?

---

# GRAPHS

## Adjacency List

\`\`\`python
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0]
}
\`\`\`
Usually more space-efficient for sparse graphs.

## DFS Template

\`\`\`python
visited = set()
def dfs(node):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(neighbor)
\`\`\`

## BFS Template

\`\`\`python
from collections import deque

q = deque([start])
visited = {start}

while q:
    node = q.popleft()
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            q.append(neighbor)
\`\`\`
**Important trick**: Mark nodes as visited when *adding* them to the queue, not after repeatedly processing them.

---

## Union Find / DSU

Useful when dealing with:
- connected components
- cycles
- grouping
- network connectivity

Main operations: \`find(x)\` and \`union(a, b)\`.

## Dijkstra Recognition

If the question asks:
> **Find the shortest path in a weighted graph with non-negative edge weights.**

Think: \`Dijkstra + Min Heap\`
General complexity: \`O((V + E) log V)\`
`
  },
  "one-page-cheat-sheets": {
    "title": "ONE-PAGE CHEAT SHEETS",
    "desc": "What You Should Keep for Revision",
    "color": "#e67e22",
    "icon": <FileTextOutlined />,
    "markdown": `
The purpose of a cheat sheet is not to include everything. It should contain the **things you forget but repeatedly need**.

## A. Complexity Cheat Sheet

\`\`\`text
Array access          O(1)
Array search          O(n)
HashMap lookup        Average O(1)
Stack push/pop        O(1)
Queue enqueue/dequeue O(1)
Binary Search         O(log n)
Sorting               O(n log n)
DFS/BFS               O(V + E)
\`\`\`

## B. Pattern Recognition Cheat Sheet

| Condition | Pattern |
|---|---|
| Sorted array + pair | Two Pointers |
| Contiguous subarray/string | Sliding Window |
| Fast lookup / duplicates | HashMap or Set |
| Repeated min/max | Heap |
| Level-by-level | BFS + Queue |
| Explore paths deeply | DFS |
| Repeated subproblems | DP |
| All possible combinations | Backtracking |
| Ordered search space | Binary Search |

## C. Recursion Cheat Sheet

1. Base case
2. Smallest subproblem
3. Recursive call
4. Return/combine answer

\`\`\`python
def solve(problem):
    if base_case:
        return answer
    smaller_answer = solve(smaller_problem)
    return combine(smaller_answer)
\`\`\`

## D. Debugging Cheat Sheet

When code fails:
1. Read the error.
2. Check input.
3. Test the smallest example.
4. Print important variables.
5. Check loop boundaries.
6. Check base cases.
7. Check boundary indexes.
8. Check data structure changes.
9. Check edge cases.
10. Verify complexity.

**Do not randomly change code until it works. That teaches you nothing.**
`
  },
  "memory-maps-flow-diagrams": {
    "title": "MEMORY MAPS & FLOW DIAGRAMS",
    "desc": "Build a Mental Decision System for DSA",
    "color": "#f39c12",
    "icon": <ThunderboltOutlined />,
    "markdown": `
The final goal is to look at a question and have a structured thought process.

## MASTER DSA FLOW

\`\`\`text
              NEW PROBLEM
                   │
        Understand Input/Output
                   │
           Check Constraints
                   │
           Find Brute Force
                   │
        Is There Repeated Work?
           /              \\
         YES               NO
          │                 │
     Optimize It         Is brute force efficient?
          │                 │
    Choose Pattern        Implement
\`\`\`

## PATTERN DECISION MAP

\`\`\`text
                  PROBLEM
                     │
     ┌───────────────┼────────────────┐
     ▼               ▼                ▼
 Sorted?       Contiguous?       Frequency?
     │               │                │
     ▼               ▼                ▼
Binary Search    Sliding Window    HashMap
Two Pointers     Prefix Sum        Set
\`\`\`

Continue:
- **Level order?** → BFS + Queue
- **Deep traversal?** → DFS
- **All combinations?** → Backtracking
- **Repeated subproblems?** → Dynamic Programming
- **Take/Skip choices?** → DP / Recursion
- **Need min/max repeatedly?** → Heap
- **Next greater/smaller?** → Monotonic Stack

## FINAL REVISION ORDER

Do **not** study sections randomly. The efficient order is:

1. Topic Summaries
2. Pattern Notes
3. Visual Notes
4. Tricks
5. 5-Line Shortcuts
6. Trees & Graphs Shortcuts
7. DP Shortcuts
8. One-Page Cheat Sheets
9. Memory Maps & Flow Diagrams

The first seven sections are for **learning**. The last two are for **revision**.

The biggest mistake would be treating the **5-Line Shortcuts** and **Cheat Sheets** as substitutes for understanding. They are not. If you cannot dry-run the algorithm and explain why it works, memorized code will collapse as soon as the interviewer changes the question slightly.
`
  }
};
