import { addProject } from "./functions";
import { renderSidebar } from "./render-main-page";

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