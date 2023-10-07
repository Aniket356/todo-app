import { addProject, addTodoToProject } from "./functions";

export function renderSidebar(projects) {
    const sidebar = document.querySelector('.sidebar')

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
        li.textContent = project;
        li.setAttribute('data-project', project);

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
        const sidebar = document.querySelector('.sidebar');
        const projectName = prompt("Enter project name");
        if(projectName === null) return;
        sidebar.innerHTML = '';
        addProject(projects, projectName);
        renderSidebar(projects);
    });
    btn.textContent = '+';

    sidebarList.appendChild(projectsList);
    sidebar.appendChild(sidebarList);
    sidebar.appendChild(btn);
}

export function renderToDos(projectsList, project){
    const todosDiv = document.querySelector('.todos');

    const addButton = document.createElement('button');
    addButton.classList.add('add');
    addButton.setAttribute('id', 'add-todo');
    addButton.textContent = '+';

    addButton.addEventListener('click', () => {
        const todoTitle = prompt("Enter title for todo");
        if(todoTitle === null) return;
        
        addTodoToProject(todoTitle, project, projectsList);
        todosDiv.innerHTML = '';
        renderToDos(projectsList, project);
    })

    todosDiv.appendChild(addButton);

    const todosList = document.createElement('ul');     

    projectsList[project].forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo');
        
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = todo.title;
        li.appendChild(title);

        const dueDateP = document.createElement('p');
        dueDateP.classList.add('due-date');
        dueDateP.textContent = getFormattedDate(todo.dueDate);
        li.appendChild(dueDateP);

        const completedCheckbox = document.createElement('input');
        completedCheckbox.setAttribute('type', 'checkbox');
        completedCheckbox.setAttribute('name', 'completed');
        completedCheckbox.classList.add('completed');
        li.appendChild(completedCheckbox);

        const priorityP = document.createElement('p');
        priorityP.classList.add('priority');
        priorityP.textContent = todo.priority;
        li.appendChild(priorityP);

        const delButton = document.createElement('button');
        delButton.classList.add('del');
        delButton.textContent = 'Delete';
        li.appendChild(delButton);

        todosList.appendChild(li);
    })

    todosDiv.appendChild(todosList);
}

export function renderAllTodos(projectsList) {
    const todosDiv = document.querySelector('.todos');
    const todosList = document.createElement('ul');     

    for(const project in projectsList){
        projectsList[project].forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo');
        
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = todo.title;
        li.appendChild(title);

        const dueDateP = document.createElement('p');
        dueDateP.classList.add('due-date');
        dueDateP.textContent = getFormattedDate(todo.dueDate);
        li.appendChild(dueDateP);

        const completedCheckbox = document.createElement('input');
        completedCheckbox.setAttribute('type', 'checkbox');
        completedCheckbox.setAttribute('name', 'completed');
        completedCheckbox.classList.add('completed');
        li.appendChild(completedCheckbox);

        const priorityP = document.createElement('p');
        priorityP.classList.add('priority');
        priorityP.textContent = todo.priority;
        li.appendChild(priorityP);

        const delButton = document.createElement('button');
        delButton.classList.add('del');
        delButton.textContent = 'Delete';
        li.appendChild(delButton);

        todosList.appendChild(li);
        })
    }

    todosDiv.appendChild(todosList);
}

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  }