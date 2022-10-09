//test data for now:
let merchantName = "Your Airbnb checkout via CheckoutDAO - (16% price savings)"
let email = "kathleen.morgan@gmail.com";

//Note swift json decoding breaks if any values here are empty e.g. description: ''
let products = 
[
 {
        name: "3 Bedroom Basement Unit in Beautiful Beechwood/UW'",
        price: '1316.24',
        description: 'Oct 13-18th. host: Kathlen. 3 Guests. 3 bedrooms 4 beds 1 bath.' // note: the qrstring didn't include buckwheat description in cartproducts. added a line in storeprovider w comment.
},
];


// https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
let merchantSite = (window.location !== window.parent.location) ? document.referrer : document.location.href


let encodedURI = encodeURIComponent(JSON.stringify({
    merchantName: merchantName || 'Merchant', //can make optional field.
    merchantSite: merchantSite,
    merchantEmail: email,
    products: products,
}));
let decodedURI = decodeURIComponent(encodedURI);


export const merchantInfoAsURI = encodedURI;
console.log('merchantInfoAsUri')
console.log(merchantInfoAsURI)

//Can use either, whichev we choose:
export const merchantInfoAsObj = JSON.parse(decodedURI);
export const merchantInfoAsArray = Object.entries(merchantInfoAsObj).map(([key, value]) => ({key, value}));
