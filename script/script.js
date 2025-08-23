// (function addTemplate() {
//   //To avoid global variable conflict, wrap everything in function
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "template.html", true);
//   xhr.responseType = "document";
//   xhr.onload = function () {
//     if (this.status === 200) {
//       var templateDocument = xhr.response;
//       addNavBar(templateDocument); //prepend firstly
//       addHeader(templateDocument); //prepend secondly
//       addFooter(templateDocument);
//       addLinkCSS(templateDocument);
//       addLinkScript(templateDocument, 1);
//       setTimeout(addLinkScript, 500, templateDocument, 2);
//     }
//   };
//   xhr.send();
// })();

(function addTemplate() {
  fetch("template.html")
    .then(function (e) {
      return e.text();
    })
    .then(function (e) {
      var parser = new DOMParser();
      var templateDocument = parser.parseFromString(e, "text/html");
      addLinkCSS(templateDocument);
      addNavBar(templateDocument); // prepend firstly
      addHeader(templateDocument); // prepend secondly
      addFooter(templateDocument);
      addLinkScript(templateDocument, 1);
      setTimeout(function () {
        addLinkScript(templateDocument, 2);
      }, 500);
    })
    .catch(function (error) {
      console.error("Error fetching template:", error);
    });
})();

function addHeader(templateDocument) {
  var template = templateDocument.querySelector("#navHeaderTemplate");
  var clone = template.content.cloneNode(true);
  document.body.prepend(clone);
  document.head.prepend(templateDocument.querySelector("#navHeaderStyle"));
}

function addNavBar(templateDocument) {
  var template = templateDocument.querySelector("#navBarTemplate");
  var clone = template.content.cloneNode(true);
  document.body.prepend(clone);
  document.head.prepend(templateDocument.querySelector("#navBarStyle"));
}

function addFooter(templateDocument) {
  var template = templateDocument.querySelector("#navFooterTemplate");
  var clone = template.content.cloneNode(true);
  document.body.append(clone);
  document.head.prepend(templateDocument.querySelector("#navFooterStyle"));
}

function addLinkCSS(templateDocument) {
  var template = templateDocument.querySelector("#linkCSS");
  var clone = template.content.cloneNode(true);
  document.head.prepend(clone);
}

function addLinkScript(templateDocument, index) {
  var template = templateDocument.querySelector(
    "#linkScript" + index.toString()
  );
  var clone = template.content.cloneNode(true);
  document.body.append(clone);
}

function getButton() {
  mybuttonDiv = document.querySelector(".bottomRightButtons");
  mybutton = document.getElementById("btn-back-to-top");
  mybuttonDiv.style.display = "none";

  if (mybutton == null) {
    console.log("mybutton does not exist in the DOM");
    console.log(mybutton);
  } else {
    console.log("mybutton exist in the DOM");
    console.log(mybutton);
  }

  window.onscroll = function () {
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
  mybutton.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
window.addEventListener("load", function () {
  setTimeout(getButton, 500);
});

(function table_of_content_text() {
  document.addEventListener("DOMContentLoaded", function () {
    const toc = document.querySelector("ol.toc");
    if (toc) {
      const tocLinks = toc.querySelectorAll('a[href^="#"]');
      tocLinks.forEach(function (e) {
        const targetID = e.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
          e.textContent = targetElement.textContent.trim();
        }
      });
    }
  });
})();
