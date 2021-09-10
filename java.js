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

    function renderBookings(bookingsAppointment){
      let bookingsContainer = document.querySelector("#appointments");
      bookingsContainer.innerHTML = "";
      if (bookingsAppointment.lenght > 0){
        bookingsAppointment.map((bookingsAppointment) => {
          bookingsContainer.innerHTML += `
          <div class = "container">
            <<h2 class = "name_of_continent"> ${bookings[1]}</h2>
            <p class = "name_of_country"> ${bookings[2]}</p>
            <p class = "days_of_trip">${bookings[3]}</p>
            <img class = "image" src="${bookings[4]}"></img>
            <button onclick="book(${bookings[0]})">Book</button> 
          
          </div>`
        })
      }
    }
  