# Axolotl Json Manager

A lightweight and straightforward JSON file manager for Node.js.
Axolotl Json Manager provides a simple, static API to create, read, write, merge, and manipulate `.json` files with minimal boilerplate and zero external dependencies.

Designed for developers who want **full control**, **clean syntax**, and **no unnecessary abstractions**.

---

## Features

* **Zero Dependencies:** Built only with native Node.js modules (`fs`).
* **Automatic `.json` Handling:** File extensions are normalized automatically.
* **Static API:** No initialization required — just import and use.
* **Safe Operations:** Built-in checks to prevent accidental overwrites or deletions.
* **Dot-Path Support:** Easily write nested JSON structures (`a.b.c`).
* **Pretty Print Support:** Toggle formatted or minified JSON output.
* **ESM Ready:** Fully compatible with modern JavaScript (ES Modules).

---

## Installation

To install Axolotl Json Manager, clone the repository and run the installer script.

1. Clone the repository.
2. Execute `i.js` using Node.js.

The installer copies the library files into:

```
C:/axolotl/json/
```

⚠️ **Windows Note:**
The installer writes to a system directory. Run your terminal with **Administrator Privileges** to avoid permission errors.

---

## Usage

Import the library after installation:

```js
import axolotljson from "C:/axolotl/json/axolotl.js"
```

---

## API Reference

### Method: create

Creates a new JSON file.

```js
json.create("config", true)
```

* `pretty` (default: true) → formatted output
* `force` (default: false) → overwrite if file exists

---

### Method: read

Reads and parses a JSON file.

```js
const data = json.read("config")
```

Throws an error if the file doesn’t exist or contains invalid JSON.

---

### Method: write

Overwrites a JSON file with new data.

```js
json.write("config", { version: 1 })
```

---

### Method: addKey

Adds or updates a key in the root object.

```js
json.addKey("config", "debug", true)
```

---

### Method: removeKey

Removes a key from the JSON file.

```js
json.removeKey("config", "debug")
```

---

### Method: get

Retrieves a value by key.

```js
const version = json.get("config", "version")
```

---

### Method: addPath

Creates or updates nested paths using dot notation.

```js
json.addPath("config", "server.port", 25565)
```

Automatically creates missing objects.

---

### Method: exists

Checks if a JSON file exists.

```js
if (json.exists("config")) {
  // do something
}
```

---

### Method: delete

Deletes a JSON file.

```js
json.delete("config", true)
```

⚠️ Requires `force = true` to prevent accidental deletions.

---

### Method: merge

Merges multiple JSON files into one object.

```js
const merged = json.merge(true, "a", "b", "c")
```

Returns a **JSON string**, not a file.

---

## Technical Notes

* All file paths are automatically normalized to `.json`.
* Errors are explicit and descriptive.
* No runtime state — everything is file-based.
* Ideal for configs, saves, data stores, and lightweight persistence.

---

## License

Open-source.
Use it, modify it, break it, improve it — Axolotl style
