import { Note } from "./note";
import { To_do } from "./to_do";
import { Project } from "./project";
import "./styles/dashboard_main.css"
import logo_icon from './assets/to-do-list.png';
import { UI_controller } from "./DOM_controller";



const logo_img = document.querySelector("header .logo-icon");
logo_img.src = logo_icon;

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}
UI_controller.init();
UI_controller.update();



