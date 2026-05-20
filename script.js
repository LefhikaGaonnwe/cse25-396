/* =========================
    }

    alert("Message sent successfully!");

    contactForm.reset();
  });
}

/* =========================
   ABOUT PAGE BUTTON
========================= */

const learnMoreBtn = document.querySelector(".learn-btn");

if (learnMoreBtn) {

  learnMoreBtn.addEventListener("click", () => {

    alert("Thank you for learning more about our company!");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================
   FOOTER LINKS
========================= */

const footer = document.querySelector(".footer");

if (footer) {

  footer.addEventListener("click", () => {
    window.location.href = "contact.html";
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

/* =========================
   PAGE LOAD ANIMATION
========================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
