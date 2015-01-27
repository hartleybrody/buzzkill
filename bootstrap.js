// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({be_a_buzzkill: true});
});

// listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab){


    if (tab.url.toLowerCase().indexOf("facebook.com") > -1){
        chrome.pageAction.show(tab.id);

        chrome.storage.sync.get("be_a_buzzkill", function(data){
            if (data["be_a_buzzkill"] && tab.url.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1){
                chrome.tabs.update(tab.id, {url: "http://www.facebook.com/?no-buzzfeed-for-you!"});
            }
        });
    }

});


// update the icon when the user's settings change
// chrome.storage.onChanged.addListener(function(changes, areaName){
//     alert("changed settings");
//     console.log("changed settings");
//     if (localStorage["be_a_buzzkill"] == "true"){
//         path = "active-icon.jpeg";
//     } else {
//         path = "inactive-icon.jpeg";
//     }
//     chrome.tabs.getCurrent( function(tab){
//         chrome.pageAction.setIcon({
//             "tabId": tab.id,
//             "path": path
//         });
//     });
// }); 

