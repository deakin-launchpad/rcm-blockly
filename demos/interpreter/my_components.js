var myApplication = {
  doms: [],
  domTexts: []
};

const MY_COMPONENTS_KEY = "myComponents";

function firstLoad() {
  myApplication.domTexts = localStorage.getItem(MY_COMPONENTS_KEY).split(',') || []
  myApplication.doms = myApplication.domTexts.map(item => Blockly.Xml.textToDom(item));
}

function updateLocalStorage() {
  localStorage.setItem(MY_COMPONENTS_KEY, myApplication.domTexts);
}

function getComponents() {
  if (myApplication.doms.length === 0) firstLoad();

  return myApplication.doms;
}

function addComponent(blockObj) {
  let dom = Blockly.Xml.blockToDom(blockObj, true);
  myApplication.doms.push(dom);
  let domText = Blockly.Xml.domToText(dom);
  myApplication.domTexts.push(domText);
  updateLocalStorage();
}
