//newcommit
module.exports = {
    processSearchData: function(data) {
        if (!data) return data;
        let items = [];
        let index = 1; // Initialize counter for index

        if (!data.findItemsAdvancedResponse || data.findItemsAdvancedResponse.length === 0) {
            return null;
        }

        for (let instance of data.findItemsAdvancedResponse) {
            if (instance.searchResult && instance.searchResult.length > 0) {
                for (let j of instance.searchResult) {
                    if (j.item) {
                        for (let i of j.item) {
                            let itemDict = {};

                            itemDict.index = index++;  // Add index to each item and increment
                            itemDict.itemId = i.itemId && i.itemId.length > 0 ? i.itemId[0] : null;
                            itemDict.title = i.title && i.title.length > 0 ? i.title[0] : null;
                            itemDict.image = i.galleryURL && i.galleryURL.length > 0 ? i.galleryURL[0] : null;  // Image
                            itemDict.zipcode = i.postalCode && i.postalCode.length > 0 ? i.postalCode[0] : null; // Zipcode
                            let itemPrice = i.sellingStatus && i.sellingStatus.length > 0 && i.sellingStatus[0].convertedCurrentPrice && i.sellingStatus[0].convertedCurrentPrice.length > 0 ? i.sellingStatus[0].convertedCurrentPrice[0]["__value__"] : null;
                            // let shippingPrice = i.shippingInfo && i.shippingInfo.length > 0 && i.shippingInfo[0].shippingServiceCost && i.shippingInfo[0].shippingServiceCost.length > 0 ? i.shippingInfo[0].shippingServiceCost[0]["__value__"] : null;
                            // if (i.shippingInfo && i.shippingInfo.length > 0 && i.shippingInfo[0].shippingType) {
                            //     if (i.shippingInfo[0].shippingType.includes("Free")) {
                            //         itemDict.shippingType = "Free Shipping";
                            //     } else if (i.shippingInfo[0].shippingType.includes("Pickup")) {
                            //         itemDict.shippingType = "Local Pickup";
                            //     } else {
                            //         // handle other types or set to a default value if needed
                            //         itemDict.shippingType = "Unknown";
                            //     }
                            // }
                            if (i.shippingInfo && i.shippingInfo.length > 0) {
                                let shippingInfo = i.shippingInfo[0];
    
                                itemDict.shippingCost = shippingInfo.shippingServiceCost &&
                                                        shippingInfo.shippingServiceCost.length > 0 ?
                                                        shippingInfo.shippingServiceCost[0]["__value__"] : 'Not Available';
    
                                itemDict.shippingLocation = shippingInfo.shipToLocations &&
                                                            shippingInfo.shipToLocations.length > 0 ?
                                                            shippingInfo.shipToLocations : 'Not Available';
    
                                itemDict.handlingTime = shippingInfo.handlingTime &&
                                                        shippingInfo.handlingTime.length > 0 ?
                                                        `${shippingInfo.handlingTime[0]} day(s)` : 'Not Available';
    
                                itemDict.expeditedShipping = shippingInfo.expeditedShipping &&
                                                             shippingInfo.expeditedShipping.length > 0 ?
                                                             shippingInfo.expeditedShipping[0] : 'Not Available';
    
                                itemDict.oneDayShipping = shippingInfo.oneDayShippingAvailable &&
                                                          shippingInfo.oneDayShippingAvailable.length > 0 ?
                                                          shippingInfo.oneDayShippingAvailable[0] : 'Not Available';
    
                                itemDict.returnsAccepted = shippingInfo.returnsAccepted &&
                                                           shippingInfo.returnsAccepted.length > 0 ?
                                                           shippingInfo.returnsAccepted[0] : 'Not Available';
    
                                // Free shipping and Local pickup handling
                                if (shippingInfo.shippingType) {
                                    if (shippingInfo.shippingType.includes("Free")) {
                                        itemDict.shippingType = "Free Shipping";
                                    } else if (shippingInfo.shippingType.includes("Pickup")) {
                                        itemDict.shippingType = "Local Pickup";}
                                    // } else {
                                    //     // handle other types or set to a default value if needed
                                    //     itemDict.shippingType = "Unknown";
                                    // }
                                }
                            }
                            itemDict.price = `$${itemPrice}`;
                            // if (shippingPrice !== null && parseFloat(shippingPrice) >= 0.01) {
                            //     itemDict.price += ` (+ $${shippingPrice} for shipping)`;
                            // }
                            // itemDict.wishlist = {
                            //     // added: false, // Placeholder; this should be determined from the user's actual wishlist
                            //     // icon: "🖤"    // Using a heart emoji as a placeholder for the wishlist icon; replace with the actual icon in your frontend

                            //     icon: "cart_icon"

                            
                            // };
                            items.push(itemDict);
                        }
                    }
                }
            }
        }

        return {
            items: items
        };
    },


    processItemDetailData: function(data) {
        // return data;
        if (!data || !data.Item) return null;
    
        let item = {};

        if (data.Item.ItemID) {
            item.id = data.Item.ItemID;
        }

        if (data.Item.Title) {
            item.title = data.Item.Title;
        }

        if (data.Item.PictureURL && Array.isArray(data.Item.PictureURL)) {
            item.photo = data.Item.PictureURL;
        }
        if (data.Item.CurrentPrice && data.Item.CurrentPrice.Value) {
            item.price = data.Item.CurrentPrice.Value;
        }
        if (data.Item.Location) {
            item.location = data.Item.Location;
        }
     
        if (data.Item.ReturnPolicy && data.Item.ReturnPolicy.ReturnsAccepted) {
            // console.log(data.Item)
            item.returnPolicy = {

              returnsAccepted: true,
              returnsWithin: data.Item.ReturnPolicy.ReturnsWithin
            };
          } else {
            item.returnPolicy = { returnsAccepted: false };
          }
    
        let itemSpecifics = [];
        if (data.Item.ItemSpecifics && data.Item.ItemSpecifics.NameValueList) {
            for (let i of data.Item.ItemSpecifics.NameValueList) {
                if (i.Name && i.Value && i.Value.length > 0) {
                    itemSpecifics.push({
                        name: i.Name,
                        value: i.Value[0]
                    });
                }
            }
        }
    
        // Only add itemSpecifics to the item if there's any specifics to add
        if (itemSpecifics.length > 0) {
            item.itemSpecifics = itemSpecifics;
        }

        //add showfront storename and store url filter also
        if (data.Item.Storefront && data.Item.Storefront.StoreName) {
            item.storeName = data.Item.Storefront.StoreName;
        }
        if (data.Item.Storefront && data.Item.Storefront.StoreURL) {
            item.storeURL = data.Item.Storefront.StoreURL;
        }
        //add for feedbackscore and feedbackratingstar
        if (data.Item.Seller && data.Item.Seller.FeedbackScore) {
            item.feedbackScore = data.Item.Seller.FeedbackScore;
        }
        
        //add for PositiveFeedbackPercent
        if (data.Item.Seller && data.Item.Seller.FeedbackRatingStar) {
            item.feedbackRatingStar = data.Item.Seller.FeedbackRatingStar;
        }
        if (data.Item.Seller && data.Item.Seller.PositiveFeedbackPercent) {
            item.PositiveFeedbackPercent = data.Item.Seller.PositiveFeedbackPercent;
        }
        //add for top rated
        if (data.Item.Seller && data.Item.Seller.TopRatedSeller) {
            item.TopRatedSeller = data.Item.Seller.TopRatedSeller;
        }




    
        return item;
    },

  
     processSimilarData: function(data) {
        // get titl price and time left and image
        if (!data || !data.getSimilarItemsResponse || !data.getSimilarItemsResponse.itemRecommendations || !data.getSimilarItemsResponse.itemRecommendations.item) return null;
        let items = [];
        // let index = 1; // Initialize counter for index
        for (let i of data.getSimilarItemsResponse.itemRecommendations.item) {
            let itemDict = {};
            // itemDict.index = index++;  // Add index to each item and increment
            itemDict.itemId = i.itemId && i.itemId.length > 0 ? i.itemId : null;
            itemDict.title = i.title && i.title.length > 0 ? i.title : null;
            itemDict.image = i.imageURL && i.imageURL.length > 0 ? i.imageURL : null;  // Image
            itemDict.price = i.buyItNowPrice && i.buyItNowPrice.__value__ ? i.buyItNowPrice.__value__ : null;
            itemDict.shippingCost = i.shippingCost && i.shippingCost.__value__ ? i.shippingCost.__value__ : null;
            itemDict.timeLeft = i.timeLeft && i.timeLeft.length > 0 ? i.timeLeft[1] : null;
            items.push(itemDict);
        }
        return items;


     },
     processPostal: function(data){
        //get only postal code
        if (!data || !data.postalCodes || !data.postalCodes.length > 0) return null;
        let postal = [];
        for (let i of data.postalCodes) {
            let itemDict = {};
            itemDict.postalCode = i.postalCode && i.postalCode.length > 0 ? i.postalCode : null;
            postal.push(itemDict);
        }
        return postal;
        
          
     }
     





    };
    
   
      
