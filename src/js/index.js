import { BACK_DROP } from "./back-drop.js";
import { DATA_MANAGER } from "./data-manager.js";
import { DATE_SELECTOR } from "./date-selector.js";
import { LOADER } from "./loader.js";
import { MORE_INFO_MODAL } from "./more-info-modal.js";
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

      document.addEventListener(DATA_MANAGER.moreDataEvent, (event) => {
        MORE_INFO_MODAL.setData(
          DATA_MANAGER.getLastSevenDaysData(event.detail.data)
        );
        MORE_INFO_MODAL.showModal();
      });

      const station = {
        dia: "2025-01-31T00:00:00.000",
        estaci: "Embassament de Darnius Boadella (Darnius)",
        nivell_absolut: 135.95,
        percentatge_volum_embassat: 17,
        volum_embassat: 10.4,
      };

      const values = DATA_MANAGER.getLastSevenDaysData(station);

      console.log(values);

      const box = document.createElement("div");
      box.classList.add("data-table__container");
      values.reverse().forEach((value) => {
        const row = document.createElement("div");
        row.classList.add("data-table__row");

        const dateCell = document.createElement("div");
        dateCell.classList.add("data-table__date");
        dateCell.textContent = new Date(value.dia).toLocaleDateString();

        row.appendChild(dateCell);

        box.appendChild(row);
      });

      $("#table").append(box);
    },
  });
}

$(document).ready(() => {
  BACK_DROP.init();
  LOADER.setBackdrop(BACK_DROP);
  MORE_INFO_MODAL.setBackdrop(BACK_DROP);
  loadData();
});
