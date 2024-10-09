function create_storage() {
    const object_type = Object.freeze({// These types should be unique!
        NOTE: "note",
        TO_DO: "to-do",
        PROJECT: "project"
    });
    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    function getItem(key) {
        const ans = localStorage.getItem(key);
        if (ans === null) return null;
        return JSON.parse(ans);
    }
    function removeItem(key) {
        localStorage.removeItem(key);
    }
    function create_key(id, type) {
        return type + ": " + String(id);
    }
    function check_type(type) {
        if (!Object.values(object_type).includes(type)) {
            throw new Error("Invalid type provided for storage!")
        }
    }
    function is_valid_key(id, type) {
        const key = create_key(id, type);
        if (getItem(key) === null) return true;
        return false;
    }
    function generate_id(type) {
        check_type(type);
        let i = 0;
        while (!is_valid_key(i, type)) {
            i++;
        }
        return i;
    }

    function type_keys(type) {
        return type + "-keys";
    }
    function store(data, type) {
        check_type(type);
        const key_of_type = type_keys(type);
        if (getItem(key_of_type) === null) {
            setItem(key_of_type, []); // add empty array for new type
        }
        const key = create_key(data.id, type);
        const all_keys = getItem(key_of_type);
        if (!all_keys.includes(key))
            all_keys.push(key);
        setItem(key_of_type, all_keys);
        setItem(key, data);
    }

    function remove_one(id, type) {
        check_type(type);
        if (type === object_type.PROJECT) {
            const del_obj = get_one(id, type);
            for (let cur of del_obj.to_dos) {
                remove_one(cur.id, object_type.TO_DO);
            }
            for (let cur of del_obj.notes) {
                remove_one(cur.id, object_type.NOTE);
            }
        }
        const key_of_type = type_keys(type);
        const all_keys = getItem(key_of_type);
        if (all_keys === null) {
            throw new Error(`The type: ${type} doesn't exist!`)
        }
        const key = create_key(id, type);
        const filtered_all_keys = all_keys.filter(item => item !== key);
        setItem(key_of_type, filtered_all_keys);
        removeItem(key);
    }
    function get_one(id, type) {
        check_type(type);
        const key_of_type = type_keys(type);
        const all_keys = getItem(key_of_type);
        if (all_keys === null) {
            throw new Error(`The type: ${type} doesn't exist!`)
        }
        const key = create_key(id, type);
        return getItem(key);
    }
    function get_all(type) {
        check_type(type);
        const key_of_type = type_keys(type);
        const all_keys = getItem(key_of_type);
        if (all_keys === null) {
            return [];
        }
        let answer = [];
        for (let key of all_keys) {
            answer.push(getItem(key));
        }
        return answer;
    }
    function remove_all(type) {
        check_type(type);
        const key_of_type = type_keys(type);
        const all_keys = getItem(key_of_type);
        if (all_keys === null) {
            return;
        }
        for (let key of all_keys) {
            removeItem(key);
        }
        setItem(key_of_type, []);
    }




    return {
        object_type,
        store,
        remove_one,
        remove_all,
        get_all,
        get_one,
        generate_id
    }
}

export const storage = create_storage();