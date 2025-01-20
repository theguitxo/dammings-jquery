export const DATA_MANAGER = {
  data: null,
  container: null,
  stationsFilter: null,
  dateFilter: null,
  filteredData: null,

  setData: function (data) {
    this.data = data;
  },

  setContainer: function (item) {
    this.container = item;
  },

  setStationsFilter: function (stations) {
    this.stationsFilter = stations;
  },

  setDateFilter: function (date) {
    this.dateFilter = date;
  },

  emptyContainer: function () {
    if (this.container && this.container.children()) {
      this.container.children().remove();
    }
  },

  filterData: function () {
    this.emptyContainer();

    this.filteredData = this.data.filter(
      (item) =>
        item.dia === this.dateFilter.toISOString().slice(0, -1) &&
        this.stationsFilter.includes(item.estaci)
    );

    if (!this.filteredData.length) {
      this.showNoData();
    } else {
    }
  },

  showNoData: function () {
    const banner = document.createElement("div");
    banner.style.cssText =
      "border: solid 2px red; width: 90%; margin: 1rem auto; text-align: center; padding: 1rem; color: red; background-color:rgb(243, 169, 169); font-weight: bold;";
    banner.innerHTML = "NO SE HAN ENCONTRADO DATOS";

    this.container.append(banner);
  },
};
