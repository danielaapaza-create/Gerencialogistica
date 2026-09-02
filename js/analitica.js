/* LOGIXSC+ — analitica.js: tabs San Fernando / Chimú + render de indicadores */
(function () {
  "use strict";

  var tabsWrap = document.getElementById("analitica-tabs");
  var panelsWrap = document.getElementById("analitica-panels");
  var biWrap = document.getElementById("analitica-bi");
  if (!tabsWrap || !panelsWrap) return;

  var data = (window.LOGIXSC_DATA && window.LOGIXSC_DATA.analitica) || { empresas: [], businessIntelligence: {} };

  tabsWrap.innerHTML = data.empresas.map(function (emp, i) {
    return '<button class="analitica-tab' + (i === 0 ? " is-active" : "") + '" data-tab="' + emp.id + '" type="button">' + emp.nombre + '</button>';
  }).join("");

  panelsWrap.innerHTML = data.empresas.map(function (emp, i) {
    var indicadores = emp.indicadores.map(function (ind) {
      return (
        '<div class="indicador-card">' +
          '<span class="valor">' + ind.valor + '</span>' +
          '<span class="etiqueta">' + ind.etiqueta + '</span>' +
          '<span class="detalle">' + ind.detalle + '</span>' +
        '</div>'
      );
    }).join("");

    var soluciones = emp.soluciones.map(function (s) {
      return '<div class="solucion-chip">' + s + '</div>';
    }).join("");

    return (
      '<div class="analitica-panel' + (i === 0 ? " is-active" : "") + '" data-panel="' + emp.id + '">' +
        '<p class="analitica-summary">' + emp.resumen + '</p>' +
        '<div class="analitica-indicadores">' + indicadores + '</div>' +
        '<div class="analitica-soluciones">' + soluciones + '</div>' +
      '</div>'
    );
  }).join("");

  if (biWrap && data.businessIntelligence) {
    var bi = data.businessIntelligence;
    biWrap.innerHTML =
      '<div>' +
        '<h4>' + bi.titulo + '</h4>' +
        '<p>' + bi.descripcion + '</p>' +
      '</div>' +
      '<ul>' + (bi.capacidades || []).map(function (c) { return "<li>" + c + "</li>"; }).join("") + '</ul>';
  }

  tabsWrap.addEventListener("click", function (e) {
    var btn = e.target.closest(".analitica-tab");
    if (!btn) return;
    var id = btn.getAttribute("data-tab");

    tabsWrap.querySelectorAll(".analitica-tab").forEach(function (t) {
      t.classList.toggle("is-active", t === btn);
    });
    panelsWrap.querySelectorAll(".analitica-panel").forEach(function (p) {
      p.classList.toggle("is-active", p.getAttribute("data-panel") === id);
    });
  });
})();
