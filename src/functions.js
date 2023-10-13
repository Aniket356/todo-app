import ToDo from "./todo";

export function addProject(projectsList, projectName) {
    if(projectsList[projectName]) alert("Cannot have multiple projects with same name");
    projectsList[projectName] = [];
}

export function addTodoToProject(title, projectName, projectsList) {
    const newTodo = new ToDo(title, 'description', new Date(2023, 10, 1), 'priority', false);
    projectsList[projectName].push(newTodo);
}