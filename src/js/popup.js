import { createElement } from "ardelon-create-element";
import { generatePanel } from "./utilities";

const loadTitle = () => {
  const titleContainer = createElement({});
  const title = createElement({ innerText: "Twitter Title" });
  const isTwitter = createElement({
    id: "is-twitter",
    innerText: "not twitter",
    classList: ["not-twitter"],
  });

  titleContainer.append(title, isTwitter);
  return titleContainer;
};

const loadPanel = () => {
  const panelContainer = createElement({ id: "panel-container" });

  return panelContainer;
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "TWITTER") {
    console.log("twitter");
    console.log(message);
    generatePanel(message.payload.data);
  }
});

document.body.append(loadTitle(), loadPanel());
const fn = async () => {
  console.log(await chrome.storage.local.get("twitterCounts"));
  const storageData = await chrome.storage.local.get("twitterCounts");
  console.log(storageData);
  generatePanel(storageData.twitterCounts || []);
};
fn();
