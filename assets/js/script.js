// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // If statement if nextId doesn't exist/there's no value. Makes it start at 1
    if (nextId === null) {
        nextId = 1
    }
    // Else, nextId will be added 1
    else {
        nextId++
    }
    // Creating storage after getting nextId string
    localStorage.setItem('nextId', json.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log(task);
    const taskCard = $("<div>")
        .addClass("card task-card draggable my-3")
        .attr("data-task-id", task.id);
    const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $("<p>").addClass("card-text").text(task.description);
    const cardDueDate = $("<p>").addClass("card-text").text(text.date);
    const cardDeleteBtn = $("<button>")
        .addClass("btn btn-danger delete")
        .text("Delete")
        .attr("data-task-id", task.id);
    cardDeleteBtn.on("click", handleDeleteTask);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let taskList = JSON.stringify(localStorage.getItem('tasks')) || [];

    for (i = 0; i < taskList.length; i++) {
        const tdCard = createTaskCard(taskList[i]);

        $('#todo-cards').append(tdCard);
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log(event);
    event.preventDefault();
    const taskTitle = $('#taskTitle').val();
    const taskDate = $("#taskDate").val();
    const taskDescription = $('#taskDescription').val();
    const task = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
    };
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    const taskButtonEl = document.getElementById("taskbutton");
    taskButtonEl.addEventListener("click", handleAddTask);
});

// Widget for datepicker
$(function() {
    $('#taskDate').datepicker({
        changeMonth: true,
        changeYear: true
    });
});
