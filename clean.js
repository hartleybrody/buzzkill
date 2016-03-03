var removedStories = [];
var storyContainerClasses = ["_5jmm", "_5pcr"];

// customize things you want to be removed from your feed
var bannedDomains = [];
var bannedTerms = ["trump", "sanders", "clinton", "rubio", "cruz"];

var DEBUG = false;
var DEBUG_DOMAIN = "athletics.bowdoin.edu"; // for testing
var DEBUG_TERM = "trump"; // for testing

function cleanNewsFeed(){

    chrome.storage.sync.get("clean_news_feed", function(data){
        if (data["clean_news_feed"]){
            // find all potential posts
            _.each(storyContainerClasses, function(storyContainerClass){
                posts = document.getElementsByClassName(storyContainerClass);
                _.each(posts, function(post){
                    removeLinks(post);
                    removeTerms(post);
                });
            });
        }
    });
}

function removeLinks(item){
    var links = item.getElementsByTagName("a");
    _.each(links, function(link){
        var href = link.href.toLowerCase();
        _.each(bannedDomains, function(domain){
            if (href.indexOf(domain) !== -1 || (DEBUG && href.indexOf(DEBUG_DOMAIN) !== -1)){
                removeItem(item, "link", href);
            }
        });
    });
}

function removeTerms(item){
    var paragraphs = item.getElementsByTagName("p");
    _.each(paragraphs, function(paragraph){
        var text = paragraph.textContent.toLowerCase();
        _.each(bannedTerms, function(term){
            if (text.indexOf(term) !== -1 || (DEBUG && text.indexOf(DEBUG_TERM) !== -1)){
                removeItem(item, "term in paragraph", term);
            }
        });
    });

    var links = item.getElementsByTagName("a");
    _.each(links, function(link){
        var text = link.textContent.toLowerCase();
        _.each(bannedTerms, function(term){
            if (text.indexOf(term) !== -1 || (DEBUG && text.indexOf(DEBUG_TERM) !== -1)){
                removeItem(item, "term in link", term);
            }
        });
    });
}

function removeItem(item, offenseType, offenseMaterial){

    // set the story to be invisible
    if (DEBUG){
        item.style.opacity = "0.5";
    } else {
        item.style.opacity = "0.0";
        item.style.display = "None";
    }

    // add this story to the list of killed stories
    if (removedStories.indexOf(item) == -1){
        if (DEBUG){
            console.log("killed an item because of bad " + offenseType + ": " + offenseMaterial);
        }
        removedStories.push(item);
    }

}

cleanNewsFeed(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);
document.addEventListener("scroll", scrollBuzzkill);
