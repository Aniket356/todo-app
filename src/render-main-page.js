import { changeImportance, deleteProject, toggleCompleted, deleteToDo, getFormattedDate } from "./functions";
import { addNewProjectForm, addNewToDoForm } from "./render-forms";
import ToDo from "./todo";

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

        li.addEventListener('click', () => {
            const todosDiv = document.querySelector('.todos');
            todosDiv.innerHTML = '';
            renderToDos(projects, project);
        })

        const delBtn = document.createElement('button');
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
        <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
        </svg>`;
        delBtn.classList.add('delete-project');
        delBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteProject(projects, project);
            renderSidebar(projects);
            renderAllTodos(projects);
        })
        li.appendChild(delBtn);

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
    todosDiv.innerHTML = '';

    const header = document.createElement('div');
    header.textContent = project;
    header.classList.add('project-header');
    todosDiv.appendChild(header);

    const todosList = document.createElement('ul');     

    projectsList[project].forEach(todo => {
        appendToDo(todo, projectsList[project], projectsList, todosList, false);
    })
    todosDiv.appendChild(todosList);

    const addButton = document.createElement('button');
    addButton.classList.add('add');
    addButton.setAttribute('id', 'add-todo');
    addButton.textContent = '+ Add Task';

    addButton.addEventListener('click', () => {
        addButton.style.display = 'none';
        todosDiv.appendChild(addNewToDoForm(projectsList, project));
    })

    todosDiv.appendChild(addButton);
}

export function renderAllTodos(projectsList) {
    const todosDiv = document.querySelector('.todos');
    todosDiv.innerHTML = '';

    const todosList = document.createElement('ul');     

    const header = document.createElement('div');
    header.textContent = 'All Tasks';
    header.classList.add('project-header');
    todosDiv.appendChild(header);

    for(const project in projectsList){
        projectsList[project].forEach(todo => {
            appendToDo(todo, projectsList[project], projectsList, todosList, true);
        })
    }

    todosDiv.appendChild(todosList);
}

function appendToDo(todo, project, projectsList, todosList, renderAll) {
    const li = document.createElement('li');
    li.classList.add('todo');

    const div1 = document.createElement('div');
    div1.classList.add('todo-div1');

    const completedCheckbox = document.createElement('input');
    completedCheckbox.setAttribute('type', 'checkbox');
    completedCheckbox.setAttribute('name', 'completed');
    completedCheckbox.classList.add('completed');

    completedCheckbox.addEventListener('click', () => {
        toggleCompleted(todo, completedCheckbox.checked);
    })

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
    dueDateP.textContent = isNaN(todo.dueDate) ? "no due date" : getFormattedDate(todo.dueDate);
    div2.appendChild(dueDateP);

    const markImpBtn = document.createElement('button');
    markImpBtn.classList.add('mark-imp-btn');
    markImpBtn.classList.add(`${todo.isImportant === true ? "important" : "not-important"}`);
    markImpBtn.textContent = todo.isImportant === true ? "IMP" : "NOT IMP";

    markImpBtn.addEventListener('click', () => {
        changeImportance(todo);
        markImpBtn.classList.remove('important');
        markImpBtn.classList.remove('not-important');
        markImpBtn.classList.add(`${todo.isImportant === true ? "important" : "not-important"}`);
        markImpBtn.textContent = todo.isImportant === true ? "IMP" : "NOT IMP";
    })

    div2.appendChild(markImpBtn);

    const delButton = document.createElement('button');
    delButton.classList.add('del');
    delButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>`;

    delButton.addEventListener('click', () => {
        deleteToDo(todo, project);
        if(renderAll) renderAllTodos(projectsList);
        else renderToDos(projectsList, project);
    })

    div2.appendChild(delButton);

    li.appendChild(div2);

    todosList.appendChild(li);
}