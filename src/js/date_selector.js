export const date_selector = {
  minDate: new Date(),
  maxDate: new Date(),
  selectedDate: null,
  dt: null,

  /**
   * Establece las fechas mínima y máxima para el selector de fecha
   * @param {Array<Object>} data
   */
  setMinMaxDate: function (data) {
    if (data.length) {
      data.forEach((item) => {
        const itemDate = new Date(item.dia);

        if (itemDate.getTime() < this.minDate.getTime()) {
          this.minDate = itemDate;
        }

        if (itemDate.getTime() > this.maxDate.getTime()) {
          this.maxDate = itemDate;
        }
      });
    }

    this.minDate = new Date(this.minDate.getTime() + 86400000);
  },

  /**
   * Elimina la clase para indicar cual es la fecha actual en el datepicker
   */
  removeDatepickerTodayHighlight: function () {
    const self = this;
    setTimeout(function () {
      self.dt.find(".ui-state-highlight").removeClass("ui-state-highlight");
    }, 0);
  },

  /**
   * Establece la fecha seleccionada en el datepicker
   * @param {Date} date Objeto de tipo fecha con el valor seleccionado
   */
  setSelectedDate: function (date) {
    this.selectedDate = date;
    this.removeDatepickerTodayHighlight();
  },

  /**
   * Inicia el datepicker
   * @param {Object} data Objecto con los datos de embalses obtenidos de la API
   */
  initDatepicker(data) {
    const self = this;

    this.setMinMaxDate(data);
    this.dt = $("#datepicker").datepicker({
      minDate: self.minDate,
      maxDate: self.maxDate,
      onSelect: function (_value, object) {
        self.setSelectedDate(object);
      },
    });

    self.setSelectedDate(self.maxDate);
  },
};
