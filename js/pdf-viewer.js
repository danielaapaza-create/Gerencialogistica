/* LOGIXSC+ — pdf-viewer.js: modal visor de PDF */
(function () {
  "use strict";

  var modal = document.getElementById("pdf-modal");
  if (!modal) return;

  var iframe = modal.querySelector("iframe");
  var titleEl = modal.querySelector("[data-pdf-title]");
  var closeBtn = modal.querySelector(".pdf-modal-close");
  var triggers = document.querySelectorAll("[data-pdf]");
  var lastFocused = null;

  function openModal(src, title) {
    lastFocused = document.activeElement;
    iframe.src = src;
    if (titleEl) titleEl.textContent = title || "Documentación";
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    iframe.src = "";
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(trigger.getAttribute("data-pdf"), trigger.getAttribute("data-pdf-title"));
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
