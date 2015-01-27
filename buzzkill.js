var killed_stories = [];
var shouldKill;

function buzzkill(){

  console.log("GOT HERE");
  console.log(shouldKill);

  if (typeof shouldKill === undefined){
    console.log('should we be killing?');
    var self = this;
    chrome.runtime.sendMessage({method: "get_status"}, function(response) {
      self['shouldKill'] = response;
      buzzkill(); // try again
    });
    return;
  }

  else if (shouldKill === true){

    // don't allow user to get to their page
    if (tab.url.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1){
      chrome.tabs.update(tab.id, {url: "http://www.facebook.com/?no-buzzfeed-for-you!"});
    }

    // be a buzz kill in news feed & groups
    stories = document.getElementsByClassName("_5uch");
    for(var i=0; i < stories.length; i++){
      var story = stories[i];
      killLinks(story, "feed");

    }

    // be a buzz kill on people's walls
    wall_posts = document.getElementsByClassName("fbTimelineUnit");
    for(var i=0; i < wall_posts.length; i++){
      var post = wall_posts[i];
      killLinks(post, "wall");
    }
  }
  
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
    else if (href.indexOf("thejustice.org") !== -1){
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
  item.style.display = "None";

  // add this story to the list of killed stories
  if (killed_stories.indexOf(item) == -1){
    console.log("killed a " + linkType + " on your " + pageType);
    killed_stories.push(item);
  }

}

document.addEventListener("scroll", buzzkill);
buzzkill();