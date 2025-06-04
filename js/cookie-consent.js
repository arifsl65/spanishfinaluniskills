document.addEventListener('DOMContentLoaded', function() {
    // Check if cookie consent was already given
    if (!getCookie('cookie_consent')) {
        // Show cookie consent banner after a short delay
        setTimeout(showCookieBanner, 1000);
    }

    // Initialize Firebase Analytics if consent was given
    if (getCookie('cookie_consent') === 'accepted') {
        initializeAnalytics();
    }
});

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-consent-content">
            We use cookies to enhance your experience on our website. By clicking "Accept", you consent to our use of cookies. 
            <a href="/privacy-policy.html" target="_blank">Learn more</a>
        </div>
        <div class="cookie-consent-buttons">
            <button class="cookie-consent-btn cookie-consent-decline">Decline</button>
            <button class="cookie-consent-btn cookie-consent-accept">Accept</button>
        </div>
    `;

    document.body.appendChild(banner);
    // Trigger reflow
    banner.offsetHeight;
    // Add show class to animate in
    banner.classList.add('show');

    // Add event listeners
    banner.querySelector('.cookie-consent-accept').addEventListener('click', () => setCookieConsent('accepted'));
    banner.querySelector('.cookie-consent-decline').addEventListener('click', () => setCookieConsent('declined'));
}

function setCookieConsent(status) {
    // Set cookie that expires in 1 year
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `cookie_consent=${status}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    
    // Remove the banner
    const banner = document.querySelector('.cookie-consent-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 300);
    }

    // Initialize analytics if accepted
    if (status === 'accepted') {
        initializeAnalytics();
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function initializeAnalytics() {
    // Initialize Firebase Analytics here if needed
    // Example:
    // firebase.analytics();
    
    // You can add other analytics initialization code here
    console.log('Analytics initialized');
}
