(function() {
  var xhr = new XMLHttpRequest();
  var file = 'navHeader.html';
  xhr.open('GET', file, true);
  xhr.responseType = 'document';
  xhr.onload = function() {
    if (xhr.status === 200) {
      var doc = xhr.response;
      var newElement = doc.body.querySelector('header');
      var newStyle = doc.head.querySelector('style');
      var indexHead = document.head;
      var indexMain = document.querySelector('main');
      indexMain.before(newElement);
      indexHead.appendChild(newStyle);
    }
  };

  xhr.send();
})();