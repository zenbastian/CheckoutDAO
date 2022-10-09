// chrome.runtime.onMessage.addListener(
//    function(request, sender, sendResponse) {
//       console.log('received msg');
//      if (request.action == "test") {
//        console.log('received getStuff test msg');
//        sendResponse({result: "success"});
//      }

//      console.log('runtime listeners running')
     
//      if (request.action == "runCode") {
//       console.log('run code received');
//       let result = eval(request.code)
//       sendResponse({type: "runCodeComplete", result: result});
//     }
//  });

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



console.log('content.js beginning - doc title:')
console.log(document.title)

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  //if (event.origin !== "http://example.org:8080")


}

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  //console.log(response.farewell);
});
//add modal el 
var mDiv = document.createElement('div');
mDiv.setAttribute("id", "mDiv");
document.body.appendChild(mDiv);
console.log('modal div injected')

chrome.runtime.onMessage.addListener(msg => {
    console.log(msg)
    if (msg.action == 'goToRbc') { //received from popup click.
      console.log('passing msg from popup to background') 
        chrome.runtime.sendMessage({
          from: 'content',
          action: 'goToRbc'
      }, function (response) {
          console.dir('logging response from goToRbc sendmsg');
          console.dir(response);
      });
        goToRbc()
     }
    if (msg.action == 'openModal') {
      console.log('open modal caught in content.js')

      //need more css unhide modal to work
      document.getElementById("mDiv").innerHTML = `
      <div id="myModal" class="modal" style="display:"block">
      <!-- Modal content -->
      <div class="modal-content">
      <iframe id="mDiv" src="build/index.html"></iframe>
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    
      </div>
    `
    }
});



//CAN USE THIS TO MAKE AVAILABLE ON SITES WITH INTR el or url.
// if (document.URL.includes('intr')) { 
//   console.log('content detected google')
  chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
  });
// }

//NEW OCT 8th

