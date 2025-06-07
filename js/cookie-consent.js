// Function to initialize cookie consent
function initCookieConsent() {
    try {
        // Check if cookie consent was already given (case-insensitive check)
        const consent = getCookie('cookie_consent');
        if (!consent) {
            // Show cookie consent banner after a short delay
            // Using requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                setTimeout(showCookieBanner, 1000);
            });
        } else if (consent.toLowerCase() === 'accepted') {
            // Initialize Firebase Analytics if consent was given
            initializeAnalytics();
        }
    } catch (error) {
        console.error('Error initializing cookie consent:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
    // DOMContentLoaded has already fired
    initCookieConsent();
}

function showCookieBanner() {
    try {
        // Check if banner already exists
        if (document.querySelector('.cookie-consent-banner')) {
            return; // Banner already exists, don't create another one
        }

        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('role', 'alert');
        
        banner.innerHTML = `
            <div class="cookie-consent-content">
                We use cookies to enhance your experience on our website. By clicking "Accept", you consent to our use of cookies. 
                <a href="images/Privacy Policy.docx.pdf" target="_blank" rel="noopener">Learn more</a>
            </div>
            <div class="cookie-consent-buttons">
                <button type="button" class="cookie-consent-btn cookie-consent-decline">Decline</button>
                <button type="button" class="cookie-consent-btn cookie-consent-accept">Accept</button>
            </div>
        `;

        document.body.appendChild(banner);
        
        // Ensure the banner is visible by forcing a reflow
        banner.offsetHeight;
        
        // Add show class to trigger the animation
        banner.classList.add('show');

        // Add event listeners with error handling
        const acceptBtn = banner.querySelector('.cookie-consent-accept');
        const declineBtn = banner.querySelector('.cookie-consent-decline');
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                setCookieConsent('accepted');
                this.blur(); // Remove focus after click
            });
        }
        
        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                setCookieConsent('declined');
                this.blur(); // Remove focus after click
            });
        }
    } catch (error) {
        console.error('Error showing cookie banner:', error);
    }
}

function setCookieConsent(status) {
    try {
        // Validate status
        const validStatus = status.toLowerCase() === 'accepted' ? 'accepted' : 'declined';
        
        // Set cookie that expires in 1 year
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        const cookieValue = `cookie_consent=${validStatus}; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure`;
        document.cookie = cookieValue;
        
        // Remove the banner with animation
        const banner = document.querySelector('.cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            // Wait for animation to complete before removing from DOM
            banner.addEventListener('transitionend', function handler() {
                banner.removeEventListener('transitionend', handler);
                banner.remove();
            }, { once: true });
        }

        // Initialize analytics if accepted
        if (validStatus === 'accepted') {
            initializeAnalytics();
        }
        
        // Dispatch custom event for other scripts to listen to
        document.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
            detail: { consent: validStatus }
        }));
        
    } catch (error) {
        console.error('Error setting cookie consent:', error);
    }
}

function getCookie(name) {
    try {
        // Handle case where document.cookie might be empty or undefined
        const cookieString = document.cookie || '';
        const cookies = cookieString.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Check if this cookie name matches (case-insensitive)
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1)) || null;
            }
        }
        return null;
    } catch (error) {
        console.error('Error reading cookie:', error);
        return null;
    }
}

function initializeAnalytics() {
    // Initialize Firebase Analytics here if needed
    // Example:
    // firebase.analytics();
    
    // You can add other analytics initialization code here
    console.log('Analytics initialized');
}
