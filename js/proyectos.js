/* LOGIXSC+ — proyectos.js: filtros dinámicos de Implementación */
(function () {
  "use strict";

  var grid = document.getElementById("proyectos-grid");
  var countEl = document.getElementById("proyectos-count");
  var emptyEl = document.getElementById("proyectos-empty");
  var selects = {
    empresa: document.getElementById("filtro-empresa"),
    responsable: document.getElementById("filtro-responsable"),
    tipo: document.getElementById("filtro-tipo"),
    estado: document.getElementById("filtro-estado")
  };
  if (!grid) return;

  var data = (window.LOGIXSC_DATA && window.LOGIXSC_DATA.proyectos) || [];

  function fillOptions(select, values) {
    if (!select) return;
    var unique = Array.prototype.filter.call(values, function (v, i, arr) { return arr.indexOf(v) === i; }).sort();
    unique.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  fillOptions(selects.empresa, data.map(function (p) { return p.empresa; }));
  fillOptions(selects.responsable, data.map(function (p) { return p.responsable; }));
  fillOptions(selects.tipo, data.map(function (p) { return p.tipo; }));
  fillOptions(selects.estado, data.map(function (p) { return p.estado; }));

  var firstRender = true;

  function cardTemplate(p, i) {
    var cls = "proyecto-card" + (firstRender ? " reveal" : "");
    var delayAttr = firstRender ? ' data-delay="' + ((i % 3) + 1) + '"' : "";
    return (
      '<article class="' + cls + '"' + delayAttr + '>' +
        '<div class="proyecto-head">' +
          '<h4>' + p.nombre + '</h4>' +
          '<span class="proyecto-tipo">' + p.tipo + '</span>' +
        '</div>' +
        '<div class="proyecto-meta">' +
          '<span><strong>' + p.empresa + '</strong></span>' +
          '<span>Resp. <strong>' + p.responsable + '</strong></span>' +
        '</div>' +
        '<span class="proyecto-estado" data-estado="' + p.estado + '">' + p.estado + '</span>' +
        '<div class="proyecto-progress"><div class="proyecto-progress-bar" style="width:' + p.avance + '%"></div></div>' +
        '<span class="proyecto-avance">' + p.avance + '% de avance</span>' +
      '</article>'
    );
  }

  function render() {
    var filters = {
      empresa: selects.empresa ? selects.empresa.value : "",
      responsable: selects.responsable ? selects.responsable.value : "",
      tipo: selects.tipo ? selects.tipo.value : "",
      estado: selects.estado ? selects.estado.value : ""
    };

    var filtered = data.filter(function (p) {
      return (!filters.empresa || p.empresa === filters.empresa) &&
        (!filters.responsable || p.responsable === filters.responsable) &&
        (!filters.tipo || p.tipo === filters.tipo) &&
        (!filters.estado || p.estado === filters.estado);
    });

    grid.innerHTML = filtered.map(cardTemplate).join("");
    if (countEl) countEl.textContent = filtered.length + " proyecto" + (filtered.length === 1 ? "" : "s");
    if (emptyEl) emptyEl.classList.toggle("is-visible", filtered.length === 0);
    firstRender = false;
  }

  Object.keys(selects).forEach(function (key) {
    if (selects[key]) selects[key].addEventListener("change", render);
  });

  render();
})();
