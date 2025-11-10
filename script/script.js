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
(function fixScrollRestoration(delay = 500) {
  history.scrollRestoration = "manual";
  window.addEventListener("beforeunload", () => {
    console.log("Saving scrollY:", window.scrollY);
    sessionStorage.setItem("scrollY", window.scrollY.toString());
  });
  window.addEventListener("load", () => {
    const savedScrollY = sessionStorage.getItem("scrollY");
    if (savedScrollY !== null) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollY, 10));
      }, delay);
      console.log("Restored scroll position:", savedScrollY);
    } else {
      console.log("No saved scroll position found.", savedScrollY);
    }
  });
})();

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

(function auto_display_datetime() {
  document.addEventListener("DOMContentLoaded", function () {
    const times = document.querySelectorAll("div.datetime>time");
    if (times.length > 0) {
      times.forEach(function (e) {
        const datetimeStr = e.getAttribute("datetime");
        const date = new Date(datetimeStr);
        if (!isNaN(date.getTime())) {
          const formatter = Intl.DateTimeFormat(navigator.languages, {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          e.textContent = formatter.format(date);
        } else {
          console.warn("Invalid date:", e);
        }
      });
    }
  });
})();

(function horizontalScrolling(delay = 500) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const containers = document.querySelectorAll(
        ".tablewrapper, span.command, code.hljs"
      );
      containers.forEach(function (e) {
        if (e.scrollWidth > e.clientWidth) {
          // console.log(e, e.scrollWidth, e.clientWidth);
          e.addEventListener(
            "wheel",
            function (wheelEvent) {
              wheelEvent.preventDefault();
              e.scrollLeft += wheelEvent.deltaY;
            },
            { passive: false }
          );
        }
      });
    }, delay);
  });
})();

(function addCopyButtons() {
  document.querySelectorAll("pre>code").forEach(function (node) {
    const button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.title = "Copy to clipboard";
    button.textContent = "Copy";
    node.parentElement.append(button);
  });
  document.querySelectorAll("button.copy").forEach(function (button) {
    button.addEventListener("click", function () {
      // const targetQuery = button.dataset.copy;
      const targetNode = button.previousElementSibling;
      console.log(targetNode);
      if (targetNode) {
        const textToCopy = targetNode.textContent;
        console.log(textToCopy);
        navigator.clipboard.writeText(textToCopy).then(function (e) {
          button.textContent = "Copied!";
          button.disabled = true;
          setTimeout(function () {
            button.textContent = "Copy";
            button.disabled = false;
          }, 5000);
        });
      }
    });
  });
  document.querySelectorAll("span.command").forEach(function (node) {
    let popup = document.createElement("i");
    popup.className = "popup fa-solid fa-copy";
    node.append(popup);
    node.addEventListener("click", function () {
      const textToCopy = node.textContent.replace(/\s+/g, " ").trim();
      console.log(textToCopy);
      navigator.clipboard.writeText(textToCopy).then(function (e) {});
    });
  });
})();
