/* LOGIXSC+ — carousel.js: carrusel automático del hero (cada 2s) */
(function () {
  "use strict";

  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
  var dotsWrap = root.querySelector(".carousel-dots");
  var prevBtn = root.querySelector(".carousel-nav--prev");
  var nextBtn = root.querySelector(".carousel-nav--next");
  var interval = parseInt(root.getAttribute("data-interval"), 10) || 2000;
  var current = 0;
  var timer = null;

  if (!slides.length) return;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "Ir a la imagen " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".carousel-dot"));

  function render() {
    slides.forEach(function (slide, i) { slide.classList.toggle("is-active", i === current); });
    dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === current); });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() { timer = setInterval(next, interval); }
  function stop() { if (timer) clearInterval(timer); }
  function restart() { stop(); start(); }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  render();
  start();
})();
