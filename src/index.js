import ToDo from './todo';
import './assets/style.css';
import { renderSidebar, renderAllTodos } from './render-main-page';


let projects = {
    home: [ToDo("Homework", "do homework", new Date(2023, 10, 1), 'high', false)],
    gym: [],
    work: []
};

renderSidebar(projects);
renderAllTodos(projects);