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
		this.user = new User();

		this.listenTo(this.user, 'change:id', function() {
			window.location = this.user.url();
		});
		
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
		console.log("in AppView.render");
		this.$el.html(this.template());

		// Doing a `return this;` at the end of a Backbone View's return
		// method allows for easier function call chaining
		return this;
	},

	signupUser: function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var fname = this.$("input[name='fname']").val();
		var lname = this.$("input[name='lname']").val();
		var address1 = this.$("input[name='address1']").val();
		var address2 = this.$("input[name='address2']").val();
		var city = this.$("input[name='city']").val();
		var state = this.$("input[name='state']").val();
		var zipcode = this.$("input[name='zipcode']").val();

		var is_valid = true;

		/* TODO: Implement client side validation */
		/*
		// Check fname and lname for only alpha
		if (/[\D*\S*\.*]/.test(fname) && /[\D\S\.]/.test(lname)) {
			is_valid = false;
			alert("Sorry, but your name may only contain letters and '.'");
		}

		// Check that address1 is only alphanum, '.', and whitespace
		if (/[\W\S\.]/.test(address1) && /[\W\S\.]/.test(address2)) {
			is_valid = false;
			alert("Sorry, but you address may only contain numbers, letters, spaces, and periods");
		}

		if (/[\D\S\.]/.test(city)) {
			is_valid = false;
			alert("Sorry, but your city may only contain letters, spaces, and periods");
		}

		if (/[\D*|\[a-zA-Z]3}]/.test(state)) {
			is_valid = false;
			alert("Sorry, but your state my only contain a two letter abbreviation");
		}

		if (/[\D-]|[^\d{5}]|[^\d{5}-\d{4}]/.test(zip)) {
			is_valid = false;
			alert("Sorry, but your zip code may only be numbers in the form 12345 or 12345-1234");
		}

		 console.log("is_valid: ",is_valid);
		 */

		if (!!is_valid) {
			this.user.set({
				fname: fname,
				lname: lname,
				address1: address1,
				address2: address2,
				city: city,
				state: state,
				zipcode: zipcode
			});
			console.log(this.user);
			this.user.save();
		}
	},
});
