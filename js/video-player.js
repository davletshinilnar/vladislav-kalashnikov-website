// Видеоплеер для Яндекс.Диска
function openVideo(yandexUrl) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');
    
    if (!modal || !container) return;
    
    // Извлекаем ID файла из URL Яндекс.Диска
    const fileId = extractYandexFileId(yandexUrl);
    
    if (fileId) {
        // Создаем iframe для встраивания видео
        const iframe = document.createElement('iframe');
        iframe.src = `https://disk.yandex.ru/i/${fileId}`;
        iframe.allow = 'fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        
        // Очищаем контейнер и добавляем iframe
        container.innerHTML = '';
        container.appendChild(iframe);
        
        // Показываем модальное окно
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    } else {
        // Если не удалось извлечь ID, открываем в новой вкладке
        window.open(yandexUrl, '_blank');
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoContainer');
    
    if (!modal || !container) return;
    
    // Скрываем модальное окно
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    
    // Очищаем контейнер
    container.innerHTML = '';
}

// Извлечение ID файла из URL Яндекс.Диска
function extractYandexFileId(url) {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        
        // Проверяем разные форматы URL Яндекс.Диска
        if (urlObj.hostname.includes('yandex')) {
            // Формат: https://disk.yandex.ru/i/FILE_ID
            if (urlObj.pathname.startsWith('/i/')) {
                return urlObj.pathname.split('/i/')[1];
            }
            // Формат: https://yadi.sk/i/FILE_ID
            if (urlObj.pathname.startsWith('/i/')) {
                return urlObj.pathname.split('/i/')[1];
            }
        }
        
        // Если URL уже содержит только ID
        if (!url.includes('http')) {
            return url;
        }
        
        return null;
    } catch (error) {
        console.error('Ошибка при извлечении ID файла:', error);
        return url; // Возвращаем исходный URL если не удалось распарсить
    }
}

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal && modal.getAttribute('aria-hidden') === 'false') {
            closeVideoModal();
        }
    }
});

// Закрытие модального окна по клику вне видео
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
});
