export const STATIONS_SELECTOR = {
  STATIONS: new Set(),
  available: [],
  selected: [],
  selectedEvent: "stationsSelected",
  availableSelected: undefined,
  selectedSelected: undefined,
  _available: "available",
  _selected: "selected",
  _single: "single",
  _all: "all",

  /**
   * Establece la lista de estaciones disponibles para seleccionar
   */
  initAvailableList: function () {
    this.available = Array.from(this.STATIONS);
  },

  /**
   * Establece la acción a realizar por los botones al pulsar
   */
  initButtons: function () {
    const self = this;
    $(".station-selector-buttons>button").on("click", function (event) {
      event.preventDefault();
      const direction = $(this).data("direction");
      const type = $(this).data("type");
      const value =
        direction === self._available
          ? self.selectedSelected
          : self.availableSelected;
      self.moveStationValue(direction, type, value);
      self.setOptions();
      self.checkButtonsStatus();

      document.dispatchEvent(
        new CustomEvent(self.selectedEvent, {
          detail: {
            total: self.selected.length,
          },
        })
      );
    });
  },

  /**
   * Mueve un embalse de una lista a otra
   * @param {string} direction Hacia donde ha de moverse el valor, si hacia disponible o seleccionado
   * @param {string} type Tipo de movimiento, si un solo valor o todos los posibles
   * @param {string} value El valor del embalse a mover
   */
  moveStationValue: function (direction, type, value) {
    const origin =
      direction === this._selected ? this._available : this._selected;
    const destination =
      direction === this._selected ? this._selected : this._available;
    if (type === this._single) {
      this[destination].push(value);
      this[origin] = this[origin].filter((item) => item !== value);
    } else {
      this[destination] = this[destination].concat(this[origin]);
      this[origin] = [];
    }
    this.selectedSelected = undefined;
    this.availableSelected = undefined;
  },

  /**
   * Realiza una comprobaciones para habilitar o deshabilitar los botones del selector de embalses
   */
  checkButtonsStatus: function () {
    const self = this;
    $(".station-selector-buttons>button").each((_index, element) => {
      const direction = $(element).data("direction");
      const type = $(element).data("type");

      const conditionAvailableSingle =
        direction === self._selected &&
        type === self._single &&
        (!this.available.length || !this.availableSelected);
      const conditionAvailableAll =
        direction === self._selected &&
        type === self._all &&
        !this.available.length;
      const conditionSelectedSingle =
        direction === self._available &&
        type === self._single &&
        (!this.selected.length || !this.selectedSelected);
      const conditionSelectedAll =
        direction === self._available &&
        type === self._all &&
        !this.selected.length;
      $(element).attr(
        "disabled",
        conditionAvailableAll ||
          conditionAvailableSingle ||
          conditionSelectedAll ||
          conditionSelectedSingle
      );
    });
  },

  /**
   * Establece las opciones para los selectores de embalses disponibles y seleccionadas
   */
  setOptions: function () {
    const self = this;
    const idAvailable = `#${self._available}`;
    const idSelected = `#${self._selected}`;
    this.emptySelector(idAvailable);
    this.emptySelector(idSelected);
    this.fillSelector(idAvailable, this.available);
    this.fillSelector(idSelected, this.selected);
    $(`${idAvailable} .option, ${idSelected} .option`).on("click", function () {
      const id = $(this).parent().attr("id");
      if (id === self._available) {
        self.availableSelected = $(this).html();
      } else {
        self.selectedSelected = $(this).html();
      }
      $(`#${id} .option`).removeClass("selected");
      $(this).addClass("selected");
      self.checkButtonsStatus();
    });
  },

  /**
   * Elimina todos los <options> de un <select>
   * @param {string} selector Identificador del select para consultarlo con jQuery
   */
  emptySelector: function (selector) {
    const obj = $(selector);
    obj.empty();
  },

  /**
   * Inserta una lista de <options> en un <select>
   * @param {string} selector Identificador del select para consultarlo con jQuery
   * @param {string} items Lista de elementos para añadir como <options>
   */
  fillSelector: function (selector, items) {
    const obj = $(selector);
    items.forEach(function (item) {
      obj.append(`<div class="option">${item}</div>`);
    });
  },

  /**
   * Establece los valores de las estaciones en el objeto que maneja los selectores
   * @param {Array<Object>} data
   */
  setStationsList: function (data) {
    if (data.length) {
      data.forEach((item) => {
        if (!this.STATIONS.has(item.estaci)) {
          this.STATIONS.add(item.estaci);
        }
      });
    }
  },
};
