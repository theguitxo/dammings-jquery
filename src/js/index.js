import { date_selector } from "./date_selector.js";
import { loader } from "./loader.js";
import { stations_selector } from "./stations_selector.js";

const URL =
  "https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json";

/**
 * Realiza la llamada al servicio para obtener los datos
 */
function loadData() {
  $.ajax(URL, {
    type: "GET",
    dataType: "JSON",
    beforeSend: () => {
      loader.showLoader();
    },
    complete: () => {
      loader.hideLoader();
    },
    success: (data) => {
      $("#stations-selector").removeClass("hidden");
      date_selector.initDatepicker(data);
      stations_selector.setStationsList(data);
      stations_selector.initAvailableList();
      stations_selector.setOptions();
      stations_selector.initButtons();
      stations_selector.checkButtonsStatus();
    },
  });
}

$(document).ready(() => {
  document.addEventListener(stations_selector.selectedEvent, (event) =>
    $("#search-button").prop("disabled", !event.detail.total)
  );
  loadData();
});
