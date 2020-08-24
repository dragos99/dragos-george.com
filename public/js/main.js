'use strict';

(function (window) {
    const headerHeight = 75;

    function fadeOut(element, duration = 1000) {
        return new Promise((resolve) => {
            element.style.animation = 'fadeOut';
            element.style.animationDuration = duration / 1000 + 's';
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    }

    function hidePreloader() {
        return fadeOut(document.querySelector('#preloader .loader'), 500).then(() => {
            fadeOut(document.getElementById('preloader'), 600);
            document.getElementById('title').style.display = 'block';
        });
    }

    function init() {
        const header = document.querySelector('header');
        const logo = document.getElementById('logo');
        const intro = document.getElementById('intro');
        const title = document.getElementById('title');
        const particles = document.getElementById('particles');
        const navLinks = document.getElementsByClassName('nav-item');

        // navLinks: go to
        for (const navLink of navLinks) {
            navLink.addEventListener('click', (e) => {
                const goToElement = navLink.getAttribute('goTo');
                const scroll = document.querySelector(goToElement).offsetTop - headerHeight;
                window.scrollTo({ top: scroll, behavior: 'smooth' });
            });
        }

        // navbar: change background
        function updateHeader() {
            const start = headerHeight * 2;
            const end = window.innerHeight - headerHeight;
            const progress = (window.pageYOffset - start) / (end - start);
            header.style.background = `rgba(21,21,21,${progress}`;

            if (progress >= 0.75) {
                if (!logo.className.includes('fadeIn')) {
                    logo.className = 'fadeIn';
                }
            } else {
                if (logo.className.includes('fadeIn')) {
                    logo.className = 'fadeOut';
                }
            }
        }

        // intro: parallax effect
        function updateIntro() {
            const scroll = -window.pageYOffset / 3;
            if (scroll <= window.innerHeight / 3) {
                intro.style.transform = `translateY(${scroll}px`;
                title.style.transform = `translateY(${window.pageYOffset / 10}px`
                particles.style.transform = `translateY(${window.pageYOffset / 10}px`
            }
        }

        updateHeader();
        updateIntro();

        window.addEventListener('scroll', updateIntro);
        window.addEventListener('scroll', updateHeader);

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

        // hide preloader
        hidePreloader();
        //.then(onReady);
    }

    window.onload = init;
})(window);
