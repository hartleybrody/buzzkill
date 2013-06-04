
// Listen for any changes to the URL of any tab.
// see: http://developer.chrome.com/extensions/tabs.html#event-onUpdated
chrome.tabs.onUpdated.addListener(function(id, info, tab){

  // if (tab.status !== "complete"){
  //   console.log("not yet");
  //   return;
  // }

    if (tab.url.toLowerCase().indexOf("facebook.com") === -1){
        console.log("not here");
        return;
    }

    chrome.pageAction.show(tab.id);
    if(localStorage["be_a_buzzkill"] == "true"){
        console.log("getting ready to be a buzz kill...");
        chrome.tabs.executeScript(null, {"file": "buzzkill.js"});
    }

});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.pageAction.show(tab.id);
});

