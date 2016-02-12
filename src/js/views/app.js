/**
 * App BackboneJS view for HWPC
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var AppView = Backbone.View.extend({
	// A Sizzle/jQuery selector for the DOM element that an AppView object
	// uses to interact with the DOM
	el: "#app-container",

	// Note that this is a fancy way to wrap around the UnderscoreJS template
	// function. We will use this AppView.template function to manipulate the
	// DOM
	template: function() {
		return _.template($("#app-template").html());
	},

	// Define any UI events and the functions that are bound to them
	events: {
		'submit #signup-form': 'signupUser'
	},
	
	// This AppView.initialize function is called whenever we create a new
	// AppView object. Think of it kind of like a C++ constructor.
	initialize: function(options) {
		// Ensure that `this` plays nicely inside of each of our AppView's methods
		_.bindAll(this,
		          'signupUser',
		          'render'
		         );

		// Render this AppView
		this.render();
	},

	// This method is the access point of all DOM manipulation by the
	// AppView object
	render: function() {
		this.$el.html(this.template()({
			
		}));

		// Doing a `return this;` at the end of a Backbone View's return
		// method allows for easier function call chaining
		return this;
	}
	
});
