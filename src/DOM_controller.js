import { To_do } from "./to_do";
import { Dialog_for_add_content } from "./DOM_dialog_for_add_content";
import { DOM_to_do } from "./DOM_to_do";
import { DOM_note } from "./DOM_note";
import { Note } from "./note";
import { Project } from "./project";
function ui_controller() {


    function init() {
        listen();

    }
    function listen() {


        const showButton = document.querySelector("header .add-content-btn");
        showButton.addEventListener("click", () => {
            Dialog_for_add_content.run();
        });
        const home_btn = document.querySelector(".home-btn");
        const today_btn = document.querySelector(".today-btn");
        const week_btn = document.querySelector(".week-btn");
        const note_btn = document.querySelector(".note-btn");
        const project_btn = document.querySelector(".projects-btn");
        function btns_blur() {
            home_btn.classList.remove("btn-focus");
            today_btn.classList.remove("btn-focus");
            week_btn.classList.remove("btn-focus");
            note_btn.classList.remove("btn-focus");
            project_btn.classList.remove("btn-focus");
        }
        home_btn.addEventListener("click", () => {
            btns_blur();
            home_btn.classList.add("btn-focus");
            update();
        });
        today_btn.addEventListener("click", () => {
            btns_blur();
            today_btn.classList.add("btn-focus");
            update();
        });
        week_btn.addEventListener("click", () => {
            btns_blur();
            week_btn.classList.add("btn-focus");
            update();
        });
        note_btn.addEventListener("click", () => {
            btns_blur();
            note_btn.classList.add("btn-focus");
            update();
        });
        project_btn.addEventListener("click", () => {
            btns_blur();
            project_btn.classList.add("btn-focus");
            update();
        });



    }
    function count_not_done(indeces, data) {
        let ans = 0;
        for (let i of indeces) {
            if (!data[i].is_done) ans++;
        }
        return ans;
    }
    function check_zero_cnt(element) {
        if (element.textContent === "0") {
            element.classList.add('disabled');
            element.classList.add('hidden');
        } else {
            element.classList.remove('disabled');
            element.classList.remove('hidden');
        }
    }
    function update_counters() {
        const data = To_do.get_all();
        const dates = [];
        for (let cur of data) {
            dates.push(cur.str_date);
        }
        const indeces_week = DOM_to_do.getUpcomingDateIndices(dates);
        const indeces_today = DOM_to_do.getTodayDateIndices(dates);
        const home_cnt = document.querySelector(".home-counter");
        const today_cnt = document.querySelector(".today-counter");
        const week_cnt = document.querySelector(".week-counter");
        const note_cnt = document.querySelector(".note-counter");
        const project_cnt = document.querySelector(".project-counter");

        /*  Update ToDo counters */
        let hm_cnt = 0;
        for (let cur of data) if (!cur.is_done) hm_cnt++;
        home_cnt.textContent = hm_cnt;
        today_cnt.textContent = count_not_done(indeces_today, data);
        week_cnt.textContent = count_not_done(indeces_week, data);

        /*  Update note counters */
        const notes = Note.get_all();
        note_cnt.textContent = notes.length;

        /*  Update project counters */
        /* const projects = Project.get_all();
        project_cnt.textContent = projects.length; */


        check_zero_cnt(home_cnt);
        check_zero_cnt(today_cnt);
        check_zero_cnt(week_cnt);
        check_zero_cnt(note_cnt);
        check_zero_cnt(project_cnt);
    }


    function update() {
        const project_btn = document.querySelector("#project");
        project_btn.classList.add("disabled");
        const project_counter = document.querySelector(".project-counter");
        project_counter.classList.add("hidden");
        project_counter.classList.add("disabled");
        const selected_btn = document.querySelectorAll(".btn-focus");
        selected_btn.forEach((btn) => {
            switch (btn.id) {
                case "home":
                    DOM_to_do.update_home();
                    return;
                case "today":
                    DOM_to_do.update_today();
                    return;
                case "week":
                    DOM_to_do.update_week();
                    return;
                case "note":
                    DOM_note.update_note();
                    return;
            }
        });
    }







    return {
        init,
        update,
        update_counters,
    }
}

export const UI_controller = ui_controller();