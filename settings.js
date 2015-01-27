document.addEventListener('DOMContentLoaded', function(){

    var input = document.getElementById('kill-buzz');

    // set the initial state of the checkbox
    chrome.storage.sync.get("be_a_buzzkill", function(data){
        if (data["be_a_buzzkill"]){
          input.checked = true;
        } else {
            input.checked = false;
        }
      });


    input.addEventListener("change", function(){
        chrome.storage.sync.set({be_a_buzzkill: input.checked});
    });


});