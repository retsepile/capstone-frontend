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
        <p class = "price">${bookings[3]}</p>
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
            <p class = "price">${bookings[3]}</p>
            <img class = "image" src="${bookings[4]}"></img>
            <button onclick="book(${bookings[0]})">Book</button> 
          
          </div>`
        })
      }
    }
  


    function login() {
      let username = document.getElementById("username").value
      let password = document.getElementById("password").value
      fetch("https://karabo02.herokuapp.com/sign-up", {
        method: "PATCH",
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["description"] == "Invalid credentials") {
            alert(
              "Username or password is incorrect. Please enter correct details"
            );
          } else {
            window.location.replace('./index.html')
          }
        });
    }
    
    function register() {
      let fullname = document.getElementById("fullname").value
      let surname = document.getElementById("surname").value
      let user = document.getElementById("user").value
      let password = document.getElementById("password").value
      let email = document.getElementById("email").value
      fetch("https://karabo02.herokuapp.com/sign-up", {
        method: "POST",
        body: JSON.stringify({
          first_name: fullname,
          last_name: surname,
          username:user,
          password:password,
          email: email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["message"] == "success") {
            alert("Registered successfully!, please log in.");
            window.location.replace('./log-in.html')
          } else {
            alert("Please enter correct information");
          }
        });
    }