import { createElement } from "ardelon-create-element";

export function isTwitterPost(givenUrl) {
  const url = new URL(givenUrl);

  if (url.hostname !== "twitter.com") return false;
  const regex = /status\/\d+\/?$/;
  return regex.test(url.pathname);
}

export function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

export function getTwitterInfo() {
  const viewCount = getElementByXpath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[1]/div/div/article/div/div/div[3]/div[4]/div/div[1]/div/div[3]/span/div/span/span/span"
  );
  const replyCount = getElementByXpath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[1]/div/div/article/div/div/div[3]/div[5]/div/div[1]/div/div/div[2]/span/span/span"
  );
  const retweetCount = getElementByXpath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[1]/div/div/article/div/div/div[3]/div[5]/div/div[2]/div/div/div[2]/span/span/span"
  );
  const likeCount = getElementByXpath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[1]/div/div/article/div/div/div[3]/div[5]/div/div[3]/div/div/div[2]/span/span/span"
  );
  const saveCount = getElementByXpath(
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[1]/div/div/article/div/div/div[3]/div[5]/div/div[4]/div/div/div[2]/span/span/span"
  );

  console.log(viewCount, replyCount, retweetCount, likeCount, saveCount);
  return [
    viewCount?.innerText,
    replyCount?.innerText,
    retweetCount?.innerText,
    likeCount?.innerText,
    saveCount?.innerText,
  ];
}

export function generatePanel(data) {
  const panelContainer = document.getElementById("panel-container");
  panelContainer.innerHTML = "";

  const viewCountSpan = createElement({
    tag: "span",
    innerText: `view count : ${data[0]}`,
  });
  const replyCountSpan = createElement({
    tag: "span",
    innerText: `reply count : ${data[1]}`,
  });
  const retweetCountSpan = createElement({
    tag: "span",
    innerText: `retweet count : ${data[2]}`,
  });
  const likeCountSpan = createElement({
    tag: "span",
    innerText: `like count : ${data[3]}`,
  });
  const saveCountSpan = createElement({
    tag: "span",
    innerText: `save count : ${data[4]}`,
  });

  panelContainer.append(
    viewCountSpan,
    replyCountSpan,
    retweetCountSpan,
    likeCountSpan,
    saveCountSpan
  );
}
