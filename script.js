window.addEventListener("load", function() {
  let elm = document.querySelectorAll('main img');
  elm.forEach((e, i) => {
    let width = e.naturalWidth;
    console.log(i, e, width);
    if (width > "260") {
      e.classList.add("long");
    } else {
      e.classList.add("short");
    };
  });
});