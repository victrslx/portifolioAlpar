window.app.factory("TaskService", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    return {
        getTasks: () => tasks,
        addTask: (taskTitle, date) => {
            tasks.push({
                id: Math.random().toString(36).substring(2, 9),
                title: taskTitle,
                date: date,
                checked: false,
            });
            saveTasks();
        },
        removeTask: (taskId) => {
            tasks = tasks.filter((task) => task.id !== taskId);
            saveTasks();
        },
        toggleCheck() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    };
});