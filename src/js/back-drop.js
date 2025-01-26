export const BACK_DROP = {
  backdrop: null,
  elements: new Map(),
  showing: false,

  init: function () {
    this.backdrop = document.createElement("div");
    this.backdrop.classList.add("backdrop");
    document.body.appendChild(this.backdrop);
  },

  show: function () {
    if (this.backdrop) {
      this.backdrop.classList.add("backdrop--visible");
      document.body.classList.add("backdrop--no-scroll");
      this.showing = true;
    }
  },

  hide: function () {
    if (this.backdrop) {
      this.backdrop.classList.remove("backdrop--visible");
      document.body.classList.remove("backdrop--no-scroll");
      this.showing = false;
    }
  },

  addElement: function (element) {
    const key = crypto.randomUUID();
    this.elements.set(key, element);

    if (!this.showing) {
      this.show();
    }

    this.backdrop.appendChild(element);
    return key;
  },

  removeElement: function (element) {
    this.backdrop.removeChild(this.elements.get(element));
    this.elements.delete(element);

    if (this.elements.size === 0) {
      this.hide();
    }
  },
};
