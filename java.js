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
        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#place-${bookings[0]}">
  Book Now!
</button>

<!-- Modal -->
<div class="modal fade" id="place-${bookings[0]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${ bookings[1] }</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Price of booking: ${bookings[3]}</p>
        <form>
        <label for="fullname">First name:</label><br>
        <input type="text" id="fullname" name="fullname"><br>
        <label for="lastname">Last name:</label><br>
        <input type="text" id="lastname" name="lastname"><br><br>
        <label for="quantity">Number Of Days:</label> <br><br>
  <input type="number" id="num_days" name="num_days" min="1" max="10"><br><br>
        <input type="submit" value="Submit">
      </form> 


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

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
              let user = data.data
              localStorage.setItem("user", JSON.stringify(user))
            window.location.replace('./index.html')
          }
        });
    }
    
    function register() {
      let fullname = document.getElementById("first_name").value
      let surname = document.getElementById("last_name").value
      let user = document.getElementById("username").value
      let password = document.getElementById("password").value
      let email = document.getElementById("email").value
      let new_user = {
          first_name: fullname,
          last_name: surname,
          username:user,
          password:password,
          email: email,
      }
      console.log(new_user)
      fetch("https://karabo02.herokuapp.com/sign-up", {
        method: "POST",
        body: JSON.stringify(new_user),
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

    function searchFilter() {
      let searchTerm = document.querySelector("#search").value;
      console.log(client)
      console.log(searchTerm)
      let foundbookings = client.filter(booking => booking[1].toLowerCase().includes(searchTerm.toLowerCase()));
      console.log(foundbookings);
      // showBookings(Object.entries(booking));
      makeAppointments(foundbookings)
    }