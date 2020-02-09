Blockly.defineBlocksWithJsonArray([{
  "type": "rcm_component",
  "message0": "Component %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "VALUE1",
      "check": "rcm_requirement"
    }
  ],
  // "output": "rcm_component",
  "colour": 10
}]);

Blockly.JavaScript['rcm_component'] = function (block) {
  return Blockly.JavaScript.statementToCode(block, 'VALUE1') || "";
};
