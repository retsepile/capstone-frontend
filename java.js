function getData() {
    fetch("https://karabo02.herokuapp.com/client")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        client = data;
        clientInformation(data);
      });
  }
  
  getData();




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
