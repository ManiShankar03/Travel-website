document.getElementById('userMenuButton').addEventListener('click', function() {
    document.getElementById('userMenu').style.display = 'block';
});

document.getElementById('dashboard').addEventListener('click', function() {
    // Redirect to dashboard page
    window.location.href = '/dashboard';
});

document.getElementById('logout').addEventListener('click', function() {
    // Redirect to main page (logout)
    window.location.href = '/';
});

// Optional: Hide the menu when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('#userMenuButton')) {
        var dropdowns = document.getElementsByClassName("user-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
});
