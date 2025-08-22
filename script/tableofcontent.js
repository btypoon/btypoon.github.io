(function(){
    document.addEventListener("DOMContentLoaded", function() {
    const toc = document.querySelector('ol.toc');
    if (toc) {
        const tocLinks = document.querySelectorAll('li > a[href^="#"]');

        tocLinks.forEach(link => {
        // Get the target ID from href
        const targetId = link.getAttribute('href').substring(1);
        const targetHeading = document.getElementById(targetId);
        
        if (targetHeading) {
            // Set the link text to the h2 content
            link.textContent = targetHeading.textContent;
        }
    }
    });
  });
})();