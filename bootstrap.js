
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab){

  // see: http://developer.chrome.com/extensions/tabs.html#event-onUpdated
  if (tab.status !== "complete"){
    console.log("not yet");
    return;
  }

  if (tab.url.toLowerCase().indexOf("facebook.com") === -1){
    console.log("not here");
    return;
  }

  console.log("getting ready to be a buzz kill...");
  chrome.tabs.executeScript(null, {"file": "buzzkill.js"});

});


