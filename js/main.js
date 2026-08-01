const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("header--scrolled");
    } else {
        header.classList.remove("header--scrolled");
    }
});

// Category dots logic for mobile list
const schoolSlider = document.getElementById("choose-school-slider");
const schoolDotsContainer = document.getElementById("choose-school-dots");
const schoolCards = document.querySelectorAll(".choose-school__card");

if (schoolSlider && schoolDotsContainer && schoolCards.length > 0) {
    schoolCards.forEach((card, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.classList.add("choose-school__dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Go to school category ${index + 1}`);
        dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
        
        dot.addEventListener("click", () => {
            const scrollAmount = card.offsetLeft - schoolSlider.offsetLeft;
            schoolSlider.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
            });
        });
        
        schoolDotsContainer.appendChild(dot);
    });

    let schoolScrollTimeout;
    schoolSlider.addEventListener("scroll", () => {
        clearTimeout(schoolScrollTimeout);
        schoolScrollTimeout = setTimeout(() => {
            const scrollLeft = schoolSlider.scrollLeft;
            const cardWidth = schoolCards[0].offsetWidth;
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            const dots = schoolDotsContainer.querySelectorAll(".choose-school__dot");
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add("active");
                    dot.setAttribute("aria-selected", "true");
                } else {
                    dot.classList.remove("active");
                    dot.setAttribute("aria-selected", "false");
                }
            });
        }, 50);
    });
}

// Video Modal Control
const playVideoBtn = document.getElementById("play-video-btn-new");
const videoModal = document.getElementById("video-modal-new");
const modalOverlay = document.getElementById("modal-overlay-new");
const modalClose = document.getElementById("modal-close-new");
const modalIframe = document.getElementById("modal-iframe-new");

const eventVideoUrl = "https://www.youtube.com/embed/pAw1BmacVz0?autoplay=1&rel=0";

if (playVideoBtn && videoModal && modalIframe) {
    const openModal = () => {
        videoModal.classList.add("active");
        videoModal.setAttribute("aria-hidden", "false");
        modalIframe.src = eventVideoUrl;
        
        if (modalClose) modalClose.focus();
    };

    const closeModal = () => {
        videoModal.classList.remove("active");
        videoModal.setAttribute("aria-hidden", "true");
        modalIframe.src = "";
        playVideoBtn.focus();
    };

    playVideoBtn.addEventListener("click", openModal);
    
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && videoModal.classList.contains("active")) {
            closeModal();
        }
    });
}

// Attractions Section Tab Switcher
const tabKidzAwards = document.getElementById("tab-kidz-awards");
const tabParentExchange = document.getElementById("tab-parent-exchange");
const attractionTitle = document.getElementById("attraction-title");
const attractionDesc = document.getElementById("attraction-desc");
const attractionPanel = document.getElementById("attraction-panel");

if (tabKidzAwards && tabParentExchange && attractionTitle && attractionDesc) {
    const tabs = [tabKidzAwards, tabParentExchange];
    
    const tabContents = {
        "tab-kidz-awards": {
            title: "Premier Kidz Awards",
            desc: "A prestigious platform celebrating young talent and building confidence by giving children the spotlight to shine."
        },
        "tab-parent-exchange": {
            title: "The Parent Exchange",
            desc: "An interactive forum designed for parents to engage with leading educators, address academic queries, and share parenting insights."
        }
    };

    const switchTab = (activeTab) => {
        tabs.forEach(tab => {
            if (tab === activeTab) {
                tab.classList.add("active");
                tab.setAttribute("aria-selected", "true");
                tab.setAttribute("tabindex", "0");
            } else {
                tab.classList.remove("active");
                tab.setAttribute("aria-selected", "false");
                tab.setAttribute("tabindex", "-1");
            }
        });

        if (attractionPanel) {
            attractionPanel.style.animation = "none";
            void attractionPanel.offsetWidth;
            attractionPanel.style.animation = "fadeIn 0.4s ease";
        }

        const content = tabContents[activeTab.id];
        attractionTitle.textContent = content.title;
        attractionDesc.textContent = content.desc;
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", () => switchTab(tab));
        
        tab.addEventListener("keydown", (e) => {
            let targetTab = null;
            if (e.key === "ArrowRight") {
                targetTab = tab === tabKidzAwards ? tabParentExchange : tabKidzAwards;
            } else if (e.key === "ArrowLeft") {
                targetTab = tab === tabParentExchange ? tabKidzAwards : tabParentExchange;
            }
            
            if (targetTab) {
                targetTab.focus();
                switchTab(targetTab);
            }
        });
    });
}

