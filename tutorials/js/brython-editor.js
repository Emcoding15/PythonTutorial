// Python Tutorial - Interactive Code Editor

function setupCodeEditors() {
    // Find all code editor containers
    const codeContainers = document.querySelectorAll('.interactive-python');
    
    codeContainers.forEach((container, index) => {
        // Create unique IDs for each editor component
        const editorId = `editor-${index}`;
        const outputId = `output-${index}`;
        const runBtnId = `run-btn-${index}`;
        const resetBtnId = `reset-btn-${index}`;
        
        // Get the default code (if any)
        const defaultCode = container.getAttribute('data-code') || '# Type your Python code here\nprint("Hello, World!")';
        
        // Create the editor components
        const editorContainer = document.createElement('div');
        editorContainer.className = 'editor-container';
        
        editorContainer.innerHTML = `
            <div class="editor-header">
                <span>Python Code Editor</span>
                <div class="editor-buttons">
                    <button id="${runBtnId}" class="run-btn">Run Code</button>
                    <button id="${resetBtnId}" class="reset-btn">Reset</button>
                </div>
            </div>
            <textarea id="${editorId}" class="code-editor">${defaultCode}</textarea>
            <div class="output-header">Output:</div>
            <div id="${outputId}" class="code-output"></div>
        `;
        
        // Add editor to container
        container.appendChild(editorContainer);
        
        // Set up run button event
        document.getElementById(runBtnId).addEventListener('click', function() {
            runPythonCode(editorId, outputId);
        });
        
        // Set up reset button event
        document.getElementById(resetBtnId).addEventListener('click', function() {
            document.getElementById(editorId).value = defaultCode;
            document.getElementById(outputId).innerHTML = '';
        });
    });
}

function runPythonCode(editorId, outputId) {
    const code = document.getElementById(editorId).value;
    const outputElement = document.getElementById(outputId);
    
    // Clear previous output
    outputElement.innerHTML = '';
    
    // Check if Brython is available
    if (typeof window.__BRYTHON__ === 'undefined') {
        outputElement.innerHTML = '<span style="color: red;">Error: Brython is not initialized. Please refresh the page and try again.</span>';
        console.error('Brython is not defined when trying to run code');
        return;
    }
    
    console.log(`Executing Python code in editor ${editorId} with output to ${outputId}`);
    console.log('Brython object status:', {
        defined: typeof window.__BRYTHON__ !== 'undefined',
        hasRunScript: typeof window.__BRYTHON__.run_script === 'function',
        version: window.__BRYTHON__.$version_info || 'unknown'
    });

    // Create a simpler approach - create a hidden pre-element with the code
    // and a separate script that will access this element
    const codeContainerId = `code-container-${Date.now()}`;
    const codeContainer = document.createElement('pre');
    codeContainer.id = codeContainerId;
    codeContainer.style.display = 'none';
    codeContainer.textContent = code;
    document.body.appendChild(codeContainer);

    // Create a script element that will run the code
    const scriptId = `script-${Date.now()}`;
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/python';
    script.textContent = `
from browser import document, console
import sys

# Debug info
console.log("Python execution script started")

# Get references to elements
output_element = document.getElementById("${outputId}")
code_container = document.getElementById("${codeContainerId}")
user_code = code_container.text

# Function to handle output
def write_to_output(text, is_error=False):
    if is_error:
        output_element.innerHTML += f'<span style="color: red;">{text}</span>'
    else:
        output_element.innerHTML += text.replace("\\n", "<br>")

# Custom output handler
class OutputHandler:
    def write(self, text):
        write_to_output(text)
    def flush(self):
        pass

# Error handler
class ErrorHandler:
    def write(self, text):
        write_to_output(text, True)
    def flush(self):
        pass

# Store original stdout/stderr
original_stdout = sys.stdout
original_stderr = sys.stderr

try:
    # Redirect output
    sys.stdout = OutputHandler()
    sys.stderr = ErrorHandler()
    
    # Execute the code
    console.log("Executing user code")
    exec(user_code)
    console.log("User code executed successfully")
    
except Exception as e:
    console.error("Python execution error:", str(e))
    write_to_output(f"Error: {str(e)}", True)
    
finally:
    # Restore stdout/stderr
    sys.stdout = original_stdout
    sys.stderr = original_stderr
    
    # Clean up
    console.log("Python execution completed")
    document.body.removeChild(code_container)
    document.body.removeChild(document.getElementById("${scriptId}"))
`;

    try {
        console.log('Adding Python script to document');
        document.body.appendChild(script);
        
        // Execute the script
        console.log('Running Brython script');
        if (typeof window.__BRYTHON__ !== 'undefined' && typeof window.__BRYTHON__.run_script === 'function') {
            window.__BRYTHON__.run_script(script.id);
            console.log('Brython script execution completed');
        } else {
            console.error('Brython run_script function not available');
            outputElement.innerHTML = '<span style="color: red;">Error: Brython execution function not available</span>';
        }
    } catch (e) {
        console.error('JavaScript error during Brython execution:', e);
        outputElement.innerHTML = `<span style="color: red;">Execution Error: ${e.message || e}</span>`;
    }
}

// Function to check if Brython is fully loaded
function checkBrythonReady() {
    if (window.__BRYTHON__ && typeof window.__BRYTHON__.run_script === 'function') {
        console.log('Brython is ready, setting up editors');
        setupCodeEditors();
    } else {
        console.log('Waiting for Brython to load...');
        setTimeout(checkBrythonReady, 100);
    }
}

// Initialize Brython and set up editors when page is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for Brython');
    // Use a polling approach to make sure Brython is fully initialized
    checkBrythonReady();
}); 