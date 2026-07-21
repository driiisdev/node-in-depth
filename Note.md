# Node.js

## Course Overview

- Terms & concepts to understand what Node.js is
- Modules (user defined)
- Built-in modules
- Node.js internals
- npm - Node Package Manager
- CLI tool
- Misc

---

## Terms & Concepts to Understand What Node.js Is

### ECMAScript Summary

- ECMA-262 is the language specification
- ECMAScript is the language that implements ECMA-262
- JavaScript is basically ECMAScript at its core but builds on top of that

### Chrome's V8 Engine Summary

- A JavaScript engine is a program that executes JavaScript code
- In 2008, Google created its own JavaScript engine called V8
- V8 is written in C++ and can be used independently or can be embedded into other C++ programs
- That allows you to write your own C++ programs which can do everything that V8 can do and more
- Your C++ program can run ECMAScript and additional features that you choose to incorporate
- For example, features that are available in C++ but not available with JavaScript

### Chrome Browser JavaScript Engine

![Chrome Browser JavaScript Engine](assets/img/chrome%20browser%20javascript%20engine.png)

### Node.js Summary

- Node.js is an open source, cross platform JavaScript runtime environment
- It is not a language, it is not a framework
- Capable of executing JavaScript code outside a browser
- It can execute not only the standard ECMAScript language but also new features that are made available through C++ bindings using the V8 engine
- It consists of C++ files which form the core features and JavaScript files which expose common utilities and some of the C++ features for easier consumption

![Node.js JavaScript Runtime](assets/img/nodejs%20javascript%20runtime.png)

### Executing JavaScript with Node

1. **Node REPL**
   - Read
   - Evaluate
   - Print
   - Loop

2. **Executing code in a JavaScript file in the command line**

### Browser vs Node.js

- In the browser, most of the time what you are doing is interacting with the DOM, or other web platform APIs like cookies. You don't have the `document`, `window` and all the other objects that are provided by the browser
- In the browser, we don't have all the nice APIs that Node.js provides through its modules. For example the file-system access functionality
- With Node.js, you control the environment
- With a browser, you are at the mercy of what the users choose

---

## Modules

- A module is an encapsulated and reusable chunk of code that has its own context
- In Node.js, each file is treated as a separate module

### Types of Modules

- **Local modules** - modules that we create in our application
- **Built-in modules** - modules that Node.js ships with out of the box
- **Third party modules** - modules written by other developers that we can use in our application

### CommonJS

- CommonJS is a standard that states how a module should be structured and shared
- Node.js adopted CommonJS when it started out and is what you will see in code bases

### Local Modules Summary

- In Node.js, each file is a module that is isolated by default
- To load a module into another file, we use the `require` functionality
- When `index.js` is executed, the code in the module is also executed
- If the file we are requiring is a JavaScript file, we can skip specifying the extension and Node.js will infer it on our behalf

### Module Scope Summary

- Each loaded module in Node.js is wrapped with an IIFE that provides private scoping of code
- IIFE allows you to repeat variable or function names without any conflicts

![IIFE in Node.js](assets/img/iife.png)

### Module Wrapper

- Every module in Node.js gets wrapped in an IIFE before being loaded
- IIFE helps keep top-level variables scoped to the module rather than the global object
- The IIFE that wraps every module contains 5 parameters which are pretty important for the functioning of a module

![Module Wrapper - before wrapping](assets/img/module%20wrapper%281%29.png)

![Module Wrapper - wrapped in an IIFE](assets/img/module%20wrapper%282%29.png)

![Module Wrapper - with its 5 parameters](assets/img/module%20wrapper%283%29.png)

### ES Modules Summary

- ES Modules is the ECMAScript standard for modules
- It was introduced with ES2015
- Node.js 14 and above support ES Modules
- Instead of `module.exports`, we use the `export` keyword
- The export can be default or named
- We import the exported variables or functions using the `import` keyword
- If it is a default export, we can assign any name while importing
- If it is a named export, the import name must be the same
