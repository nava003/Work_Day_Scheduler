// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  var currDay = dayjs();
  $('#currentDay').html(`${currDay.format('dddd')},
  ${currDay.format('MMMM/DD/YYYY')}<br>
  ${currDay.format('hh:mm a')}`);

  var currHour = dayjs().format('h');
  // console.log(typeof(currHour), currHour);
  var businessHours = 9;

  for (var i = 0; i < businessHours; i++) {
    var divHourEl = $('<div>');

    if (i < 4) {
      divHourEl.attr('id', `hour-${(i + 9)}`);
    } else {
      divHourEl.attr('id', `hour-${(i - 3)}`);
    }
    divHourEl.addClass('row time-block');

    console.log($('.container-lg').find("div[id*='hour-']"));
    console.log(currHour == $('.container-lg').find("div[id*='hour-']"))
    console.log(currHour < $('.container-lg').find("div[id*='hour-']"))
    console.log(currHour > $('.container-lg').find("div[id*='hour-']"))

    var hourTextEl = $('<div>');
    hourTextEl.addClass('col-2 col-md-1 hour text-center py-3')
    if (i < 3) {
      hourTextEl.text(`${(i + 9)} AM`);
    } else if (i == 3) {
      hourTextEl.text(`${(i + 9)} PM`);
    } else {
      hourTextEl.text(`${(i - 3)} PM`);
    }
    // console.log(typeof(hourTextEl.text()), hourTextEl.text())
    // console.log(currHour === hourTextEl.text());
    // console.log(currHour < hourTextEl.text());
    // console.log(currHour > hourTextEl.text());
    // console.log(dayjs().format('h a'), currHour, "Same Hour? " + dayjs().isSame(currHour));
    // console.log("Before Hour? " + dayjs().isBefore(currHour));
    // console.log("After Hour? " + dayjs().isAfter(currHour));

    if(currHour === hourTextEl.text()) {
      divHourEl.removeClass('past');
      divHourEl.addClass('present');
      divHourEl.removeClass('future');
    } else if (currHour < hourTextEl.text()) {
      divHourEl.addClass('past');
      divHourEl.removeClass('present');
      divHourEl.removeClass('future');
    } else if (currHour > hourTextEl.text()) {
      divHourEl.removeClass('past');
      divHourEl.removeClass('present');
      divHourEl.addClass('future');
    }

    divHourEl.append(hourTextEl);
    $('.container-lg').append(divHourEl);
  }

  // console.log(currDay);
  // console.log(currDay.isSame(dayjs()));
  // console.log(dayjs());

  $('.saveBtn').on('click', function () {
    console.log(this);
  });
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
});
