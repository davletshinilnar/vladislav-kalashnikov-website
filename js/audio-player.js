// Аудиоплеер
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioNative');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progress = document.getElementById('progress');
    const timeDisplay = document.getElementById('time');
    const trackList = document.getElementById('trackList');
    const tracks = trackList ? trackList.querySelectorAll('li') : [];
    
    let currentTrack = 0;
    
    if (!audioPlayer || !playBtn || !trackList) return;
    
    // Инициализация первого трека
    if (tracks.length > 0) {
        loadTrack(currentTrack);
    }
    
    // Загрузка трека
    function loadTrack(index) {
        const track = tracks[index];
        if (!track) return;
        
        // Убрать активный класс у всех треков
        tracks.forEach(t => t.classList.remove('active'));
        
        // Добавить активный класс текущему треку
        track.classList.add('active');
        
        // Загрузить аудио
        const src = track.getAttribute('data-src');
        const title = track.getAttribute('data-title');
        
        if (src) {
            audioPlayer.src = src;
            audioPlayer.load();
        }
        
        // Обновить заголовок (если есть)
        const titleElement = document.querySelector('.player-title');
        if (titleElement && title) {
            titleElement.textContent = title;
        }
    }
    
    // Воспроизведение/пауза
    playBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.textContent = '⏸';
        } else {
            audioPlayer.pause();
            playBtn.textContent = '▶︎';
        }
    });
    
    // Следующий трек
    nextBtn.addEventListener('click', function() {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
        audioPlayer.play();
        playBtn.textContent = '⏸';
    });
    
    // Предыдущий трек
    prevBtn.addEventListener('click', function() {
        currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
        loadTrack(currentTrack);
        audioPlayer.play();
        playBtn.textContent = '⏸';
    });
    
    // Выбор трека из списка
    tracks.forEach((track, index) => {
        track.addEventListener('click', function() {
            currentTrack = index;
            loadTrack(currentTrack);
            audioPlayer.play();
            playBtn.textContent = '⏸';
        });
    });
    
    // Обновление прогресса
    audioPlayer.addEventListener('timeupdate', function() {
        if (progress) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.value = isNaN(percent) ? 0 : percent;
        }
        
        if (timeDisplay) {
            const current = formatTime(audioPlayer.currentTime);
            const duration = formatTime(audioPlayer.duration);
            timeDisplay.textContent = `${current} / ${duration || '00:00'}`;
        }
    });
    
    // Перемотка
    if (progress) {
        progress.addEventListener('input', function() {
            const time = (progress.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = time;
        });
    }
    
    // Форматирование времени
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Когда трек заканчивается
    audioPlayer.addEventListener('ended', function() {
        nextBtn.click();
    });
});
