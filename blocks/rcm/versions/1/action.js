Blockly.defineBlocksWithJsonArray([{
  "type": "rcm_action",
  "message0": "Action %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE1",
      "check": "String"
    }
  ],
  "output": "rcm_action",
  "colour": 100
}]);

Blockly.JavaScript['rcm_action'] = function (block) {
  var code = "";

  if (this.isInFlyout) {
    return [code, Blockly.JavaScript.ORDER_NONE];
  }

  code = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_NONE) || "";
  if (code === "") return [code, Blockly.JavaScript.ORDER_NONE];

  code = code.slice(1, code.length - 1);
  code = 'Action: ' + code;
  return [code, Blockly.JavaScript.ORDER_NONE];
}
