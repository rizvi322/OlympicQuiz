/**
 * Created by Raihan on 9/25/2016.
 */

var PRODUCT_ID_ADFREE = "com.dteam.halloween.adfree";
var localStorage = window.localStorage | {};

IAP = {
  list: [PRODUCT_ID_ADFREE],
  adFree: false
};

IAP.load = function () {

  // Check availability of the storekit plugin
  if (!window.storekit) {
    alert("In-App Purchases not available");
    return;
  }

  // Initialize
  storekit.init({
    debug:    true, // Enable IAP messages on the console
    ready:    IAP.onReady,
    purchase: IAP.onPurchase,
    restore:  IAP.onRestore,
    error:    IAP.onError
  });

  if(localStorage['adfree']){
    IAP.adFree = localStorage['adfree'];
  }
};

IAP.onReady = function () {
  storekit.load(IAP.list, function (products, invalidIds) {
    IAP.products = products;
    IAP.loaded = true;
    for (var i = 0; i < invalidIds.length; ++i) {
      console.log("Error: could not load " + invalidIds[i]);
    }
  });
};

IAP.onPurchase = function (transactionId, productId, receipt) {
  if(productId === PRODUCT_ID_ADFREE){
    alert("Ads Removed!");
    IAP.adFree = true;
    //Code to remove ads for the user
    localStorage['adfree'] = true;
  }
};

IAP.onRestore = function (transactionId, productId, transactionReceipt) {
  if(productId == PRODUCT_ID_ADFREE){
    //Code to remove ads for the user
    IAP.adFree = true;
    localStorage['adfree'] = true;
  }
};

IAP.onError = function (errorCode, errorMessage) {
  console.log(errorCode);
  console.log(errorMessage);
};

IAP.buy = function(productId){
  storekit.purchase(productId);
};

IAP.restore = function(){
  storekit.restore();
};