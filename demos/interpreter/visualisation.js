function canvasGenerationMethod1() {
  let component_keys = Object.keys(STORE);
  console.log(STORE);

  component_keys.forEach(component => {
    if (component === CONSTANTS.rcm.requirement.id) return

    STORE[component].values.forEach((valueItem, i) => {
      // Create circles for actions
      createCircle(120, (i + 1) * 80, 20, "purple");
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

function checkDrawn(type, obj, arr) {
  switch (type) {
    case CONSTANTS.rcm.condition.id:
    case CONSTANTS.rcm.action.id:
    case CONSTANTS.rcm.scope.id:
      if (!obj.value) return null;
      return arr.findIndex(item => item.value && obj.value === item.value);
    case CONSTANTS.rcm.requirement.id:
      return arr.findIndex(item => item.id && obj.id === item.id);
    default:
      return -1;
  }
}

function blockText(block) {
  switch (block.type) {
    case CONSTANTS.rcm.condition.id:
    case CONSTANTS.rcm.action.id:
    case CONSTANTS.rcm.scope.id:
    case CONSTANTS.rcm.requirement.id:
      return block.type && block.value ? `${block.type}: ${block.value}` : null || block.value || block.type || ""
    default:
      return "default";
  }
}

function createComponentCircle(vizID, radius, block) {
  block.viz_id = createCircle(
    vizID,
    ...block.pos,
    radius,
    CONSTANTS.rcm[block.type.slice(block.type.indexOf('_') + 1)].rgb,
    blockText(block)
  );

  return block;
}

let drawn = {};
let idCount = 0;

function canvasGenerationMethod2() {
  drawn = {};
  idCount = 0;

  STORE.forEach((pair, i) => {
    let isNew = false, childPos = [], parentPos = [];

    if (!drawn[pair.child.type]) {
      // Type of this child does not exist in drawn
      drawn[pair.child.type] = [];

      idCount++;
      isNew = true;
      // draw child and set drawn[pair.child.type][0].pos
      // Set childPos
      childPos = [600, (i + 1) * 80];
      let modifiedBlock = createComponentCircle(idCount, 20, {
        ...pair.child,
        pos: childPos,
        logicalDuplicates: [pair.child.id],
      });
      drawn[pair.child.type].push(modifiedBlock);

    } else {
      // Type of child already exists
      // check if this child is already drawn,
      // based on the respective child's type comparer.

      let foundIndex = checkDrawn(pair.child.type, pair.child, drawn[pair.child.type]);

      if (foundIndex !== -1) {
        // Set childPos to that of the child at foundIndex
        childPos = drawn[pair.child.type][foundIndex].pos;
        drawn[pair.child.type][foundIndex].logicalDuplicates.push(pair.child.id)
      } else {
        idCount++;
        isNew = true;
        // draw child
        // Set childPos
        childPos = [600, (i + 1) * 80]
        let modifiedBlock = createComponentCircle(idCount, 20, {
          ...pair.child,
          pos: childPos,
          logicalDuplicates: [pair.child.id],
        });
        drawn[pair.child.type].push(modifiedBlock);
      }
    }

    if (pair.parent === null && !isNew) {
      // Child is Batman, admire and do nothing
      return;
    }

    if (pair.parent) {
      // Child has a parent
      if (!drawn[pair.parent.type]) {
        // Type of this parent does not exist in drawn
        drawn[pair.parent.type] = [];

        idCount++;
        isNew = true;
        // draw parent and set drawn[pair.parent.type][0].pos
        // Set parentPos
        parentPos = [60, (i + 1) * 80]
        let modifiedBlock = createComponentCircle(idCount, 20, {
          ...pair.parent,
          pos: parentPos,
          logicalDuplicates: [pair.parent.id],
        });
        drawn[pair.parent.type].push(modifiedBlock);

      } else {
        // Type of parent already exists
        // check if this parent is already drawn,
        // based on the respective parent's type comparer.

        let foundIndex = checkDrawn(pair.parent.type, pair.parent, drawn[pair.parent.type])

        if (foundIndex !== -1) {
          // Set parentPos to that of the parent at foundIndex
          parentPos = drawn[pair.parent.type][foundIndex].pos;
          drawn[pair.parent.type][foundIndex].logicalDuplicates.push(pair.parent.id)
        } else {
          idCount++;
          isNew = true;
          // draw parent
          // Set parentPos
          parentPos = [60, (i + 1) * 80]
          let modifiedBlock = createComponentCircle(idCount, 20, {
            ...pair.parent,
            pos: parentPos,
            logicalDuplicates: [pair.parent.id],
          });
          drawn[pair.parent.type].push(modifiedBlock);
        }
      }
    }

    if (isNew && childPos.length === 2 && parentPos.length === 2) {
      // connect child and parent
      drawLine(...parentPos, ...childPos);
    }

  })
}

function updateVisualisations() {
  clearCanvas();
  canvasGenerationMethod2();
}
