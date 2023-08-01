// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  var currDay = dayjs();
  $('#currentDay').html(`${currDay.format('dddd')},
  ${currDay.format('MMMM/DD/YYYY')}<br>
  ${currDay.format('hh:mm a')}`);

  var currHour = parseInt(currDay.format('H'));
  var businessHours = 9;

  for (var i = 0; i < businessHours; i++) {
    var divHourEl = $('<div>');
    divHourEl.attr('data-hour', (i + 9));
    divHourEl.addClass('row time-block');

    var hourTextEl = $('<div>');
    hourTextEl.addClass('col-2 col-md-1 hour text-center py-3');
    if (i < 3) {
      hourTextEl.text(`${(i + 9)} AM`);
    } else if (i == 3) {
      hourTextEl.text(`${(i + 9)} PM`);
    } else {
      hourTextEl.text(`${(i - 3)} PM`);
    }
    
    var divDataHour = parseInt(divHourEl.attr('data-hour'));
    if(currHour === divDataHour) {
      divHourEl.removeClass('past');
      divHourEl.addClass('present');
      divHourEl.removeClass('future');
    } else if (currHour < divDataHour) {
      divHourEl.removeClass('past');
      divHourEl.removeClass('present');
      divHourEl.addClass('future');
    } else if (currHour > divDataHour) {
      divHourEl.addClass('past');
      divHourEl.removeClass('present');
      divHourEl.removeClass('future');
    }

    var textAreaEl = $('<textarea>');
    textAreaEl.addClass('col-8 col-md-10 description');
    textAreaEl.attr('rows', 3);

    var btnEl = $('<button>');
    btnEl.addClass('btn saveBtn col-2 col-md-1');
    btnEl.attr('aria-label', 'save');

    var iconEl = $('<i>');
    iconEl.addClass('fas fa-save');
    iconEl.attr('aria-hidden', 'true');
    btnEl.append(iconEl);

    divHourEl.append(hourTextEl);
    divHourEl.append(textAreaEl);
    divHourEl.append(btnEl);
    $('.container-lg').append(divHourEl);
  }

  $('.saveBtn').on('click', function () {
    console.log(this);
    var selectHour = $(this).parents().attr('data-hour');
    console.log(selectHour);
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});
