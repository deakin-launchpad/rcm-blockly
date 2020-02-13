var demoWorkspace = Blockly.inject('blocklyDiv',
  {
    media: '../../media/',
    toolbox: document.getElementById('toolbox')
  });
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
  demoWorkspace);

// Exit is used to signal the end of a script.
Blockly.JavaScript.addReservedWords('exit');

var outputArea = document.getElementById('output');
var codeOutputArea = document.getElementById('code-output');
var runButton = document.getElementById('runButton');
var myInterpreter = null;
var runner;

function blockStats() {
  const blockTypes = [
    {
      type: "rcm_action",
      name: "Action"
    },
    {
      type: "rcm_condition",
      name: "Condition"
    },
    {
      type: "rcm_scope",
      name: "Scope"
    },
    {
      type: CONSTANTS.rcm.requirement.id,
      name: CONSTANTS.rcm.requirement.name,
    },
    {
      type: "rcm_component",
      name: "Component"
    }
  ]
  var result = ""
  blockTypes.forEach(block => {
    let workspaceBlocks = demoWorkspace.getBlocksByType(block.type, false), rParents = []

    STORE[block.type] = {
      blocks: workspaceBlocks,
      parents: [],
      values: []
    }

    if (block.type !== CONSTANTS.rcm.requirement.id) {
      workspaceBlocks.forEach(workspaceBlock => {
        let parentBlock = workspaceBlock.getParent()
        if (parentBlock && parentBlock.type === CONSTANTS.rcm.requirement.id) {
          rParents.push(parentBlock)
          STORE[block.type].parents.push(parentBlock)

          if (!workspaceBlock.value) return

          let temp = STORE[block.type].values.findIndex(v => v && v.value ? v.value === workspaceBlock.value : -1)
          if (temp === -1)
            STORE[block.type].values.push({ value: workspaceBlock.value, parents: [parentBlock] })
          else {
            // console.log('temp:', temp)
            // console.log(STORE[block.type].values[temp])
            STORE[block.type].values[temp].parents.push(parentBlock)
          }
        }
      })
    }

    result += `<p>Total ${block.name}s in workspace: ${workspaceBlocks.length}.`
    if (block.type !== CONSTANTS.rcm.requirement.id) {
      result += ` Child of ${rParents.length} requirements.`
      result += `<div class="btn-group">${rParents.map((i, index) => `<button onclick="highlightUnhighlightBlock('${i.id}')">Requirement ${index + 1}</button>`)}</div>`
    }
    result += '</p>'
  })

  document.getElementById('block-stats').innerHTML = result
}

const componentsArrayCallback = function (_workspace) {
  return getComponents();
};

demoWorkspace.registerToolboxCategoryCallback(
  'MY_COMPONENTS', componentsArrayCallback);

function initApi(interpreter, scope) {
  // Add an API function for the alert() block, generated for "text_print" blocks.
  var wrapper = function (text) {
    text = text ? text.toString() : '';
    outputArea.value = outputArea.value + '\n' + text;
  };
  interpreter.setProperty(scope, 'alert',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  var wrapper = function (text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt',
    interpreter.createNativeFunction(wrapper));

  // Add an API for the wait block.  See wait_block.js
  initInterpreterWaitForSeconds(interpreter, scope);

  // Add an API function for highlighting blocks.
  var wrapper = function (id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));
}

var highlightPause = false;
var latestCode = '';

function highlightBlock(id) {
  demoWorkspace.highlightBlock(id);
  highlightPause = true;
}

function resetStepUi(clearOutput) {
  demoWorkspace.highlightBlock(null);
  highlightPause = false;
  if (runButton) runButton.disabled = '';

  if (clearOutput) {
    outputArea.value = 'Program output:\n=================';
  }
}

function highlightUnhighlightBlock(id) {
  highlightBlock(id);
  setTimeout(() => {
    demoWorkspace.highlightBlock(null);
    highlightPause = false;
  }, 200);
}

function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  // Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  codeOutputArea.value = latestCode;

  blockStats();

  resetStepUi(true);
}

function resetInterpreter() {
  myInterpreter = null;
  if (runner) {
    clearTimeout(runner);
    runner = null;
  }
}

function runCode() {
  if (!myInterpreter) {
    // First statement of this code.
    // Clear the program output.
    resetStepUi(true);
    runButton.disabled = 'disabled';

    // And then show generated code in an alert.
    // In a timeout to allow the outputArea.value to reset first.
    setTimeout(function () {
      alert('Ready to execute the following code\n' +
        '===================================\n' +
        latestCode);

      // Begin execution
      highlightPause = false;
      myInterpreter = new Interpreter(latestCode, initApi);
      runner = function () {
        if (myInterpreter) {
          var hasMore = myInterpreter.run();
          if (hasMore) {
            // Execution is currently blocked by some async call.
            // Try again later.
            setTimeout(runner, 10);
          } else {
            // Program is complete.
            outputArea.value += '\n\n<< Program complete >>';
            resetInterpreter();
            resetStepUi(false);
          }
        }
      };
      runner();
    }, 1);
    return;
  }
}

function saveWorkspaceInLS() {
  
}

// Load the interpreter now, and upon future changes.
generateCodeAndLoadIntoInterpreter();
demoWorkspace.addChangeListener(function (event) {
  if (!(event instanceof Blockly.Events.Ui)) {
    // Something changed. Parser needs to be reloaded.
    resetInterpreter();
    generateCodeAndLoadIntoInterpreter();
  }
});
