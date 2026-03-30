// Фотогалерея с подписями
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const viewer = document.getElementById('viewer');
    const viewerImg = document.getElementById('viewerImg');
    const viewerCaption = document.getElementById('viewerCaption');
    const viewerClose = document.getElementById('viewerClose');
    const viewerPrev = document.getElementById('viewerPrev');
    const viewerNext = document.getElementById('viewerNext');
    
    let currentIndex = 0;
    const images = Array.from(galleryImages).map(img => ({
        src: img.getAttribute('data-full') || img.src,
        caption: img.getAttribute('data-caption') || img.alt
    }));
    
    // Открытие просмотрщика
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentIndex = index;
            openViewer(images[currentIndex].src, images[currentIndex].caption);
        });
    });
    
    // Открытие просмотрщика
    function openViewer(src, caption) {
        if (viewerImg && viewer) {
            viewerImg.src = src;
            if (viewerCaption) {
                viewerCaption.textContent = caption || '';
            }
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
            viewerImg.src = images[currentIndex].src;
            if (viewerCaption) {
                viewerCaption.textContent = images[currentIndex].caption || '';
            }
        }
    }
    
    // Предыдущее изображение
    function prevImage() {
        currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        if (viewerImg) {
            viewerImg.src = images[currentIndex].src;
            if (viewerCaption) {
                viewerCaption.textContent = images[currentIndex].caption || '';
            }
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
        // Навигация стрелками
        if (viewer && viewer.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
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
