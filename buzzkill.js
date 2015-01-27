var killed_stories = [];
var shouldKill;

function buzzkill(){

  chrome.storage.sync.get("be_a_buzzkill", function(data){
    if (data["be_a_buzzkill"]){

      // be a buzz kill in news feed & groups
      stories = document.getElementsByClassName("_5uch");
      for(var i=0; i < stories.length; i++){
        var story = stories[i];
        killLinks(story, "feed");

      }

      // be a buzz kill on people's walls
      wall_posts = document.getElementsByClassName("_5jmm");
      for(var i=0; i < wall_posts.length; i++){
        var post = wall_posts[i];
        killLinks(post, "wall");
      }
    }
  });
}

  

function killLinks(item, pageType){
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
    else if (href.indexOf("athletics.bowdoin.edu") !== -1){
      linkType = "test link";
    }

    // kill the story that contains this link
    if(linkType !== null){
      killItem(item, linkType, pageType);
    }
  }
}

function killItem(item, linkType, pageType){

  // set the story to be invisible
  item.style.opacity = "0.5";
  // item.style.display = "None";

  // add this story to the list of killed stories
  if (killed_stories.indexOf(item) == -1){
    console.log("killed a " + linkType + " on your " + pageType);
    killed_stories.push(item);
  }

}

buzzkill(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(buzzkill, 50);
document.addEventListener("scroll", scrollBuzzkill);
