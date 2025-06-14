# Doxygen Snippet Generator

Doxygen Snippet Generator is a Visual Studio Code extension that helps developers easily create and manage code snippets formatted for Doxygen documentation.

---

## ✨ Features

- Right-click any selected code and generate a Doxygen-compatible snippet.
- Automatically adds the snippet to `snippets/snippet.c`.
- Automatically updates `snippets/copy_from_here.c` with the proper Doxygen comment block for quick copy-paste.
- Prevents duplicate snippet names.
- Seamless integration with your existing workspace.

---

## 📦 Usage

1. **Select Code**  
   Highlight any code you want to turn into a Doxygen snippet.

2. **Right Click → Add to Doxygen Snippet**  
   Or open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run `Add to Doxygen Snippet`.

3. **Name Your Snippet**  
   Enter a unique snippet name when prompted.

4. **Files Updated Automatically**
   - `snippets/snippet.c`: Stores the actual code snippet.
   - `snippets/copy_from_here.c`: Contains a ready-to-copy Doxygen snippet reference like:
     ```c
     /**
      * \snippet snippets/snippet.c YOUR_SNIPPET_NAME
      */
     ```

---

## 🧠 Why Use This?

Doxygen Snippet Generator streamlines the process of creating, referencing, and managing code snippets in large C/C++ codebases. It improves documentation consistency and helps keep snippets organized.

---

## 🛠️ Development

### Build & Run
```bash
npm install
npm run compile
