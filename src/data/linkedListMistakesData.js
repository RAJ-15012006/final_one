export const linkedListMistakesMarkdown = `# 1. First Understand the Basic Structure

A singly linked list looks like:

\`\`\`text
HEAD
 ↓
[10 | •] → [20 | •] → [30 | NULL]
\`\`\`

Each node contains:

\`\`\`text
[data | next]
\`\`\`

- \`data\` → stores the value
- \`next\` → stores the address/reference of the next node
- \`head\` → points to the first node
- Last node's \`next\` → \`NULL\` / \`nullptr\`

The **head is extremely important** because it is your entry point to the entire list. If you lose the head without saving it, the rest of the list can become unreachable.

---

# 2. Mistake: Losing the \`head\` Pointer

### ❌ Wrong idea

\`\`\`cpp
while (head != NULL) {
    cout << head->data;
    head = head->next;
}
\`\`\`

The traversal itself works, but afterward \`head == NULL\`.

You have destroyed your original starting reference.

### ✅ Correct

Use another pointer:

\`\`\`cpp
Node* current = head;

while (current != NULL) {
    cout << current->data;
    current = current->next;
}
\`\`\`

### Key point

> **Never move \`head\` just for traversal.**

Use:

\`\`\`text
head → first node
current → moves through list
\`\`\`

### Remember

\`\`\`text
HEAD = permanent entry point
CURRENT = moving pointer
\`\`\`

This is one of the most common beginner mistakes.

---

# 3. Mistake: Dereferencing \`NULL\`

Suppose:

\`\`\`cpp
Node* head = NULL;
\`\`\`

Then this is dangerous:

\`\`\`cpp
cout << head->data;
\`\`\`

Because there is no node.

It can produce a segmentation fault/access violation.

### ❌ Wrong

\`\`\`cpp
cout << head->data;
\`\`\`

### ✅ Correct

\`\`\`cpp
if (head != NULL) {
    cout << head->data;
}
\`\`\`

Or:

\`\`\`cpp
if (head == NULL) {
    return;
}
\`\`\`

### Important rule

Before doing:

\`\`\`cpp
ptr->data
ptr->next
ptr->prev
\`\`\`

make sure \`ptr\` is valid.

University linked-list material specifically identifies dereferencing a NULL/uninitialized pointer as a major pointer bug.

---

# 4. Mistake: Forgetting the Empty List Case

This is a bigger issue than it looks.

You should always think about:

\`\`\`text
Case 1 → Empty list
Case 2 → One node
Case 3 → Two nodes
Case 4 → Multiple nodes
\`\`\`

For example:

\`\`\`text
head → NULL
\`\`\`

is a perfectly valid linked list representing an empty list.

### Before insertion/deletion, ask:

> What happens if \`head == NULL\`?

Many linked-list bugs occur because students write code assuming at least one node exists.

---

# 5. Mistake: Wrong Order During Insertion

This is **extremely important**.

Suppose:

\`\`\`text
10 → 20 → 30 → NULL
\`\`\`

You want:

\`\`\`text
10 → 15 → 20 → 30
\`\`\`

You have:

\`\`\`text
prev = 10
newNode = 15
\`\`\`

### ✅ Correct order

\`\`\`cpp
newNode->next = prev->next;
prev->next = newNode;
\`\`\`

Think:

\`\`\`text
Before:

prev → 20

After first:
prev → 20
new  → 20

After second:
prev → new → 20
\`\`\`

### ❌ Dangerous order

\`\`\`cpp
prev->next = newNode;
newNode->next = prev->next;
\`\`\`

After the first statement:

\`\`\`text
prev → new
\`\`\`

Now \`prev->next\` is already \`new\`.

So:

\`\`\`cpp
newNode->next = prev->next;
\`\`\`

becomes:

\`\`\`text
new → new
\`\`\`

The original \`20 → 30\` chain may be lost.

### Golden rule

> **SAVE/LINK the old next first. THEN change the existing pointer.**

This ordering principle is repeatedly emphasized in linked-list teaching material.

---

# 6. Mistake: Incorrect Insertion at the Beginning

Suppose:

\`\`\`text
10 → 20 → 30
\`\`\`

You want to insert \`5\`.

### ❌ Wrong

\`\`\`cpp
head = newNode;
newNode->next = head;
\`\`\`

Now:

\`\`\`text
head
 ↓
5
↑
└── next
\`\`\`

The new node points to itself.

The old list is lost.

### ✅ Correct

\`\`\`cpp
newNode->next = head;
head = newNode;
\`\`\`

Result:

\`\`\`text
5 → 10 → 20 → 30 → NULL
\`\`\`

### Memorize this:

\`\`\`cpp
newNode->next = head;
head = newNode;
\`\`\`

**Not the other way around.**

---

# 7. Mistake: Forgetting to Update \`head\` After Deleting First Node

Suppose:

\`\`\`text
head
 ↓
10 → 20 → 30
\`\`\`

Delete \`10\`.

### ❌ Wrong thinking

Only changing some internal pointer won't work because \`10\` is the head.

### ✅ Correct

\`\`\`cpp
Node* temp = head;
head = head->next;
delete temp;
\`\`\`

Result:

\`\`\`text
head
 ↓
20 → 30 → NULL
\`\`\`

### Key idea

> Whenever the first node is removed, **head must change**.

This is why deleting the head is a special boundary case.

---

# 8. Mistake: Deleting a Node Before Saving Its \`next\`

This is a classic memory bug.

### ❌ Wrong

\`\`\`cpp
delete current;
current = current->next;
\`\`\`

After:

\`\`\`cpp
delete current;
\`\`\`

\`current\` no longer refers to a valid object.

Using:

\`\`\`cpp
current->next
\`\`\`

after deletion is invalid.

### ✅ Correct

\`\`\`cpp
Node* nextNode = current->next;
delete current;
current = nextNode;
\`\`\`

### Golden rule

> **If you need a pointer from a node, save it BEFORE deleting/freeing that node.**

This applies especially in C/C++.

---

# 9. Mistake: Not Updating the Tail

If your implementation maintains both:

\`\`\`text
head
tail
\`\`\`

you have to update **both** when necessary.

Example:

\`\`\`text
head
 ↓
10 → 20
      ↑
     tail
\`\`\`

Delete \`20\`.

Correct result:

\`\`\`text
head
 ↓
10 → NULL
↑
tail
\`\`\`

So:

\`\`\`cpp
tail = 10;
\`\`\`

must happen.

An especially common bug is when the list becomes empty:

\`\`\`text
Before:
head → 10
tail → 10

After deletion:

head → NULL
tail → ???   ❌
\`\`\`

Correct:

\`\`\`text
head → NULL
tail → NULL
\`\`\`

Stanford and Clemson teaching material specifically highlight head/tail consistency and the empty-list transition as important sources of bugs.

---

# 10. Mistake: Forgetting the One-Node Case

Students often test:

\`\`\`text
10 → 20 → 30
\`\`\`

but forget:

\`\`\`text
10 → NULL
\`\`\`

Consider deleting the only node.

### Before

\`\`\`text
head
 ↓
10 → NULL
 ↑
tail
\`\`\`

### After

\`\`\`text
head → NULL
tail → NULL
\`\`\`

Both must be updated.

### Testing rule

Whenever you write insertion/deletion code, test:

\`\`\`text
0 nodes
1 node
2 nodes
3+ nodes
\`\`\`

These small cases expose pointer bugs very quickly.

---

# 11. Mistake: Off-by-One Error

Suppose:

\`\`\`text
10 → 20 → 30 → 40
\`\`\`

You want to insert after \`20\`.

You need to stop at:

\`\`\`text
20
\`\`\`

not:

\`\`\`text
30
\`\`\`

For deletion, you often need the **previous node**, not the node being deleted.

For example, deleting \`30\`:

\`\`\`text
10 → 20 → 30 → 40
      ↑     ↑
     prev  target
\`\`\`

Then:

\`\`\`cpp
prev->next = target->next;
\`\`\`

Result:

\`\`\`text
10 → 20 → 40
\`\`\`

### Key question

Before writing the loop, ask:

> **What node do I actually need when the loop stops?**

This eliminates many off-by-one errors.

---

# 12. Mistake: Wrong Traversal Condition

### Common correct traversal

\`\`\`cpp
Node* current = head;

while (current != NULL) {
    cout << current->data;
    current = current->next;
}
\`\`\`

### Common mistake

\`\`\`cpp
while (current->next != NULL)
\`\`\`

This stops before processing the last node.

Example:

\`\`\`text
10 → 20 → 30 → NULL
\`\`\`

It processes:

\`\`\`text
10
20
\`\`\`

but misses:

\`\`\`text
30
\`\`\`

### Remember

If you want to process **every node**:

\`\`\`cpp
while (current != NULL)
\`\`\`

If you specifically need the **last node's previous node**, then a condition involving \`current->next\` may be appropriate.

Don't use loop conditions mechanically. Decide what node you need first.

---

# 13. Mistake: Forgetting to Move the Pointer

### ❌

\`\`\`cpp
while (current != NULL) {
    cout << current->data;
}
\`\`\`

\`current\` never changes.

So:

\`\`\`text
current → 10
current → 10
current → 10
...
\`\`\`

Infinite loop.

### ✅

\`\`\`cpp
while (current != NULL) {
    cout << current->data;
    current = current->next;
}
\`\`\`

### Key point

Every traversal needs:

\`\`\`text
CHECK → USE → MOVE
\`\`\`

\`\`\`cpp
while (current != NULL) {
    // use current
    current = current->next;   // move
}
\`\`\`

---

# 14. Mistake: Creating New Nodes While Traversing

Suppose you only want to print/search the list.

You don't need:

\`\`\`cpp
new Node(...)
\`\`\`

for every traversal step.

You only need a pointer:

\`\`\`cpp
Node* current = head;
\`\`\`

Then:

\`\`\`cpp
current = current->next;
\`\`\`

Creating unnecessary nodes can cause memory leaks and unnecessary memory usage. RPI specifically lists allocating new nodes merely to step through a list as a common mistake.

---

# 15. Mistake: Confusing \`.\` and \`->\`

In C++:

If you have an actual object:

\`\`\`cpp
Node node;
\`\`\`

use:

\`\`\`cpp
node.data;
\`\`\`

If you have a pointer:

\`\`\`cpp
Node* ptr;
\`\`\`

use:

\`\`\`cpp
ptr->data;
\`\`\`

### Remember

\`\`\`text
Object       → .
Pointer      → ->
\`\`\`

Example:

\`\`\`cpp
Node n;
n.data = 10;
\`\`\`

versus:

\`\`\`cpp
Node* n = new Node();
n->data = 10;
\`\`\`

RPI lists confusion between \`.\` and \`->\` as a common linked-list implementation mistake.

---

# 16. Mistake: Forgetting the Last Node's \`NULL\`

A normal singly linked list should terminate:

\`\`\`text
10 → 20 → 30 → NULL
\`\`\`

Not:

\`\`\`text
10 → 20 → 30 → ??? 
\`\`\`

If the last node doesn't correctly terminate, traversal may continue into invalid memory or behave unpredictably.

### Correct

\`\`\`cpp
newNode->next = NULL;
\`\`\`

or in modern C++:

\`\`\`cpp
newNode->next = nullptr;
\`\`\`

RPI specifically lists failure to set the final pointer to \`NULL\` as a common mistake.

---

# 17. Mistake: Dangling Pointer

A dangling pointer is a pointer that still refers to memory/object that is no longer valid.

Example:

\`\`\`cpp
Node* ptr = new Node();
delete ptr;
\`\`\`

Now:

\`\`\`text
ptr → ❌ deleted object
\`\`\`

\`ptr\` still contains an address, but the object is gone.

Using it is dangerous:

\`\`\`cpp
cout << ptr->data;   // ❌
\`\`\`

### Better habit

After deleting when appropriate:

\`\`\`cpp
delete ptr;
ptr = nullptr;
\`\`\`

The University of Michigan linked-list material identifies dangling pointers and accessing freed elements as major linked-list bugs.

---

# 18. Mistake: Memory Leak

Suppose:

\`\`\`cpp
Node* p = new Node();
\`\`\`

and you lose the only pointer to it:

\`\`\`cpp
p = nullptr;
\`\`\`

The allocated object still exists, but you no longer have a way to reach it.

That memory cannot be properly reclaimed.

This is a **memory leak**.

For an entire linked list in C/C++, you should eventually release all dynamically allocated nodes.

Conceptually:

\`\`\`text
head
 ↓
10 → 20 → 30 → NULL
\`\`\`

Free/delete:

\`\`\`text
10
20
30
\`\`\`

not merely the head pointer.

University course material explicitly warns that deallocating only the head without walking through the list can leak the remaining nodes.

---

# 19. Mistake: Breaking the List During Deletion

Suppose:

\`\`\`text
10 → 20 → 30 → 40
\`\`\`

You want to remove \`30\`.

You need:

\`\`\`text
20 → 40
\`\`\`

### Correct

\`\`\`cpp
Node* temp = current->next;
current->next = temp->next;
delete temp;
\`\`\`

The important operation is:

\`\`\`cpp
current->next = temp->next;
\`\`\`

before deleting the node.

Think:

\`\`\`text
Before:

20 → 30 → 40

After reconnecting:

20 ─────→ 40

30 → isolated

Then delete 30
\`\`\`

The goal is:

> **Reconnect the list first, delete the unwanted node second.**

---

# 20. Mistake: Reversing a Linked List Incorrectly

Original:

\`\`\`text
10 → 20 → 30 → NULL
\`\`\`

Expected:

\`\`\`text
30 → 20 → 10 → NULL
\`\`\`

A common mistake is changing:

\`\`\`cpp
current->next = previous;
\`\`\`

before saving the original \`next\`.

### ❌ Dangerous

\`\`\`cpp
current->next = previous;
current = current->next;
\`\`\`

You have already overwritten the path to the next node.

### ✅ Correct three-pointer approach

\`\`\`cpp
Node* prev = NULL;
Node* current = head;

while (current != NULL) {
    Node* next = current->next;

    current->next = prev;

    prev = current;
    current = next;
}

head = prev;
\`\`\`

Think:

\`\`\`text
prev
current
next
\`\`\`

### Golden rule

> **SAVE → REWIRE → MOVE**

This same principle appears repeatedly in correct linked-list manipulation.

---

# 21. Mistake: Forgetting to Update \`head\` After Reversal

After reversal:

\`\`\`text
Original:
head
 ↓
10 → 20 → 30
\`\`\`

After pointer reversal:

\`\`\`text
30 → 20 → 10
\`\`\`

The new first node is \`30\`.

Therefore:

\`\`\`cpp
head = prev;
\`\`\`

must happen.

Otherwise \`head\` may still refer to the old first node.

---

# 22. Mistakes in Doubly Linked Lists

A doubly linked node contains:

\`\`\`text
[prev | data | next]
\`\`\`

Example:

\`\`\`text
NULL ← 10 ⇄ 20 ⇄ 30 → NULL
\`\`\`

Here you must maintain **two directions**.

For deleting \`20\`:

### Before

\`\`\`text
10 ⇄ 20 ⇄ 30
\`\`\`

### Correct

\`\`\`cpp
current->prev->next = current->next;

if (current->next != NULL)
    current->next->prev = current->prev;
\`\`\`

Result:

\`\`\`text
10 ⇄ 30
\`\`\`

### Common mistake

Updating only:

\`\`\`cpp
10.next = 30;
\`\`\`

but forgetting:

\`\`\`cpp
30.prev = 10;
\`\`\`

Then forward traversal might work while backward traversal is corrupted.

This is one of the defining pitfalls of doubly linked lists.

---

# 23. Mistake: Assuming \`prev\` Always Exists

In a doubly linked list:

\`\`\`text
NULL ← 10 ⇄ 20 ⇄ 30 → NULL
\`\`\`

For the first node:

\`\`\`text
10.prev == NULL
\`\`\`

For the last node:

\`\`\`text
30.next == NULL
\`\`\`

So this can be dangerous:

\`\`\`cpp
current->prev->next = current->next;
\`\`\`

if \`current\` is the first node.

You need to handle boundaries.

---

# 24. Mistake: Cycle / Infinite Loop

A normal list:

\`\`\`text
10 → 20 → 30 → NULL
\`\`\`

A cyclic list:

\`\`\`text
10 → 20 → 30
     ↑       |
     └───────┘
\`\`\`

There is no \`NULL\`.

A normal traversal:

\`\`\`cpp
while (current != NULL)
\`\`\`

will never terminate.

### Common causes

A pointer accidentally points backward:

\`\`\`cpp
node->next = previous;
\`\`\`

or points to itself:

\`\`\`cpp
node->next = node;
\`\`\`

### Debugging clue

If your program keeps printing:

\`\`\`text
10 20 30 10 20 30 10 20...
\`\`\`

you may have created a cycle.

University material recommends consistency checking and loop detection when debugging linked lists.

---

# 25. Mistake: Incorrect Cycle Detection Condition

For Floyd's cycle detection:

\`\`\`cpp
slow = slow->next;
fast = fast->next->next;
\`\`\`

You cannot blindly do this if \`fast\` or \`fast->next\` is \`NULL\`.

Typical safe condition:

\`\`\`cpp
while (fast != NULL && fast->next != NULL)
\`\`\`

Then:

\`\`\`cpp
slow = slow->next;
fast = fast->next->next;
\`\`\`

The important idea is:

\`\`\`text
Before moving fast 2 steps:

fast       != NULL
fast->next != NULL
\`\`\`

---

# 26. Mistake: Wrong Complexity Assumptions

Linked lists are **not automatically faster than arrays**.

A common misconception is:

> "Insertion in linked list is always O(1)."

Not true.

If you already have the exact node/reference:

\`\`\`text
insert after known node → O(1)
\`\`\`

But if you first need to search for that location:

\`\`\`text
search → O(n)
insertion → O(1)
overall → O(n)
\`\`\`

Similarly, random access:

\`\`\`cpp
list[50]
\`\`\`

is not naturally O(1) in a linked list.

You must walk through the nodes.

University sources emphasize that linked lists trade fast random access for easier insertion/deletion when the relevant position is already known.

---

# 27. The Most Important Pointer Rule

This is probably the **single most useful rule** to remember:

## ⭐ NEVER OVERWRITE A POINTER BEFORE SAVING WHAT IT CURRENTLY POINTS TO.

Example:

\`\`\`cpp
Node* next = current->next;
\`\`\`

Then:

\`\`\`cpp
current->next = previous;
\`\`\`

Then:

\`\`\`cpp
current = next;
\`\`\`

Think:

\`\`\`text
SAVE → CHANGE → MOVE
\`\`\`

This principle helps with:

- insertion
- deletion
- reversal
- traversal
- memory cleanup
- merging lists

---

# 28. Edge Cases You MUST Test

Whenever you write linked-list code, don't test only:

\`\`\`text
10 → 20 → 30 → 40
\`\`\`

That's too easy.

Test these:

### Case 1 — Empty

\`\`\`text
NULL
\`\`\`

### Case 2 — One node

\`\`\`text
10 → NULL
\`\`\`

### Case 3 — Two nodes

\`\`\`text
10 → 20 → NULL
\`\`\`

### Case 4 — Delete head

\`\`\`text
10 → 20 → 30
↑
delete
\`\`\`

### Case 5 — Delete tail

\`\`\`text
10 → 20 → 30
          ↑
        delete
\`\`\`

### Case 6 — Delete only node

\`\`\`text
10
\`\`\`

Result:

\`\`\`text
NULL
\`\`\`

### Case 7 — Insert at beginning

\`\`\`text
new → old head
\`\`\`

### Case 8 — Insert at end

Make sure:

\`\`\`text
oldTail->next = newNode
newNode->next = NULL
\`\`\`

### Case 9 — Search for missing element

\`\`\`text
10 → 20 → 30

search 50
\`\`\`

Should safely report not found.

### Case 10 — Repeated operations

\`\`\`text
insert
delete
insert
delete
empty
insert again
\`\`\`

This is particularly useful for catching stale \`head\`/\`tail\` pointers.

---

# 29. A Practical Debugging Method

When your linked-list code isn't working, **don't randomly change pointers**. That's how you make the problem worse.

Use this method.

### Step 1 — Draw the list

Example:

\`\`\`text
head
 ↓
10 → 20 → 30 → NULL
\`\`\`

### Step 2 — Write every pointer

For example:

\`\`\`text
prev = 10
current = 20
next = 30
\`\`\`

### Step 3 — Execute ONE pointer operation

Example:

\`\`\`cpp
current->next = prev;
\`\`\`

Draw the result.

### Step 4 — Check whether the rest of the list is still reachable.

Ask:

> Can I still reach every node from \`head\`?

### Step 5 — Check termination

Ask:

> Does the final node eventually reach NULL?

### Step 6 — Check head/tail

Ask:

\`\`\`text
Is head correct?
Is tail correct?
\`\`\`

### Step 7 — Check memory

If using C/C++:

\`\`\`text
Did I delete/free the correct node?
Am I accessing a deleted node?
Did I leak a node?
\`\`\`

Stanford specifically recommends drawing memory diagrams when learning linked lists because pointer manipulation is difficult to reason about mentally.

---

# 30. The Linked List Invariants You Should Memorize

An **invariant** is something that should remain true if the list is correctly maintained.

## Singly Linked List

For:

\`\`\`text
head → A → B → C → NULL
\`\`\`

check:

### Invariant 1

\`\`\`text
head == NULL
\`\`\`

means the list is empty.

### Invariant 2

The last node must have:

\`\`\`text
next == NULL
\`\`\`

### Invariant 3

Every reachable node should eventually lead toward the end.

### Invariant 4

There should not be an accidental cycle unless you're intentionally implementing a circular list.

### Invariant 5

If maintaining \`tail\`:

\`\`\`text
tail != NULL
\`\`\`

for a non-empty list.

And:

\`\`\`text
tail->next == NULL
\`\`\`

### Invariant 6 — Doubly linked list

For adjacent nodes:

\`\`\`text
A.next = B
\`\`\`

should correspond to:

\`\`\`text
B.prev = A
\`\`\`

University material specifically recommends checking these consistency relationships when debugging linked lists.

---

# 31. Quick Mistake → Solution Table

| Mistake | Problem | Solution |
|---|---|---|
| Moving \`head\` during traversal | Lose starting reference | Use \`current\` |
| Dereferencing NULL | Crash | Check pointer first |
| Wrong insertion order | Lose remaining list | Save old \`next\` first |
| Wrong head insertion | Self-loop/lost list | \`new->next=head; head=new\` |
| Forgetting head update | Wrong first node | Update \`head\` |
| Forgetting tail update | Invalid tail | Update \`tail\` |
| Forgetting one-node case | Boundary bug | Test 1-node list |
| Wrong loop condition | Miss last node | Choose condition carefully |
| Not moving \`current\` | Infinite loop | \`current=current->next\` |
| Delete before saving next | Use-after-free | Save \`next\` first |
| Forgetting \`NULL\` termination | Invalid traversal | Last \`next = NULL\` |
| Memory leak | Wasted memory | Free/delete every allocated node |
| Dangling pointer | Pointer to deleted object | Don't access after delete |
| Wrong reverse order | Lose nodes | \`SAVE → REWIRE → MOVE\` |
| Forgetting new head after reverse | Wrong head | \`head = prev\` |
| Doubly list only updates \`next\` | Broken backward traversal | Update \`prev\` too |
| Cycle created accidentally | Infinite traversal | Check pointer links |
| Off-by-one | Wrong node modified | Draw positions first |
| Assuming insertion always O(1) | Wrong complexity | Search may cost O(n) |
| Using \`new\` for traversal | Unnecessary allocations | Use pointer variable |

These categories align closely with the recurring bugs identified across university teaching material and linked-list references.

---

# 🧠 32. The 10 Rules I Want You to Memorize

If you're preparing for DSA/interviews, don't try to memorize 50 separate bugs. Memorize these **10 rules**:

### Rule 1
**Never lose \`head\`.**

\`\`\`cpp
Node* current = head;
\`\`\`

### Rule 2
**Check NULL before dereferencing.**

\`\`\`cpp
if (current != NULL)
\`\`\`

### Rule 3
**Save \`next\` before changing \`next\`.**

\`\`\`cpp
Node* next = current->next;
\`\`\`

### Rule 4
**Save pointers before deleting nodes.**

\`\`\`cpp
Node* next = current->next;
delete current;
\`\`\`

### Rule 5
**Insertion order matters.**

\`\`\`cpp
newNode->next = prev->next;
prev->next = newNode;
\`\`\`

### Rule 6
**When deleting the first node, update \`head\`.**

### Rule 7
**When using \`tail\`, keep it synchronized with \`head\`.**

### Rule 8
**Always test 0, 1, 2 and many nodes.**

### Rule 9
**For doubly linked lists, update both directions.**

\`\`\`text
next
prev
\`\`\`

### Rule 10
**Draw the pointers when confused.**

Don't guess.

---

# 🔥 Final Mental Model

Whenever you modify a linked list, think:

\`\`\`text
             ┌───────────────┐
             ↓               │
HEAD → [DATA | NEXT] → [DATA | NEXT] → NULL
\`\`\`

Then ask **five questions**:

### ① What node am I currently on?

\`\`\`text
current?
\`\`\`

### ② What node will I need after changing the pointer?

\`\`\`text
next?
\`\`\`

### ③ Am I about to overwrite a pointer?

If yes:

\`\`\`text
SAVE IT FIRST.
\`\`\`

### ④ Does \`head\` need to change?

Especially for:

\`\`\`text
insert at beginning
delete beginning
reverse
\`\`\`

### ⑤ Does \`tail\` need to change?

Especially for:

\`\`\`text
insert at end
delete end
delete last remaining node
\`\`\`

If you develop this habit, linked lists stop being a "pointer guessing game." The actual logic becomes **preserving the chain while changing only the links you intend to change**. Stanford's linked-list teaching material similarly emphasizes careful pointer manipulation, memory diagrams, and debugging practice because these are the core difficulty of the topic.
`;
