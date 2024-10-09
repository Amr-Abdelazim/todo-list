import { storage } from "./storage_controller";
function to_do() {
    const priority_options = Object.freeze({// These options should be unique!
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high"
    });
    function check_priority(priority) {
        if (!Object.values(priority_options).includes(priority)) {
            throw new Error("Invalid priority provided for to_do!")
        }
    }
    function check_title(title) {
        if (title.length > 40) {
            throw new Error("Title of to_do exceded 40 character!");
        }
    }
    function create(title, content, priority, str_date, is_done) {
        check_priority(priority);
        check_title(title);
        let id = null;
        return { id, title, content, priority, str_date, is_done };
    }

    function store(new_to_do) {
        if (new_to_do.id === null)
            new_to_do.id = storage.generate_id(storage.object_type.TO_DO);
        storage.store(new_to_do, storage.object_type.TO_DO);
    }
    function get_all() {
        return storage.get_all(storage.object_type.TO_DO);
    }
    function get_one(id) {
        return storage.get_one(id, storage.object_type.TO_DO);
    }
    function remove_all() {
        storage.remove_all(storage.object_type.TO_DO);
    }
    function remove_one(id) {
        storage.remove_one(id, storage.object_type.TO_DO);
    }




    return {
        priority_options,
        create,
        store,
        get_all,
        get_one,
        remove_all,
        remove_one
    }
}

export const To_do = to_do();