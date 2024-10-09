function dialog_for_to_do_details() {
    function run(toDoItem) {

        const dialog = document.getElementById('toDoDetailsDialog');
        const closeToDoDialogBtn = document.getElementById('closeToDoDialogBtn');


        document.getElementById('toDoDialogTitle').textContent = toDoItem.title;
        document.getElementById('toDoDialogDetails').textContent = toDoItem.content;
        const span = document.getElementById('toDoDialogPriority');
        span.textContent = toDoItem.priority;
        switch (toDoItem.priority) {
            case "low":
                span.style.color = "green";
                break;
            case "medium":
                span.style.color = "orange";
                break;
            case "high":
                span.style.color = "red";
                break;
        }

        document.getElementById('toDoDialogDueDate').textContent = toDoItem.str_date;

        dialog.showModal();

        closeToDoDialogBtn.addEventListener('click', () => {
            dialog.close();
        });

    }

    return {
        run,
    }
}

export const Dialog_for_to_do_details = dialog_for_to_do_details();