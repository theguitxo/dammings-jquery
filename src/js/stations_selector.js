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

  emptySelector: function (selector) {
    const obj = $(selector);
    obj.empty();
  },

  fillSelector: function (selector, items) {
    const obj = $(selector);
    items.forEach(function (item) {
      obj.append(new Option(item, item));
    });
  },
};
