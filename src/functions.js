import ToDo from "./todo";

export function addProject(projectsList, projectName) {
    if(projectsList[projectName]) alert("Cannot have multiple projects with same name");
    projectsList[projectName] = [];
    updateLocalStorage(projectsList);
}

export function addTodoToProject(title, desc, dueDate,  projectName, projectsList) {
    dueDate = JSON.stringify(dueDate);
    const newTodo = new ToDo(title, desc, dueDate, false, false);
    projectsList[projectName].push(newTodo);
    updateLocalStorage(projectsList);
}

export function deleteProject(projectsList, projectName){
    delete projectsList[projectName];
    updateLocalStorage(projectsList);
}

export function changeImportance(todo, projectsList) {
    todo.isImportant = todo.isImportant === true ? false : true;
    updateLocalStorage(projectsList);
}

export function toggleCompleted(todo, checkboxState, projectsList) {
    todo.completed = checkboxState === true ? true : false;
    updateLocalStorage(projectsList);
}

export function deleteToDo(todo, project, projectsList) {
    const index = project.indexOf(todo);
    project.splice(index, 1);
    updateLocalStorage(projectsList);
}

export function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}

function updateLocalStorage(projectsList) {
    localStorage.setItem("projects", JSON.stringify(projectsList));
}