import { Note } from "./note";
import { UI_controller } from "./DOM_controller";
function dom_note() {
    function create_note(id, title, content, index = 0) {
        const div_right_side = document.querySelector(".right-side");
        const right_side_content_note = document.createElement("div");
        right_side_content_note.classList.add("right-side-content-note");

        let columns = document.querySelectorAll(".right-side-content-note-col");
        if (columns.length === 0) {
            let cnt = 3;
            while (cnt--) {
                const new_element = document.createElement("div");
                new_element.classList.add("right-side-content-note-col");
                right_side_content_note.appendChild(new_element);
            }
            div_right_side.appendChild(right_side_content_note);
            columns = document.querySelectorAll(".right-side-content-note-col");
        } else div_right_side.appendChild(right_side_content_note);

        columns[index % 3].innerHTML += `
            <div class="note" contenteditable="true" id=${id}>
              
            <h2>${title}</h2>
            <button class = "delete-note-btn" id=${id}>X</button> 
             <br />
              <br />
              ${content}
            </div>
        `


    }
    function listen() {

        const delete_note_btn = document.querySelectorAll(".delete-note-btn");
        delete_note_btn.forEach(delete_btn => {
            delete_btn.addEventListener("click", () => {
                Note.remove_one(delete_btn.id);
                update_note();
            });
        });



        let typingTimer;
        const doneTypingInterval = 1000;

        function doneTyping(note) {
            let title = "";
            let content = "";
            note.childNodes.forEach(node => {

                if (node.tagName === 'H2') {
                    title = node.textContent.trim();
                } else if (node.tagName !== 'BUTTON') {
                    let new_line = node.textContent.trim();
                    if (node.tagName === 'DIV') content += "<br>" + new_line;
                    else content += new_line;
                }

            });
            console.log(title + "<----title", content + "<---------- content");

            const new_note = Note.create(title, content);
            new_note.id = note.id;
            Note.store(new_note);


        }

        const notes = document.querySelectorAll('.right-side-content-note .note');
        notes.forEach(note => {
            note.addEventListener('input', () => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(note), doneTypingInterval);
            });

            note.addEventListener('keydown', () => {
                clearTimeout(typingTimer);
            });
        });
    }
    function update_note() {
        const div_right_side = document.querySelector(".right-side");
        div_right_side.innerHTML = "";

        const notes = Note.get_all();
        for (let i = 0; i < notes.length; i++) {
            create_note(notes[i].id, notes[i].title, notes[i].content, i);
        }
        listen();
        UI_controller.update_counters();


    }

    return {
        update_note,
    }
}
export const DOM_note = dom_note();