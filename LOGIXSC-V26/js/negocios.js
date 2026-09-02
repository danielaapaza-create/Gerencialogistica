/* LOGIXSC+ — negocios.js: render de la grilla de Nuestros Negocios */
(function () {
  "use strict";

  var grid = document.getElementById("negocios-grid");
  if (!grid) return;

  var data = (window.LOGIXSC_DATA && window.LOGIXSC_DATA.negocios) || [];

  grid.innerHTML = data.map(function (n, i) {
    return (
      '<article class="negocio-card reveal" data-delay="' + ((i % 4) + 1) + '">' +
        '<div class="negocio-media">' +
          '<img src="' + n.imagen + '" alt="' + n.nombre + '" loading="lazy">' +
          '<span class="negocio-number">' + n.numero + '</span>' +
        '</div>' +
        '<div class="negocio-body">' +
          '<h3>' + n.nombre + '</h3>' +
          '<p>' + n.descripcion + '</p>' +
        '</div>' +
      '</article>'
    );
  }).join("");
})();
