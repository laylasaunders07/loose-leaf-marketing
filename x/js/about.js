document.addEventListener('DOMContentLoaded', () => {
    const textSections = document.querySelectorAll('.text-section');
    const circleWrappers = document.querySelectorAll('.circle-wrapper'); // Select wrappers

    const baseBorderWidth = 3; // px
    const scaleFactor = 2.5; // From .circle.active CSS

    // Initialize all circle wrappers with small padding class
    circleWrappers.forEach(wrapper => {
        wrapper.classList.add('circle-wrapper-small');
        const circle = wrapper.querySelector('.circle');
        circle.style.borderWidth = baseBorderWidth + 'px'; // Initialize border width
    });

    const options = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeCircleNum = entry.target.dataset.circle;

                circleWrappers.forEach(wrapper => {
                    const circle = wrapper.querySelector('.circle'); // Get the circle inside the wrapper
                    const circleNum = circle.dataset.circle;

                    if (circleNum === activeCircleNum) {
                        circle.classList.add('active');
                        wrapper.classList.add('circle-wrapper-large');
                        wrapper.classList.remove('circle-wrapper-small');

                        // Adjust border width for active circle
                        const newBorderWidth = baseBorderWidth / scaleFactor;
                        circle.style.borderWidth = newBorderWidth + 'px';
                    } else {
                        circle.classList.remove('active');
                        wrapper.classList.remove('circle-wrapper-large');
                        wrapper.classList.add('circle-wrapper-small');

                        // Reset border width for inactive circles
                        circle.style.borderWidth = baseBorderWidth + 'px';
                    }
                });
            }
        });
    }, options);

    textSections.forEach(section => {
        observer.observe(section);
    });

    // Helper function to set up scroll buttons
    function setupScrollButton(buttonId, targetSectionId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                const targetSection = document.getElementById(targetSectionId);
                if (targetSection) {
                    // Scroll the parent .split-right container
                    const splitRight = targetSection.closest('.split-right');
                    if (splitRight) {
                        splitRight.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    }

    // Setup buttons for all sections
    setupScrollButton('scroll-to-section-1-btn', 'section-1');
    setupScrollButton('scroll-to-section-2-btn', 'section-2');
    setupScrollButton('scroll-to-section-3-btn', 'section-3');
    setupScrollButton('scroll-to-section-4-btn', 'section-4');

    // Make circles clickable to scroll to sections
    circleWrappers.forEach(wrapper => {
        const circle = wrapper.querySelector('.circle');
        const circleNum = circle.dataset.circle;
        const targetSectionId = `section-${circleNum}`;

        wrapper.addEventListener('click', () => {
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                const splitRight = targetSection.closest('.split-right');
                if (splitRight) {
                    splitRight.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
