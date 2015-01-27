var killed_stories = [];
var storyContainerClasses = ["_5jmm"];

var DEBUG = true;
var DEBUG_DOMAIN = "athletics.bowdoin.edu";

function buzzkill(){

  chrome.storage.sync.get("be_a_buzzkill", function(data){
    if (data["be_a_buzzkill"]){

      // find all potential posts
      for(var i=0; i < storyContainerClasses.length; i++){
        var storyContainerClass = storyContainerClasses[i];
        posts = document.getElementsByClassName(storyContainerClass);

        for(var j=0; j < posts.length; j++){
          var post = posts[j];
          killLinks(post);
        }

      }
    }
  });
}

  

function killLinks(item){
  var links = item.getElementsByTagName("a");
  for(var k=0; k < links.length; k++){
    var link = links[k];
    var href = link.href.toLowerCase();
    
    // decide which type of link it is
    var linkType = null;
    if (href.indexOf("facebook.com/buzzfeed") !== -1 ){
      linkType = "page link";
    }
    else if (href.indexOf("bzfd.it") !== -1 ){
      linkType = "shortened link";
    }
    else if (href.indexOf("buzzfeed.com") !== -1 ){
      linkType = "regular link";
    }
    else if (DEBUG && href.indexOf(DEBUG_DOMAIN) !== -1){
      linkType = "test link";
    }

    // kill the story that contains this link
    if(linkType !== null){
      killItem(item, linkType);
    }
  }
}

function killItem(item, linkType){

  // set the story to be invisible
  if (DEBUG){
    item.style.opacity = "0.5";
  } else {
    item.style.opacity = "0.0";
    item.style.display = "None";
  }

  // add this story to the list of killed stories
  if (killed_stories.indexOf(item) == -1){
    if (DEBUG){
      console.log("killed a " + linkType);
    }
    killed_stories.push(item);
  }

}

buzzkill(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(buzzkill, 50);
document.addEventListener("scroll", scrollBuzzkill);
