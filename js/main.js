// Основной JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobile = document.getElementById('closeMobile');
    const menuLinks = document.querySelectorAll('[data-link]');
    
    if (burger) {
        burger.addEventListener('click', function() {
            mobileMenu.setAttribute('aria-hidden', 'false');
        });
    }
    
    if (closeMobile) {
        closeMobile.addEventListener('click', function() {
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    }
    
    // Закрытие меню при клике на ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    });
    
    // Год в футере
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Слайдер альбомов
    const albPrev = document.getElementById('albPrev');
    const albNext = document.getElementById('albNext');
    const slidesRow = document.getElementById('slidesRow');
    
    if (albPrev && albNext && slidesRow) {
        albPrev.addEventListener('click', function() {
            slidesRow.scrollBy({ left: -220, behavior: 'smooth' });
        });
        
        albNext.addEventListener('click', function() {
            slidesRow.scrollBy({ left: 220, behavior: 'smooth' });
        });
    }
});
