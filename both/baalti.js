
//Collections
userActivities = new Mongo.Collection('userActivities');
activities = new Mongo.Collection('activities');
rssFeeds = new Mongo.Collection('rssFeeds');
feedContent = new Mongo.Collection('feedContent');


//end collections


//Schemas
/*
var Schemas = {};

Schemas.userActivities = new SimpleSchema({
	activityId: {
		type: String,
		label: "ID of associated Activity",
		max: 32
	},
	
	activity: { 
		type: String,
		label: "Goal",
		min: 3,
		max: 32
	},
	
	goalDate: {
		type: date,
		label: "Target Date",
		min: 

	}, 
	
	createdAt: {


	}, 
	
	keywords: {


	}, 
	
	createdBy: {


	}, 
	
	completed: {


	}

});

Schemas.activities = new SimpleSchema({


});


//end Schemas

//attach schemas 

userActivities.attachSchema(Schemas.userActivities);
activities.attachSchema(Schemas.activities);

//end attach
*/
