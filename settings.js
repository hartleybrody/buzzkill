document.addEventListener('DOMContentLoaded', function(){

    var input = document.getElementById('clean-option');

    // set the initial state of the checkbox
    chrome.storage.sync.get("clean_news_feed", function(data){
        if (data["clean_news_feed"]){
            input.checked = true;
        } else {
            input.checked = false;
        }
      });


    input.addEventListener("change", function(){
        chrome.storage.sync.set({clean_news_feed: input.checked});
    });


});
