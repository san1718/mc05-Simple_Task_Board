// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // If statement if nextId doesn't exist/there's no value. Makes it start at 1
  if (nextId === null) {
    nextId = 1;
  }
  // Else, nextId will be added 1
  else {
    nextId++;
  }
  // Creating storage after getting nextId string
  localStorage.setItem("nextId", json.stringify(nextId));
  console.log(nextId);
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log(task);
  const taskCard = $("<div></div>")
    .addClass("card task-card draggable my-3")
    .attr("data-task-id", task.id)
    .draggable({
      start: function () {
        $(this).addClass("dragging");
      },
      stop: function () {
        $(this.removeClass("dragging"));
      },
      snap: ".lane",
      snapMode: "inner",
    });
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(text.date);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id)
    .on("click", handleDeleteTask);
  // cardDeleteBtn.on("click", handleDeleteTask);

  // Will get the current day and status
  if (task.date) {
    const now = dayjs();
    const taskDate = dayjs(task.date);

    if (now.isSame(taskDate, "day")) {
      taskCard.addClass("bg-warning text-white");
    } else if (now.isAfter(taskDate)) {
      cardBody.addClass("bg-danger text-white");
    }
  }

  // Appending elements to cards and returning created taskCard
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  cardBody.append(cardHeader, cardBody);
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
$(document).ready(function () {
  renderTaskList();
  // Making buttons clickable
  $('#submit').click(handleAddTask);
  $('#taskDueDate').datepicker({ changeMonth: true, changeYear: true });
  $('#save-button').click(handleAddTask);

  // Creating element for taskButton
  const taskButtonEl = document.getElementById('taskButton');
  // Creates task that can be dropped and dragged
  if (taskButtonEl) {
    taskButtonEl.addEventListener('click', handleAddTask);
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
  }
});

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  console.log(event);
  event.preventDefault();

  const taskTitle = $("#taskTitle").val();
  const taskDate = $("#taskDate").val();
  const taskDescription = $("#taskDescription").val();
  
  // Getting valid input
  if (!taskTitle || !taskDate || !taskDescription) {
    alert("Fill in all of the contents.");
    return;
  }

  const task = {
    id: generateTaskId(),
    title: taskTitle,
    date: taskDate,
    description: taskDescription,
    status: '#todo-cards',
  };
  
  taskList.push(task);
  // Local storage updates after pushing
  try {
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
  } catch (error) {
    console.error('Could not save to local storage, error: ', error);
    alert('Task could not be saved. Try again later.');
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  const taskButtonEl = document.getElementById("taskbutton");
  taskButtonEl.addEventListener("click", handleAddTask);
});

// Widget for datepicker

$("#taskDate").datepicker({
  dateFormat: "mm/dd/yy",
  timeFormat: "hh:mm tt",
});

try {
  saveTasksToStorage(tasks);
  renderTaskListt();
} catch (error) {
  console.error("Couldn't save task. Error: ", error);
}