chrome.runtime.onMessage.addListener(async msg => {
  console.log(msg)
  console.log('msg.action', msg.action)
  if (msg.action == 'popupClicked') { //received from popup click.
  //  alert('got popup clicked msg')

  window.location.replace("http://localhost:3000/");
    console.log('loading script')
    // d = document
    // script = d.createElement('script');
    // script.type = 'text/javascript';
    // script.async = true;
    // script.onload = function(){
    //     // remote script has loaded
    // };
    // script.src = 'https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js';
    // d.getElementsByTagName('head')[0].appendChild(script);

    // !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).detectEthereumProvider=e()}}((function(){return function({mustBeMetaMask:e=!1,silent:t=!1,timeout:o=3e3}={}){!function(){if("boolean"!=typeof e)throw new Error("@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.");if("boolean"!=typeof t)throw new Error("@metamask/detect-provider: Expected option 'silent' to be a boolean.");if("number"!=typeof o)throw new Error("@metamask/detect-provider: Expected option 'timeout' to be a number.")}();let n=!1;return new Promise(i=>{function r(){if(n)return;n=!0,window.removeEventListener("ethereum#initialized",r);const{ethereum:o}=window;if(!o||e&&!o.isMetaMask){const n=e&&o?"Non-MetaMask window.ethereum detected.":"Unable to detect window.ethereum.";!t&&console.error("@metamask/detect-provider:",n),i(null)}else i(o)}window.ethereum?r():(window.addEventListener("ethereum#initialized",r,{once:!0}),setTimeout(()=>{r()},o))})}}));
    ;(function() {
      async function script() {
      
        !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).detectEthereumProvider=e()}}((function(){return function({mustBeMetaMask:e=!1,silent:t=!1,timeout:o=3e3}={}){!function(){if("boolean"!=typeof e)throw new Error("@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.");if("boolean"!=typeof t)throw new Error("@metamask/detect-provider: Expected option 'silent' to be a boolean.");if("number"!=typeof o)throw new Error("@metamask/detect-provider: Expected option 'timeout' to be a number.")}();let n=!1;return new Promise(i=>{function r(){if(n)return;n=!0,window.removeEventListener("ethereum#initialized",r);const{ethereum:o}=window;if(!o||e&&!o.isMetaMask){const n=e&&o?"Non-MetaMask window.ethereum detected.":"Unable to detect window.ethereum.";!t&&console.error("@metamask/detect-provider:",n),i(null)}else i(o)}window.ethereum?r():(window.addEventListener("ethereum#initialized",r,{once:!0}),setTimeout(()=>{r()},o))})}}));
        // window.detectEthereumProvider =     !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).detectEthereumProvider=e()}}((function(){return function({mustBeMetaMask:e=!1,silent:t=!1,timeout:o=3e3}={}){!function(){if("boolean"!=typeof e)throw new Error("@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.");if("boolean"!=typeof t)throw new Error("@metamask/detect-provider: Expected option 'silent' to be a boolean.");if("number"!=typeof o)throw new Error("@metamask/detect-provider: Expected option 'timeout' to be a number.")}();let n=!1;return new Promise(i=>{function r(){if(n)return;n=!0,window.removeEventListener("ethereum#initialized",r);const{ethereum:o}=window;if(!o||e&&!o.isMetaMask){const n=e&&o?"Non-MetaMask window.ethereum detected.":"Unable to detect window.ethereum.";!t&&console.error("@metamask/detect-provider:",n),i(null)}else i(o)}window.ethereum?r():(window.addEventListener("ethereum#initialized",r,{once:!0}),setTimeout(()=>{r()},o))})}}));
        
        console.log('trying to get provider from injected script')

        const provider = await window.detectEthereumProvider();
        let ethID = await provider.request({
          method: 'eth_chainId'
        })
        console.log("ethID:")
        console.log(ethID)
        console.log('provider - from window.detectEthereumProvider():')
        console.log(provider ?? null)
        console.log('ethereum')
        console.log(ethereum)
        let x = await ethereum
          .request({ method: 'eth_accounts' })
          .then((result)=> console.log('accts changed', result))
          .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error('error', err);
      });
      console.log('x ', x)
        console.log('running injected script')
      }


    
      function inject(fn) {
        const script = document.createElement('script')
        script.text = `(${fn.toString()})();`
        document.documentElement.appendChild(script)
      }
    
      inject(script)
      // inject(detectEthereumProvider)
    })()
    console.log('window.ethereum:')
    console.log(window.ethereum)


  //  console.log('trying to get provider outside injected script')
  //  const provider = await detectEthereumProvider();
  
  //  console.log(provider)

  //  if (provider) {
  //      // From now on, this should always be true:
  //      // provider === window.ethereum
  //      console.log('found metamask provider')
  //      alert('found metamask providr')
      
  //      const chainId = await provider.request({
  //       method: 'eth_chainId'
  //     })
  //    } else {
  //      alert('Please install MetaMask!');
  //    }
         // window.location.replace("https://www1.royalbank.com/cgi-bin/rbaccess/rbcgi3m01");
     
  }
});
//let detectEthereumProvider = require('@metamask/detect-provider');
 async function popupClicked() {

  //add metamask
  console.log('running popupClicked--------------oct8th')
  const provider = await detectEthereumProvider();

if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    alert('found metamask providr')
    startApp(provider); // initialize your app
  } else {
    alert('Please install MetaMask!');
  }
      // window.location.replace("https://www1.royalbank.com/cgi-bin/rbaccess/rbcgi3m01");
  }

 async function popup2Clicked() {
  window.location.replace("https://wwww.airbnb.ca");

 }


 //webdrive functionality.

 if (document.title.includes("RBC Royal Bank - Sign In")) {
  document.querySelector("#K1").value = 'blakenielsen11*****';
  document.querySelector("#Q1").value = '*********';
  document.querySelector(".yellowBtnLarge").click();
  console.log('complete')
 }

 if (document.title.includes("Accounts Summary - RBC")) {
   document.querySelector("a[ga-event-label='Send an Interac eTransfer']").click();
 }

 //3
 try {
  var p3El = document.getElementById("toacct")
 }catch(e) {  }

 if (p3El != null) {
 let p3Hit = false
  if (document.title.includes("Pay Bills and Transfer Funds - RBC")) {
    if (p3Hit == false) {
      console.log('on pay page')
      document.querySelector("#amount").value = '100';
      var optionEls = document.getElementById("toacct").getElementsByTagName("option");
      var intrOption
      console.log('intrOption:')
      console.log(intrOption)
      for (var i = 0; i < optionEls.length; i++) {
        if (optionEls[i].text.includes('INTERAC e-Transfer')) {
          intrOption = optionEls[i];
          intrOption.selected = true
          debugger;
          document.querySelector("select[name=TO_ACCOUNT_TYPE]").dispatchEvent(new Event('change', { bubbles: true }));
          debugger;
        // document.querySelector("select[name=TO_ACCOUNT_TYPE]").value = intrOption
          break;
        }
      }
      let date = new Date()
      let mNum = date.getMonth() + 1 //starts from 0
      document.querySelector("#MONTH").querySelector(`#MONTH > option:nth-child(${mNum})`).selected = true //Would have to change this to date.getMonth -> select el matching 1st two charts of month
      document.querySelector("button[ga-event-label='Submit Button']").click()
      // firstInteracPageHit = true
    }
  }
}


//4
 try {
  p4El = document.querySelector("[data-rb-context=recipient_phone]")
 }catch(e) {
 }
 if (p4El != null) {
  console.log('on interac page')
  document.querySelector("#EMT_NAME_ID").value = '65.87';
  document.querySelector("#EMT_EMAILADDRESS_ID").value = 'pay@amazon.com';
  document.querySelector("#EMT_EMAILADDRESS_ID").dispatchEvent(new Event('mousedown', { bubbles: true }));
  document.querySelector("#EMT_EMAILADDRESS_ID").dispatchEvent(new Event('blur', { bubbles: true }));
  setTimeout(() => { 
  document.querySelector("button[type=submit]").dispatchEvent(new Event('click', { bubbles: true }));
  console.log(document.title)
  Form_3MBPAEMTENT_BPAInfo.submit(); //works. keep this in this order!
  }, 0)
 }

 try {
   p5El = document.querySelector("h1[id=pagetitle]")
 }catch(e) {}
 if (p5El != null && p5El.innerText.includes("Confirm")) {
  document.querySelector("#EMT_QUESTION_ID").value = 'Which app was used to send this?';
  document.querySelector("#EMT_RESPONSE_ID").value = 'intr';
  document.querySelector("#EMT_CONFIRM_RESPONSE_ID").value = 'intr';
  msgEl = document.querySelector("#eMemo");
  msgEl.innerText = 'New intr order - sessionId: \n\nCART DATA';
 }

 console.log('content script ending')
 
