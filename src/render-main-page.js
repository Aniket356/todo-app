import { addTodoToProject } from "./functions";
import { addNewProjectForm } from "./render-forms";

export function renderSidebar(projects) {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = '';

    const sidebarList = document.createElement('ul');
    
    const all = document.createElement('li');
    all.textContent = 'All Tasks';
    all.addEventListener('click', () => {
        const todosDiv = document.querySelector('.todos');
        todosDiv.innerHTML = '';
        renderAllTodos(projects);
    })
    sidebarList.appendChild(all);

    const p = document.createElement('p');
    p.textContent = 'Projects:';
    sidebarList.appendChild(p);

    const projectsList = document.createElement('ul');

    Object.keys(projects).forEach(project => {
        const li = document.createElement('li');

        const projectTitle = document.createElement('p');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project;
        li.appendChild(projectTitle);

        const menuButton = document.createElement('button');
        menuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
        </svg>`;
        li.appendChild(menuButton);

        li.addEventListener('click', () => {
            const todosDiv = document.querySelector('.todos');
            todosDiv.innerHTML = '';
            renderToDos(projects, project);
        })

        projectsList.appendChild(li);
    })

    const btn = document.createElement('button');
    btn.classList.add('add');
    btn.setAttribute('id', 'add-project');
    btn.addEventListener('click', () => {
        btn.style.display = 'none';
        sidebar.appendChild(addNewProjectForm(projects));
        const input = sidebar.querySelector('#project-name');
        input.focus();
    });
    btn.textContent = '+ Add Project';

    sidebarList.appendChild(projectsList);
    sidebar.appendChild(sidebarList);
    sidebar.appendChild(btn);
}

export function renderToDos(projectsList, project){
    const todosDiv = document.querySelector('.todos');

    const header = document.createElement('div');
    header.textContent = project;
    header.classList.add('project-header');
    todosDiv.appendChild(header);

    const todosList = document.createElement('ul');     

    projectsList[project].forEach(todo => {
        appendToDo(todo, todosList);
    })
    todosDiv.appendChild(todosList);

    const addButton = document.createElement('button');
    addButton.classList.add('add');
    addButton.setAttribute('id', 'add-todo');
    addButton.textContent = '+ Add Task';

    addButton.addEventListener('click', () => {
        const todoTitle = prompt("Enter title for todo");
        if(todoTitle === null) return;
        
        addTodoToProject(todoTitle, project, projectsList);
        todosDiv.innerHTML = '';
        renderToDos(projectsList, project);
    })

    todosDiv.appendChild(addButton);
}

export function renderAllTodos(projectsList) {
    const todosDiv = document.querySelector('.todos');
    const todosList = document.createElement('ul');     

    const header = document.createElement('div');
    header.textContent = 'All Tasks';
    header.classList.add('project-header');
    todosDiv.appendChild(header);

    for(const project in projectsList){
        projectsList[project].forEach(todo => {
            appendToDo(todo, todosList);
        })
    }

    todosDiv.appendChild(todosList);
}

function appendToDo(todo, todosList) {
    const li = document.createElement('li');
    li.classList.add('todo');

    const div1 = document.createElement('div');
    div1.classList.add('todo-div1');

    const completedCheckbox = document.createElement('input');
    completedCheckbox.setAttribute('type', 'checkbox');
    completedCheckbox.setAttribute('name', 'completed');
    completedCheckbox.classList.add('completed');
    div1.appendChild(completedCheckbox);
    
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = todo.title;
    div1.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = todo.description;
    desc.classList.add('description');
    div1.appendChild(desc);

    li.appendChild(div1);

    const div2 = document.createElement('div2');
    div2.classList.add('todo-div2');

    const dueDateP = document.createElement('p');
    dueDateP.classList.add('due-date');
    dueDateP.textContent = getFormattedDate(todo.dueDate);
    div2.appendChild(dueDateP);

    const priorityP = document.createElement('p');
    priorityP.classList.add('priority');
    priorityP.textContent = todo.priority;
    div2.appendChild(priorityP);

    const delButton = document.createElement('button');
    delButton.classList.add('del');
    delButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>`;
    div2.appendChild(delButton);

    li.appendChild(div2);

    todosList.appendChild(li);
}

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}