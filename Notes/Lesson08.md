# Arithmetic in Solidity: Division

Understanding how division works in Solidity is essential to avoid unexpected behavior and runtime errors. This section focuses specifically on integer division and its characteristics in the Solidity language.

## Integer Division Behavior

- In Solidity, the **result type** of a division operation is **always the type of one of the operands**.
- When performing division on integers, the result is **rounded towards zero**.

### Example

int256(-5) / int256(2) == int256(-2)

This behavior differs from some other languages that round toward negative infinity in such cases.

## Division on Literals

- When you divide **numeric literals** (e.g., constants like `5 / 2`), the result can be a **fractional value with arbitrary precision**.
- This is useful in constant expressions or compile-time calculations, but it does **not apply to variables** of integer types.

## Division by Zero

- **Division by zero** causes a **Panic error** at runtime.
- This kind of check is **not suppressible** using `unchecked { ... }` blocks.
- Always ensure the denominator is **not zero** before performing division to avoid crashes.

## Summary

- Integer division always produces an integer result.
- Division rounds **towards zero**.
- Literal division may result in precise fractional values.
- Division by zero causes a **runtime panic** that cannot be disabled.

---


# Guide to `address` and `address payable` in Solidity

The `address` type in Solidity is used to store Ethereum addresses. There are two key variations:

- `address`: Holds a 20-byte Ethereum address. Not suitable for sending Ether directly.
- `address payable`: Same as `address`, but with built-in functions (`transfer` and `send`) for sending Ether.

---

## Why the Distinction?

The distinction helps make it **explicit** when an address is expected to receive Ether. This improves contract safety and readability.

- Introduced in Solidity **version 0.5.0**.
- Always use `address payable` when Ether is meant to be sent to the address.

---

## Type Conversions

Solidity supports both implicit and explicit conversions between address types and related data types.

### Implicit Conversion
- `address payable` → `address` (allowed automatically)

### Explicit Conversion
- `address` → `address payable` requires:
  - `payable(address)`

### Other Conversions
- `uint160`, integer literals, `bytes20`, and contract types can be **explicitly converted** to/from `address`.
- Only `address` and **contract types** can be converted to `address payable` using `payable(...)`.

> Exception: `payable(0)` is always valid.

> For contract types, the contract must have a `receive` or `payable fallback` function to convert to `address payable`.

---

## Operators with Address Types

You can use standard comparison operators with addresses:

- `<`
- `<=`
- `==`
- `!=`
- `>=`
- `>`

---

## Truncation Warning

If you convert a larger data type like `bytes32` to `address`, the result will be **truncated**.

- Since **Solidity v0.4.24**, the compiler requires **explicit confirmation** of truncation to avoid confusion.

---

## Members and Functions of Address Types

### 1. `balance`
- Returns the amount of **Ether** (in wei) held by the address.

### 2. `transfer(amount)`
- Sends Ether to a payable address.
- Reverts if:
  - The contract lacks sufficient balance.
  - The receiving contract rejects the transfer.
  - The called function runs out of gas.

### 3. `send(amount)`
- Similar to `transfer` but:
  - Returns `false` on failure.
  - Does **not revert** the transaction.
- **Warning**: Can fail silently, so it’s safer to use `transfer` or a **"pull" pattern**.

---

## Low-Level Functions

These functions allow raw interaction with other contracts:

### 1. `call`
- Low-level external function call.
- Accepts optional `{value: amount, gas: amount}`.
- Returns `(success, data)`.

### 2. `delegatecall`
- Executes **target contract’s code** in **current context**.
- Shares:
  - Storage
  - `msg.sender`
  - Balance
- Commonly used for library/delegated logic.

### 3. `staticcall`
- Executes code in **read-only** mode.
- Reverts if any **state change** is attempted.

#### Encoding Data
Use the following to encode the data for low-level calls:

- `abi.encode`
- `abi.encodePacked`
- `abi.encodeWithSelector`
- `abi.encodeWithSignature`

#### Notes
- Avoid hardcoding gas values.
- Only use low-level functions when absolutely necessary.
- Prefer direct calls (e.g., `contract.functionName()`) for safer interactions.

---

## `code` and `codehash`

### 1. `addr.code`
- Returns contract's bytecode as `bytes memory`.
- Empty for EOAs or non-existent contracts.

### 2. `addr.codehash`
- Returns a `bytes32` hash of the contract’s code.
- More gas-efficient than `keccak256(addr.code)`.
- May return:
  - `0x0` if the address is empty.
  - Hash of empty string if the address has a balance or nonce but no code.

---

## Best Practices

