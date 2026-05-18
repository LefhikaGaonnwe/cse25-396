/* =========================
    alert("Feedback submitted successfully!");

    feedbackForm.reset();

    stars.forEach(star => {
      star.classList.remove("active-star");
    });
  });
}

/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm = document.querySelector(".message-section form");

if (contactForm) {

  contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = contactForm.querySelector("input").value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (name === "" || message === "") {
      alert("Please complete all fields.");
      return;
    }

    alert("Message sent successfully!");

    contactForm.reset();
  });
}

/* =========================
   HISTORY PAGE FILTER
========================= */

const filterButton = document.querySelector(".btn-primary");

if (filterButton && document.querySelector(".custom-table")) {

  filterButton.addEventListener("click", () => {
    alert("Filtering records...");
  });
}

/* =========================
   SCROLL TO TOP BUTTON
========================= */

const scrollButton = document.createElement("button");

scrollButton.innerHTML = "↑";
scrollButton.className = "scroll-top-btn";

document.body.appendChild(scrollButton);

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
});

scrollButton.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
