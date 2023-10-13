import { addProject, addTodoToProject } from "./functions";
import { renderSidebar, renderToDos } from "./render-main-page";

export function addNewProjectForm(projectsList) {
    const form = document.createElement('form');
    form.setAttribute('id', 'new-project-form');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'project-name');
    nameInput.setAttribute('maxlength', '25');
    form.appendChild(nameInput);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit'
    submitBtn.setAttribute('type', 'submit');
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if(nameInput.value !== '') addProject(projectsList, nameInput.value);
        renderSidebar(projectsList);
    })
    form.appendChild(submitBtn);

    return form;
}

export function addNewToDoForm(projectsList, projectName){
    const form = document.createElement('form');
    form.setAttribute('id', 'add-todo-form');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('form-field');

    const titleLabel = document.createElement('label');
    titleLabel.textContent = "Enter title: ";
    titleDiv.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleDiv.appendChild(titleInput);


    const descDiv = document.createElement('div');
    descDiv.classList.add('form-field');

    const descLabel = document.createElement('label');
    descLabel.textContent = "Enter description: ";
    descDiv.appendChild(descLabel);

    const descInput = document.createElement('input');
    descDiv.appendChild(descInput);


    const dateDiv = document.createElement('div');
    dateDiv.classList.add('form-field');

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Enter due date: ';
    dateDiv.appendChild(dateLabel);

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateDiv.appendChild(dateInput);

    form.appendChild(titleDiv);
    form.appendChild(descDiv);
    form.appendChild(dateDiv);

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if(titleInput.value === '') {
            alert("Please enter todo title");
            return;
        }

        addTodoToProject(titleInput.value, descInput.value, new Date(dateInput.value), projectName, projectsList);
        renderToDos(projectsList, projectName);
    })
    form.appendChild(submitBtn);

    return form;
}