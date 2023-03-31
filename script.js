// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

$(function () {
  var date = document.getElementById("currentDay");
  var todayDate = dayjs().format('dddd, MMMM DD, YYYY')
  date.textContent = todayDate;

  var timeHeader = document.getElementById("currentTime");

  function displayTime() {
    var now = dayjs().format(' hh:mm:ss a')
    timeHeader.textContent = "It is currently " + now;

  }
  displayTime();
  setInterval(displayTime, 1000);

  var hourBlocks = document.getElementsByClassName("row time-block");
  // var currentHour = dayjs().format('H');
  var currentHour = 13
  var hourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17]
  var x = -1;

  var containerEl = $(".container-lg");

  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if (existingEntries == null) existingEntries = [];
  console.log(hourBlocks[0].children[1]);

  containerEl.on("click", ".saveBtn", function (event) {
    var allEntries = []
    entryText = $(event.target).siblings().eq(1).val();
    localStorage.setItem("entryText", JSON.stringify(entryText));
    existingEntries.push(entryText);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries))
  })

  for (let i = 0; i < hourBlocks.length; i++) {

    x++
    if (currentHour > hourArray[x]) {
      hourBlocks[x].setAttribute("class", "row time-block past");
    } else if (currentHour == hourArray[x]) {
      hourBlocks[x].setAttribute("class", "row time-block present");
    } else {
      hourBlocks[x].setAttribute("class", "row time-block future");
    }
  }

  for (let k = 0; k < hourBlocks.length; k++) {
    // y++
    if (existingEntries[k] != null) {
      hourBlocks[k].children[1].innerHTML = existingEntries[k];
    } else {
      return;
    }
  }
});

