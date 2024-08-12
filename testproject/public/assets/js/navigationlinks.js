document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        let targetId = this.getAttribute('href');
        let target = document.querySelector(targetId);
        let headerHeight = document.querySelector('.header-area').offsetHeight; // Adjust selector as needed

        window.scrollTo({
            top: target.offsetTop - headerHeight, // Adjust scroll position
            behavior: 'smooth'
        });
    });
});

