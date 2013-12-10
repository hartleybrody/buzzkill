var killed_stories = [];

function buzzkill(){

  // be a buzz kill in news feed & groups
  stories = document.getElementsByClassName("_5uch");

  for(var i=0; i < stories.length; i++){
    var story = stories[i];

    // find any divs that contain the word "buzzfeed.com" (ie story captions)
    var captions = story.getElementsByTagName("div");
    for(var j=0; j < captions.length; j++){

      if (captions[j].textContent.toLowerCase().indexOf("buzzfeed.com") !== -1 ){
        killItem(story, "news feed url");
      }
    }

    // look for any links to the buzzfeed fb page
    var links = story.getElementsByTagName("a");
    for(var k=0; k < links.length; k++){
      var link = links[k];

      if (actor.href.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1 ){
        killItem(story, "buzzfeed page");
      }
    }
  }

  // be a buzz kill on people's walls
  wall_posts = document.getElementsByClassName("fbTimelineUnit");

  for(var i=0; i < wall_posts.length; i++){
    var post = wall_posts[i];
    var links = post.getElementsByTagName("a");

    // any wall posts that contain a buzzfeed url
    for(var j=0; j < links.length; j++){
      var href = links[j].href.toLowerCase();
      if (href.indexOf("buzzfeed.com") !== -1 ||
          href.indexOf("bzfd.it") !== -1 ||
          href.indexOf("facebook.com/buzzfeed") !== -1){
        killItem(post, "wall post");
      }
    }
  }
}

function killItem(item, context){
  item.style.opacity = "0.1";
  item.style.display = "None";
  if (killed_stories.indexOf(item) == -1){
    console.log("got a " + context + " story");
    killed_stories.push(item);
  }

}

// be gone, productivity destroyers!
console.log("Killing all the buzz in your feed...");
buzzkill();
document.addEventListener("scroll", buzzkill);