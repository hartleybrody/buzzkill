// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    localStorage["be_a_buzzkill"] = true;
});
// Listen for any changes to the URL of any tab.
// see: http://developer.chrome.com/extensions/tabs.html#event-onUpdated
chrome.tabs.onUpdated.addListener(function(id, info, tab){

    // decide if we're ready to inject content script
    if (tab.status !== "complete"){
        console.log("not yet");
        return;
    }
    if (tab.url.toLowerCase().indexOf("facebook.com") === -1){
        console.log("not here");
        return;
    }

    if (tab.url.toLowerCase().indexOf("facebook.com") !== -1){
            // show the page action if on facebook.com
        chrome.pageAction.show(tab.id);
    }

    if (localStorage["be_a_buzzkill"] == "true"){

        if (tab.url.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1){
            chrome.tabs.update(tab.id, {url: "http://www.facebook.com/?no-buzzfeed-for-you!"});
        }

        // inject the content script onto the page
        console.log("getting ready to be a buzz kill...");
        chrome.tabs.executeScript(null, {"file": "buzzkill.js"});
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

