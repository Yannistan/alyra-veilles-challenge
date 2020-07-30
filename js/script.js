const dateNow = moment();

dateNow.locale("fr");

const datePos = document.getElementById("date-du-jour");

datePos.prepend(dateNow.format("DD/MM/YYYY"));
// console.log("dddd DD/MM/YY", dateNow.format("dddd DD/MM/YY"));
let filterVeilles = "toutes les veilles";
let compteur = 0;
function insertVeilles() {
  const ulEl = document.createElement("ul");
  const gridContainer = document.getElementById("grid-container");
  ulEl.classList.add("list-unstyled");
  const filterV = veilles.filter((el) => {
    if (filterVeilles === "toutes les veilles") {
      return true;
    } else {
      return el.tags.includes(filterVeilles);
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
