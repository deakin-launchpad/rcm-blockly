Blockly.defineBlocksWithJsonArray([{
  "type": "rcm_requirement",
  "message0": "Requirement block",
  "message1": "Action: %1 Scope: %2 Condition: %3",
  "args1": [
    {
      "type": "input_value",
      "name": "rcm_action_value",
      "check": "rcm_action"
    },
    {
      "type": "input_value",
      "name": "rcm_scope_value",
      "check": "rcm_scope"
    },
    {
      "type": "input_value",
      "name": "rcm_condition_value",
      "check": "rcm_condition"
    }
  ],
  "previousStatement": "rcm_requirement",
  "nextStatement": "rcm_requirement",
  "inputsInline": false,
  "colour": 20
}]);


function get_requirement_field_value(field, block) {
  return Blockly.JavaScript.valueToCode(block, field, Blockly.JavaScript.ORDER_NONE) || null;
}

function appendCode(field_value, code) {
  return field_value ? code !== "" ? code + ", " + field_value : code + field_value : code
}

Blockly.JavaScript['rcm_requirement'] = function (block) {
  if (this.isInFlyout) {
    return;
  }

  var code = "";

  var field_value = get_requirement_field_value('rcm_action_value', block);
  code = appendCode(field_value, code);

  field_value = get_requirement_field_value('rcm_scope_value', block);
  code = appendCode(field_value, code);

  field_value = get_requirement_field_value('rcm_condition_value', block);
  code = appendCode(field_value, code);

  code = "alert('" + code + "');\n";
  return code;
};
