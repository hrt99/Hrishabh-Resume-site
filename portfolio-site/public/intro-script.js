// Netflix-style intro animation script
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    
    // Auto-redirect to main site after animation completes
    setTimeout(function() {
        // Fade out the intro
        container.style.transition = 'opacity 0.5s ease-out';
        container.style.opacity = '0';
        
        // Redirect to main portfolio after fade out
        setTimeout(function() {
            window.location.href = '/';
        }, 500);
    }, 4500); // Total animation duration + buffer
    
    // Optional: Click to skip intro
    container.addEventListener('click', function() {
        container.style.transition = 'opacity 0.3s ease-out';
        container.style.opacity = '0';
        setTimeout(function() {
            window.location.href = '/';
        }, 300);
    });
});