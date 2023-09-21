(function addTemplate() {
  //To avoid global variable conflict, wrap everything in function
  //request nav.html and append nav bar
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // Make a GET request to the file
  xhr.open('GET', 'template.html', true);
  // Set the response type to text. Default type: text
  xhr.responseType = 'document';
  // When the request is complete
  xhr.onload = function() {
    if (this.status === 200) {
      var templateDocument = xhr.response;
      addHeader(templateDocument);
      addFooter(templateDocument);
      addNavBar(templateDocument);
      addLinkCSS(templateDocument);
      addLinkScript(templateDocument, 1);
      setTimeout(addLinkScript, 500, templateDocument, 2);
    };
  };
  xhr.send();
})();

function addHeader(templateDocument) {
  var template = templateDocument.querySelector('#navHeaderTemplate');
  var clone = template.content.cloneNode(true);
  document.querySelector('main').before(clone);
  document.head.prepend(templateDocument.querySelector('#navHeaderStyle'));

};

function addFooter(templateDocument) {
  var template = templateDocument.querySelector('#navFooterTemplate');
  var clone = template.content.cloneNode(true);
  document.querySelector('main').after(clone);
  document.head.prepend(templateDocument.querySelector('#navFooterStyle'));
};

function addNavBar(templateDocument) {
  var template = templateDocument.querySelector('#navBarTemplate');
  var clone = template.content.cloneNode(true);
  document.querySelector('main').before(clone);
  document.head.prepend(templateDocument.querySelector('#navBarStyle'));
};

function addLinkCSS(templateDocument) {
  var template = templateDocument.querySelector('#linkCSS');
  var clone = template.content.cloneNode(true);
  document.head.prepend(clone);
};

function addLinkScript(templateDocument, index) {
  var template = templateDocument.querySelector('#linkScript' + index.toString());
  var clone = template.content.cloneNode(true);
  document.body.append(clone);
};


function getButton() {
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
      document.body.scrollTop > 115 ||
      document.documentElement.scrollTop > 115
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