import { stations_selector } from "./stations_selector.js";

const URL =
  "https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json";

let minDate = new Date();
let maxDate = new Date();

/**
 * Crea un DIV para el backdrop del loader spinner
 * @returns {HTMLDivElement} Un elemento DIV con la clase "backdrop"
 */
function createDivBackDrop() {
  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");
  return backdrop;
}

/**
 * Crea un DIV para el loader spinner
 * @returns {HTMLDivElement} Un elemento DIV con la clase "loader"
 */
function createDivLoader() {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  return loader;
}

/**
 * Muestra el loader spinner
 */
function showLoader() {
  const backdrop = createDivBackDrop();
  const loader = createDivLoader();

  backdrop.appendChild(loader);
  document.body.classList.add("backdrop--no-scroll");
  document.body.appendChild(backdrop);
}

/**
 * Eliminar el loader spinner
 */
function hideLoader() {
  if ($(".backdrop").length) {
    $(".backdrop").remove();
    document.body.classList.remove("backdrop--no-scroll");
  }
}

/**
 * Establece los valores de las estaciones en el objeto que maneja los selectores
 * @param {Array<Object>} data
 */
function setStationsList(data) {
  if (data.length) {
    data.forEach((item) => {
      if (!stations_selector.STATIONS.has(item.estaci)) {
        stations_selector.STATIONS.add(item.estaci);
      }
    });
  }
}

/**
 * Establece las fechas mínima y máxima para el selector de fecha
 * @param {Array<Object>} data
 */
function setMiMaxDate(data) {
  if (data.length) {
    data.forEach((item) => {
      const itemDate = new Date(item.dia);

      if (itemDate.getTime() < minDate.getTime()) {
        minDate = itemDate;
      }

      if (itemDate.getTime() > maxDate.getTime()) {
        maxDate = itemDate;
      }
    });
  }

  minDate = new Date(minDate.getTime() + 86400000);
  console.log(minDate);
  console.log(maxDate);
}

/**
 * Realiza la llamada al servicio para obtener los datos
 */
function loadData() {
  $.ajax(URL, {
    type: "GET",
    dataType: "JSON",
    beforeSend: () => {
      showLoader();
    },
    complete: () => {
      hideLoader();
    },
    success: (data) => {
      $("#stations-selector").removeClass("hidden");
      setStationsList(data);
      setMiMaxDate(data);
      $("#datepicker").datepicker({
        minDate,
        maxDate,
      });
      stations_selector.initAvailableList();
      stations_selector.setOptions();
      stations_selector.initButtons();
      stations_selector.checkButtonsStatus();
    },
  });
}

$(document).ready(() => {
  loadData();
});
