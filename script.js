function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top >= 0 && rect.bottom <= windowHeight;
}

function animateProgressBar() {
    const shape1 = document.querySelector('.ensino-fundamental .progress-bar');
    const shape2 = document.querySelector('.ensino-médio .progress-bar');
    const shape3 = document.querySelector('.ensino-superior .progress-bar');

    if (isInViewport(shape1)) {
        shape1.querySelector('.progress').style.animation = 'progressAnimationFundamental 2s ease-in-out forwards';
    } else {
        shape1.querySelector('.progress').style.animation = 'none';
    }

    if (isInViewport(shape2)) {
        shape2.querySelector('.progress').style.animation = 'progressAnimationMédio 2s ease-in-out forwards';
    } else {
        shape2.querySelector('.progress').style.animation = 'none';
    }

    if (isInViewport(shape3)) {
        shape3.querySelector('.progress').style.animation = 'progressAnimationSuperior 2s ease-in-out forwards';
    } else {
        shape3.querySelector('.progress').style.animation = 'none';
    }
}


const carousel = document.querySelector('.carrossel');
const images = carousel.querySelectorAll('img');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;
const slideWidth = images[0].clientWidth;
const slideOffset = slideWidth * 1.5;
let intervalId;

document.addEventListener("DOMContentLoaded", function () {
    var linkedinIcon = document.querySelector(".linkedin");

    linkedinIcon.addEventListener("mouseover", function () {
        this.style.fill = "#0000FF"; /* Cor azul */
    });

    linkedinIcon.addEventListener("mouseout", function () {
        this.style.fill = "#000000"; /* Restaura a cor padrão */
    });
});

function slideTo(index, fastTransition = false) {
    carousel.style.transition = fastTransition ? 'transform 1 ease-in-out' : 'transform 1 ease-in-out';
    carousel.style.transform = `translateX(-${slideOffset * index}px)`;
    updateActiveDot(index);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    slideTo(currentIndex, true);
    setTimeout(() => {
        slideTo(currentIndex);
    }, 100);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    slideTo(currentIndex);
}

function updateActiveDot(index) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function startCarousel() {
    intervalId = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    clearInterval(intervalId);
}

nextButton.addEventListener('click', () => {
    stopCarousel();
    nextSlide();
    startCarousel();
});

prevButton.addEventListener('click', () => {
    stopCarousel();
    prevSlide();
    startCarousel();
});

carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

window.addEventListener('scroll', animateProgressBar);
window.addEventListener('resize', animateProgressBar);
document.addEventListener('DOMContentLoaded', animateProgressBar);

startCarousel();
