var killed_stories = [];
var storyContainerClasses = ["_5jmm"];
var bannedDomains = ["facebook.com/buzzfeed", "bzfd.it", "buzzfeed.com"];

var DEBUG = false;
var DEBUG_DOMAIN = "athletics.bowdoin.edu";

function buzzkill(){

  chrome.storage.sync.get("be_a_buzzkill", function(data){
    if (data["be_a_buzzkill"]){
      // find all potential posts
      _.each(storyContainerClasses, function(storyContainerClass){
        posts = document.getElementsByClassName(storyContainerClass);
        _.each(posts, function(post){
          killLinks(post);
        });
      });
    }
  });
}

function killLinks(item){
  var links = item.getElementsByTagName("a");
  _.each(links, function(link){
    var href = link.href.toLowerCase();
    _.each(bannedDomains, function(domain){
      if (href.indexOf(domain) !== -1 || (DEBUG && href.indexOf(DEBUG_DOMAIN) !== -1)){
        killItem(item);
      }
    });

  });
}

function killItem(item){

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
      console.log("killed a link");
    }
    killed_stories.push(item);
  }

}

buzzkill(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(buzzkill, 50);
document.addEventListener("scroll", scrollBuzzkill);
