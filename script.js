// document.addEventListener('DOMContentLoaded', () => {
//     // If root '/', load home page
//     if (location.pathname === '/' || location.pathname === '/index.html') {
//         navigateTo('/home');
//     } else {
//         loadPage(location.pathname);
//     }
// });
// // Load Header and Footer
// fetch('./src/app/layout/header.html')
//     .then(res => res.text())
//     .then(data => {
//         document.getElementById('header').innerHTML = data;
//     });

// fetch('./src/app/layout/footer.html')
//     .then(res => res.text())
//     .then(data => {
//         document.getElementById('footer').innerHTML = data;
//     });

// function loadPage(path) {
//     let page = path.replace('/', '') || 'home'; // remove '/' and fallback to 'home'

//     fetch(`./src/app/pages/${page}.html`)
//         .then(res => {
//             if (!res.ok) throw new Error('Page not found');
//             return res.text();
//         })
//         .then(data => {
//             document.getElementById('content').innerHTML = data;
//         })
//         .catch(() => {
//             document.getElementById('content').innerHTML = '<h2>404 - Page Not Found</h2>';
//         });
// }

// function navigateTo(path) {
//     history.pushState(null, null, path);
//     loadPage(path);
// }

// window.addEventListener('popstate', () => {
//     loadPage(location.pathname);
// });
function loadScriptSequentially(scripts) {
    if (scripts.length === 0) {
        return;
    }

    const script = document.createElement('script');
    script.src = scripts[0];
    script.onload = function () {
        loadScriptSequentially(scripts.slice(1));
    };
    document.body.appendChild(script);
}

// After loading header and footer
fetch('./src/app/layout/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        return fetch('./src/app/layout/footer.html');
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        // Now header and footer are loaded
        loadScriptSequentially([
            'assets/js/theme.js',
            'assets/js/pricetable-toggler.js'
        ]);
    });
function scrollToSection(event, sectionId) {
    event.preventDefault();  // 🔥 this stops the href="#" jump

    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}