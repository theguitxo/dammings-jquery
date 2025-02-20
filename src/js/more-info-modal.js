export const MORE_INFO_MODAL = {
  backdrop: null,
  backdropElement: null,
  data: null,
  title: null,

  setBackdrop: function (backdrop) {
    this.backdrop = backdrop;
  },

  setData: function (data) {
    if (data.length) {
      this.setModalTitle(data[0].estaci);
      this.data = document.createElement("div");
      this.data.classList.add("graph_container");
      data.reverse().forEach((dataItem) => this.setDataBar(dataItem));
    }
  },

  setDataBar: function (info) {
    const item = this.setCreateElement("graph_item");
    const bar = this.setCreateElement("graph_bar");
    const value = this.setCreateElement("graph_value");

    bar.style.setProperty(
      "--value",
      `"${new Date(info.dia).toLocaleDateString()} - ${
        info.percentatge_volum_embassat
      }%"`
    );
    value.style.height = `${info.percentatge_volum_embassat}%`;

    bar.appendChild(value);
    item.appendChild(bar);
    this.data.appendChild(item);
  },

  setCreateElement: function (className) {
    const element = document.createElement("div");
    element.classList.add(className);
    return element;
  },

  setModalTitle: function (title) {
    this.title = document.createElement("p");
    this.title.style.padding = "0 2rem";
    this.title.innerHTML = title;
  },

  createModal: function () {
    const modal = document.createElement("div");
    modal.classList.add("modal__container");
    modal.innerHTML = `
        <div class="modal__close-bar">
            <span class="close">
                &times;
                <span class="close-tooltip">
                    Cerrar
                </span>
            </span>
        </div>
        <div class="modal__content" id="content"></div>
    `;

    $(modal).find("#content").append(this.title).append(this.data);
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
