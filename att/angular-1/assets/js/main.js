const app = angular.module("taskModule", []);
app.controller("TaskController", function ($scope) {
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

    $scope.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    $scope.taskInput = {
        id: "",
        title: "",
        date: new Date(),
        dateStr: new Date().toLocaleDateString(),
        checked: false,
    }

    $scope.toggleModal = () => {
        $scope.modalActive = !$scope.modalActive;

    }
    $scope.handleSubmitAddTask = () => {
        const title = $scope.taskInput.title
        const date = $scope.taskInput.date
        if (!title || !date) {
            alert("Preencha o campo de tarefa!");
            return;

        }
        $scope.tasks.push({
            id: Math.random().toString(36).substring(2, 9),
            title: title,
            date: date,
            dateStr: date.toLocaleDateString(),
            checked: false,
        });

        localStorage.setItem("tasks", JSON.stringify($scope.tasks));

        $scope.toggleModal();
        $scope.taskinputput = "";
        $scope.taskInput.date = "";
    }
    $scope.toggleCheckedTask = () => {

        localStorage.setItem("tasks", JSON.stringify($scope.tasks));
    }

    $scope.removeTask = (currentTask) => {
        $scope.tasks = $scope.tasks.filter((task) => task.id !== currentTask.id);
        localStorage.setItem("tasks", JSON.stringify($scope.tasks));
    }
});