document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const clickMeBtn = document.getElementById('clickMeBtn');
    const gifContainer = document.getElementById('gifContainer');
    
    let isPlaying = false;
    let audioElement = null;
    
    const applyTheme = (theme) => {
        if (theme === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    };

    // Load saved theme or default to system
    const savedTheme = localStorage.getItem('theme') || 'system';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    // Handle theme change
    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (themeSelect.value === 'system') {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // Click me button functionality
    clickMeBtn.addEventListener('click', () => {
        if (isPlaying) {
            // Stop playing
            stopGifAndMusic();
        } else {
            // Start playing
            playGifAndMusic();
        }
    });

    function playGifAndMusic() {
        isPlaying = true;
        
        // Add gif to container
        const img = document.createElement('img');
        img.src = 'modules/tetoris-kasane-teto.gif';
        img.alt = 'Teto';
        gifContainer.innerHTML = '';
        gifContainer.appendChild(img);
        
        // Show gif with animation
        gifContainer.classList.remove('inactive');
        gifContainer.classList.add('active');
        
        // Play audio
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
        
        audioElement = new Audio('modules/テトリス ⧸ 重音テトSV.mp3');
        audioElement.play();
        
        // Update button text
        clickMeBtn.textContent = 'Stop';
        
        // Handle audio end
        audioElement.addEventListener('ended', () => {
            stopGifAndMusic();
        });
    }

    function stopGifAndMusic() {
        isPlaying = false;
        
        // Animate out gif
        gifContainer.classList.remove('active');
        gifContainer.classList.add('inactive');
        
        // Stop audio
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
        
        // Update button text
        clickMeBtn.textContent = 'Click me';
        
        // Remove gif after animation
        setTimeout(() => {
            gifContainer.innerHTML = '';
            gifContainer.classList.remove('inactive');
        }, 500);
    }
});
