// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    // If none, add 1
    nextId = 1;
  } else {
    // If it exists, add 1.
    nextId++;
  }
  localStorage.setItem("nextId", JSON.stringify(nextId));
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
  const cardDueDate = $("<p>").addClass("card-text").text(task.date);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id);
  cardDeleteBtn.on("click", handleDeleteTask);

  // Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.date && task.status !== "done") {
    const now = dayjs();
    const taskDueDate = dayjs(task.date, "DD/MM/YYYY");

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, "day")) {
      taskCard.addClass("bg-warning text-white");
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass("bg-danger text-white");
      cardDeleteBtn.addClass("border-light");
    }
  }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // Clears fields
  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("#done-cards").empty();

  // Activate call all task to call in storage. Calls create task mult times.
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  // for loop, to iterate taskList
  for (i = 0; i < taskList.length; i++) {
    const card = createTaskCard(taskList[i]);

    if (taskList[i].status == "to-do") {
      $("#todo-cards").append(card);
    }
    if (taskList[i].status == "in-progress") {
      $("#in-progress-cards").append(card);
    }
    if (taskList[i].status == "done") {
      $("#done-cards").append(card);
    }
  }

  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // Will create clone of card (visual only)
    helper: function (e) {
      
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // Activates task
  // Object info
  console.log(event);
  event.preventDefault();
  const taskTitle = $("#taskTitle").val();
  const taskDate = $("#taskDate").val();
  const taskDescription = $("#taskDescription").val();
  const task = {
    title: taskTitle,
    date: taskDate,
    description: taskDescription,
    id: generateTaskId(),
    status: "to-do",
  };
  // Calls array
  taskList.push(task);
  // Stores in localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  window.location.reload();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskItem = $(event.target.closest("div")).parent();
  if (taskItem) {
    // Removes the task item from the DOM
    taskItem.remove();
  }
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  let target = event.target.dataset.taskId;
  console.log(target);
  console.log(taskList);
  // Filter array
  let updatedList = taskList.filter((task) => task.id != target);
  console.log(updatedList);

  // Updates list
  localStorage.setItem("tasks", JSON.stringify(updatedList));
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Reads tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Gets the project id from the event
  const taskId = ui.draggable[0].dataset.taskId;

  // Gets the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  let updatedList = tasks.map((task) => {
    if (task.id == taskId) {
      task.status = newStatus;
    }
    return task;
  });

  // Saves updatedList to localStorage
  localStorage.setItem("tasks", JSON.stringify(updatedList));
  renderTaskList();
}

// Todo: When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  const taskButtonEl = document.getElementById("taskbutton");
  taskButtonEl.addEventListener("click", handleAddTask);

  renderTaskList();
});

// Datepicker widget
$(function () {
  $("#taskDate").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // Make lanes droppable
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});
