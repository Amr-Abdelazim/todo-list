import { SVG } from "./svg_container";
import { To_do } from "./to_do";
import { Dialog_for_add_content } from "./DOM_dialog_for_add_content";
import { Dialog_for_to_do_details } from "./DOM_dialog_for_to_do_details";
import { UI_controller } from "./DOM_controller";
function dom_to_do() {
    function getUpcomingDateIndices(dates) {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const upcomingDateIndices = dates
            .map((dateStr, index) => {
                const date = new Date(dateStr);
                return { index, date };
            })
            .filter(({ date }) => date >= today && date <= nextWeek)
            .map(({ index }) => index);

        return upcomingDateIndices;
    }

    function getTodayDateIndices(dates) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayIndices = dates
            .map((dateStr, index) => {
                const date = new Date(dateStr);
                date.setHours(0, 0, 0, 0);
                return { index, date };
            })
            .filter(({ date }) => date.getTime() === today.getTime())
            .map(({ index }) => index);

        return todayIndices;
    }


    function create_to_do(id, title, content, priority, date, is_done = false) {
        const div_right_side = document.querySelector(".right-side");
        const div_right_content = document.createElement("div");
        div_right_content.classList.add("right-side-content-to-do");
        div_right_content.id = id;

        switch (priority) {
            case "low":
                div_right_content.setAttribute("style", "border-left: 5px solid green;");
                break;
            case "medium":
                div_right_content.setAttribute("style", "border-left: 5px solid orange;");
                break;
            case "high":
                div_right_content.setAttribute("style", "border-left: 5px solid red;");
                break;
        }
        if (is_done) div_right_content.style.opacity = "0.5";
        if (is_done) div_right_content.insertAdjacentHTML('beforeend', `<button class="check-btn" id = ${id}>${SVG.check_box}</button>`);
        else div_right_content.insertAdjacentHTML('beforeend', `<button class="check-btn" id = ${id}>${SVG.blank_check_box}</button>`);
        div_right_content.insertAdjacentHTML('beforeend', `<div class = "title" style = "${is_done ? "text-decoration: line-through;" : ""}">${title}</div>`);
        div_right_content.insertAdjacentHTML('beforeend', `<button class="details-btn" id = ${id}>${SVG.info}</button>`);
        div_right_content.insertAdjacentHTML('beforeend', `<span class="date">${date}</span>`);
        div_right_content.insertAdjacentHTML('beforeend', `<button class="edit-btn" id = ${id}>${SVG.edit_square}</button>`);
        div_right_content.insertAdjacentHTML('beforeend', `<button class="delete-btn" id = ${id}>${SVG.delete}</button>`);
        div_right_side.appendChild(div_right_content);



    }

    function update_home() {
        const div_right_side = document.querySelector(".right-side");
        div_right_side.innerHTML = "";
        const data = To_do.get_all();
        for (let cur of data) {
            create_to_do(cur.id, cur.title, cur.content, cur.priority, cur.str_date, cur.is_done);
        }
        listen_after_update();

    }
    function update_week() {
        const div_right_side = document.querySelector(".right-side");
        div_right_side.innerHTML = "";
        const data = To_do.get_all();
        const dates = [];
        for (let cur of data) {
            dates.push(cur.str_date);
        }
        const indeces = getUpcomingDateIndices(dates);
        for (let i of indeces) {
            const cur = data[i];
            create_to_do(cur.id, cur.title, cur.content, cur.priority, cur.str_date, cur.is_done);
        }
        listen_after_update();

    }

    function update_today() {
        const div_right_side = document.querySelector(".right-side");
        div_right_side.innerHTML = "";
        const data = To_do.get_all();
        const dates = [];
        for (let cur of data) {
            dates.push(cur.str_date);
        }
        const indeces = getTodayDateIndices(dates);
        for (let i of indeces) {
            const cur = data[i];
            create_to_do(cur.id, cur.title, cur.content, cur.priority, cur.str_date, cur.is_done);
        }
        listen_after_update();

    }
    function listen_after_update() {
        UI_controller.update_counters();

        const details_btn = document.querySelectorAll(".details-btn");
        details_btn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const cur_to_do = To_do.get_one(btn.id);
                Dialog_for_to_do_details.run(cur_to_do);
            });
        });

        const edit_btn = document.querySelectorAll(".edit-btn");
        edit_btn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const cur_to_do = To_do.get_one(btn.id);
                Dialog_for_add_content.edit_to_do(cur_to_do);
            });
        });

        const delete_btn = document.querySelectorAll(".delete-btn");
        delete_btn.forEach((btn) => {
            btn.addEventListener('click', () => {
                To_do.remove_one(btn.id);
                UI_controller.update();
            });
        });

        const check_btn = document.querySelectorAll(".check-btn");
        check_btn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const cur_to_do = To_do.get_one(btn.id);
                cur_to_do.is_done = cur_to_do.is_done ^ 1;
                To_do.store(cur_to_do);
                UI_controller.update();
            });
        });
    }
    return {
        update_home,
        update_today,
        update_week,
        getUpcomingDateIndices,
        getTodayDateIndices,

    }
}

export const DOM_to_do = dom_to_do();