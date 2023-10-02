chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete' && /^http/.test(tab.url)){
        chrome.scripting.executeScript({
            target:{ tabId: tabId },
            files: ["./content.js"]
        })
        .then(() => {
            console.log("Injected the content.js script");
        })
        .catch(err => console.log(err));
    }
})