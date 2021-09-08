let client = []
fetch("https://karabo02.herokuapp.com/location/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    client = data.data;
    makeAppointments(client);
  });
  



  function makeAppointments(client) {
    let container = document.querySelector("#bookings");
    container.innerHTML = "";
    client.forEach((bookings) => {
      container.innerHTML += `
      <div class = "container"> 
        <h2 class = "name_of_continent"> ${bookings[1]}</h2>
        <p class = "name_of_country"> ${bookings[2]}</p>
        <p class = "days_of_trip">${bookings[3]}</p>
        <img class = "image" src="${bookings[4]}"></img>
        <button onclick="book(${bookings[0]})">Book</button>    
      </div>
        `;
    });
    }


  // const div = document.getElementById('bookings');
  // const div = 'https://karabo02.herokuapp.com/'


// $(document).ready(function() {
//     var open = $('.open-nav'),
//         close = $('.close'),
//         overlay = $('.overlay');

//     open.click(function() {
//         overlay.show();
//         $('#wrapper').addClass('toggled');
//     });

//     close.click(function() {
//         overlay.hide();
//         $('#wrapper').removeClass('toggled');
//     });
// });


// var spread = Spreadsheet.getActiveSpreadsheet();
// var sheet = spread.getSheets()[0];
// var lastRow = sheet.getLastRow();
// var lastColumn = sheet.getLastColumno();


// function getSubmission(){
//     this.timestamp = sheet.getRange(lastRow, 1).getValue();
//     this.name = sheet.getRange(lastRow,2).getValue();
//     this.reason = sheet.getRange(lastRow, 3).getValue();

// }