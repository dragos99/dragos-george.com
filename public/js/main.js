'use strict';

const navBarHeight = 70;

function init() {
    const intro = document.getElementById('intro');
    const title = document.getElementById('title');
    const particles = document.getElementById('particles');
    const navBar = document.querySelector('nav');
    const navLinks = document.getElementsByClassName('nav-item');

    // intro: parallax effect
    document.addEventListener('scroll', (e) => {
        const scroll = -window.pageYOffset / 3;
        if (scroll <= window.innerHeight / 3) {
            intro.style.transform = `translateY(${scroll}px`;
            title.style.transform = `translateY(${window.pageYOffset / 10}px`
            particles.style.transform = `translateY(${window.pageYOffset / 10}px`
        }
    });

    // navbar: change background
    window.addEventListener('scroll', (e) => {
        const start = window.innerHeight - navBarHeight * 4;
        const end = window.innerHeight - navBarHeight;
        let opacity = (window.pageYOffset - start) / (end - start);
        if (opacity <= 1) {
            if (opacity < 0.1) opacity = 0.1;
            navBar.style.background = `rgba(0,0,0,${opacity}`;
        }
    });

    // navLinks: go to
    for (const navLink of navLinks) {
        navLink.addEventListener('click', (e) => {
            const goToElement = navLink.getAttribute('goTo');
            const scroll = document.querySelector(goToElement).offsetTop - navBarHeight;
            window.scrollTo({ top: scroll, behavior: 'smooth' });
        });
    }

    // init particles
    particlesJS('particles', {
        "particles": {
            "number": {
                "value": 150,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.5,
                    "sync": false
                }
            },
            "size": {
                "value": 2.5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 2,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.6,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 10,
                    "duration": 3,
                    "opacity": 1,
                    "speed": 1
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

window.onload = init;