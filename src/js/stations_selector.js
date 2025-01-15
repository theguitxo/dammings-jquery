export const stations_selector = {
  STATIONS: new Set(),
  available: [],
  selected: [],

  /**
   * Establece la lista de estaciones disponibles para seleccionar
   */
  initAvailableList: function () {
    this.available = Array.from(stations_selector.STATIONS);
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
      const value = $(
        `select[name="${
          direction === "selected" ? "available" : "selected"
        }"] option:selected`
      ).val();
      self.moveStationValue(direction, type, value);
      self.setOptions();
      self.checkButtonsStatus();
    });
  },

  /**
   * Mueve un embalse de una lista a otra
   * @param {string} direction Hacia donde ha de moverse el valor, si hacia disponible o seleccionado
   * @param {string} type Tipo de movimiento, si un solo valor o todos los posibles
   * @param {string} value El valor del embalse a mover
   */
  moveStationValue: function (direction, type, value) {
    const origin = direction === "selected" ? "available" : "selected";
    const destination = direction === "selected" ? "selected" : "available";
    if (type === "single") {
      this[destination].push(value);
      this[origin] = this[origin].filter((item) => item !== value);
    } else {
      this[destination] = this[destination].concat(this[origin]);
      this[origin] = [];
    }
  },

  /**
   * Realiza una comprobaciones para habilitar o deshabilitar los botones del selector de embalses
   */
  checkButtonsStatus: function () {
    const availableSelected = $(
      'select[name="available"] option:selected'
    ).length;
    const selectedSelected = $(
      'select[name="selected"] option:selected'
    ).length;

    $(".station-selector-buttons>button").each((_index, element) => {
      const direction = $(element).data("direction");
      const type = $(element).data("type");

      const conditionAvailableSingle =
        direction === "selected" &&
        type === "single" &&
        (!this.available.length || !availableSelected);
      const conditionAvailableAll =
        direction === "selected" && type === "all" && !this.available.length;
      const conditionSelectedSingle =
        direction === "available" &&
        type === "single" &&
        (!this.selected.length || !selectedSelected);
      const conditionSelectedAll =
        direction === "available" && type === "all" && !this.selected.length;
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
    this.emptySelector('select[name="available"]');
    this.emptySelector('select[name="selected"]');

    this.fillSelector('select[name="available"]', this.available);
    this.fillSelector('select[name="selected"]', this.selected);

    $('select[name="available"] option, select[name="selected"] option').on(
      "click",
      () => this.checkButtonsStatus()
    );
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
      obj.append(new Option(item, item));
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
