document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const icon = toggleBtn.querySelector('i');
    const clickMeBtn = document.getElementById('clickMeBtn');
    const gifContainer = document.getElementById('gifContainer');
    
    let isPlaying = false;
    let audioElement = null;

    const themes = ['dark', 'light', 'system'];

    const getEffectiveTheme = (theme) => {
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
    };

    const updateIcon = (theme) => {
        const effective = getEffectiveTheme(theme);
        icon.className = effective === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', getEffectiveTheme(theme));
        updateIcon(theme);
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 'dark';
        const effective = getEffectiveTheme(current);
        const next = effective === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const current = localStorage.getItem('theme') || 'dark';
        if (current === 'system') {
            applyTheme('system');
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