// Exhibition Highlights Horizontal Scroll Buttons
const exhSlider = document.getElementById("exhibition-slider");
const exhPrevBtn = document.getElementById("exhibition-prev-btn");
const exhNextBtn = document.getElementById("exhibition-next-btn");
const exhDotsContainer = document.getElementById("highlights-dots");
const exhPages = document.querySelectorAll(".highlights__slide-page");

if (exhSlider && exhPrevBtn && exhNextBtn) {
    const getScrollStep = () => {
        const firstCard = exhSlider.querySelector(".highlights__card");
        return firstCard ? firstCard.offsetWidth + 24 : 306;
    };

    const updateNavButtons = () => {
        const scrollLeft = exhSlider.scrollLeft;
        const scrollWidth = exhSlider.scrollWidth;
        const clientWidth = exhSlider.clientWidth;
        
        exhPrevBtn.disabled = scrollLeft <= 5;
        exhNextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 5;
    };

    exhNextBtn.addEventListener("click", () => {
        exhSlider.scrollBy({
            left: getScrollStep(),
            behavior: "smooth"
        });
    });

    exhPrevBtn.addEventListener("click", () => {
        exhSlider.scrollBy({
            left: -getScrollStep(),
            behavior: "smooth"
        });
    });

    exhSlider.addEventListener("scroll", updateNavButtons);
    window.addEventListener("resize", updateNavButtons);
    
    setTimeout(updateNavButtons, 100);
}

// Reviews Video Embed Trigger
const reviewCards = document.querySelectorAll(".reviews__card");
reviewCards.forEach(card => {
    const playBtn = card.querySelector(".reviews__play-icon-btn");
    const mediaContainer = card.querySelector(".reviews__media-container");
    const videoUrl = card.getAttribute("data-video-url");

    const playVideo = () => {
        if (videoUrl && mediaContainer) {
            mediaContainer.innerHTML = `
                <iframe src="${videoUrl}" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen 
                        style="width: 100%; height: 100%; border-radius: 12px; border: 0; position: absolute; top: 0; left: 0;">
                </iframe>
            `;
            const overlay = card.querySelector(".reviews__card-overlay");
            if (overlay) {
                overlay.style.display = "none";
            }
        }
    };

    if (playBtn) {
        playBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            playVideo();
        });
    }
    card.addEventListener("click", () => {
        playVideo();
    });
});

// Parents Reviews Navigation Buttons
const revSlider = document.getElementById("reviews-slider-wrapper");
const revPrevBtn = document.getElementById("reviews-prev-btn");
const revNextBtn = document.getElementById("reviews-next-btn");

if (revSlider && revPrevBtn && revNextBtn) {
    const getScrollStep = () => {
        const firstCard = revSlider.querySelector(".reviews__card");
        return firstCard ? firstCard.offsetWidth + 20 : 300;
    };

    const updateNavButtons = () => {
        const scrollLeft = revSlider.scrollLeft;
        const scrollWidth = revSlider.scrollWidth;
        const clientWidth = revSlider.clientWidth;
        
        revPrevBtn.disabled = scrollLeft <= 5;
        revNextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 5;
    };

    revNextBtn.addEventListener("click", () => {
        revSlider.scrollBy({
            left: getScrollStep(),
            behavior: "smooth"
        });
    });

    revPrevBtn.addEventListener("click", () => {
        revSlider.scrollBy({
            left: -getScrollStep(),
            behavior: "smooth"
        });
    });

    revSlider.addEventListener("scroll", updateNavButtons);
    window.addEventListener("resize", updateNavButtons);
    setTimeout(updateNavButtons, 100);
}

// Drag-to-scroll functionality for gallery slider
const galSlider = document.getElementById("gallery-slider");

if (galSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    galSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        galSlider.style.cursor = 'grabbing';
        startX = e.pageX - galSlider.offsetLeft;
        scrollLeft = galSlider.scrollLeft;
    });

    galSlider.addEventListener('mouseleave', () => {
        isDown = false;
        galSlider.style.cursor = 'grab';
    });

    galSlider.addEventListener('mouseup', () => {
        isDown = false;
        galSlider.style.cursor = 'grab';
    });

    galSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galSlider.offsetLeft;
        const walk = (x - startX) * 1.5;
        galSlider.scrollLeft = scrollLeft - walk;
    });

    galSlider.style.cursor = 'grab';

    const galImages = galSlider.querySelectorAll('img');
    galImages.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}