document.addEventListener("DOMContentLoaded", () => {
    
    /* ----------------------------------
       Custom Cursor Logic
    ----------------------------------- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');
    
    // Track mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let outX = mouseX;
    let outY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor using requestAnimationFrame for smoothness
    function animateCursor() {
        // Dot follows instantly
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;
        
        // Outline lags behind smoothly
        outX += (mouseX - outX) * 0.15;
        outY += (mouseY - outY) * 0.15;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        cursorOutline.style.left = `${outX}px`;
        cursorOutline.style.top = `${outY}px`;

        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Hover state expanding
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-active');
        });
        target.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-active');
        });
    });

    /* ----------------------------------
       Smooth Reveal on Scroll
    ----------------------------------- */
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    /* ----------------------------------
       Smooth Anchor Scrolling
    ----------------------------------- */
    document.querySelectorAll('.scroll-down, .smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (targetId === 'top') {
               window.scrollTo({top: 0, behavior: 'smooth'}); 
            }
        });
    });

});
