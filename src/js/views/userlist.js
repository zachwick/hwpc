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

		this.listenTo(this.users, 'sync', this.render);

		_.bindAll(this,
		          "render",
		          "addOneUser",
		          "addAllUsers",
		          "getAllUsers"
		         );
	},

	getAllUsers: function() {
		this.users.fetch();
		console.log(this.users);
	},

	addOneUser: function(user) {
		var view = new UserView({ model: user });
		this.$(".user-list").append(view.render().el);
	},

	addAllIUsers: function() {
		this.users.each(this.addOneUser, this);
	},

	render: function() {
		this.$el.html(this.template());
		this.addAllUsers();
		return this;
	}
	
});
