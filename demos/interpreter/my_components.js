var myApplication = {
  myComponents: []
};

const MY_COMPONENTS_KEY = "myComponents";

function firstLoad() {
  myApplication.myComponents = JSON.parse(localStorage.getItem(MY_COMPONENTS_KEY)) || []
}

// if (myApplication.myComponents.length === 0) firstLoad();

function updateLocalStorage() {
  localStorage.setItem(MY_COMPONENTS_KEY, getComponents());
}

function getComponents() {
  return myApplication.myComponents;
}

function addComponent(component) {
  myApplication.myComponents.push(component);
}
