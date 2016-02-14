/**
 * UserEdit BackboneJS view for HWPC
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var UserEditView = Backbone.View.extend({
	// A Sizzle/jQuery selector for the DOM element that an UserView object
	// uses to interact with the DOM
	el: "#user-container",

	model: User,
	
	// Note that this is a fancy way to wrap around the UnderscoreJS template
	// function. We will use this UserView.template function to manipulate the
	// DOM
	template: function() {
		return _.template($("#user-edit-template").html());
	},

	// Define any UI events and the functions that are bound to them
	events: {
		'click #edit-user': 'toggleUserEdit',
		'click #cancel-edit': 'toggleUserEdit',
		'submit #edit-form': 'editUser'
	},
	
	// This UserView.initialize function is called whenever we create a new
	// UserView object. Think of it kind of like a C++ constructor.
	initialize: function(options) {
		// Ensure that `this` plays nicely inside of each of our UserView's methods
		this.model = new User({
			id: _(window.location.href.split("/")).last()
		});

		this.listenTo(this.model, 'sync', this.render);
		_.bindAll(this,
		          "toggleUserEdit",
		          "editUser",
		          'render'
		         );

		// Fetch the complete record for this user
		this.model.fetch();
	},

	toggleUserEdit: function(e) {
		e.preventDefault();
		e.stopPropagation();

		// Toggle the 'state-hidden' class on all of the #edit-form's children
		this.$("#edit-form").children().toggleClass("state-hidden");

		// Toggle the 'state-hidden' class on off the span elements, and the button
		this.$("span").toggleClass("state-hidden");
		this.$("#edit-user").toggleClass("state-hidden");
	},

	editUser: function(e) {
		e.preventDefault();
		e.stopPropagation();

		this.model.set({
			fname: this.$("input[name='fname']").val(),
			lname: this.$("input[name='lname']").val(),
			address1: this.$("input[name='address1']").val(),
			address2: this.$("input[name='address2']").val(),
			city: this.$("input[name='city']").val(),
			state: this.$("input[name='state']").val(),
			zipcode: this.$("input[name='zipcode']").val()
		});

		this.model.save({
			success: _.bind(function() {
				this.render();
			},this)
		});
	},


	// This method is the access point of all DOM manipulation by the
	// UserView object
	render: function() {
		console.log("in UserEditView.render");
		this.$el.html(this.template()(this.model.toJSON()));

		// Doing a `return this;` at the end of a Backbone View's return
		// method allows for easier function call chaining
		return this;
	},
});
