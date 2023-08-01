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

    var storedText = localStorage.getItem(`Hour ${divDataHour}`);
    if (storedText !== '' | storedText !== null | storedText !== undefined) {
      textAreaEl.text(storedText);
    }
  };

  $('.saveBtn').on('click', function () {
    var selectHour = $(this).parent().attr('data-hour');
    var selectText = $(this).prev().val();

    if (selectText !== '' | selectText !== null | selectText !== undefined) {
      localStorage.setItem(`Hour ${selectHour}`, selectText);
    } else {
      return;
    }
  });
});
