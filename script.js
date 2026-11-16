
// =================================
// MUHAMMED HUSNAIN PORTFOLIO JS
// =================================


// 1. HIGHLIGHT THE CURRENT PAGE

function updateActiveLink() {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href").split("#")[0];
        const isCurrent = linkPage === currentPage;

        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

updateActiveLink();

updateActiveLink();


// 2. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// 3. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}



// 4. CLOSE THE ACTIVE NAVIGATION ON PAGE LOAD

window.addEventListener("load", () => {

    updateActiveLink();

});


// CONTACT FORM - PREPARE EMAIL DRAFT

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = contactForm.elements.namedItem("name").value.trim();
        const email = contactForm.elements.namedItem("email").value.trim();
        const subject = contactForm.elements.namedItem("subject").value.trim();
        const message = contactForm.elements.namedItem("message").value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent =
                "Please complete all fields before continuing.";
            return;
        }

        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;

        const emailLink =
            "mailto:m.husnain@edu.salford.ac.uk" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        formMessage.textContent =
            "Your email application should open with a draft. " +
            "Please review it and press Send to deliver your message.";

        window.location.href = emailLink;
    });

}


const cookieBanner = document.getElementById("cookie-banner");
const acceptCookies = document.getElementById("accept-cookies");
const declineCookies = document.getElementById("decline-cookies");

if (cookieBanner) {
    // Show the popup every time the page loads
    cookieBanner.style.display = "block";

    if (acceptCookies) {
        acceptCookies.addEventListener("click", function () {
            cookieBanner.style.display = "none";
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener("click", function () {
            cookieBanner.style.display = "none";
        });
    }
}


/* ==========================================
   BUSINESS SHOWCASE INTERACTIONS ONLY
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const businessPage = document.querySelector(".business-page");

    // Do nothing on other website pages.
    if (!businessPage) return;

    /* 1. SCROLL REVEAL */

    const revealElements = businessPage.querySelectorAll(
        ".business-hero, " +
        ".business-project-heading, " +
        ".business-card, " +
        ".business-skills, " +
        ".business-project-action"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        revealElements.forEach(element => {
            element.classList.add("business-reveal");
        });

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("business-visible");

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -25px 0px"
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });

        businessPage.classList.add("business-animations-ready");
    }

    /* 2. CLICKABLE PROJECT POPUPS */

    const modal = document.getElementById("business-project-modal");

    if (!modal || typeof modal.showModal !== "function") return;

    const modalTitle = modal.querySelector("#business-modal-title");
    const modalContent = modal.querySelector("#business-modal-content");

    const closeButton = modal.querySelector(".business-modal-close");
    const doneButton = modal.querySelector(".business-modal-done");

    const projectButtons = businessPage.querySelectorAll(
        ".business-details-btn"
    );

    projectButtons.forEach(button => {

        button.addEventListener("click", () => {

            const project = button.closest(".business-project");

            if (!project) return;

            const projectHeading = project.querySelector(
                ".business-project-heading h2"
            );

            const cards = project.querySelectorAll(".business-card");

            const skills = project.querySelectorAll(
                ".business-tags span"
            );

            // Use the existing project title.
            modalTitle.textContent = projectHeading
                ? projectHeading.textContent.trim()
                : "Project Details";

            // Clear previous project information.
            modalContent.replaceChildren();

            // Copy the headings and descriptions
            // from the project's existing cards.
            cards.forEach(card => {

                const heading = card.querySelector("h3");
                const paragraph = card.querySelector("p");

                if (!heading || !paragraph) return;

                const item = document.createElement("div");
                item.className = "business-modal-item";

                const itemHeading = document.createElement("h3");
                itemHeading.textContent = heading.textContent;

                const itemParagraph = document.createElement("p");
                itemParagraph.textContent = paragraph.textContent;

                item.append(itemHeading, itemParagraph);
                modalContent.appendChild(item);

            });

            // Add the project's skills.
            if (skills.length > 0) {

                const skillsSection = document.createElement("div");
                skillsSection.className = "business-modal-item";

                const skillsHeading = document.createElement("h3");
                skillsHeading.textContent = "Skills & Approaches";

                const tagsContainer = document.createElement("div");
                tagsContainer.className = "business-modal-tags";

                skills.forEach(skill => {

                    const tag = document.createElement("span");
                    tag.textContent = skill.textContent;

                    tagsContainer.appendChild(tag);

                });

                skillsSection.append(skillsHeading, tagsContainer);
                modalContent.appendChild(skillsSection);
            }

            modal.showModal();

        });

    });

    /* 3. CLOSE POPUP */

    closeButton.addEventListener("click", () => {
        modal.close();
    });

    doneButton.addEventListener("click", () => {
        modal.close();
    });

    // Close when clicking outside the popup.
    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.close();
        }

    });

    // Escape key works automatically with <dialog>.

});



