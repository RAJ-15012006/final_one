export const bsMistakesMarkdown = `

# Binary Search Bugs Developers Make — Detailed Notes

Binary Search is one of those algorithms that looks extremely easy but causes a surprising number of bugs. The main idea is simple: **search a sorted range, check the middle, and eliminate half of the remaining elements**. The difficult part is getting the boundaries, loop condition, midpoint, and stopping condition exactly right. 

---

## 1. What is Binary Search?

Binary Search is an algorithm used to find an element in a **sorted array/list**.

Instead of checking every element one by one, it repeatedly divides the search area into half.

### Example

Array:

\`\`\`text
[10, 20, 30, 40, 50, 60, 70]
\`\`\`

Suppose we want to find \`60\`.

\`\`\`text
Step 1:
[10, 20, 30, 40, 50, 60, 70]
              ↑
             mid
\`\`\`

\`mid = 40\`

Since:

\`\`\`text
60 > 40
\`\`\`

we know the answer must be on the **right side**.

So we ignore:

\`\`\`text
10 20 30 40
\`\`\`

and search:

\`\`\`text
50 60 70
\`\`\`

Then continue the same process.

### Complexity

| Operation | Complexity |
|---|---:|
| Best case | O(1) |
| Average case | O(log n) |
| Worst case | O(log n) |
| Space — iterative | O(1) |
| Space — recursive | O(log n) |

Every step approximately cuts the search space in half. 

---

# 2. First Rule: Binary Search Needs the Right Structure

The biggest conceptual mistake is thinking:

> \\"If I can compare the middle element, I can use binary search.\\"

No.

For **normal binary search**, the data must be sorted.

For example:

\`\`\`text
[10, 20, 30, 40, 50, 60]
\`\`\`

works.

But:

\`\`\`text
[10, 40, 20, 60, 30, 50]
\`\`\`

does not work with ordinary binary search.

Why?

Because when you eliminate half the array, you are assuming that the discarded half **cannot contain the answer**.

Without sorted/order information, that assumption is invalid.

---

# 3. The Standard Binary Search

A safe standard version looks like this:

\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:

        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1
\`\`\`

Understand what each variable means:

\`\`\`text
low  → beginning of search range
high → end of search range
mid  → middle element
\`\`\`

The important part is:

\`\`\`python
low = mid + 1
\`\`\`

and

\`\`\`python
high = mid - 1
\`\`\`

because \`mid\` has already been checked.

---

# 4. Bug #1 — Using Binary Search on an Unsorted Array

### Wrong

\`\`\`python
arr = [10, 50, 20, 40, 30]
\`\`\`

Trying:

\`\`\`python
binary_search(arr, 30)
\`\`\`

is invalid.

Binary search depends on ordering.

### Correct

\`\`\`python
arr = [10, 20, 30, 40, 50]
\`\`\`

Now binary search is valid.

### Remember

> **Before writing binary search, ask: \\"What property allows me to throw away half the search space?\\"**

If you don't have a valid answer, binary search may not be appropriate.

---

# 5. Bug #2 — Off-by-One Errors

This is probably the most common binary-search bug.

An off-by-one error means your boundaries are slightly wrong.

For example:

\`\`\`python
low = mid
\`\`\`

instead of:

\`\`\`python
low = mid + 1
\`\`\`

or:

\`\`\`python
high = mid
\`\`\`

instead of:

\`\`\`python
high = mid - 1
\`\`\`

These tiny differences can cause:

- missed answers
- incorrect answers
- infinite loops
- out-of-range access



---

# 6. Why \`mid + 1\` and \`mid - 1\` Matter

Suppose:

\`\`\`text
arr = [10, 20]
\`\`\`

and:

\`\`\`text
low = 0
high = 1
\`\`\`

Then:

\`\`\`text
mid = 0
\`\`\`

Suppose:

\`\`\`text
arr[mid] < target
\`\`\`

If you write:

\`\`\`python
low = mid
\`\`\`

then:

\`\`\`text
low = 0
high = 1
\`\`\`

Nothing changed!

Next iteration:

\`\`\`text
mid = 0
\`\`\`

Again:

\`\`\`text
low = 0
\`\`\`

Again:

\`\`\`text
mid = 0
\`\`\`

You can get an **infinite loop**.

### Correct:

\`\`\`python
low = mid + 1
\`\`\`

Now:

\`\`\`text
low = 1
high = 1
\`\`\`

The search space becomes smaller.

This is the key rule:

> **Every iteration must make the search interval smaller.**



---

# 7. Bug #3 — Wrong Loop Condition

Two common forms are:

\`\`\`python
while low <= high:
\`\`\`

and:

\`\`\`python
while low < high:
\`\`\`

They are **not interchangeable**.

---

## \`while low <= high\`

Usually used for an exact-match search over an inclusive range:

\`\`\`python
low = 0
high = len(arr) - 1

while low <= high:
\`\`\`

The range is:

\`\`\`text
[low ........ high]
\`\`\`

Both endpoints are valid candidates.

When:

\`\`\`text
low == high
\`\`\`

there is still **one element to check**.

Therefore:

\`\`\`python
low <= high
\`\`\`

is important.

---

## \`while low < high\`

Commonly used for boundary problems such as:

- first occurrence
- lower bound
- upper bound
- first true
- minimum valid answer

Here, the algorithm is often designed so that when:

\`\`\`text
low == high
\`\`\`

the remaining position itself is the answer.

So don't randomly change:

\`\`\`python
low < high
\`\`\`

to:

\`\`\`python
low <= high
\`\`\`

The loop condition must match your boundary definition. 

---

# 8. Bug #4 — Incorrect Midpoint Calculation

Many beginners write:

\`\`\`python
mid = (low + high) // 2
\`\`\`

For Python, integer overflow isn't an issue with normal Python integers because they can grow arbitrarily large.

But in languages with fixed-width integer types such as C++, Java, etc., this can overflow for sufficiently large indices.

Example conceptually:

\`\`\`text
low  = 1,500,000,000
high = 1,500,000,000
\`\`\`

Then:

\`\`\`text
low + high = 3,000,000,000
\`\`\`

which can exceed the range of a signed 32-bit integer.

The safer general formula is:

\`\`\`python
mid = low + (high - low) // 2
\`\`\`



### Remember this:

\`\`\`text
❌ (low + high) / 2

✅ low + (high - low) / 2
\`\`\`

In Python, the first is generally safe from integer overflow, but the second is still a good habit when writing language-independent DSA solutions.

---

# 9. Bug #5 — Forgetting That \`mid\` Was Already Checked

Suppose:

\`\`\`python
if arr[mid] < target:
    low = mid
\`\`\`

This is often wrong in an exact-match search.

Why?

Because you already know:

\`\`\`text
arr[mid] < target
\`\`\`

Therefore \`mid\` itself cannot be the target.

So remove it:

\`\`\`python
low = mid + 1
\`\`\`

Similarly:

\`\`\`python
if arr[mid] > target:
    high = mid - 1
\`\`\`

The general principle is:

> **If \`mid\` has been proven impossible, remove it from the next search range.**



---

# 10. Bug #6 — Infinite Loop

This is one of the most frustrating binary-search bugs.

Consider:

\`\`\`python
while low <= high:

    mid = low + (high - low) // 2

    if arr[mid] < target:
        low = mid
\`\`\`

The problem is:

\`\`\`python
low = mid
\`\`\`

The midpoint can equal \`low\`.

Example:

\`\`\`text
low = 3
high = 4
\`\`\`

Then:

\`\`\`text
mid = 3
\`\`\`

After:

\`\`\`python
low = mid
\`\`\`

we still have:

\`\`\`text
low = 3
high = 4
\`\`\`

Nothing changed.

Therefore the loop can continue forever.

### Fix

For exact search:

\`\`\`python
low = mid + 1
\`\`\`

For some **boundary/maximization** patterns where you intentionally use:

\`\`\`python
low = mid
\`\`\`

you may instead need an **upper midpoint**:

\`\`\`python
mid = low + (high - low + 1) // 2
\`\`\`

This guarantees progress in that particular pattern. 

---

# 11. Bug #7 — Using the Wrong Midpoint for Boundary Search

There are two useful midpoint styles.

### Lower midpoint

\`\`\`python
mid = low + (high - low) // 2
\`\`\`

Example:

\`\`\`text
low = 3
high = 4

mid = 3
\`\`\`

### Upper midpoint

\`\`\`python
mid = low + (high - low + 1) // 2
\`\`\`

Example:

\`\`\`text
low = 3
high = 4

mid = 4
\`\`\`

Why does this matter?

Suppose you want to find the **maximum valid value** and your update is:

\`\`\`python
low = mid
\`\`\`

If you use lower midpoint:

\`\`\`text
low = 3
high = 4
mid = 3
\`\`\`

then:

\`\`\`text
low = mid
\`\`\`

gives:

\`\`\`text
low = 3
\`\`\`

No progress.

Using upper midpoint:

\`\`\`text
mid = 4
\`\`\`

allows:

\`\`\`text
low = 4
\`\`\`

and the interval shrinks.



---

# 12. Bug #8 — Mishandling Duplicate Values

Consider:

\`\`\`text
[10, 20, 20, 20, 30]
\`\`\`

Target:

\`\`\`text
20
\`\`\`

A normal binary search might return:

\`\`\`text
index 1
\`\`\`

or:

\`\`\`text
index 2
\`\`\`

or:

\`\`\`text
index 3
\`\`\`

All may be correct **if the question only asks whether 20 exists**.

But what if the question asks:

> Find the first occurrence of 20.

Then returning index \`2\` is wrong.

The correct answer is:

\`\`\`text
index 1
\`\`\`

This is why you must understand exactly what the question asks.

---

# 13. First Occurrence

For:

\`\`\`text
[10, 20, 20, 20, 30]
\`\`\`

we want:

\`\`\`text
first 20
\`\`\`

When we find \`20\`, we don't immediately return.

Instead, we continue searching left.

Conceptually:

\`\`\`python
if arr[mid] >= target:
    high = mid
else:
    low = mid + 1
\`\`\`

At the end, \`low\` represents the first position where the value is at least the target.

This is commonly called **lower bound**. 

---

# 14. Lower Bound vs Upper Bound

This is extremely important for interviews.

### Lower Bound

Find the first position where:

\`\`\`text
arr[index] >= target
\`\`\`

Example:

\`\`\`text
Array:
[1, 2, 2, 2, 4, 5]

Target = 2
\`\`\`

Lower bound:

\`\`\`text
index 1
\`\`\`

because:

\`\`\`text
arr[1] = 2
\`\`\`

and it is the first value ≥ 2.

---

### Upper Bound

Find the first position where:

\`\`\`text
arr[index] > target
\`\`\`

For:

\`\`\`text
[1, 2, 2, 2, 4, 5]
\`\`\`

Target:

\`\`\`text
2
\`\`\`

Upper bound:

\`\`\`text
index 4
\`\`\`

because:

\`\`\`text
arr[4] = 4
\`\`\`

and \`4 > 2\`.

---

# 15. Bug #9 — Forgetting Empty Arrays

Consider:

\`\`\`python
arr = []
\`\`\`

Then:

\`\`\`python
high = len(arr) - 1
\`\`\`

gives:

\`\`\`text
high = -1
\`\`\`

For the standard implementation:

\`\`\`python
while low <= high:
\`\`\`

we get:

\`\`\`text
0 <= -1
\`\`\`

which is false.

So the function safely returns:

\`\`\`text
-1
\`\`\`

But poorly designed implementations can try to access:

\`\`\`python
arr[mid]
\`\`\`

before checking whether a valid search range exists.

### Always test:

\`\`\`text
[]
\`\`\`

---

# 16. Bug #10 — Single-Element Array

This is a classic edge case.

\`\`\`text
[50]
\`\`\`

Search:

\`\`\`text
50
\`\`\`

Expected:

\`\`\`text
0
\`\`\`

Search:

\`\`\`text
30
\`\`\`

Expected:

\`\`\`text
-1
\`\`\`

If your binary search cannot correctly handle one element, your boundary logic is probably wrong.

---

# 17. Bug #11 — First Element and Last Element

Always test the boundaries.

Example:

\`\`\`text
[10, 20, 30, 40, 50]
\`\`\`

Test:

\`\`\`text
target = 10
\`\`\`

and:

\`\`\`text
target = 50
\`\`\`

Why?

Because many off-by-one errors appear at the endpoints.

A solution that works for:

\`\`\`text
30
40
\`\`\`

but fails for:

\`\`\`text
10
50
\`\`\`

is not a correct binary search.

---

# 18. Bug #12 — Forgetting the \\"Not Found\\" Case

Some programmers only think about:

\`\`\`text
target exists
\`\`\`

But binary search must also handle:

\`\`\`text
target does not exist
\`\`\`

Example:

\`\`\`text
[10, 20, 30, 40, 50]
\`\`\`

Search:

\`\`\`text
35
\`\`\`

Eventually:

\`\`\`text
low > high
\`\`\`

At that point, the search space is empty.

For exact search:

\`\`\`python
return -1
\`\`\`

is a common convention.

---

# 19. Bug #13 — Wrong Comparison Operator

These are not always equivalent:

\`\`\`python
arr[mid] < target
\`\`\`

and:

\`\`\`python
arr[mid] <= target
\`\`\`

The correct comparison depends on the problem.

For example, when searching for an exact value:

\`\`\`python
if arr[mid] == target:
    return mid
elif arr[mid] < target:
    low = mid + 1
else:
    high = mid - 1
\`\`\`

But for boundary problems, you often deliberately use:

\`\`\`python
arr[mid] >= target
\`\`\`

or:

\`\`\`python
arr[mid] <= target
\`\`\`

Changing \`<\` to \`<=\` without understanding the desired boundary can produce subtle bugs.

---

# 20. Bug #14 — Wrong Initial Boundaries

Suppose:

\`\`\`python
low = 0
high = len(arr)
\`\`\`

but you're using:

\`\`\`python
while low <= high:
\`\`\`

Now \`high == len(arr)\` is **outside the array**.

Valid indices are:

\`\`\`text
0 ... len(arr)-1
\`\`\`

So for the classic inclusive search:

\`\`\`python
low = 0
high = len(arr) - 1
\`\`\`

But there are other valid designs where:

\`\`\`python
high = len(arr)
\`\`\`

is intentional, especially half-open intervals:

\`\`\`text
[low, high)
\`\`\`

The problem isn't that one is universally right.

The problem is **mixing conventions**.



---

# 21. Inclusive vs Exclusive Boundaries

This is one of the most important concepts to understand.

## Inclusive range

\`\`\`text
[low, high]
\`\`\`

Both are included.

Example:

\`\`\`text
low = 0
high = 4
\`\`\`

Candidates:

\`\`\`text
0, 1, 2, 3, 4
\`\`\`

Usually:

\`\`\`python
while low <= high:
\`\`\`

---

## Half-open range

\`\`\`text
[low, high)
\`\`\`

\`low\` is included.

\`high\` is excluded.

Example:

\`\`\`text
low = 0
high = 5
\`\`\`

Candidates:

\`\`\`text
0, 1, 2, 3, 4
\`\`\`

This style is extremely useful for lower-bound style algorithms.

The critical thing is:

> Decide your interval convention **before** writing the loop.



---

# 22. Bug #15 — Returning the Wrong Value

Suppose you're implementing a boundary search.

You finish with:

\`\`\`python
low == high
\`\`\`

Then returning:

\`\`\`python
low
\`\`\`

is generally appropriate for a first-position style search.

But in a classic exact-match search:

\`\`\`python
while low <= high:
\`\`\`

when the loop finishes:

\`\`\`text
low > high
\`\`\`

So you cannot blindly return \`low\` or \`high\` as though they were still valid candidates.

You need to know what your variables represent.

---

# 23. Bug #16 — Not Checking Whether Lower Bound Exists

Suppose:

\`\`\`text
arr = [10, 20, 30]
target = 50
\`\`\`

Lower bound may return:

\`\`\`text
index 3
\`\`\`

But:

\`\`\`text
arr[3]
\`\`\`

doesn't exist.

So if you use lower bound to determine whether a target exists, check:

\`\`\`python
index < len(arr)
\`\`\`

before accessing:

\`\`\`python
arr[index]
\`\`\`

For example:

\`\`\`python
index = lower_bound(arr, target)

if index < len(arr) and arr[index] == target:
    print(\\"Found\\")
else:
    print(\\"Not found\\")
\`\`\`

This is an important boundary case. 

---

# 24. Bug #17 — Binary Search on the Wrong Property

Binary search isn't limited to arrays.

You can perform **binary search on an answer**.

For example:

\`\`\`text
Can I complete the task with capacity X?
\`\`\`

The answer may have a property like:

\`\`\`text
X = 1 → False
X = 2 → False
X = 3 → False
X = 4 → True
X = 5 → True
X = 6 → True
\`\`\`

Notice the pattern:

\`\`\`text
False False False True True True
\`\`\`

This is monotonic.

Therefore binary search can find the transition.

---

# 25. Bug #18 — Assuming a Condition Is Monotonic

This is a major conceptual bug.

Binary search on an answer requires a **monotonic condition**.

For example:

\`\`\`text
False False False True True True
\`\`\`

works.

But:

\`\`\`text
False True False True False
\`\`\`

doesn't provide the required monotonic structure.

Before using binary search on an answer, ask:

### Question 1

If \`x\` works, will larger values also work?

### Question 2

If \`x\` doesn't work, will smaller values also fail?

If the answer isn't consistently yes, binary search may not apply.



---

# 26. Bug #19 — Wrong Search Space in \\"Binary Search on Answer\\"

Consider a problem asking for the minimum possible capacity.

A common mistake is starting:

\`\`\`python
low = 0
\`\`\`

when zero isn't a valid answer.

For example, if you're searching for a speed, capacity, or number of items, the minimum meaningful value may be:

\`\`\`python
low = 1
\`\`\`

Similarly, sometimes the minimum answer must be:

\`\`\`python
max(arr)
\`\`\`

because one item itself may already require that much capacity.

Your initial range must actually contain the answer. 

---

# 27. Bug #20 — Integer Overflow in the Answer Calculation

Even if your indices are safe, calculations inside the condition can overflow in languages with fixed-width integers.

For example:

\`\`\`cpp
long long total = mid * something;
\`\`\`

If both values are large, the multiplication can overflow.

So binary-search problems involving:

- multiplication
- sums
- capacities
- large constraints

often require careful use of \`long long\` / 64-bit integers.

The general rule:

> Don't only make \`mid\` safe. Make the entire calculation safe.

---

# 28. Bug #21 — Confusing Search for Value with Search for Position

These are different problems.

### Problem A

> Find whether \`50\` exists.

Return:

\`\`\`text
index or -1
\`\`\`

### Problem B

> Find the first value ≥ 50.

Return:

\`\`\`text
boundary position
\`\`\`

### Problem C

> Find the last value ≤ 50.

Return:

\`\`\`text
another boundary
\`\`\`

### Problem D

> Find the minimum possible answer satisfying a condition.

This is:

\`\`\`text
binary search on answer
\`\`\`

Do not use the same mental template blindly for all four.

---

# 29. The Most Important Concept: Loop Invariant

A **loop invariant** is something that remains true throughout the algorithm.

For binary search, one useful idea is:

> If the target exists, it must remain inside the current search range.

Initially:

\`\`\`text
[low ........ high]
\`\`\`

After every operation, you must make sure you haven't accidentally removed the target.

For example:

\`\`\`python
if arr[mid] < target:
    low = mid + 1
\`\`\`

Why is this safe?

Because:

\`\`\`text
arr[mid] < target
\`\`\`

and the array is sorted.

Therefore everything at or before \`mid\` is too small.

So the target, if it exists, must be:

\`\`\`text
mid + 1 ... high
\`\`\`

This invariant-based way of thinking makes binary search much easier to debug. 

---

# 30. The Golden Rule: Every Iteration Must Make Progress

This single rule catches a huge number of binary-search bugs.

After every iteration, ask:

> **Did \`low\` increase or did \`high\` decrease?**

If neither happened, you have a problem.

For example:

\`\`\`python
low = mid
\`\`\`

can fail to make progress.

Whereas:

\`\`\`python
low = mid + 1
\`\`\`

guarantees that \`low\` moves forward.

Similarly:

\`\`\`python
high = mid - 1
\`\`\`

guarantees that \`high\` moves backward.



---

# 31. A Safe Debugging Method

When your binary search isn't working, **don't randomly change \`<\` to \`<=\`**.

That's guessing.

Instead, make a table.

Example:

\`\`\`text
Array = [10, 20, 30, 40, 50]
Target = 50
\`\`\`

Track:

| Step | low | high | mid | arr[mid] |
|---|---:|---:|---:|---:|
| 1 | 0 | 4 | 2 | 30 |
| 2 | 3 | 4 | 3 | 40 |
| 3 | 4 | 4 | 4 | 50 |

Now you can see exactly what happens.

If \`low\` and \`high\` stop changing, you've found an infinite-loop bug.

---

# 32. Important Edge Cases to Test

Never test only normal examples.

Use these:

### Case 1 — Empty array

\`\`\`text
[]
\`\`\`

### Case 2 — One element

\`\`\`text
[10]
\`\`\`

### Case 3 — Target at beginning

\`\`\`text
[10, 20, 30]
target = 10
\`\`\`

### Case 4 — Target at end

\`\`\`text
[10, 20, 30]
target = 30
\`\`\`

### Case 5 — Target missing

\`\`\`text
[10, 20, 30]
target = 25
\`\`\`

### Case 6 — Target smaller than everything

\`\`\`text
target = 5
\`\`\`

### Case 7 — Target larger than everything

\`\`\`text
target = 100
\`\`\`

### Case 8 — Duplicates

\`\`\`text
[10, 20, 20, 20, 30]
\`\`\`

### Case 9 — All values same

\`\`\`text
[5, 5, 5, 5, 5]
\`\`\`

### Case 10 — Two elements

\`\`\`text
[10, 20]
\`\`\`

This last case is especially useful for detecting infinite loops. 

---

# 33. Common Wrong vs Correct Patterns

| Bug | Wrong | Correct |
|---|---|---|
| Midpoint | \`(low + high) // 2\` in fixed-width integer languages | \`low + (high-low)//2\` |
| Move right | \`low = mid\` | \`low = mid + 1\` |
| Move left | \`high = mid\` | \`high = mid - 1\` for exact search |
| Exact search loop | \`low < high\` | \`low <= high\` |
| Empty array | Assume at least one item | Handle \`[]\` |
| Duplicates | Return first match blindly | Decide first/last/any |
| Lower bound | Assume result is valid index | Check \`index < n\` |
| Answer search | Arbitrary bounds | Bounds must contain answer |
| Answer search | Assume condition is monotonic | Prove/check monotonicity |
| Maximize pattern | \`low = mid\` with lower midpoint | Often requires upper midpoint |

---

# 34. Classic Binary Search Template

For an exact match:

\`\`\`python
def binary_search(arr, target):

    low = 0
    high = len(arr) - 1

    while low <= high:

        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1
\`\`\`

### Memorize the logic, not just the code:

\`\`\`text
Found?
    ↓
Yes → return

No
 ↓
mid value < target
 ↓
go right → low = mid + 1

mid value > target
 ↓
go left → high = mid - 1
\`\`\`

---

# 35. Lower Bound Template

Find the first position where:

\`\`\`text
arr[index] >= target
\`\`\`

\`\`\`python
def lower_bound(arr, target):

    low = 0
    high = len(arr)

    while low < high:

        mid = low + (high - low) // 2

        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid

    return low
\`\`\`

Notice something important:

\`\`\`python
high = len(arr)
\`\`\`

not:

\`\`\`python
len(arr) - 1
\`\`\`

because this implementation uses a **half-open range**.

That's exactly why you shouldn't mix binary-search templates without understanding their boundary convention.

---

# 36. Three Questions You Should Ask Before Coding

Before writing a single line of binary search, answer these:

### Question 1

**What exactly am I searching for?**

\`\`\`text
Exact value?
First occurrence?
Last occurrence?
First >= target?
Minimum answer?
Maximum answer?
\`\`\`

---

### Question 2

**What does my search interval mean?**

Is it:

\`\`\`text
[low, high]
\`\`\`

or:

\`\`\`text
[low, high)
\`\`\`

?

---

### Question 3

**How does every iteration shrink the interval?**

For example:

\`\`\`python
low = mid + 1
\`\`\`

or:

\`\`\`python
high = mid - 1
\`\`\`

If you can't answer this, your code isn't ready.

---

# 37. Binary Search Cheat Sheet

\`\`\`text
                BINARY SEARCH
                      |
          +-----------+-----------+
          |                       |
    Exact Search             Boundary Search
          |                       |
    low <= high               low < high
          |                       |
    mid ± 1 updates         mid may stay
                            inside range
          |                       |
    Find exact value       First/Last boundary
\`\`\`

### Exact search

\`\`\`python
while low <= high:
\`\`\`

Usually:

\`\`\`python
low = mid + 1
high = mid - 1
\`\`\`

### Lower-bound style

\`\`\`python
while low < high:
\`\`\`

Often:

\`\`\`python
high = mid
\`\`\`

or:

\`\`\`python
low = mid + 1
\`\`\`

### Maximum/last-valid style

Often:

\`\`\`python
mid = low + (high - low + 1) // 2
\`\`\`

when using:

\`\`\`python
low = mid
\`\`\`

The midpoint direction must match the update rule. 

---

# 38. Final Binary Search Debugging Checklist

Before submitting your code, check all of these:

### Input

- [ ] Is the array actually sorted?
- [ ] Is the sorting order ascending or descending?
- [ ] Are duplicates possible?
- [ ] Can the array be empty?

### Boundaries

- [ ] What does \`low\` represent?
- [ ] What does \`high\` represent?
- [ ] Is \`high\` inclusive or exclusive?
- [ ] Is the initial range correct?

### Midpoint

- [ ] Is the midpoint calculation safe?
- [ ] Does the midpoint stay inside the intended range?
- [ ] Do you need lower or upper midpoint?

### Updates

- [ ] Does \`low\` actually increase?
- [ ] Does \`high\` actually decrease?
- [ ] Are you accidentally keeping \`mid\` when it has already been ruled out?

### Loop

- [ ] Should it be \`low <= high\`?
- [ ] Or \`low < high\`?
- [ ] Does every iteration reduce the search space?

### Result

- [ ] What should happen if the target isn't found?
- [ ] Are you looking for any occurrence or a specific occurrence?
- [ ] Could the result be equal to \`len(arr)\`?
- [ ] Are you accessing an index after checking it is valid?

### Answer-space binary search

- [ ] Is the condition monotonic?
- [ ] Does the initial range contain the answer?
- [ ] Are calculations protected against overflow?
- [ ] Are your lower/upper bounds meaningful?

---

# 39. The 5 Bugs You MUST Remember for Exams/Interviews

If you don't have time to memorize everything, remember these five:

### 1. Off-by-one

\`\`\`python
low = mid + 1
high = mid - 1
\`\`\`

when \`mid\` has already been ruled out.

### 2. Wrong loop condition

Know the difference between:

\`\`\`python
low <= high
\`\`\`

and:

\`\`\`python
low < high
\`\`\`

### 3. Infinite loop

Make sure every iteration shrinks the range.

### 4. Midpoint overflow

Prefer:

\`\`\`python
mid = low + (high - low) // 2
\`\`\`

in fixed-width integer languages.

### 5. Wrong problem definition

Know whether you're searching for:

\`\`\`text
exact value
first occurrence
last occurrence
lower bound
upper bound
minimum answer
maximum answer
\`\`\`

---

## One-line memory trick

> **Binary Search doesn't usually fail because the idea is difficult; it fails because the programmer doesn't precisely define what \`low\`, \`high\`, \`mid\`, the loop condition, and the final answer mean.** 

If you understand those five things, most binary-search bugs become predictable rather than mysterious.

`;
