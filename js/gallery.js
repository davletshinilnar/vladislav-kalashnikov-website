// Фотогалерея
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const viewer = document.getElementById('viewer');
    const viewerImg = document.getElementById('viewerImg');
    const viewerClose = document.getElementById('viewerClose');
    const viewerPrev = document.getElementById('viewerPrev');
    const viewerNext = document.getElementById('viewerNext');
    
    let currentIndex = 0;
    const images = Array.from(galleryImages).map(img => img.getAttribute('data-full') || img.src);
    
    // Открытие просмотрщика
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentIndex = index;
            openViewer(images[currentIndex]);
        });
    });
    
    // Открытие просмотрщика
    function openViewer(src) {
        if (viewerImg && viewer) {
            viewerImg.src = src;
            viewer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Закрытие просмотрщика
    function closeViewer() {
        if (viewer) {
            viewer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Следующее изображение
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        if (viewerImg) {
            viewerImg.src = images[currentIndex];
        }
    }
    
    // Предыдущее изображение
    function prevImage() {
        currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        if (viewerImg) {
            viewerImg.src = images[currentIndex];
        }
    }
    
    // Обработчики событий
    if (viewerClose) {
        viewerClose.addEventListener('click', closeViewer);
    }
    
    if (viewerNext) {
        viewerNext.addEventListener('click', nextImage);
    }
    
    if (viewerPrev) {
        viewerPrev.addEventListener('click', prevImage);
    }
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && viewer && viewer.getAttribute('aria-hidden') === 'false') {
            closeViewer();
        }
    });
    
    // Закрытие по клику вне изображения
    if (viewer) {
        viewer.addEventListener('click', function(e) {
            if (e.target === viewer) {
                closeViewer();
            }
        });
    }
});
