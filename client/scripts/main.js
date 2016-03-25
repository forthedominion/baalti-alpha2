/* ////
START METOER CLIENT
////// */ 



// Begin Helpers section
Template.activityList.helpers({
'activityList': function(){
  var currentUser = Meteor.userId();
  return userActivities.find({createdBy: currentUser}, {sort:{completed: 1, goalDate: 1}})
} 


});



Template.inspiration.helpers({
  'inspiration': function(){
    var activitiesArray = Session.get('existingActivities');
    //console.log(activitiesArray);
    //var zx = activities.find({_id: {$ne: activitiesArray}});
    //console.log(zx);
    return activities.find({_id: {$nin: activitiesArray}});
    
  },

  'bgImg': function(){
   
    var imgId = this.img.imgId;
    var imgSecret = this.img.secret;
    var imgFarmId = this.img.farmId;
    var imgServer = this.img.server;
    
    var imgURL = "farm"+imgFarmId+".staticflickr.com/"+imgServer+"/"+imgId+"_"+imgSecret+".jpg";
    //console.log(imgURL);
    return imgURL;
  }
});




Template.activityItem.helpers({
'completed': function(){
  var isCompleted = this.completed;
  if(isCompleted){
   return "completed";
  } else { 
     return "";
  }

  },

  'stlyeComplete': function(){
  var isCompleted = this.completed;
  if(isCompleted){
   return "itemcompletebox";
  } else { 
     return "itemtransbox";
  }

  },

  'bgImg': function(){
    var actId = this.activityId;
    //console.log(actId);
    var actInfo = activities.findOne({_id:actId});
    //console.log(actInfo);
    var imgId = actInfo.img.imgId;
    var imgSecret = actInfo.img.secret;
    var imgFarmId = actInfo.img.farmId;
    var imgServer = actInfo.img.server;
    
    var imgURL = "farm"+imgFarmId+".staticflickr.com/"+imgServer+"/"+imgId+"_"+imgSecret+".jpg";
    //console.log(imgURL);
    return imgURL;
  }


});

Template.newActivityModal.helpers({
  'activities': function() {
    return activities.find().fetch().map(function(it){ return it.name; });
  }
});

Template.newActivityModal.rendered = function() {
  Meteor.typeahead.inject();
};


Template.rssAdmin.helpers({
'feedList': function(){
  return rssFeeds.find();
}

});

Template.contentAdmin.helpers({
  'contentList': function(){
    return feedContent.find();
  }
})


Template.userIndex.helpers({
'userContent': function(){
  var contentArray = Session.get('contentFilter');
  
  return feedContent.find({_id: {$in: contentArray}}, {sort:{createdAt:-1}});
}

});

Template.goalSpecific.helpers({
'goalSpecificContent': function(){
  var goalContentArray = Session.get('goalFilter');
  
  return feedContent.find({_id: {$in: goalContentArray}}, {sort:{createdAt:-1}});
}, 

'currentGoalName': function(){
  var currentGoalID = Session.get('goalID');
  var goalCursor = activities.findOne({_id: currentGoalID});
  var goalName = goalCursor.name;
  
  return goalName;
}

});

Template.userIndex.helpers({
'feedContent': function(){
  return feedContent.find();
}

});

Template.userNext52.helpers({
'userNext5': function(){
  var currentUser = Meteor.userId();
  return userActivities.find({createdBy:currentUser}, {sort:{goalDate:1}, limit: 5});
}, 

'currentGoalYear': function(){
return moment(this.goalDate).format('YYYY');

},

'currentGoalMonth': function(){
return moment(this.goalDate).format('MMM');

},

'currentGoalDay': function(){
return moment(this.goalDate).format('DD');

}

});

Template.externalModal.helpers({
  'sourceURL': function(){
    var sourceURL = Session.get('sourceURL');
    return sourceURL;
  }
});



//end Helpers section


//Begin Template events watchers 

// registration event handler and validation

Template.userIndex.onRendered(function(){
  Meteor.call('contentFilter', function (error, result) {
      if (error) {
        // handle error
      } else {
        
        Session.set('contentFilter', result)

      }
    
  });
});

Template.goalSpecific.onRendered(function(){
  var goalID = Session.get('goalID');
  //Session.set('goalID', goalID);
  console.log(goalID);

  Meteor.call('goalFilter', goalID, function (error, result) {
      if (error) {
        // handle error
      } else {
        
        Session.set('goalFilter', result)

      }
    
  });



});


