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