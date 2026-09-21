/* ===================================================================
   K.D.A Kayel's Digital Arts — shared scripts
   Loaded on every page with <script src="js/main.js" defer></script>
   Every block checks that its element exists first, so one file can
   safely run on pages that don't have that feature.
   =================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---- 1. Mobile navigation ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "\u00d7" : "\u2630";   // × or ☰
    });
  }

  /* ---- 2. Process accordion ---- */
  const accHeads = document.querySelectorAll(".acc-head");

  accHeads.forEach(function (head) {
    head.addEventListener("click", function () {
      const item = head.parentElement;
      const wasOpen = item.classList.contains("open");

      // close all, then open the clicked one if it wasn't already open
      document.querySelectorAll(".acc-item").forEach(function (i) {
        i.classList.remove("open");
        i.querySelector(".acc-head").setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- 3. Price estimator on the inquiry form ---- */
  const PRICES = {
    face: 200,
    half: 300,
    full: 500,
    bw: 5,
    colored: 10
  };

  const artType = document.getElementById("artType");
  const qty = document.getElementById("qty");
  const total = document.getElementById("estTotal");

  function updateEstimate() {
    if (!artType || !qty || !total) return;
    const unit = PRICES[artType.value] || 0;
    const count = Math.max(1, parseInt(qty.value, 10) || 1);
    total.textContent = unit ? "\u20b1" + (unit * count).toLocaleString() : "\u2014";
  }

  if (artType && qty && total) {
    artType.addEventListener("change", updateEstimate);
    qty.addEventListener("input", updateEstimate);
    updateEstimate();
  }

  /* ---- 4. Inquiry form validation ---- */
  const form = document.getElementById("inquiryForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();              // no server yet, so handle it here
      let valid = true;

      form.querySelectorAll("[data-required]").forEach(function (input) {
        const field = input.closest(".field");
        const msg = field.querySelector(".error");
        let problem = "";

        if (!input.value.trim()) {
          problem = "This one's required.";
        } else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
          problem = "Check the email address.";
        }

        if (problem) {
          valid = false;
          field.classList.add("invalid");
          msg.textContent = problem;
        } else {
          field.classList.remove("invalid");
          msg.textContent = "";
        }
      });

      const result = document.getElementById("formResult");
      if (valid) {
        form.reset();
        updateEstimate();
        result.hidden = false;
        result.textContent =
          "Inquiry noted. Message the Facebook page or text 0930-071-2097 to confirm your slot.";
        result.focus();
      } else if (result) {
        result.hidden = true;
      }
    });
  }

  /* ---- 5. Current year in the footer ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

});
