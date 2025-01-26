import { BACK_DROP } from "./back-drop.js";
import { DATA_MANAGER } from "./data-manager.js";
import { DATE_SELECTOR } from "./date-selector.js";
import { LOADER } from "./loader.js";
import { STATIONS_SELECTOR } from "./stations-selector.js";

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
      LOADER.showLoader();
    },
    complete: () => {
      LOADER.hideLoader();
    },
    success: (data) => {
      $("#stations-selector").removeClass("hidden");
      DATE_SELECTOR.initDatepicker(data);
      STATIONS_SELECTOR.setStationsList(data);
      STATIONS_SELECTOR.initAvailableList();
      STATIONS_SELECTOR.setOptions();
      STATIONS_SELECTOR.initButtons();
      STATIONS_SELECTOR.checkButtonsStatus();
      DATA_MANAGER.setData(data);
      DATA_MANAGER.setContainer($("#result"));

      $("#search-button").click(() => {
        DATA_MANAGER.setDateFilter(DATE_SELECTOR.selectedDate);
        DATA_MANAGER.setStationsFilter(STATIONS_SELECTOR.selected);
        DATA_MANAGER.filterData();
      });

      document.addEventListener(STATIONS_SELECTOR.selectedEvent, (event) =>
        $("#search-button").prop("disabled", !event.detail.total)
      );
    },
  });
}

$(document).ready(() => {
  BACK_DROP.init();
  LOADER.setBackdrop(BACK_DROP);
  loadData();
});
