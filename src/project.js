import { storage } from "./storage_controller";
import { To_do } from "./to_do";
import { Note } from "./note";
function project() {
    function create(title) {
        let id = null;
        let notes = [];
        let to_dos = [];
        function get_notes() {
            return notes;
        }
        function get_to_dos() {
            return to_dos;
        }
        function add_note(note) {
            notes.push(note);
        }
        function add_to_do(to_do) {
            to_dos.push(to_do);
        }
        return { id, title, notes, to_dos, add_note, add_to_do };
    }
    function store(new_project) {
        if (new_project.id === null)
            new_project.id = storage.generate_id(storage.object_type.PROJECT);
        for (let cur of new_project.to_dos) {
            To_do.store(cur);
        }
        for (let cur of new_project.notes) {
            Note.store(cur);
        }
        storage.store(new_project, storage.object_type.PROJECT);
    }
    function get_all() {
        return storage.get_all(storage.object_type.PROJECT);
    }
    function get_one(id) {
        return storage.get_one(id, storage.object_type.PROJECT);
    }
    function remove_all() {
        storage.remove_all(storage.object_type.PROJECT);
    }
    function remove_one(id) {
        storage.remove_one(id, storage.object_type.PROJECT);
    }

    return {
        create,
        store,
        get_all,
        get_one,
        remove_all,
        remove_one
    }
}

export const Project = project();