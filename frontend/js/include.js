// Load an HTML partial into a target element
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

// Adjust paths according to your folder structure
// Pages are in frontend/pages/, header/footer are in same folder
loadComponent("header", "../partials/header.html");
loadComponent("footer", "../partials/footer.html");