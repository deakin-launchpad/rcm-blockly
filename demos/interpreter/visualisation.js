function updateVisualisations() {
  clearCanvas();
  let component_keys = Object.keys(STORE);
  console.log(STORE);

  component_keys.forEach(component => {
    if (component === CONSTANTS.rcm.requirement.id) return

    STORE[component].values.forEach((valueItem, i) => {
      // Create circles for actions
      createCircle(120, (i + 1) * 60, 20, "purple");
      // TODO: Create value text

      // Create circles for respective parents
      if (!valueItem.parents || !Array.isArray(valueItem.parents) || valueItem.parents.length < 1) return

      valueItem.parents.forEach((parent, i) => {
        createCircle((i + 1) * 30, 30, 20, "brown");
      })
      // Connect with the parents
    });
  });

}