Template.inspiration.onRendered(function(){

    Meteor.call('inspirationFilter', function (error, result) {
      if (error) {
        // handle error
      } else {
        
        Session.set('existingActivities', result)

      }
    
  });
});


Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    
  }
});


Template.register.onRendered(function(){
  var validator = $('.register').validate({
    submitHandler: function(event){
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: email,
        password: password
      }, function(error){
        if(error){
          if(error.reason == "Email already exists."){
            validator.showErrors({
              email: "That email belongs to a registered user"
            }); 
          }
        } else {
            Router.go("userIndex");
      } 

    });
     
        }
      });
});

// login event handler and validation
Template.login.events({
  'submit form': function(){
    event.preventDefault();
    
      }
});

Template.login.onRendered(function(){
  var validator = $('.login').validate({
    submitHandler: function(event){
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        if(error.reason == "User not found"){
         validator.showErrors({
          email: error.reason
         }); 
        }
        if(error.reason == "Incorrect password"){
          validator.showErrors({
          password: "nice try - incorrect password"
         }); 
        }
        
      } else {
        var currentRoute = Router.current().route.getName();
        if(currentRoute == "login"){
          Router.go("userIndex");
        }
      } 
      });

    }
  });
});

Template.activityItem.events({
'click .delete-activity': function(event){
    event.preventDefault();
    var documentId = this._id;
    var activityId = this.activityId;

    Session.set('deleteDocumentId', documentId);
    Session.set('deleteActivityId', activityId);
    Modal.show('confirmModal');
    $('#activityName').html(this.activity);
    /*
    var testA = Session.get('deleteDocumentId');
    var testB = Session.get('deleteActivityId');
    console.log(documentId);
    console.log(activityId)
    */
    //var confirm = window.confirm("Delete this goal?");
    //Meteor.call('deleteActivity', documentId, confirm)
 }
,

'click [name=completeStatus]': function(){
   var documentId = this._id; 
   var isCompleted = this.completed;
   var itemName = this.activity; 
   Meteor.call('markComplete', documentId, isCompleted);
}
/*
,

   if(isCompleted){
    //growl notification
     Bert.alert("Congratulations! You achieved your goal to "+itemName, 'success', 'growl-top-right');
    
   } else {
    //growl notification
     Bert.alert(itemName+ " re-added to your goals. Good luck!", 'success', 'growl-top-right');
    
 }
*/
 ,

'click [name=edit]': function(event){
  event.preventDefault();
  Modal.show('editActivityModal');
  $('#modalActivity').val(this.activity);
  $('#modalGoalDate').val(this.goalDate);
  Session.set('oldActivityId', this.activityId);
  Session.set('oldId',this._id);

}

});

Template.inspiration.events({
'click [name=add]': function(event){
  event.preventDefault();
  Modal.show('inspirationModal');
  
  $('#myModalLabel').html("New Goal: "+this.name);
  var inspGoal = this.name; 
  Session.set('inspGoal', inspGoal);
  }

});

    
Template.navigation.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

Template.userList.events({
'click #add': function(event){
  event.preventDefault();
  Modal.show('newActivityModal');

  
}

});


Template.rssAdmin.events({
'click [name=submit]': function(event){
  event.preventDefault();
  
  
  var feedURL = $('[name="feedURL"]').val();
  var feedDescription = $('[name="feedDescription"]').val();

  Meteor.call('addFeeds', feedURL, feedDescription)
  
  $('[name="feedURL"]').val('');
  $('[name="feedDescription"]').val('');
}

});


Template.rssAdmin.events({
'click .delete-activity': function(event){
    event.preventDefault();
    var deleteFeed = this._id; 
    Meteor.call('feedDelete', deleteFeed);

  }
});

Template.contentAdmin.events({
'click .delete-content': function(event){
    event.preventDefault();
    var deleteContent = this._id; 
    Meteor.call('contentDelete', deleteContent);

  }
});

Template.userNext52.events({
'click #add': function(event){
  event.preventDefault();
  Modal.show('newActivityModal');
},

'click #manage': function(event){
    event.preventDefault();
    Router.go('userList');
  } 


});



Template.testingTemplate.events({
'click .rssExternal': function(event){
  event.preventDefault();
  Modal.show('externalModal')
  var source = this.url;
  Session.set('sourceURL', source);

  //$('#externalModal').append($("<iframe />").attr("src", "google.com")).dialog();
}
});

Template.contentItem.events({
'click .rssExternal': function(event){
  event.preventDefault();
  Modal.show('externalModal')
  var source = this.url;
  Session.set('sourceURL', source);

}
});




