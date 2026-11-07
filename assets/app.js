"use strict";
const search = document.querySelector("#search");
const topic = document.querySelector("#topic");
const stories = [...document.querySelectorAll(".story")];
function filterStories() {
  const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const story of stories) {
    const match = (topic.value === "all" || story.dataset.topic === topic.value)
      && terms.every(term => story.dataset.search.includes(term));
    story.hidden = !match;
    if (match) visible += 1;
  }
  document.querySelector("#filter-result").textContent = `顯示 ${visible} / ${stories.length} 則文章`;
  document.querySelector("#empty").hidden = visible !== 0;
}
if (search && topic) {
  document.querySelector(".filters").addEventListener("submit", event => event.preventDefault());
  search.addEventListener("input", filterStories);
  topic.addEventListener("change", filterStories);
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = "";
    topic.value = "all";
    filterStories();
    search.focus();
  });
}
