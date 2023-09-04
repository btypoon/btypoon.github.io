setTimeout(function() { //To avoid global variable conflict, wrap everything in function
  //request nav.html and append nav bar
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the file path
  var file = 'navBar.html';

  // Make a GET request to the file
  xhr.open('GET', file, true);

  // Set the response type to text
  xhr.responseType = 'document';

  // When the request is complete
  xhr.onload = function() {
    // Check if the request was successful
    if (xhr.status === 200) {
      // Get the document object from the response
      var doc = xhr.response;
      //add nav before main
      document.querySelector('main').before(doc.body.querySelector('#nav-overlay'));
      //Add nav Style to index head
      document.head.appendChild(doc.head.querySelector('style'));
    };
  };

  // Send the request
  xhr.send();

  //scroll Back To Top Button
  // your logic goes here
  function getButton() {
    console.info('first script had finished');
    mybuttonDiv = document.querySelector(".bottomRightButtons");
    mybutton = document.getElementById("btn-back-to-top");
    mybuttonDiv.style.display = "none";

    if (mybutton == null) {
      console.log('mybutton does not exist in the DOM');
      console.log(mybutton);
    } else {
      console.log('mybutton exist in the DOM');
      console.log(mybutton);
    }
    window.onscroll = function() {
      // When the user scrolls down 20px from the top of the document, show the button
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybuttonDiv.style.display = "flex";
      } else {
        mybuttonDiv.style.display = "none";
      }
    };
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });

  };
  window.addEventListener("load", function() {
    setTimeout(getButton, 500);
  });
}, 500);