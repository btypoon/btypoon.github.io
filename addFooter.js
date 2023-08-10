(function() {
  var xhr = new XMLHttpRequest();
  var file = 'navFooter.html';
  xhr.open('GET', file, true);
  xhr.responseType = 'document';
  xhr.onload = function() {
    if (xhr.status === 200) {
      var doc = xhr.response;
      var newElement = doc.body.querySelector('footer');
      var newStyle = doc.head.querySelector('style');
      var indexHead = document.head;
      var indexMain = document.querySelector('main');
      indexMain.after(newElement);
      indexHead.appendChild(newStyle);
    };
  };

  xhr.send();
})();