Blockly.defineBlocksWithJsonArray([{
  "type": "rcm_condition",
  "message0": "Condition %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE1",
      "check": "String"
    }
  ],
  "output": "rcm_condition",
  "colour": 200
}]);

Blockly.JavaScript['rcm_condition'] = function (block) {
  var code = "";

  if (this.isInFlyout) {
    return [code, Blockly.JavaScript.ORDER_NONE];
  }

  code = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_NONE) || "";
  if (code === "") return [code, Blockly.JavaScript.ORDER_NONE];

  code = code.slice(1, code.length - 1);
  block.value = code;
  code = 'Condition: ' + code;
  return [code, Blockly.JavaScript.ORDER_NONE];
}
