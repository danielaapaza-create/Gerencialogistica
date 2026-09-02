/* LOGIXSC+ — analitica.js: tabs San Fernando / Chimú + catálogo de dashboards Power BI */
(function () {
  "use strict";

  var tabsWrap = document.getElementById("analitica-tabs");
  var panelsWrap = document.getElementById("analitica-panels");
  var biWrap = document.getElementById("analitica-bi");
  if (!tabsWrap || !panelsWrap) return;

  var data = (window.LOGIXSC_DATA && window.LOGIXSC_DATA.analitica) || { empresas: [], businessIntelligence: {} };

  function dashboardCard(d) {
    return (
      '<div class="dashboard-card">' +
        '<h5>' + d.nombre + '</h5>' +
        '<div class="dashboard-meta">' +
          '<span>Resp. <strong>' + d.responsable + '</strong></span>' +
          '<span>Jefatura <strong>' + d.jefatura + '</strong></span>' +
        '</div>' +
        '<span class="dashboard-freq">Actualización: ' + d.frecuencia + ' · ' + d.hora + '</span>' +
        '<a class="dashboard-link" href="' + d.url + '" target="_blank" rel="noopener noreferrer">Abrir dashboard' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>' +
        '</a>' +
      '</div>'
    );
  }

  function areaGroup(area) {
    return (
      '<div class="analitica-area">' +
        '<h4 class="analitica-area-title">' + area.nombre + '<span class="area-count">' + area.dashboards.length + (area.dashboards.length === 1 ? " dashboard" : " dashboards") + '</span></h4>' +
        '<div class="dashboard-grid">' + area.dashboards.map(dashboardCard).join("") + '</div>' +
      '</div>'
    );
  }

  tabsWrap.innerHTML = data.empresas.map(function (emp, i) {
    return '<button class="analitica-tab' + (i === 0 ? " is-active" : "") + '" data-tab="' + emp.id + '" type="button">' + emp.nombre + '</button>';
  }).join("");

  panelsWrap.innerHTML = data.empresas.map(function (emp, i) {
    return (
      '<div class="analitica-panel' + (i === 0 ? " is-active" : "") + '" data-panel="' + emp.id + '">' +
        '<p class="analitica-summary">' + emp.resumen + ' Gerencia: <strong>' + emp.gerencia + '</strong>.</p>' +
        '<div class="analitica-areas">' + emp.areas.map(areaGroup).join("") + '</div>' +
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
