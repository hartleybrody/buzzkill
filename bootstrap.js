
// Listen for any changes to the URL of any tab.
// see: http://developer.chrome.com/extensions/tabs.html#event-onUpdated
chrome.tabs.onUpdated.addListener(function(id, info, tab){

    // if (tab.status !== "complete"){
    //     console.log("not yet");
    //     return;
    // }

    if (tab.url.toLowerCase().indexOf("facebook.com") === -1){
        console.log("not here");
        return;
    }

    if (tab.url.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1){
        chrome.tabs.update({url: "http://www.facebook.com/?no-buzzfeed-for-you!"});
    }

    chrome.pageAction.show(tab.id);
    if (localStorage["be_a_buzzkill"] == "true"){
        console.log("getting ready to be a buzz kill...");
        chrome.tabs.executeScript(null, {"file": "buzzkill.js"});
    }

});

// show the popup when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.pageAction.show(tab.id);
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

