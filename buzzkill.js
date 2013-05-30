var killed_stories = [];

function buzzkill(){

  // get all the news feed stories
  stories = document.getElementsByClassName("uiUnifiedStory");

  for(var i=0; i < stories.length; i++){
    var story = stories[i];

    // find any URL captions (should only be one)
    var captions = story.getElementsByClassName("caption");
    for(var j=0; j < captions.length; j++){

      if (captions[j].textContent == "www.buzzfeed.com"){
        //story.style.display = "none";
        story.style.opacity = "0.1";
        if (killed_stories.indexOf(story) == -1){
          console.log("got a url story");
          killed_stories.push(story);
        }
      }
    }

    // and DEFINITELY block anything from the page itself
    var actors = story.getElementsByClassName("actorPhoto");
    for(var k=0; k < actors.length; k++){
      var actor = actors[k];

      if (actor.href.toLowerCase().indexOf("facebook.com/buzzfeed") !== -1 ){
        //story.style.display = "none";
        story.style.opacity = "0.1";
        if (killed_stories.indexOf(story) == -1){
          console.log("got a page story");
          killed_stories.push(story);
        }
      }
    }
  }

}

// be gone, productivity destroyers!
console.log("Killing all the buzz in your feed...");
document.addEventListener("scroll", buzzkill);