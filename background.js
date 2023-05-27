chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tabId);
  console.log(changeInfo);
  console.log(tab);
  if (tab.url && tab.url.includes("hd.kinopoisk.ru/selection") && tab.status === "complete") {
    chrome.tabs.sendMessage(tabId, {
      type: "kinopoisk_page_loaded",
    });
  }
});