//edit activities modal events
Template.editActivityModal.events({
'click #save': function(event){
    event.preventDefault();
    
    //variables for addActivity Method
    var activity = $('[name="modalActivity"]').val();
    var goalDate = $('[name="modalGoalDate"]').val();
    
    var oldActivityId = Session.get('oldActivityId');
    var oldId = Session.get('oldId');

    console.log(oldActivityId);
    console.log(oldId);
    

    //userActivities.findOne({_id:Meteor.userId, activity: activity})
    
    Meteor.call('editActivity',activity, goalDate, oldActivityId, oldId) ;

    //clean-up modal input fields & hide modal
    $('#modalActivity').val('');
    $('#modalGoalDate').val('');
    Modal.hide('editActivityModal');

    //growl notification
    Bert.alert(activity+" successfully updated", 'success', 'growl-top-right');
    
  },

});



//modal actions section
Template.newActivityModal.rendered=function() {
  /* $('#modalGoalDate').datepicker(
      {
        defaultViewDate: new Date(),
        startDate: new Date()
        
      }
    ); */

$('#datepicker').datepicker({
  format: "yyyy/mm/dd",
  startView: 1,
  clearBtn: true,
  defaultViewDate: new Date(),
        startDate: new Date()
  });
$('#datepicker').on("changeDate", function() {
    $('#my_hidden_input').val(
        $('#datepicker').datepicker('getFormattedDate')
    );
});
}

Template.newActivityModal.events({
  'click #save': function(event){
    event.preventDefault();

    //variables for addActivity Method
    var activity = $('[name="modalActivity"]').val();
    var goalDate = $('[name="modalGoalDate"]').val();
    userActivities.findOne({_id:Meteor.userId, activity: activity})
    
    Meteor.call('addActivity',activity, goalDate) ;

    //clean-up modal input fields & hide modal
    $('#modalActivity').val('');
    $('#modalGoalDate').val('');
    Modal.hide('newActivityModal');

    //growl notification
    Bert.alert(activity+" successfully added to your list", 'success', 'growl-top-right');
    
  },


  'click #cancel': function(event){
  // event.preventDefault();  
  $('#modalActivity').val('');
  $('#modalGoalDate').val('');
  // $('#newActivityModal').modal('hide');
  
},

'click #close': function(event){
  // event.preventDefault();  
  $('#modalActivity').val('');
  $('#modalGoalDate').val('');
  // $('#newActivityModal').modal('hide');
  
}
});

//modal actions section
Template.inspirationModal.events({
  'click #save': function(event){
    event.preventDefault();
    
    //variables for addActivity Method
    var activity = Session.get('inspGoal');
    var goalDate = $('[name="modalGoalDate"]').val();
    
    Meteor.call('addActivity',activity, goalDate) ;

    //clean-up modal input fields & hide modal
    
    $('#modalGoalDate').val('');
    Modal.hide('inspirationModal');

    //growl notification
    Bert.alert(activity+" successfully added to your list", 'success', 'growl-top-right');
    
  },


  'click #cancel': function(event){
  // event.preventDefault();  
  $('#modalGoalDate').val('');
  // $('#newActivityModal').modal('hide');
  
},

'click #close': function(event){
  // event.preventDefault();  
  $('#modalGoalDate').val('');
  // $('#newActivityModal').modal('hide');
  
}
});


Template.confirmModal.events({
'click #delete': function(event){
    event.preventDefault();
    var deleteDocumentId = Session.get('deleteDocumentId');
    var deleteActivityId = Session.get('deleteActivityId');
    Meteor.call('deleteActivity', deleteDocumentId, deleteActivityId);
    Modal.hide('confirmModal');
}
});

Template.newActivityModal.onRendered(function(){
  console.log("modal rendered");

  $('.newActivityModal').validate();
  
});


Template.editActivityModal.onRendered(function(){
  console.log("modal rendered");

  $('.editActivityModal').validate();
  
  })
  

Template.feedItem.events({
  'click [name=update]': function(event){
      event.preventDefault();
      
      var algoReady = Session.get('algoReady');
      
      var input = this.feedURL;
      var feedDescription = this.feedDescription;
      var client = Algorithmia.client("simBh7ZA4AFFt8Gaak+VC+WWe9Z1");

           client.algo("algo://tags/ScrapeRSS/0.1.5")
           .pipe(input)
           .then(function(output) {
             console.log(output); 
             console.log(feedDescription);
             var response = output.result;


             _.each(response, function(n) {
                
                /*
                feedContent.insert({
                  title: n.title,
                  url: n.url,
                  description: n.description,
                  createdAt: new Date(),
                  source: feedDescription
                  });
                */
                
                Meteor.call('refreshFeed',n, feedDescription)
                
                /*
                feedContent.update(
                  {title: n.title},
                  {
                    $setOnInsert: {createdAt: new Date()},

                    $set: {title: n.title, url: n.url, description: n.description, updatedAt: new Date()}

                  },
                  {upsert: true}

                ) 
                */


                console.log(n.title, n.description, n.url, feedDescription);
            });


            //console.log(input);
            //console.log(response);
            //call collection write method here

           });

      /*
      _.each(response.data.items, function(item) {
        var doc = {

          item.
        }

      } 


    ) */



      

}
})



