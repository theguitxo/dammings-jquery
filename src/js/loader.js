export const loader = {
  /**
   * Crea un DIV para el backdrop del loader spinner
   * @returns {HTMLDivElement} Un elemento DIV con la clase "backdrop"
   */
  createDivBackDrop: function () {
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    return backdrop;
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
    const backdrop = this.createDivBackDrop();
    const loader = this.createDivLoader();

    backdrop.appendChild(loader);
    document.body.classList.add("backdrop--no-scroll");
    document.body.appendChild(backdrop);
  },

  /**
   * Eliminar el loader spinner
   */
  hideLoader: function () {
    if ($(".backdrop").length) {
      $(".backdrop").remove();
      document.body.classList.remove("backdrop--no-scroll");
    }
  },
};
