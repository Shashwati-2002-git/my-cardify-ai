async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Header
loadComponent("header", "/partials/header.html").then(async () => {
  const module = await import("/js/header.js");
  module.initHeader();
});

// Footer
loadComponent("footer", "/partials/footer.html");