import ToDo from "./todo";

export function addProject(projectsList, projectName) {
    if(projectsList[projectName]) alert("Cannot have multiple projects with same name");
    projectsList[projectName] = [];
}

export function addTodoToProject(title, desc, dueDate,  projectName, projectsList) {
    const newTodo = new ToDo(title, desc, dueDate, false, false);
    projectsList[projectName].push(newTodo);
}

export function deleteProject(projectsList, projectName){
    delete projectsList[projectName];
}

export function changeImportance(todo) {
    todo.isImportant = todo.isImportant === true ? false : true;
}

export function toggleCompleted(todo, checkboxState) {
    todo.completed = checkboxState === true ? true : false;
}

export function deleteToDo(todo, project) {
    const index = project.indexOf(todo);
    project.splice(index, 1);
}

export function getFormattedDate(date) {
    // console.log(date);
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}