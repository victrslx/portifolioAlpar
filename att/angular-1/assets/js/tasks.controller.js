app.controller("TaskController", function ($scope, $filter, TaskService) {

    // $scope.tasks = [
    //     { name: "Task 1", completed: false },
    //     { name: "Task 2", completed: true },
    //     { name: "Task 3", completed: false },
    // ];

    // $scope.addTask = function () {
    //     if ($scope.newTask) {
    //         $scope.tasks.push({ name: $scope.newTask, completed: false });
    //         $scope.newTask = "";
    //     }
    // };

    // $scope.removeTask = function (index) {
    //     $scope.tasks.splice(index, 1);
    // };

    $scope.modalActive = false;
    $scope.showCompletedOnly = false;
    $scope.incompletedOnly = false;
    $scope.todayOnly = false;
    $scope.today = new Date().toLocaleDateString();

    $scope.tasks = TaskService.getTasks() || [];

    $scope.taskInput = {
        id: "",
        title: "",
        date: new Date(),
        checked: false,
    }

    $scope.toggleModal = () => {
        $scope.modalActive = !$scope.modalActive;
    }


    $scope.filterdTasks = () => {
        let filtered = $filter("filter")(
            $filter("filter")(
                $scope.tasks,
                $scope.showCompletedOnly ? { checked: true } : {}
            ),
            $scope.incompletedOnly ? { checked: false } : {}
        );
        if ($scope.todayOnly) {
            const start = new Date();
            start.setHours(0, 0, 0, 0);
            const end = new Date();
            end.setHours(23, 59, 59, 999);
            filtered = filtered.filter((task) => {
                const taskDate = new Date(task.date);
                return (taskDate.getTime() >= start.getTime() && taskDate.getTime() <= end.getTime());
            });
        }
        return filtered;
    }

    $scope.handleSubmitAddTask = () => {
        const title = $scope.taskInput.title
        const date = $scope.taskInput.date

        TaskService.addTask(title, date);
        $scope.tasks = TaskService.getTasks();

        if (!title || !date) {
            alert("Preencha o campo de tarefa!");
            return;
        }

        $scope.toggleModal();
        $scope.taskinputput = "";
        $scope.taskInput.date = "";
    }
    $scope.toggleCheckedTask = () => {
        task.checked = !task.checked;
        TaskService.toggleCheck(task.id, task.checked);
        $scope.tasks = TaskService.getTasks();
    }

    $scope.deleteTask = (currentTask) => {
        TaskService.removeTask(currentTask.id);
        $scope.tasks = TaskService.getTasks();
    }
    $scope.validate = (error, touched) => {
        if (!touched) {
            return {};
        }
        const values = Object.values(error);
        if (values.length === 0) {
            return {};
        }
        const isInvalid = values.reduce((acc, curr) => acc && curr, true);

        if (isInvalid) {
            return { "border-color": "red" };
        }
        return {};
    }
});