- Use `address payable` only when needed.
- Avoid `send` in favor of `transfer` or pull-based patterns.
- Avoid `delegatecall` unless implementing proxy or library logic.
- Use explicit conversions to prevent ambiguity.
- Always check for potential truncation when converting larger data types.


---


# Guide to Function and Type Modifiers in Solidity

Solidity provides a variety of **modifiers** that can be applied to functions, variables, and events to control behavior, visibility, and interaction with the Ethereum Virtual Machine (EVM).

---

## Function Modifiers

### 1. `pure`
- Used for functions that **do not read from or modify** the contract's state.
- No access to storage variables or blockchain data like `block.timestamp`.

**Example:**
- Mathematical calculations
- String manipulation

### 2. `view`
- Used for functions that **read** the state but **do not modify** it.
- Allows returning stored values.

**Example:**
- Getter functions

### 3. `payable`
- Marks a function as capable of **receiving Ether**.
- Required for sending ETH to the contract using `msg.value`.

**Example:**
- Deposit functions
- NFT mints with fees

---

## State Variable Modifiers

### 4. `constant`
- Used for state variables that are **set once at declaration** and never changed.
- Value is embedded in the contract's bytecode.
- Does **not occupy storage**.

**Example:**
- `uint256 public constant VERSION = 1;`

### 5. `immutable`
- Allows state variables to be **assigned once** in the constructor.
- Remains constant after deployment.
- Stored in contract **code**, not in storage.

**Example:**
- Owner address set at deployment

---

## Event Modifiers

### 6. `anonymous`
- When applied to an event, the **event signature** is **not stored** as the first topic.
- Makes the event slightly cheaper to log and harder to filter.

**Use Case:**
- Privacy-focused logs

### 7. `indexed`
- Applied to **event parameters**.
- Stores the parameter as a **topic** to allow easier **filtering** in the front-end or via Web3.

**Note:**
- Up to **3 parameters** can be indexed.

---

## Inheritance Modifiers

### 8. `virtual`
- Marks a **function or modifier** as **overridable** in derived (child) contracts.

**Use Case:**
- Base contract methods meant to be customized

### 9. `override`
- Indicates that a function, modifier, or public variable **replaces** a parent contract's implementation.

**Use Case:**
- Required when overriding `virtual` functions from a base contract.

---

## Summary Table

| Modifier   | Applies To         | Description                                                                 |
|------------|--------------------|-----------------------------------------------------------------------------|
| `pure`     | Function            | Disallows reading or modifying contract state                              |
| `view`     | Function            | Disallows modifying contract state                                         |
| `payable`  | Function            | Allows receiving Ether                                                     |
| `constant` | State Variable      | Cannot be modified after initialization; stored in bytecode                |
| `immutable`| State Variable      | Assigned only in constructor; remains constant; stored in bytecode         |
| `anonymous`| Event               | Omits event signature from topic list                                      |
| `indexed`  | Event Parameter     | Allows filtering logs by parameter                                         |
| `virtual`  | Function/Modifier   | Can be overridden in child contracts                                       |
| `override` | Function/Modifier/Variable | Overrides a `virtual` member from parent contracts                   |
# Loop Control Statements in Solidity

Solidity provides control statements that allow developers to manage the flow of loops, such as `for`, `while`, and `do...while`. These statements help handle conditions like early termination or skipping specific iterations.

---

## `break`

- Immediately exits the loop, regardless of whether the condition has been fully evaluated.
- Useful when a particular condition is met and further looping is unnecessary.

**Example:**

for (uint i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exits the loop when i is 5
    }
}

---

## `continue`

- Skips the remaining code in the current loop iteration.
- Proceeds directly to the next iteration of the loop.

**Example:**

for (uint i = 0; i < 5; i++) {
    if (i == 2) {
        continue; // Skips the rest of this iteration when i is 2
    }
    // This code will not run when i is 2
}

---

## Important Considerations for Loops in Solidity

### 1. Gas Costs

- Loops consume gas for each iteration.
- Long or complex loops can cause **out-of-gas** errors.
- Keep iterations minimal and efficient.

### 2. Bounded Iterations

- Always aim for loops with **fixed and known limits**.
- Avoid loops that depend on external or user-provided data, as they can become unbounded and expensive.

### 3. Reentrancy Risks

- Be very careful when calling **external contracts** within a loop.
- External calls can open your contract to **reentrancy attacks**, especially when transferring Ether.
- Use the **"pull" payment pattern**, where recipients claim their funds instead of being paid automatically in a loop.

---

## Summary

- Use `break` to exit a loop early.
- Use `continue` to skip to the next iteration.
- Avoid heavy or unbounded loops to save gas and prevent errors.
- Never send Ether in a loop without proper reentrancy protections.
