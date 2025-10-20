document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar ul li .nav-link');
    const contentPages = document.querySelectorAll('.content-area .content-page');

    const defaultBgImagePath = 'beijing.jpg'; 

    let initialPageId = window.location.hash ? window.location.hash.substring(1) : 'about';
    const initialNavLink = document.querySelector(`.nav-link[data-page="${initialPageId}"]`);
    if (!initialNavLink) {
        initialPageId = 'about';
    }

    // Function to set the background image variable directly, without transition
    function setBgVariable(variableName, imagePath) {
        document.body.style.setProperty(variableName, `url("${imagePath}")`);
    }

    // Initialize background images
    let initialBgPath = defaultBgImagePath;
    if (initialNavLink && initialNavLink.dataset.bg) {
        initialBgPath = initialNavLink.dataset.bg;
    }
    setBgVariable('--bg-image-1', initialBgPath); // Set current image
    setBgVariable('--bg-image-2', initialBgPath); // Set next image (initially same)


    // Function: show specified page with animation, and update background
    function showPage(pageName) {
        // Remove 'active' class from all nav links and content pages
        navLinks.forEach(link => link.classList.remove('active'));
        contentPages.forEach(page => {
            page.classList.remove('active');
            page.style.position = 'absolute'; // Keep hidden pages absolutely positioned
        });

        // Find and activate the current nav link
        const activeNavLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        let newBgImagePath = defaultBgImagePath; 

        if (activeNavLink) {
            activeNavLink.classList.add('active');
            const dataBg = activeNavLink.dataset.bg;
            if (dataBg) {
                newBgImagePath = dataBg;
            }
        }

        const currentBgUrl = getComputedStyle(document.body).getPropertyValue('--bg-image-1');
        const newBgUrl = `url("${newBgImagePath}")`;

        if (currentBgUrl.trim() !== newBgUrl.trim()) {
            // Background image needs to change
            setBgVariable('--bg-image-2', newBgImagePath); // Set the 'next' image
            document.body.classList.add('bg-transition'); // Trigger the fade-in of ::after

            // After the transition, update the 'current' image and reset
            setTimeout(() => {
                setBgVariable('--bg-image-1', newBgImagePath); // Make new image the current one
                document.body.classList.remove('bg-transition'); // Reset transition state
                // Ensure --bg-image-2 is again same as --bg-image-1 to avoid unexpected flashes
                setBgVariable('--bg-image-2', newBgImagePath); 
            }, 1000); // Match CSS transition duration
        } else {
            // Background image is the same, just ensure transition class is off
            document.body.classList.remove('bg-transition');
            // Make sure both vars are consistent
            setBgVariable('--bg-image-1', newBgImagePath);
            setBgVariable('--bg-image-2', newBgImagePath);
        }

        // Show the content page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.style.position = 'static'; // Active page returns to normal flow
            targetPage.classList.add('active');
            history.pushState(null, '', `#${pageName}`);
        }
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const pageName = this.dataset.page; 
            showPage(pageName);
        });
    });

    // Show initial page based on URL hash or default
    showPage(initialPageId);

    // Listen for browser back/forward events
    window.addEventListener('popstate', function() {
        const currentPageId = window.location.hash ? window.location.hash.substring(1) : 'about';
        showPage(currentPageId);
    });
    


});
