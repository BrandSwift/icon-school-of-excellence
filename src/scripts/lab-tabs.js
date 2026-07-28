// document.addEventListener('DOMContentLoaded', function() {
//     // Get all main navigation tab links
//     const mainTabLinks = document.querySelectorAll('#sticky-tab-container .layout350_tab-link');
//     // Get all lab tab links
//     const labTabLinks = document.querySelectorAll('.layout402_tabs-menu .layout350_tab-link');
//     // Get all tab panes
//     const tabPanes = document.querySelectorAll('.layout402_tabs-content .w-tab-pane');
//     // Get all content sections
//     const contentSections = document.querySelectorAll('.layout350_content');
//     // Get the sticky tab container
//     const stickyTabContainer = document.getElementById('sticky-tab-container');

//     // Function to update main navigation active state
//     function updateMainNavActiveState(activeSection) {
//         mainTabLinks.forEach(link => {
//             const linkText = link.querySelector('div').textContent.trim();
//             if (linkText === activeSection) {
//                 link.style.backgroundColor = '#f7e4d9';
//                 link.style.color = '#333';

//             } else {
//                 link.style.backgroundColor = '';
//                 link.style.color = '';
//             }
//         });
//     }

//     // Function to check which section is in view
//     function checkSectionInView() {
//         const scrollPosition = window.scrollY;
//         const windowHeight = window.innerHeight;
//         const offset = 200; // Offset to trigger the change before the section is fully in view

//         // Check if the sticky tab container is in view
//         const stickyTabRect = stickyTabContainer.getBoundingClientRect();
//         const isStickyTabVisible = stickyTabRect.top <= windowHeight && stickyTabRect.bottom >= 0;

//         if (isStickyTabVisible) {
//             // Find which content section is most visible in the viewport
//             let mostVisibleSection = null;
//             let maxVisibility = 0;

//             contentSections.forEach(section => {
//                 const rect = section.getBoundingClientRect();
//                 const visibility = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

//                 if (visibility > maxVisibility) {
//                     maxVisibility = visibility;
//                     mostVisibleSection = section;
//                 }
//             });

//             if (mostVisibleSection) {
//                 const sectionId = mostVisibleSection.id;
//                 const sectionName = sectionId.replace(/-/g, ' ');
//                 updateMainNavActiveState(sectionName);
//             }
//         }
//     }

//     // Add scroll event listener
//     window.addEventListener('scroll', function() {
//         checkSectionInView();
//     });

//     // Add click event listener to main navigation tabs
//     mainTabLinks.forEach(link => {
//         link.addEventListener('click', function() {
//             const sectionName = this.querySelector('div').textContent.trim();
//             updateMainNavActiveState(sectionName);
//         });
//     });

//     // Add click event listener to lab tab links
//     labTabLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();

//             // Remove active class from all links and panes
//             labTabLinks.forEach(l => l.classList.remove('w--current'));
//             tabPanes.forEach(p => p.classList.remove('w--tab-active'));

//             // Add active class to clicked link
//             this.classList.add('w--current');

//             // Get the target pane id from href
//             const targetId = this.getAttribute('href');
//             // Find and activate the target pane
//             const targetPane = document.querySelector(targetId);
//             if (targetPane) {
//                 targetPane.classList.add('w--tab-active');
//             }

//             // Update main navigation for Laboratories section
//             updateMainNavActiveState('Laboratories');
//         });
//     });

//     // Set initial active state based on URL hash or default to first tab
//     const initialHash = window.location.hash;
//     if (initialHash) {
//         const initialSection = initialHash.substring(1).replace(/-/g, ' ');
//         updateMainNavActiveState(initialSection);
//     } else {
//         // Set default active state for first tab
//         const firstTab = mainTabLinks[0].querySelector('div').textContent.trim();
//         updateMainNavActiveState(firstTab);
//     }

//     // Check initial section in view
//     checkSectionInView();
// }); 


document.addEventListener("DOMContentLoaded", () => {
    const mainTabLinks = document.querySelectorAll(
        "#sticky-tab-container .layout350_tab-link"
    );

    const labTabLinks = document.querySelectorAll(
        ".layout402_tabs-menu .layout350_tab-link"
    );

    const tabPanes = document.querySelectorAll(
        ".layout402_tabs-content .w-tab-pane"
    );

    const contentSections = document.querySelectorAll(
        ".layout350_content"
    );

    const stickyTabContainer = document.getElementById(
        "sticky-tab-container"
    );

    if (!stickyTabContainer) return;

    function updateMainNavActiveState(activeSection) {
        mainTabLinks.forEach((link) => {
            const textElement = link.querySelector("div");
            if (!textElement) return;

            const linkText = textElement.textContent.trim();

            if (linkText === activeSection) {
                link.style.backgroundColor = "#f7e4d9";
                link.style.color = "#333";
            } else {
                link.style.backgroundColor = "";
                link.style.color = "";
            }
        });
    }

    function checkSectionInView() {
        const windowHeight = window.innerHeight;

        const stickyRect = stickyTabContainer.getBoundingClientRect();

        const isVisible =
            stickyRect.top <= windowHeight &&
            stickyRect.bottom >= 0;

        if (!isVisible) return;

        let mostVisibleSection = null;
        let maxVisibility = 0;

        contentSections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            const visibleHeight =
                Math.min(rect.bottom, windowHeight) -
                Math.max(rect.top, 0);

            if (visibleHeight > maxVisibility) {
                maxVisibility = visibleHeight;
                mostVisibleSection = section;
            }
        });

        if (mostVisibleSection) {
            const sectionName = mostVisibleSection.id.replace(/-/g, " ");
            updateMainNavActiveState(sectionName);
        }
    }

    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkSectionInView();
                ticking = false;
            });

            ticking = true;
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true,
    });

    mainTabLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const textElement = link.querySelector("div");

            if (!textElement) return;

            updateMainNavActiveState(
                textElement.textContent.trim()
            );
        });
    });

    labTabLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            labTabLinks.forEach((item) =>
                item.classList.remove("w--current")
            );

            tabPanes.forEach((pane) =>
                pane.classList.remove("w--tab-active")
            );

            link.classList.add("w--current");

            const targetId = link.getAttribute("href");

            if (!targetId) return;

            const targetPane = document.querySelector(targetId);

            if (targetPane) {
                targetPane.classList.add("w--tab-active");
            }

            updateMainNavActiveState("Laboratories");
        });
    });

    const initialHash = window.location.hash;

    if (initialHash) {
        updateMainNavActiveState(
            initialHash.substring(1).replace(/-/g, " ")
        );
    } else if (mainTabLinks.length) {
        const firstText =
            mainTabLinks[0]
                .querySelector("div")
                ?.textContent.trim() || "";

        updateMainNavActiveState(firstText);
    }

    checkSectionInView();
});