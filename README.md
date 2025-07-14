# Python Tutorial with Interactive Code Editors

A web-based Python tutorial for complete beginners featuring interactive code editors powered by Brython that allow users to write and execute Python code directly in the browser.

## Features

- **Interactive Python Code Editors**: Write and execute Python code directly in the browser without any server-side processing
- **Step-by-Step Lessons**: Progressive tutorials from basic to more advanced Python concepts
- **Practice Exercises**: Reinforcement exercises with solutions
- **Additional Resources**: Links to external resources for continued learning

## How It Works

The interactive code editors are implemented using [Brython](https://brython.info/), a JavaScript implementation of Python 3. The system:

1. Uses embedded Python scripts that run directly in the browser
2. Captures standard output from Python code execution
3. Displays results in real-time
4. Provides error handling for Python exceptions

## Technical Implementation

The interactive editors are implemented using embedded Python scripts that run directly in the browser. Each editor consists of:

- A textarea element for code input
- A div element for displaying output
- Run and Reset buttons

The Brython implementation uses:
- A `run_code()` function that captures stdout and executes the Python code
- A `reset_editor()` function to restore default code
- A `StringIO` class to capture standard output
- A `setup_editors()` function that initializes all editors on a page

## File Structure

```
PythonTutorial/
├── tutorials/
│   ├── index.html              # Home page
│   ├── js/                     # JavaScript resources
│   ├── css/                    # CSS stylesheets
│   ├── images/                 # Image assets
│   └── lessons/
│       ├── 01-getting-started.html
│       ├── 02-python-basics.html
│       ├── 03-control-flow.html
│       ├── exercises.html
│       └── resources.html
└── README.md                   # This file
```

## Running the Tutorial

Open the `tutorials/index.html` file in a modern web browser. No server-side setup is required since all code execution happens in the browser.

## Browser Compatibility

The tutorial works best in modern browsers that support the latest JavaScript features:
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Extending the Tutorial

To add a new interactive editor to a page:

1. Add the HTML structure for the editor:
   ```html
   <div class="code-editor-container">
     <textarea id="editor1" class="code-editor">print("Hello, world!")</textarea>
     <div class="editor-controls">
       <button id="run1" class="run-button">Run</button>
       <button id="reset1" class="reset-button">Reset</button>
     </div>
     <div id="output1" class="code-output">Output will appear here...</div>
   </div>
   ```

2. Make sure each editor has a unique ID number (e.g., editor1, editor2)
3. The initialization is handled automatically by the script

## License

This project is open source and available under the [MIT License](LICENSE).
