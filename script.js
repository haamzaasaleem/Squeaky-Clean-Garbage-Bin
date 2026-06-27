/* Squeaky Clean — shared interactions */
(function () {
  "use strict";

  // ---- sticky header shadow ----
  var head = document.querySelector(".site-head");
  if (head) {
    var onScroll = function () {
      head.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- mobile nav ----
  var burger = document.querySelector(".burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.classList.remove("open");
      });
    });
  }

  // ---- scroll reveal ----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- drifting bubbles ----
  var field = document.querySelector(".bubbles");
  if (field && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (var i = 0; i < 14; i++) {
      var b = document.createElement("span");
      var size = 8 + Math.random() * 30;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = 9 + Math.random() * 11 + "s";
      b.style.animationDelay = -Math.random() * 12 + "s";
      field.appendChild(b);
    }
  }

  // ---- before / after slider ----
  document.querySelectorAll(".ba").forEach(function (ba) {
    var after = ba.querySelector(".after-img");
    var handle = ba.querySelector(".handle");
    if (!after || !handle) return;
    var dragging = false;
    function setPos(clientX) {
      var rect = ba.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      after.style.clipPath = "inset(0 0 0 " + pct + "%)";
      handle.style.left = pct + "%";
    }
    var start = function () { dragging = true; };
    var stop = function () { dragging = false; };
    ba.addEventListener("mousedown", function (e) { start(); setPos(e.clientX); });
    window.addEventListener("mousemove", function (e) { if (dragging) setPos(e.clientX); });
    window.addEventListener("mouseup", stop);
    ba.addEventListener("touchstart", function (e) { start(); setPos(e.touches[0].clientX); }, { passive: true });
    ba.addEventListener("touchmove", function (e) { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("touchend", stop);
  });

  // ---- forms (quote + contact) ----
  document.querySelectorAll("form[data-fake]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = form.querySelector(".form-ok");
      // simple required check
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (inp) {
        if (!inp.value.trim()) {
          valid = false;
          inp.style.borderColor = "#e3756b";
        } else {
          inp.style.borderColor = "";
        }
      });
      if (!valid) return;
      if (ok) {
        ok.classList.add("show");
        var name = (form.querySelector('[name="name"]') || {}).value || "";
        var first = name.split(" ")[0];
        ok.querySelector(".msg").textContent =
          (first ? "Thanks, " + first + "! " : "Thanks! ") +
          "Your request is in — we'll text or call you within one business day.";
      }
      form.querySelectorAll("input, textarea, select").forEach(function (inp) {
        if (inp.type !== "radio") inp.value = "";
      });
      if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // ---- footer year ----
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
