(function() {
  var xhr = new XMLHttpRequest();
  var file = 'navHeader.html';
  xhr.open('GET', file, true);
  xhr.responseType = 'document';
  xhr.onload = function() {
    if (xhr.status === 200) {
      var doc = xhr.response;
      document.querySelector('main').before(doc.body.querySelector('header'));
      document.head.prepend(...doc.head.children);

    }
  };

  xhr.send();
})();