import ToDo from "./todo";

export function addProject(projectsList, projectName) {
    projectsList[projectName] = [];
}

export function addTodoToProject(title, projectName, projectsList) {
    const newTodo = new ToDo(title, 'description', new Date(2023, 10, 1), 'priority', false);
    projectsList[projectName].push(newTodo);
}