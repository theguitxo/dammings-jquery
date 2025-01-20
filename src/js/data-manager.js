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
    if (this.container?.children()) {
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
      this.showData();
    }
  },

  showNoData: function () {
    const banner = document.createElement("div");
    banner.style.cssText =
      "border: solid 2px red; width: 90%; margin: 1rem auto; text-align: center; padding: 1rem; color: red; background-color:rgb(243, 169, 169); font-weight: bold;";
    banner.innerHTML = "NO SE HAN ENCONTRADO DATOS";

    this.container.append(banner);
  },

  createDataCell: function (value) {
    const obj = document.createElement("td");
    obj.innerHTML = value;
    return obj;
  },

  createTableHeader: function () {
    const titles = [
      "FECHA",
      "EMBALSE",
      "NIVEL ABSOLUTO",
      "PORCENTAJE VOLUMEN EMBALSADO",
      "VOLUMEN EMBALSADO",
    ];
    const header = document.createElement("tr");
    titles.forEach((column) => {
      const obj = document.createElement("th");
      obj.innerHTML = column;
      header.appendChild(obj);
    });

    return header;
  },

  showData: function () {
    const table = document.createElement("table");
    table.classList.add("data-table");
    table.appendChild(this.createTableHeader());

    this.filteredData.forEach((rowData) => {
      const row = document.createElement("tr");
      const data = [
        new Date(rowData.dia).toLocaleDateString(),
        rowData.estaci,
        `${rowData.nivell_absolut} msnm`,
        `${rowData.percentatge_volum_embassat} %`,
        `${rowData.volum_embassat} m<sup>3</sup>`,
      ];
      data.forEach((item) => row.appendChild(this.createDataCell(item)));

      table.appendChild(row);
    });

    this.container.append(table);
  },
};
