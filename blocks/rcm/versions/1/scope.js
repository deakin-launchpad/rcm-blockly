Blockly.defineBlocksWithJsonArray([{
  "type": "rcm_scope",
  "message0": "Scope %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE1",
      "check": "String"
    }
  ],
  "output": "rcm_scope",
  "colour": 300
}]);

Blockly.JavaScript['rcm_scope'] = function (block) {
  var code = "";

  if (this.isInFlyout) {
    return [code, Blockly.JavaScript.ORDER_NONE];
  }

  code = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_NONE) || "";
  if (code === "") return [code, Blockly.JavaScript.ORDER_NONE];

  code = code.slice(1, code.length - 1);
  code = 'Scope: ' + code;
  return [code, Blockly.JavaScript.ORDER_NONE];
}
