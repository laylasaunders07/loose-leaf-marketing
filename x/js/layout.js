fetch('/x/helpers/layout.html')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const header = doc.querySelector('header');
    const footer = doc.querySelector('footer');
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (header && headerPlaceholder) {
      headerPlaceholder.appendChild(header);
    }
    if (footer && footerPlaceholder) {
      footerPlaceholder.appendChild(footer);
    }
  });