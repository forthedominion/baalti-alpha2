//initialize router - main and loading templates
Router.configure({
layoutTemplate:"main", 
loadingTemplate:"loading"
});

Router.configure({
layoutTemplate:"mainPublic"
});

//end initialization



//Iron Router Routes 
/* Router.route('/', {
  layoutTemplate:'mainPublic'
});
*/
 Router.route('/', {
  name: 'home', 
  layoutTemplate:'mainPublic'
}); 


Router.route('/user/list', {
  name: 'userList', 
  template: 'userList',
  layoutTemplate:'main',

  data: function(){
    var currentUser = Meteor.userId();
    //var currentList = this.params._id;
    //console.log(Meteor.userId)
    return userActivities.find({createdBy: currentUser});
  }, 
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
        this.next();
    } else {
        this.render("login");
  }

  },

  waitOn: function(){
        return [
          Meteor.subscribe('userList'), 
          Meteor.subscribe('activities')
          ];
  }
});


Router.route('/user/index', {
  name: 'userIndex', 
  template: 'userIndex',
  layoutTemplate:'main',

onBeforeAction: function(){
    var currentUser = Meteor.userId();
    var activityCount = userActivities.find({createdBy: currentUser}).count();
    if(activityCount === 0){
        this.render("inspiration");
    } else {
        this.next();

  }

  },

  //Allow access to current user's goals only
  waitOn: function(){
        return [
          Meteor.subscribe('feedContent'), 
          Meteor.subscribe('userList')
          ];
        
  }

}); 


Router.route('/register', {
  layoutTemplate:'main'
});

Router.route('/login', {
  layoutTemplate:'main'
}); 

Router.route('/about', {
  layoutTemplate:'main'
}); 

Router.route('/privacy', {
  layoutTemplate:'main'
}); 

Router.route('/goal/:activityId', {
  
  layoutTemplate:'main', 
  template: 'goalSpecific',
  name: 'goalSpecific',

  onBeforeAction: function(){
    Session.set('goalID', this.params.activityId);
    this.next();
  },

  //Allow access to current user's goals only
  waitOn: function(){
        return [
          Meteor.subscribe('feedContent'), 
          Meteor.subscribe('userList'),
          Meteor.subscribe('activities')
          //add additional subscription for goal related content only
          ];
        
  }
}); 


Router.route('/inspiration', {
  layoutTemplate:'main', 

  waitOn: function(){
        return [
          Meteor.subscribe('inspiration'),
          Meteor.subscribe('userList'),
          Meteor.subscribe('activities')
          ];
  }
}); 

Router.route('/admin/rss',{
  name: 'rssAdmin',
  template: 'rssAdmin',
  layoutTemplate:'main', 

  //admin section user validation via userID
  /*
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser == "9p7Z3qNdP3rFtbvFz"){
        this.next();
    } else {
        this.render("userIndex"); 
      }
  }, 
*/
  waitOn: function(){
        return Meteor.subscribe('rssFeeds');
  }
  });

Router.route('/admin/rss/content', {
  name: 'contentAdmin', 
  template: 'contentAdmin',
  layoutTemplate: 'main',

  waitOn: function(){
          return [
            Meteor.subscribe('feedContent')
            ];
}

});



//end Routes
