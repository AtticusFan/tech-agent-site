const sourceSearch = document.querySelector(".source-search");

if (sourceSearch) {
  const input = sourceSearch.querySelector("#source-query");
  const status = sourceSearch.querySelector("#source-search-status");
  const normalize = (text) => text.normalize("NFKC").toLocaleLowerCase("zh-TW");
  const entries = Array.from(document.querySelectorAll("#source-index li"), (item) => ({
    item,
    text: normalize(`${item.textContent} ${item.dataset.originalTitle}`),
  }));

  function filterSources() {
    const terms = normalize(input.value).trim().split(/\s+/u).filter(Boolean);
    let count = 0;
    for (const { item, text } of entries) {
      const matches = terms.every((term) => text.includes(term));
      item.hidden = !matches;
      if (matches) count += 1;
    }
    status.textContent = terms.length ? (count ? `找到 ${count} 則` : "找不到符合的來源。") : "";
  }

  input.addEventListener("input", (event) => {
    if (!event.isComposing) filterSources();
  });
  input.addEventListener("compositionend", filterSources);
  filterSources();
  sourceSearch.hidden = false;
}
