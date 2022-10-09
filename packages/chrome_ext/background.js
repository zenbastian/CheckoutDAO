


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   console.log(changeInfo.toString());
// });

// //chrome.runtime.query({active: true, currentWindow: true}, function(tabs) {
//    chrome.runtime.sendMessage( {action: "test"}, function(response) {
//        console.log('logging background.js res: ' + response.result);
//    });


   chrome.tabs.query({}, function(tabs) {
      for(var i in tabs) {
        // Filter by url if needed; that would require "tabs" permission
        // Note that injection will simply fail for tabs that you don't have permissions for
        chrome.tabs.executeScript(tabs[i].id, {file: "content.js"}, function() {
          // Now you can use normal messaging
        });
      }
    }); 
 //});

 //make intr icon show?
 chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  console.log('received msg in background. showing tab.')
  console.log('msg.action: ' + msg.action)
  console.log('msg.from: ' + msg.from)
  console.log('sender:' + sender)

  if ((msg.from == 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
  if ((msg.from == 'popup' || msg.from == 'content') && (msg.action == 'goToRbc')) { //received from content only?
    console.log('backgound received popup msg w/ action: goToRbc')
    let existingUrl = document.Url
    let txt = fetch(document.Url).then((response) => response.text()).then((text) => console.log(text))

    var newURL = "http://localhost:3000/?s=%7B%22merchantName%22%3A%22Your%20Airbnb%20checkout%20via%20CheckoutDAO%20-%20(16%25%20price%20savings)%22%2C%22merchantSite%22%3A%22http%3A%2F%2Flocalhost%3A3000%2F%22%2C%22merchantEmail%22%3A%22kathleen.morgan%40gmail.com%22%2C%22products%22%3A%5B%7B%22name%22%3A%223%20Bedroom%20Basement%20Unit%20in%20Beautiful%20Beechwood%2FUW'%22%2C%22price%22%3A%221316.24%22%2C%22description%22%3A%22Oct%2013-18th.%20host%3A%20Kathlen.%203%20Guests.%203%20bedrooms%204%20beds%201%20bath.%22%7D%5D%7D";
    chrome.tabs.create({ url: newURL, active: true });
  }
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//    alert(changeInfo.toString());
//  });