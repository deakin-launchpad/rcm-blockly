var myApplication = {
  doms: [],
  domTexts: []
};

const MY_COMPONENTS_KEY = "myComponents";
const DEFAULT_WORKSPACE = "defaultWorkspace";
const LAST_WORKSPACE_SAVE_TIME = "lastWorkspaceSaveTime";

const saveTimeSpan = document.getElementById("lastSaveTime");
const loadTimeSpan = document.getElementById("lastLoadTime");

saveTimeSpan.innerHTML = localStorage.getItem(LAST_WORKSPACE_SAVE_TIME) || "none";

function firstLoad() {
  myApplication.domTexts = localStorage.getItem(MY_COMPONENTS_KEY).split(',') || []
  myApplication.doms = myApplication.domTexts.map(item => Blockly.Xml.textToDom(item));
}

function updateLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getComponents() {
  if (myApplication.doms.length === 0) firstLoad();

  return myApplication.doms;
}

function serializeComponent(blockObj) {
  let dom = Blockly.Xml.blockToDom(blockObj, true);
  myApplication.doms.push(dom);
  let domText = Blockly.Xml.domToText(dom);
  myApplication.domTexts.push(domText);
  updateLocalStorage(MY_COMPONENTS_KEY, myApplication.domTexts);
}

function formattedDate() {
  return new Date(Date.now()).toLocaleString();
}

function serializeWorkspace() {
  let dom = Blockly.Xml.workspaceToDom(demoWorkspace, false);
  let domText = Blockly.Xml.domToText(dom);
  updateLocalStorage(DEFAULT_WORKSPACE, domText);

  let saveTime = formattedDate();
  saveTimeSpan.innerHTML = saveTime;
  updateLocalStorage(LAST_WORKSPACE_SAVE_TIME, saveTime);
}

function loadWorkspace() {
  demoWorkspace.clear();
  let workspaceText = localStorage.getItem(DEFAULT_WORKSPACE);
  let workspaceDom = Blockly.Xml.textToDom(workspaceText);
  Blockly.Xml.domToWorkspace(workspaceDom, demoWorkspace);

  loadTimeSpan.innerHTML = formattedDate();
}
