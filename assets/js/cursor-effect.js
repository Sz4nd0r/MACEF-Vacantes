// Select the image and the container
const heroImg = document.querySelector('.hero__img');
const heroContainer = document.querySelector('.hero__container');

// Add a mousemove event listener to the container
heroContainer.addEventListener('mousemove', (e) => {
    // Get the container's position to calculate relative mouse coordinates
    const containerRect = heroContainer.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // Update the CSS variables on the image element
    heroImg.style.setProperty('--mouse-x', `${mouseX}px`);
    heroImg.style.setProperty('--mouse-y', `${mouseY}px`);
});

// Optional: Hide the mask effect when the cursor leaves the container
heroContainer.addEventListener('mouseleave', () => {
    // Move the mask off-screen or change size
    heroImg.style.setProperty('--spotlight-size', '0px');
});

heroContainer.addEventListener('mouseenter', () => {
    // Restore the mask size when cursor re-enters
    heroImg.style.setProperty('--spotlight-size', '150px');
});
