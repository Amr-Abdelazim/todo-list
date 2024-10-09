import { storage } from "./storage_controller";
function note() {
    function create(title, content) {
        let id = null;
        return { id, title, content };
    }

    function store(new_note) {
        if (new_note.id === null)
            new_note.id = storage.generate_id(storage.object_type.NOTE);
        storage.store(new_note, storage.object_type.NOTE);
    }
    function get_all() {
        return storage.get_all(storage.object_type.NOTE);
    }
    function get_one(id) {
        return storage.get_one(id, storage.object_type.NOTE);
    }
    function remove_all() {
        storage.remove_all(storage.object_type.NOTE);
    }
    function remove_one(id) {
        storage.remove_one(id, storage.object_type.NOTE);
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
export const Note = note();