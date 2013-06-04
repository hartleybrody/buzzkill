var killed_stories = [];

function buzzkill(){

  // be a buzz kill in the news feed & groups
  stories = document.getElementsByClassName("uiUnifiedStory");

  for(var i=0; i < stories.length; i++){
    var story = stories[i];

    // find any URL captions in the story (should only be one)
    var captions = story.getElementsByClassName("caption");
    for(var j=0; j < captions.length; j++){

      if (captions[j].textContent.toLowerCase().indexOf("buzzfeed.com") !== -1 ){
        killItem(story, "url");
      }
    }

    // and DEFINITELY block anything from the page itself
    var actors = story.getElementsByClassName("actorPhoto");
    for(var k=0; k < actors.length; k++){
      var actor = actors[k];

      if (actor.href.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1 ){
        killItem(story, "page");
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