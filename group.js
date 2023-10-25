tabColours = ["grey","blue","red","yellow","green","pink","purple","cyan","orange"]

//function is to get the domain name from the url and return it to the grouptabs function

function getDomainName(url){
    if (!url) {
        return;
    }

    incomingUrl = url;

    var match = incomingUrl.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		var hostname = match[2].split(".");
		return hostname.slice(0, -1).join('.');
	}
	else {
		return undefined;
	}
}

//function gets all the tabs in the current window and groups them upon getting the domain name

async function groupTabs(event){
    tabsID = {};
    await chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, async (tabs)=>{
        for( tab of tabs){
            let domainName = getDomainName(tab.url);
            if(domainName){
                if(!tabsID.hasOwnProperty(domainName)){
                    tabsID[domainName]=[];
                    tabsID[domainName].push(tab.id);
                }
                else{
                    tabsID[domainName].push(tab.id);
                }

            }
        }

        for( everyid in tabsID){
               
        //creating a group tab with the tab created
        var groupId = await chrome.tabs.group({ tabIds: tabsID[everyid] });

        //modifying the properties of the grouped tabs
        await chrome.tabGroups.update(groupId, {
        collapsed: true,
        title: everyid,
        color: tabColours[Math.floor(Math.random()*10)%9]
        
        });
    }
    });
}
document.getElementById("group button").addEventListener("click",groupTabs);
//chrome.tabs.onUpdated.addListener(groupTabs);

/*chrome.runtime.sendMessage(
    "trigger",
    (response) => {
        if(response == "triggered"){
            groupTabs();
        }
    }
)*/