/* ==========================================
   SIZZLE & SEAR — PROBLEM SOLVING PAGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  // Run only on the Problem Solving page.
  if (!document.body.classList.contains("problem-page")) {
    return;
  }

  // Demonstration email address.
  // Replace this with a real address only if needed.
  const restaurantEmail = "sizzleandsear@example.com";

  // Format today's date using the visitor's local date.
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const bookingDate = document.getElementById("booking-date");

  if (bookingDate) {
    bookingDate.min = localToday;
  }

  // Prepare an email draft in the visitor's email application.
  function prepareRestaurantEmail(subject, body) {
    const mailtoLink =
      "mailto:" + restaurantEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
  }

  // RESERVATION FORM
  const bookingForm = document.getElementById(
    "restaurant-booking-form"
  );

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.reportValidity()) {
        return;
      }

      const name = document.getElementById("booking-name").value.trim();
      const email = document.getElementById("booking-email").value.trim();
      const phone = document.getElementById("booking-phone").value.trim();
      const guests = document.getElementById("booking-guests").value;
      const date = document.getElementById("booking-date").value;
      const time = document.getElementById("booking-time").value;
      const notes = document.getElementById("booking-notes").value.trim();

      if (date < localToday) {
        document.getElementById("booking-message").textContent =
          "Please choose today or a future date.";
        return;
      }

      const subject = "Sizzle & Sear - Reservation Request";

      const body =
        "SIZZLE & SEAR - RESERVATION REQUEST\n\n" +
        "Full Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Number of Guests: " + guests + "\n" +
        "Reservation Date: " + date + "\n" +
        "Preferred Time: " + time + "\n" +
        "Special Requests: " + (notes || "None") + "\n\n" +
        "This is a reservation request, not a confirmed booking.";

      document.getElementById("booking-message").textContent =
        "Your email application should open with the reservation " +
        "details. Review the draft before sending.";

      prepareRestaurantEmail(subject, body);
    });
  }

  // CUSTOMER FEEDBACK FORM
  const feedbackForm = document.getElementById(
    "restaurant-feedback-form"
  );

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!feedbackForm.reportValidity()) {
        return;
      }

      const name = document.getElementById("feedback-name").value.trim();
      const email = document.getElementById("feedback-email").value.trim();
      const rating = document.getElementById("feedback-rating").value;
      const comments = document.getElementById(
        "feedback-comments"
      ).value.trim();

      const subject = "Sizzle & Sear - Customer Feedback";

      const body =
        "SIZZLE & SEAR - CUSTOMER FEEDBACK\n\n" +
        "Name: " + name + "\n" +
        "Email: " + (email || "Not provided") + "\n" +
        "Experience: " + rating + "\n\n" +
        "Feedback:\n" + comments;

      document.getElementById("feedback-message").textContent =
        "Your email application should open with your feedback. " +
        "Review the draft before sending.";

      prepareRestaurantEmail(subject, body);
    });
  }
  
  const cookieButton = document.getElementById(
    "restaurant-cookie-info-btn"
  );

  const cookieInfo = document.getElementById(
    "restaurant-cookie-info"
  );

  if (cookieButton && cookieInfo) {
    cookieButton.setAttribute("aria-expanded", "false");
    cookieButton.setAttribute(
      "aria-controls",
      "restaurant-cookie-info"
    );

    cookieButton.addEventListener("click", function () {
      const isHidden = cookieInfo.hidden;

      cookieInfo.hidden = !isHidden;

      cookieButton.setAttribute(
        "aria-expanded",
        String(isHidden)
      );

      cookieButton.textContent = isHidden
        ? "Hide Cookie Information"
        : "View Cookie Information";
    });
  }

});



function setupRestaurantMenu() {
    const menu = document.querySelector(
        "body.problem-page #menu"
    );

    if (!menu) return;

    const buttons = menu.querySelectorAll(
        ".restaurant-menu-tab"
    );

    const panels = menu.querySelectorAll(
        ".restaurant-menu-panel"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const selected = button.dataset.menu;

            buttons.forEach((btn) => {
                const active = btn === button;

                btn.classList.toggle("active", active);
                btn.setAttribute("aria-pressed", String(active));
            });

            panels.forEach((panel) => {
                const active = panel.id === "menu-" + selected;

                panel.hidden = !active;
                panel.classList.toggle("active", active);
            });
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        setupRestaurantMenu
    );
} else {
    setupRestaurantMenu();
}



document.addEventListener("DOMContentLoaded", function () {

    const page = document.body;

    // Only run on Skills and Contacts pages
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    if (
        currentPage !== "skills.html" &&
        currentPage !== "contacts.html"
    ) {
        return;
    }

    // Select content inside the main page area
    const elements = document.querySelectorAll(
        "main section, main article, main .skill-card, main .contact-card"
    );

    // Respect reduced-motion preferences
    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        return;
    }

    elements.forEach(function (element) {
        element.classList.add("extra-scroll-reveal");
    });

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("extra-scroll-visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px"
    });

    elements.forEach(function (element) {
        observer.observe(element);
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.querySelector(".skills-dashboard");

    if (!dashboard) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        dashboard.classList.add("dashboard-visible");
        return;
    }

    const dashboardObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("dashboard-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    dashboardObserver.observe(dashboard);

});




function setupRestaurantScrollReveal() {

    // Run only on the Problem Solving restaurant page
    if (!document.body.classList.contains("problem-page")) {
        return;
    }

    // Respect reduced-motion preferences
    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        return;
    }

    // Select restaurant sections and content cards
    const elements = document.querySelectorAll(
        "body.problem-page main section, " +
        "body.problem-page main article, " +
        "body.problem-page .restaurant-menu-panel:not([hidden])"
    );

    if (!elements.length) return;

    elements.forEach(element => {
        element.classList.add("restaurant-scroll-reveal");
    });

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "restaurant-scroll-visible"
                );

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px"
    });

    elements.forEach(element => {
        observer.observe(element);
    });

}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        setupRestaurantScrollReveal
    );
} else {
    setupRestaurantScrollReveal();
}

document.querySelectorAll(".ss-carousel").forEach((carousel) => {

    const slides = carousel.querySelectorAll(".ss-slide");
    const previousButton = carousel.querySelector(".ss-carousel-prev");
    const nextButton = carousel.querySelector(".ss-carousel-next");

    let currentSlide = 0;

    function showSlide(index) {

        slides[currentSlide].classList.remove("ss-slide-active");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("ss-slide-active");
    }

    if (slides.length < 2 || !previousButton || !nextButton) {
        return;
    }

    previousButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

});


document.querySelectorAll(".career-roadmap").forEach((roadmap) => {

    const items = roadmap.querySelectorAll(".career-goal-item");
    const progress = roadmap.querySelector(".career-roadmap-progress");

    function activateGoal(selectedIndex) {

        items.forEach((item, index) => {

            const button = item.querySelector(".career-goal-card");
            const details = item.querySelector(".career-goal-details");
            const toggle = item.querySelector(".career-goal-toggle");

            const isActive = index === selectedIndex;

            button.classList.toggle("career-goal-active", isActive);
            button.setAttribute("aria-expanded", String(isActive));

            details.hidden = !isActive;
            toggle.textContent = isActive ? "−" : "+";
        });

        if (progress) {
            const selectedDot = items[selectedIndex];
            const line = roadmap.querySelector(".career-roadmap-line");

            if (selectedDot && line) {
                const dotPosition =
                    selectedDot.offsetTop +
                    36 -
                    line.offsetTop;

                const percentage = Math.max(
                    0,
                    Math.min(
                        100,
                        (dotPosition / line.offsetHeight) * 100
                    )
                );

                progress.style.height = percentage + "%";
            }
        }
    }

    items.forEach((item, index) => {
        const button = item.querySelector(".career-goal-card");

        button.addEventListener("click", () => {
            activateGoal(index);
        });
    });

    activateGoal(0);

});



(function setupCertificateModal() {

    const modal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("certificateModalImage");

    if (!modal || !modalImage) return;

    const closeButton = modal.querySelector(".certificate-modal-close");
    const certificateLinks = document.querySelectorAll(
        ".certificate-view-link"
    );

    let previousFocus = null;

    function closeCertificate() {
        modal.hidden = true;
        modalImage.removeAttribute("src");
        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    certificateLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            previousFocus = link;
            modalImage.src = link.getAttribute("href");
            modalImage.alt = link.closest(".certificate-card")
                ?.querySelector("h3")?.textContent + " Certificate";

            modal.hidden = false;
            document.body.style.overflow = "hidden";
            closeButton.focus();
        });
    });

    closeButton.addEventListener("click", closeCertificate);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeCertificate();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeCertificate();
        }
    });

})();
