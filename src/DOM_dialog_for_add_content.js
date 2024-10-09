import { UI_controller } from "./DOM_controller";
import { To_do } from "./to_do";
import { Note } from "./note";
import { Project } from "./project";
function dialog_for_add_content() {

    function clear_to_do_inputs() {
        const priority_low_btn = document.querySelector(".priority-low");
        const priority_medium_btn = document.querySelector(".priority-medium");
        const priority_high_btn = document.querySelector(".priority-high");
        document.querySelector(".new-to-do-title").value = "";
        document.querySelector(".new-to-do-details").value = "";
        document.querySelector(".to-do-date").value = "";
        priority_low_btn.classList.remove("selected-priority-low");
        priority_medium_btn.classList.remove("selected-priority-medium");
        priority_high_btn.classList.remove("selected-priority-high");
        const left_side = document.querySelector("dialog .left-side");
        left_side.classList.remove("hidden");
        left_side.classList.remove("disabled");
        const dialog_title = document.querySelector(".dialog-title");
        dialog_title.textContent = "Create a new...";

    }
    function clear_note_inputs() {
        document.querySelector(".new-note-title").value = "";
        document.querySelector(".new-note-details").value = "";
    }
    function clear_project_inputs() {
        document.querySelector(".new-project-title").value = "";
    }

    function listen_for_add_to_do(cur_dialog) {
        const priority_low_btn = document.querySelector(".priority-low");
        const priority_medium_btn = document.querySelector(".priority-medium");
        const priority_high_btn = document.querySelector(".priority-high");
        let selected_priority = "";
        if (document.querySelector(".selected-priority-low") !== null)
            selected_priority = "low";
        if (document.querySelector(".selected-priority-medium") !== null)
            selected_priority = "medium";
        if (document.querySelector(".selected-priority-high") !== null)
            selected_priority = "high";
        function clear_priority() {
            priority_low_btn.classList.remove("selected-priority-low");
            priority_medium_btn.classList.remove("selected-priority-medium");
            priority_high_btn.classList.remove("selected-priority-high");
        }
        priority_low_btn.addEventListener("click", () => {
            selected_priority = "low";
            clear_priority();
            priority_low_btn.classList.add("selected-priority-low");
        });
        priority_medium_btn.addEventListener("click", () => {
            selected_priority = "medium";
            clear_priority();
            priority_medium_btn.classList.add("selected-priority-medium");
        });
        priority_high_btn.addEventListener("click", () => {
            selected_priority = "high";
            clear_priority();
            priority_high_btn.classList.add("selected-priority-high");
        });
        const submit_to_do_btn = document.querySelector("#submit-to-do");
        if (submit_to_do_btn !== null) {
            submit_to_do_btn.addEventListener("click", () => {
                const title = document.querySelector(".new-to-do-title").value;
                const content = document.querySelector(".new-to-do-details").value;
                const date = document.querySelector(".to-do-date").value;
                const new_to_do = To_do.create(title, content, selected_priority, date, false);
                To_do.store(new_to_do);
                UI_controller.update();
                cur_dialog.close();
                clear_to_do_inputs()
            }, { once: true });

        }
        const edit_to_do_btn = document.querySelector(".edit-to-do");
        if (edit_to_do_btn !== null) {
            edit_to_do_btn.addEventListener("click", () => {
                const title = document.querySelector(".new-to-do-title").value;
                const content = document.querySelector(".new-to-do-details").value;
                const date = document.querySelector(".to-do-date").value;
                const new_to_do = To_do.create(title, content, selected_priority, date, false);
                new_to_do.id = edit_to_do_btn.id;
                To_do.store(new_to_do);
                UI_controller.update();
                cur_dialog.close();
                clear_to_do_inputs()
            }, { once: true });
        }

    }

    function listen_for_add_note(cur_dialog) {
        const submit_note_btn = document.querySelector("#submit-note");
        submit_note_btn.addEventListener("click", () => {
            const title = document.querySelector(".new-note-title").value;
            const content = document.querySelector(".new-note-details").value;
            const new_note = Note.create(title, content);
            Note.store(new_note);
            UI_controller.update();
            cur_dialog.close();
            clear_note_inputs()
        }, { once: true });
    }

    function listen_for_project(cur_dialog) {
        const submit_project_btn = document.querySelector("#submit-project");
        submit_project_btn.addEventListener("click", () => {
            const title = document.querySelector(".new-project-title").value;
            const new_project = Project.create(title);
            Project.store(new_project);
            UI_controller.update();
            cur_dialog.close();
            clear_project_inputs()
        }, { once: true });
    }

    function load_add_to_do(dialog) {
        const to_do_input = document.querySelector(".to-do-input");
        to_do_input.innerHTML = `
            <textarea class="new-to-do-title" placeholder="Title..."></textarea>
            <textarea
              class="new-to-do-details"
              placeholder="Details..."
            ></textarea>

            <div class="filed-container">
              <label for="priority">Priority:</label>
              <button class="priority-low" value="low">Low</button>
              <button class="priority-medium" value="medium">Medium</button>
              <button class="priority-high" value="high">High</button>
            </div>
            <div class="filed-container">
              <label for="due-date">Due Date:</label>
              <input type="date" class="to-do-date" />
            </div>
            <div class="filed-container">
              <button id="submit-to-do">Add TO-DO</button>
            </div>
        `
        listen_for_add_to_do(dialog);
    }
    function load_edit_to_do(dialog, cur_to_do) {
        const dialog_title = document.querySelector(".dialog-title");
        dialog_title.textContent = "Edit...";
        const to_do_input = document.querySelector(".to-do-input");
        to_do_input.innerHTML = `
            <textarea class="new-to-do-title" placeholder="Title...">${cur_to_do.title}</textarea>
            <textarea
              class="new-to-do-details"
              placeholder="Details..."
            >${cur_to_do.content}</textarea>

            <div class="filed-container">
              <label for="priority">Priority:</label>
              <button class="priority-low ${cur_to_do.priority === "low" ? "selected-priority-low" : ""}" value="low">Low</button>
              <button class="priority-medium ${cur_to_do.priority === "medium" ? "selected-priority-medium" : ""}" value="medium">Medium</button>
              <button class="priority-high ${cur_to_do.priority === "high" ? "selected-priority-high" : ""}" value="high">High</button>
            </div>
            <div class="filed-container">
              <label for="due-date">Due Date:</label>
              <input type="date" class="to-do-date" value = "${cur_to_do.str_date}"/>
            </div>
            <div class="filed-container">
              <button class="edit-to-do" id=${cur_to_do.id}>Edit TO-DO</button>
            </div>
        `
        const left_side = document.querySelector("dialog .left-side");
        left_side.classList.add("hidden");
        left_side.classList.add("disabled");
        listen_for_add_to_do(dialog);
    }

    function load_add_note(dialog) {
        const to_do_input = document.querySelector(".to-do-input");
        to_do_input.innerHTML = `
            <textarea class="new-note-title" placeholder="Title..."></textarea>
            <textarea
              class="new-note-details"
              placeholder="Details..."
            ></textarea>
            <div class="filed-container">
              <button id="submit-note">Add Note</button>
            </div>
        `
        listen_for_add_note(dialog);
    }
    function load_add_project(dialog) {
        const to_do_input = document.querySelector(".to-do-input");
        to_do_input.innerHTML = `
            <textarea class="new-project-title" placeholder="ProjectName..."></textarea>
            <div class="filed-container">
              <button id="submit-project">Add Project</button>
            </div>
        `
        listen_for_project(dialog);
    }
    function load(dialog) {
        const selected_btn = document.querySelectorAll(".btn-focus");
        selected_btn.forEach((btn) => {
            switch (btn.id) {
                case "add_new_to_do":
                    load_add_to_do(dialog);
                    return;
                case "add_new_note":
                    load_add_note(dialog);
                    return;
                case "add_new_project":
                    load_add_project(dialog);
                    return;
            }
        });
    }
    function clear_inputs() {
        const selected_btn = document.querySelectorAll(".btn-focus");
        selected_btn.forEach((btn) => {
            switch (btn.id) {
                case "add_new_to_do":
                    clear_to_do_inputs();
                    return;
                case "add_new_note":
                    clear_note_inputs();
                    return;
                case "add_new_project":
                    clear_project_inputs();
                    return;
            }
        });
    }
    function listen(dialog) {
        const closeButton = document.querySelector("dialog .dialog-close-btn");
        closeButton.addEventListener("click", () => {
            dialog.close();
            clear_inputs();
        });
        const add_new_to_do = document.querySelector("#add_new_to_do");
        const add_new_note = document.querySelector("#add_new_note");
        const add_new_project = document.querySelector("#add_new_project");
        function clear_btns() {
            add_new_to_do.classList.remove("btn-focus");
            add_new_note.classList.remove("btn-focus");
            add_new_project.classList.remove("btn-focus");
        }
        add_new_to_do.addEventListener("click", () => {
            clear_btns();
            add_new_to_do.classList.add("btn-focus");
            load(dialog);
        });
        add_new_note.addEventListener("click", () => {
            clear_btns();
            add_new_note.classList.add("btn-focus");
            load(dialog);
        });
        add_new_project.addEventListener("click", () => {
            clear_btns();
            add_new_project.classList.add("btn-focus");
            load(dialog);
        });

    }

    function run() {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
        load(dialog);
        listen(dialog);
    }
    function edit_to_do(cur_to_do) {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
        load_edit_to_do(dialog, cur_to_do);
        const closeButton = document.querySelector("dialog .dialog-close-btn");
        closeButton.addEventListener("click", () => {
            dialog.close();
            clear_inputs();
        });
    }
    return {
        run,
        edit_to_do,
    }
}

export const Dialog_for_add_content = dialog_for_add_content();