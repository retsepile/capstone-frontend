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
        <form onsubmit="event.preventDefault(); makeBooking(${ bookings[0] })">
        <label for="from_date">From date:</label><br>
        <input type="date" id="from_date-${bookings[0]}" name="from_date"><br>
        <label for="to_date">To date:</label><br>
        <input type="date" id="to_date-${bookings[0]}" name="to_date"><br>
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


   
    function makeBooking(place_id){
      let user = JSON.parse(localStorage.getItem("user"))
      if (!user){
        location.href = "./log-in.html"
      }
      let place = client.find(place => place[0] == place_id)
      let price = place[3].substring(2);
      let from_date = new Date(document.querySelector(`#from_date-${place_id}`).value);
      let to_date = new Date(document.querySelector(`#to_date-${place_id}`).value);

      let diffTime = Math.abs(to_date - from_date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      // const diff_in_time = to_date.getDate() - from_date.getDate();

      // let days = diff_in_time / (1000 * 3600 * 24);
      // days = Math.round(days)
      console.log(user, price, from_date, to_date, diffDays)
      console.log("Price is: ", price * diffDays)

      let booking = {
        user_id : user[0],
        from_date,
        to_date,
        payment: diffDays * price
      }

       fetch(`https://karabo02.herokuapp.com/payment/`, {
         method: "POST",
         body: JSON.stringify(booking),
         headers: {
          "Content-type": "application/json",
         }
       })
       .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["status_code"] == 201) {
            alert(`Booking was made for:
            ${ user[1] }
            FROM: ${from_date}
            TO: ${to_date}
            TOTAL DAYS: ${diffDays}
            TOTAL PRICE: ${diffDays * price}
            `);
            // window.location.replace('./view.html')
          } 
        });
    }

