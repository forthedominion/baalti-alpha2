
/* ////
START METOER SERVER
////// */ 
if (Meteor.isServer) {
  // code to run on server at startup
 Meteor.startup(function () {
    if (activities.find().count() < 5) {
        activities.insert({ name: "Climb Mt Kilimanjaro", img: {server:'3213' , imgId: '3157954837', secret: '25669ce10f', farmId:'4' }, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Swim with dolphins", img: {server:'6142', imgId: '6001400916', secret: 'c68981ed15', farmId:'7' }, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Visit Paris", img: {server: '5241', imgId:'5238554034' , secret: '3e4fdabd94', farmId: '6' }, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Visit New York City", img: {server: '8618', imgId: '16654352517', secret: 'a6eb45f2ce', farmId: '9'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Learn to speak French", img: {server: '2581', imgId: '3777317525', secret: '4132a9c54d', farmId: '3' }, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Learn a foreign language", img: {server: '3552', imgId: '3311542781', secret: '71fb3f4618', farmId: '4'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Take piano lessons", img: {server: '2532', imgId: '4143278846', secret: '519c8c8e07', farmId: '3'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Drive a race car", img: {server: '1428', imgId: '820414472', secret: 'b61dcdb36d', farmId: '2'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Go on Safari in Africa", img: {server: '5053', imgId: '5541033710', secret: '43c44bd56c', farmId: '6'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Learn to make sushi", img: {server: '1357', imgId: '764123129', secret: '7e89ff30aa', farmId: '2'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Volunteer in my community", img: {server: '7358', imgId: '9385693887', secret: 'f442615b37', farmId: '8'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Get my degree", img: {server: '8085', imgId: '8536426163', secret: '2f501618fa', farmId: '9'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Start my own business", img: {server: '8599', imgId: '16687989602', secret: 'bba63fb899', farmId: '9'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Travel across Asia", img: {server: '2906', imgId: '14444505151', secret: '60c7629ee2', farmId: '3'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Solve a rubiks cube in under 2 minutes", img: {server: '8387', imgId: '8669121231', secret: 'f808427521', farmId: '9'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Walk on the Great Wall of China", img: {server: '4146', imgId: '5031433674', secret: '771fd2bc0c', farmId: '5'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Learn to ride a motorcycle", img: {server: '7378', imgId: '16458151981', secret: '6ef269e794', farmId: '8'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "write a novel", img: {server: '4042', imgId: '5124506505', secret: '3bc109af2c', farmId: '5'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Drink 50 year old scotch", img: {server: '4077', imgId: '4789757280', secret: '122f847054', farmId: '5'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Visit the pyramids", img: {server: '2565', imgId: '3787739847', secret: 'c41736d6c7', farmId: '3'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Backpack through Europe", img: {server: '1296', imgId: '869300078', secret: '415fa3a1b7', farmId: '2'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Go to the Super Bowl", img: {server: '3906', imgId: '14871697765', secret: '01b4bc4e0a', farmId: '4'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Run a marathon", img: {server: '8053', imgId: '8110812868', secret: '124d776efd', farmId: '9'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Own a farm", img: {server: '3768', imgId: '9783814043', secret: '8673b0912c', farmId: '4'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Take a cooking class", img: {server: '46', imgId: '150745097', secret: '3a48baca0c', farmId: '1'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Grow my own vegetables", img: {server: '3162', imgId: '2974569168', secret: 'f74dd3ba18', farmId: '4'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Celebrate New Year's Eve in Times Square", img: {server: '3749', imgId: '11745399044', secret: 'db0a00ed03', farmId: '4'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "See a soccer game at Wembley", img: {server: '185', imgId: '433261350', secret: 'e360416bd5', farmId: '1'}, count: 3, updatedAt: new Date()});
        activities.insert({ name: "Finish an Ironman", img: {server: '7451', imgId: '13898754265', secret: 'd6cedaec21', farmId: '8'}, count: 3, updatedAt: new Date()});


  }
});



//text Index 

feedContent._ensureIndex({
    "title": "text",
    "description": "text"

  },

  {
    weights: {
      title: 10, 
      description: 1
    }
    });

//end text index 


 Meteor.methods({
    // methods go here


'userCreate': function(){
	//method
},


'userLogin': function(){

	//method
},




'addActivity': function(activity, goalDate){
	//variables
	var keywords = activity.split(' ');
	var currentUser = Meteor.userId(); 


//Flickr API Integration testing section 

var response = HTTP.call( 'GET', 'https://api.flickr.com/services/rest/?', {
    params: {
      method: "flickr.photos.search",

      api_key: "40bce3b1782e6cb024a4839cd5ea19d5", 
      //auth_token: "72157665443740380-64ce15a5ca337e62",
      //api_sig: "ab2d37cbb09307511ea1ec6d377a6075",

      text: activity, 
      tag_mode: "any",
      sort: "relevance",
      per_page: 1, 
      safe_search: 2,
      content_type: 1,
      //is_commons: true,
      timeout: 2000,
      format: "json",
      nojsoncallback:1

    }
  } );

//below needs to be made dependent on 200 response and actual results. also need to handle errors
var imgId = response.data.photos.photo[0].id;
var imgSecret = response.data.photos.photo[0].secret;
var imgFarmId = response.data.photos.photo[0].farm;
var imgServer = response.data.photos.photo[0].server;

//console.log( response );
//console.log(imgId+" // "+imgSecret+" // "+imgFarmId+" // "+imgServer);


//end API section

	//routines

	//validate that entry isnt already on user's list 
		//userActivities.findOne({createdBy: currentUser, activity: activity})

	//add or increment acttivities collection
	activities.upsert({name: activity, img: {server:imgServer, imgId: imgId, secret: imgSecret, farmId: imgFarmId}}, {$inc: {count: 1}, $set: {updatedAt: new Date()}});

	//insert activity into userActivities collection w/ id of reference activities
	var activityOjbect = activities.findOne({name: activity});
    var activityId = activityOjbect._id;
	
	userActivities.insert({
          activityId: activityId,
          activity: activity, 
          goalDate: new Date(goalDate), 
          createdAt: new Date(),
          keywords: keywords, 
          createdBy: currentUser,
          completed: false
        });


    
},


'deleteActivity': function(deleteDocumentId, deleteActivityId){
	//method
	
    //remove from userActivities collection
    userActivities.remove({ _id: deleteDocumentId });

    // reduce activity count by 1
	activities.upsert({_id: deleteActivityId}, {$inc: {count: -1}, $set: {updatedAt: new Date()}});



    //}
}, 


'editActivity': function(activity, goalDate, oldActivityId, oldId){
	//variables
	var keywords = activity.split(' ');
	var currentUser = Meteor.userId(); 
	


	//routines
	// reduce old activity count by 1
	activities.upsert({_id: oldActivityId}, {$inc: {count: -1}, $set: {updatedAt: new Date()}});

	//remove old item from userActivity collection
	userActivities.remove({_id: oldId})

	//add or increment acttivities collection
	activities.upsert({name: activity}, {$inc: {count: 1}, $set: {updatedAt: new Date()}});

	//validate that entry isnt already on user's list 
		//userActivities.findOne({createdBy: currentUser, activity: activity})
	
	//insert new activity into userActivities collection w/ id of reference activities
	var activityOjbect = activities.findOne({name: activity});
    var activityId = activityOjbect._id;
	
	userActivities.insert({
          activityId: activityId,
          activity: activity, 
          goalDate: goalDate, 
          createdAt: new Date(goalDate),
          keywords: keywords, 
          createdBy: currentUser,
          completed: false
        });


    
},


'markComplete': function(documentId, isCompleted){

if(isCompleted){
     userActivities.update({_id:documentId}, {$set: {completed:false}});
      
   } else {
     userActivities.update({_id:documentId}, {$set: {completed:true}});
     
     
   }
	//method 
},

'addFeeds': function(feedURL, feedDescription){

	rssFeeds.insert({
		feedURL: feedURL,
		feedDescription: feedDescription,
		lastUpdate: new Date ()
	})

},


'feedDelete': function(deleteFeed){
	//method
	
    //remove from rssFeeds collection
    rssFeeds.remove({ _id: deleteFeed });

},

'refreshFeed': function(n, feedDescription){
  var contentBlurb = n.description.slice(0,150);
	
  feedContent.update(
      {title: n.title},
      	{
       		$setOnInsert: {createdAt: new Date()},

        	$set: {
            title: n.title, 
            url: n.url, 
            description: contentBlurb, 
            source: feedDescription, 
            updatedAt: new Date()
          }

      	},
      	{upsert: true}

    ) 

},

'contentDelete': function(deleteContent){
  //method
  
    //remove from feedContent collection
    feedContent.remove({ _id: deleteContent });

},

'inspirationFilter': function(){
	var currentUser = Meteor.userId();
    //console.log(currentUser);
    var existingActivities = userActivities.find({createdBy: currentUser}, {fields: {activityId:1, _id:0}}).fetch();
   	//var zx = activities.find({_id: {$nin: existingActivities}});
    //console.log(existingActivities);
    var zx =[]; 
    _.each(existingActivities, function(n){
    	
    	zx.push(n.activityId)
    });
    //console.log(zx);
    return zx;
},

'contentFilter': function(){
  var currentUser = this.userId;
    //console.log(currentUser)
    var nextFive = userActivities.find({createdBy:currentUser, completed: false}, {sort:{goalDate:1}, limit: 5}).fetch();

    var searchTerms =[];
    _.each(nextFive, function(n){

      searchTerms.push(n.activity)
    });

        //console.log(searchTerms);

    var filteredContent = [];
    _.each(searchTerms, function(m){
      var x = feedContent.find({$text: {$search: m}}).fetch()
        _.each(x, function(z){

          filteredContent.push(z._id)
        
        });

      

    });

    console.log(filteredContent);

    return filteredContent
    //feedContent.find({$text: {$search: "airbnb"}})
},
/*
'goalSpecific': function(goalID){
  //var tx = Session.get()
  return feedContent.find({$text: {$search: goalID}});

  var tx = feedContent.find({$text: {$search: goalID}});
  console.log("testing");
},
*/

'goalFilter': function(goalID){
  
    console.log(goalID)
    var currentGoal = activities.find({_id: goalID}).fetch();

    var searchTerms =[];
    _.each(currentGoal, function(n){

      searchTerms.push(n.name)
    });

        console.log("searching for: "+searchTerms);

    var goalContent = [];
    _.each(searchTerms, function(m){
      var x = feedContent.find({$text: {$search: m}}).fetch()
        _.each(x, function(z){

          goalContent.push(z._id)
        
        });

      

    });

    console.log(goalContent);

    return goalContent;

    
}

}); //end server methods



//Publish Section
	//user list 
	Meteor.publish('userList', function(){
    var currentUser = this.userId;
    return userActivities.find({ createdBy: currentUser })
});

	//NOT users list
	Meteor.publish('notUserList', function(){
    var currentUser = this.userId;
    return userActivities.find({ createdBy: {$ne: currentUser }})
});

	//inspiration
	Meteor.publish('inspiration', function(){
    //var currentUser = this.userId;
    return activities.find({count: {$gt: 1}})
});

//activities
  Meteor.publish('activities', function(){
    //var currentUser = this.userId;
    return activities.find()
});
  //goal Specific Content
  Meteor.publish('goalContent', function(){

});
	//content
	Meteor.publish('feedContent', function(){
    return feedContent.find(); //need to add filter to limit returned content to last 30 days  or last 500
});

//goal Specific content 
/*
  Meteor.publish('goalSpecific', function(){
    var currentGoal = this.activityId;
    console.log(currentGoal);
    return feedContent.find({$text: {$search: currentGoal}}); //need to add filter to limit returned content to last 30 days  or last 500
});
*/


//ADMIN SUBSCRIPTIONS

//RSS Feeds
Meteor.publish('rssFeeds', function(){
  return rssFeeds.find();

});

//END ADMIN SUBSCRIPTIONS

// If `searchValue` is not provided, we publish all known messages. If it is
// provided, we publish only messages that match the given search value.
/*Meteor.publish("search", function(searchValue) {
  if (!searchValue) {
    return Messages.find({});
  }
  return Messages.find(
    { $text: {$search: searchValue} },
    {
      // `fields` is where we can add MongoDB projections. Here we're causing
      // each document published to include a property named `score`, which
      // contains the document's search rank, a numerical value, with more
      // relevant documents having a higher score.
      fields: {
        score: { $meta: "textScore" }
      },
      // This indicates that we wish the publication to be sorted by the
      // `score` property specified in the projection fields above.
      sort: {
        score: { $meta: "textScore" }
      }
    }
  );
});
*/

//End Publish section

 
} // end isServer block

/* ////
END METOER SERVER
////// */ 