//end modal test section

//landing page spinner 
Template.mainPublic.onRendered(function(){
   
   var goals = [
      "Climb Mount Kilimanjaro",
      "Hike to Machu Pichu", 
      "See New York City", 
      "Visit Paris",
      "Go skydiving",
      "Finish a triathlon",
      "Go bungee jumping",
      "See The Great Wall",
      "Learn French",
      "Learn to make sushi",
      "Make my own beer",
      "Go to Mardi Gras",
      "Go to Vegas",
      "Participate in La Tomatina",
      "Run with the bulls",
      "Backpack around Europe",
      "See a World Cup match",
      "Get a tattoo",
      "Solve a Rubik's cube",
      "Go to the Olympics",
      "Attend a music festival",
      "Drive a race car",
      "Volunteer in Africa",
      "Run a marathon",
      "Visit Australia",
      "Learn to drive motorcycle",
      "Learn to surf",
      "Get my pilot's license",
      "Visit a Scotch distillery"
      ];

  var dates = [
      "November 3, 2019",
      "July 14, 2018",
      "March 5, 2023", 
      "February 3, 2017",
      "April 21, 2016",
      "December 12, 2021",
      "June 19, 2021",
      "March 4, 2024",
      "September 16, 2017",
      "May 3, 2022",
      "October 4, 2016",
      "December 8, 2023",
      "February 24, 2021",
      "June 7, 2024",
      "January 9, 2022",
      "October 11, 2022",
      "July 31, 2018",
      "August 2, 2023",
      "April 24, 2017",
      "July 14, 2018",
      "July 5, 2020",
      "September 27, 2021",
      "February 18, 2024",
      "October 29, 2029",
      "February 17, 2019",
      "July 16, 2022",
      "April 1, 2024",
      "January 29, 2023",
      "October 16, 2021",
      "September 4, 2023",
      "December 2, 2016"
      ];


var i = 0;                     //  set your counter to 1

function goalLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      $('#spnChanger1').html("&nbsp;" +goals[i]+ "&nbsp;");          //  your code here
      $('#spnChanger2').html("&nbsp;" +dates[i]+ "&nbsp;");
      i++;                                //  increment the counter
      if (i < goals.length) {     //  if the counter < 10, call the function
         goalLoop();             //  ..  again which will trigger another 
      } else {
          i=0; 
          goalLoop();
          }   
                              //  ..  setTimeout()
   }, 1500)
}

goalLoop();                      //  start the loop


}

);
//end landing page spinner 
 


//end Template events watchers


//begin validation defaults 
$.validator.setDefaults({
  rules: {
      modalActivity: {
        required: true, 
        minlength: 3, 
        userActivityUnique: true
      },
      modalGoalDate: {
        required: true, 
        date: true, 
        //min: new Date()

      }, 
    
      email: {
            required: true,
            email: true
      },
      password: {
            required: true,
            minlength: 6
      }
    },


    messages: {
      modalActivity:{
        required: "Enter a dream you want to chase", 
        minlength: "Your dream must be more than {0} characters",
        userActivityUnique: "It appears that goal is already on your list"
      }, 
      modalGoalDate:{
        required: "Adding a date turns a dream into a goal", 
        date: "Please check the format of your date",
        //min: " If you want to achieve your goal, it needs to be in the future"

      },

      email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }


});


$.validator.addMethod( 'userActivityUnique', ( activity ) => {
  let exists = userActivities.findOne( { "activity": activity }, { fields: { "activity": 1 } } );
  return exists ? false : true;
});

/*
$.validator.addMethod("selectnic", function(value, element){
    if (/^[0-9]{9}[vVxX]$/.test(value)) {
        return false;  // FAIL validation when REGEX matches
    } else {
        return true;   // PASS validation otherwise
    };
}, "wrong nic number"); 
*/

//end validation defaults 
 


//Begin Subscriptions

//Meteor.subscribe()

//End Subscriptions





/* ////
END METOER CLIENT
////// */ 




