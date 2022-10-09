
(function() {
	console.log('popup.js beginning')
})();

if (document.title.includes('Request to book · Airbnb')) {
	alert('found reservation page - ' + document.location.href)
  
	function getElementByXpath(path) {
	  console.log('running get el by XPath')
	  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
  
	let datesXP = '/html/body/div[5]/div/div/div[1]/div/div/div[1]/div/main/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[4]/div/div/div/div/div[1]/div[1]/div[2]'
	let priceXP = '/html/body/div[5]/div/div/div[1]/div/div/div[1]/div/main/div/div/div/div[1]/div/div[2]/div/div[2]/div/div/div[4]/div/div/div/div/div/div[5]/div[2]/span'
	let guestNumXP = '/html/body/div[5]/div/div/div[1]/div/div/div[1]/div/main/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[5]/div/div/div/div/div[1]/div[1]/div[2]'
  
	let dates = getElementByXpath(datesXP).innerHTML ?? null
	let price = getElementByXpath(priceXP).innerHTML ?? null
	let guestNum = getElementByXpath(guestNumXP).innerHTML ?? null
   
	console.log('guestNum')
	console.log(guestNum)
  
	alert(dates + price + guestNum)
  
	window.dates = dates
	window.price = price
	window.guestNum = guestNum
  
  }

//add rbc pay click event.
document.addEventListener('DOMContentLoaded', function() {
	console.log('popup.js setting up new button click event')
	var link = document.getElementById("clickable");
	// onClick's logic below:
	link.addEventListener('click',async  function() {
		 console.log('event listener added by popup.js clicked. -----oct 8th')
		 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, {
				file: "content.js"
			}, function(){
				console.log('running sendMsg oct 8th')
				chrome.tabs.sendMessage(tabs[0].id,{
					action: 'popupClicked'
				});
			});
		});

		//  const provider = await detectEthereumProvider();

		//  if (provider) {
		//    // From now on, this should always be true:
		//    // provider === window.ethereum
		//    alert('found metamask providr')
		//    startApp(provider); // initialize your app
		//  } else {
		//    alert('Please install MetaMask!');
		//  }
		 goToRbc(); //-// can renable to go to checkoutDAO.eth
	});
 });
 //Add modal click event.
 document.addEventListener('DOMContentLoaded', function() {
	console.log('popup.js setting up new button click event')
	var link = document.getElementById("modalBtn");
	// onClick's logic below:
	link.addEventListener('click', function() {
			console.log('modal button clicked. sending msg')
			openModal()
			//send msg to contentScript
		})
	 });

// setTimeout(() => {
// 	var btn = document.querySelector('#modalBtn');

//  console.log('modal button clicked. sending msg')
// 	btn.onclick = function() {
// 		chrome.runtime.sendMessage({action: 'openModal'})
// 		//send msg to contentScript
// 	}

// }, 500)
 
function openModal() {
	console.log('running openModal - oct 8th')
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		tabs.forEach(tab => {
		 console.log("current tab:" + tab)
		 chrome.tabs.sendMessage(tab.id, {from: 'popup', action: 'openModal'})
		});
	});
}

function goToRbc() {
	console.log('gotorbc called after event listener clicked. sending msg to background script')
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		 tabs.forEach(tab => {
		  console.log("current tab:" + tab)
		  chrome.tabs.sendMessage(tab.id, {from: 'popup', action: 'goToRbc'})
	 });
	});
 }


//  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// 	console.log('logging message + sender')
// 	console.log(message.action)

// 	sendResponse({
// 		 data: "I am fine, thank you. How is life in the background?"
// 	}); 
// });

 console.log('popup.js ending')