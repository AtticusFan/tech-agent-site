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

const releaseControls = document.querySelector("#release-controls");
if (releaseControls) {
  const provider = document.querySelector("#release-provider");
  const stage = document.querySelector("#release-stage");
  const cards = [...document.querySelectorAll(".release-card")];
  const filterReleases = () => {
    let visible = 0;
    for (const card of cards) {
      const match = (provider.value === "all" || card.dataset.provider === provider.value)
        && (stage.value === "all" || card.dataset.stage === stage.value);
      card.hidden = !match;
      if (match) visible += 1;
    }
    document.querySelector("#release-result").textContent = `顯示 ${visible} / ${cards.length} 則事件`;
    document.querySelector(".release-empty").hidden = visible !== 0;
  };
  releaseControls.addEventListener("submit", event => event.preventDefault());
  releaseControls.addEventListener("change", filterReleases);
  releaseControls.addEventListener("reset", () => {
    provider.value = "all";
    stage.value = "all";
    filterReleases();
  });
}
