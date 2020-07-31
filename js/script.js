const dateNow = moment();

dateNow.locale("fr");

const datePos = document.getElementById("date-du-jour");

datePos.prepend(dateNow.format("DD/MM/YYYY"));
// console.log("dddd DD/MM/YY", dateNow.format("dddd DD/MM/YY"));
let filterVeilles = "toutes les veilles";
let filterDates = "toutes les dates";
let filterSujets = "tous les sujets";

let compteur = 0;
function insertVeilles() {
  const ulEl = document.createElement("ul");
  const gridContainer = document.getElementById("grid-container");
  ulEl.classList.add("list-unstyled");
  const filterV = veilles.filter((el) => {
    if (filterVeilles === "toutes les veilles") {
      return true;
    } else {
      return el.category.includes(filterVeilles);
    }
  });

  for (let veille of filterV) {
    console.log(veille);
    const li = document.createElement("li");
    li.classList.add("card", "shadow-sm", "p-3", "mb-3");
    li.innerHTML = `<div class="card-body">
      <h2 class="card-title mb-2">${veille.subject}</h2>
      <div class="badge bg-primary p-1 mb-2">${veille.category}</div>
      <p class="card-text">${veille.date}</p>
  </div>`;

    ulEl.append(li);
    compteur += 1;
    if (compteur % 2 == 0) {
      li.classList.add("bg-light");
    }
  }
  gridContainer.innerHTML = "";
  gridContainer.append(ulEl);
}

insertVeilles();

function activateFilterByCategory() {
  // repérer select
  // boucle pour parcourir uniqueCategory
  const selectEL = document.getElementById("inputClassify");
  // trier uniqueCategory dans l'ordre alphabétique
  uniqueCategory.sort();
  console.log(uniqueCategory);
  console.log(selectEL);
  for (let tag of uniqueCategory) {
    const option = document.createElement("option");
    option.textContent = tag;
    option.value = tag;
    console.log(option);
    selectEL.append(option);
  }
  selectEL.addEventListener("change", () => {
    console.dir(selectEL);
    filterVeilles = selectEL.value;
    insertVeilles();
    console.log(filterVeilles);
  });
}

activateFilterByCategory();

function selectAz(val) {
  // insertVeilles()
  if (val.value == "trie-date") {
    console.log("string", val.value);
    // sortByDate(allDate);
    const dateFormat = "DD/MM/YYYY";
    // devrait retourner l'array triée pas dates, moment.js est chargé dans ce pen !!
    const veillesorted = veilles.sort(
      (a, b) => moment(a.date, dateFormat) - moment(b.date, dateFormat)
    );

    insertVeilles();
  } else if (val.value == "trie-atoz") {
    console.log("string", val.value);
    veilles.sort(function (a, b) {
      if (a.subject < b.subject) {
        return -1;
      }
      if (a.subject > b.subject) {
        return 1;
      }
      return 0;
    });
    insertVeilles();
  } else {
    val.value = "trie-za";
    console.log("string", val.value);
    veilles.sort(function (b, a) {
      if (b.subject > a.subject) {
        return -1;
      }
      if (b.subject < a.subject) {
        return 0;
      }
      return 0;
    });
    insertVeilles();
  }
}
