/**
 * UserList BackboneJS view for HWPC web client
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var UserListView = Backbone.View.extend({
	el: "#users-container",

	template: function() {
		return _.template($("#users-template").html());
	},

	events: {

	},

	initialize: function(options) {
		this.users = new Users();

		this.listenTo(this.users, 'update', this.render);
		
		_.bindAll(this,
		          "render",
		          "addOneUser",
		          "addAllUsers",
		          "getAllUsers"
		         );

		this.getAllUsers();
	},

	getAllUsers: function() {
		this.users.fetch();
	},

	addOneUser: function(user) {
		var view = new UserView({ model: user });
		this.$(".user-list").append(view.render().el);
	},

	addAllUsers: function() {
		this.users.each(this.addOneUser, this);
	},

	render: function() {
		this.$el.html(this.template());
		this.addAllUsers();
		return this;
	}
	
});
