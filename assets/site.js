const filters = document.querySelector(".filter-row");
if (filters) {
  filters.hidden = false;
  const buttons = [...filters.querySelectorAll("button[data-filter]")];
  const grid = document.querySelector(".project-grid");
  const cards = [...grid.querySelectorAll(".project-card")];
  const count = filters.querySelector(".project-count");
  for (const button of buttons) button.addEventListener("click", () => {
    const active = button.dataset.filter;
    const all = active === "All work";
    grid.classList.toggle("is-filtered", !all);
    buttons.forEach(btn => btn.setAttribute("aria-pressed", String(btn === button)));
    let visible = 0;
    for (const card of cards) {
      card.hidden = !all && !card.dataset.categories.split("|").includes(active);
      if (!card.hidden) visible++;
    }
    count.textContent = String(visible).padStart(2, "0") + (visible === 1 ? " project" : " projects");
  });
}
const dialog = document.querySelector(".lightbox");
if (dialog && typeof dialog.showModal === "function") {
  const enlarged = dialog.querySelector("img");
  const caption = dialog.querySelector("p");
  for (const link of document.querySelectorAll(".zoom-link")) {
    link.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      enlarged.src = link.href;
      caption.textContent = link.querySelector("img").alt;
      dialog.showModal();
    });
  }
  dialog.querySelector("button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
}
