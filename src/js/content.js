console.log("Content script running.");

import { getTwitterInfo, isTwitterPost } from "./utilities";

// content.js

setTimeout(() => {
  if (isTwitterPost(window.location)) {
    const data = getTwitterInfo();

    chrome.storage.local.set({ twitterCounts: data });
    chrome.runtime.sendMessage({
      type: "TWITTER",
      payload: { message: "This is Twitter", data },
    });
    console.log("This is twitter");
  } else {
    chrome.runtime.sendMessage({
      type: "NOTTWITTER",
      payload: { message: "This is not Twitter" },
    });
    console.log("This is NOT a Twitter post URL.");
    chrome.storage.local.set({ twitterCounts: [] });
  }
}, 5000);
