function getData() {
    fetch("https://karabo02.herokuapp.com/client ")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        client = data;
        clientInformation(data);
      });
  }
  
  getData();


  const div = document.getElementById('bookings');
  const div = 'https://karabo02.herokuapp.com/location '


$(document).ready(function() {
    var open = $('.open-nav'),
        close = $('.close'),
        overlay = $('.overlay');

    open.click(function() {
        overlay.show();
        $('#wrapper').addClass('toggled');
    });

    close.click(function() {
        overlay.hide();
        $('#wrapper').removeClass('toggled');
    });
});


var spread = Spreadsheet.getActiveSpreadsheet();
var sheet = spread.getSheets()[0];
var lastRow = sheet.getLastRow();
var lastColumn = sheet.getLastColumno();


function getSubmission(){
    this.timestamp = sheet.getRange(lastRow, 1).getValue();
    this.name = sheet.getRange(lastRow,2).getValue();
    this.reason = sheet.getRange(lastRow, 3).getValue();

}