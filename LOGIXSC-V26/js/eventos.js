/* LOGIXSC+ — eventos.js: agenda filtrable de Eventos Logísticos */
(function () {
  "use strict";

  var list = document.getElementById("eventos-list");
  var filtrosWrap = document.getElementById("eventos-filtros");
  var emptyEl = document.getElementById("eventos-empty");
  if (!list) return;

  var data = ((window.LOGIXSC_DATA && window.LOGIXSC_DATA.eventos) || []).slice().sort(function (a, b) {
    return new Date(a.fecha) - new Date(b.fecha);
  });

  var MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  var currentFilter = "todos";

  function formatFecha(fechaISO) {
    var d = new Date(fechaISO + "T00:00:00");
    return { dia: d.getDate(), mes: MESES[d.getMonth()] };
  }

  var firstRender = true;

  function itemTemplate(ev, i) {
    var f = formatFecha(ev.fecha);
    var cls = "evento-item" + (firstRender ? " reveal" : "");
    var delayAttr = firstRender ? ' data-delay="' + ((i % 4) + 1) + '"' : "";
    return (
      '<article class="' + cls + '"' + delayAttr + '>' +
        '<div class="evento-fecha"><span class="dia">' + f.dia + '</span><span class="mes">' + f.mes + '</span></div>' +
        '<div class="evento-body-row">' +
          '<div class="evento-tags">' +
            '<span class="evento-tag evento-tag--tipo">' + ev.tipo + '</span>' +
            '<span class="evento-tag evento-tag--negocio">' + ev.negocio + '</span>' +
          '</div>' +
          '<h4>' + ev.nombre + '</h4>' +
          '<p>' + ev.descripcion + '</p>' +
        '</div>' +
      '</article>'
    );
  }

  function render() {
    var filtered = data.filter(function (ev) {
      return currentFilter === "todos" || ev.categoria === currentFilter;
    });
    list.innerHTML = filtered.map(itemTemplate).join("");
    if (emptyEl) emptyEl.classList.toggle("is-visible", filtered.length === 0);
    firstRender = false;
  }

  if (filtrosWrap) {
    filtrosWrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".evento-filtro");
      if (!btn) return;
      currentFilter = btn.getAttribute("data-filtro");
      filtrosWrap.querySelectorAll(".evento-filtro").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      render();
    });
  }

  render();
})();
