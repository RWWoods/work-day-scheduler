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
  // these variables set the date at the top of the page to todays date
  var date = document.getElementById("currentDay");
  var todayDate = dayjs().format('dddd MMMM DD, YYYY')
  date.textContent = todayDate;

  var timeHeader = document.getElementById("currentTime");

  // the following function sets an interval of 1 second to update the clock at the top of the page
  function displayTime() {
    var now = dayjs().format(' hh:mm:ss a')
    timeHeader.textContent = "It is currently " + now;

  }
  displayTime();
  setInterval(displayTime, 1000);

  // the following variables are used to adjust the color of the time blocks according to the current time.
  var hourBlocks = document.getElementsByClassName("row time-block");
  var currentHour = dayjs().format('H');
  var hourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17]
  var x = -1;

  var containerEl = $(".container-lg");
// these variables create a blank array that can be updated with saved data from local storage
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if (existingEntries == null) existingEntries = [];

// this on click function saves data from the corrosponding text area to a local storage array
  containerEl.on("click", ".saveBtn", function (event) {
    var allEntries = []
    entryText = $(event.target).siblings().eq(1).val();
    localStorage.setItem("entryText", JSON.stringify(entryText));
    existingEntries.push(entryText);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries))
  })
// this for loop is what sets the color of the hourblocks by modifying the class based on current time
  for (var i = 0; i < hourBlocks.length; i++) {

    x++
    if (currentHour > hourArray[x]) {
      hourBlocks[x].setAttribute("class", "row time-block past");
    } else if (currentHour == hourArray[x]) {
      hourBlocks[x].setAttribute("class", "row time-block present");
    } else {
      hourBlocks[x].setAttribute("class", "row time-block future");
    }
  }
// this for loop iterates through the hourBlocks and pulls data from the local storage array to fill them on page load... the order of the data might need work.
  for (let k = 0; k < hourBlocks.length; k++) {

    if (existingEntries[k] != null) {
      hourBlocks[k].children[1].innerHTML = existingEntries[k];
    } else {
      return;
    }
  }
});

