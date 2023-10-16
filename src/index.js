import ToDo from './todo';
import './assets/style.css';
import { renderSidebar, renderAllTodos } from './render-main-page';

let projects = JSON.parse(localStorage.getItem("projects"));
if(projects === null){
    projects = {};
    localStorage.setItem("projects", JSON.stringify(projects));
}

renderSidebar(projects);
renderAllTodos(projects);