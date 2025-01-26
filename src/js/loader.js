export const LOADER = {
  backdrop: null,
  backdropElement: null,

  /**
   * Establece el valor para el objeto del backdrop
   * @param {Object} backdrop Objecto que maneja el backdrop
   */
  setBackdrop: function (backdrop) {
    this.backdrop = backdrop;
  },

  /**
   * Crea un DIV para el loader spinner
   * @returns {HTMLDivElement} Un elemento DIV con la clase "loader"
   */
  createDivLoader: function () {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    return loader;
  },

  /**
   * Muestra el loader spinner
   */
  showLoader: function () {
    const loader = this.createDivLoader();

    this.backdropElement = this.backdrop.addElement(loader);
  },

  /**
   * Eliminar el loader spinner
   */
  hideLoader: function () {
    this.backdrop.removeElement(this.backdropElement);
  },
};
