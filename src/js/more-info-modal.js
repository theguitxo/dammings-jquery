export const MORE_INFO_MODAL = {
  backdrop: null,
  backdropElement: null,
  data: null,

  setBackdrop: function (backdrop) {
    this.backdrop = backdrop;
  },

  setData: function (data) {
    this.data = data;
  },

  createModal: function () {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal__container">
        <div class="modal__close-bar">
            <span class="close">
                &times;
                <span class="close-tooltip">
                    Cerrar
                </span>
            </span>
        </div>
        <div class="modal__content">
            <p>${JSON.stringify(this.data)}</p>
        </div>
      </div>
    `;

    return modal;
  },

  showModal: function () {
    const modal = this.createModal();

    this.backdropElement = this.backdrop.addElement(modal);

    $(".modal__container .modal__close-bar .close").click(() => {
      this.backdrop.removeElement(this.backdropElement);
    });
  },
};
