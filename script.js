document.addEventListener('DOMContentLoaded', () => {
    // If root '/', load home page
    if (location.pathname === '/' || location.pathname === '/index.html') {
        navigateTo('/home');
    } else {
        loadPage(location.pathname);
    }
});
// Load Header and Footer
fetch('./src/app/layout/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

fetch('./src/app/layout/footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

function loadPage(path) {
    let page = path.replace('/', '') || 'home'; // remove '/' and fallback to 'home'

    fetch(`./src/app/pages/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error('Page not found');
            return res.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(() => {
            document.getElementById('content').innerHTML = '<h2>404 - Page Not Found</h2>';
        });
}

function navigateTo(path) {
    history.pushState(null, null, path);
    loadPage(path);
}

window.addEventListener('popstate', () => {
    loadPage(location.pathname);
});


