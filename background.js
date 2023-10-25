/*chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        if (tab.url !== "chrome://newtab/"){
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                console.log(message)
                console.log(sender)
                sendResponse("triggered")
                "debugger;s"
            })
        }
    }
}
)*/