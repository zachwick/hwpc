/**
 * User BackboneJS model for hwpc web client
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var User = Backbone.Model.extend({
	idAttribute: "id",

	defaults: {
		fname: "first",
		lname: "last",
		address1: "123 Main St.",
		address2: "",
		city: "Anywhere",
		state: "MI",
		zipcode: "12345-1234",
		country: "USA",
		registerDate: ""
	},

	url: function() {
		if (this.id) {
			return Config.baseURL + "users/" + this.id;
		} else {
			return Config.baseURL + "users/";
		}
	},

	initialize: function(options) {
		
	}
});

var Users = Backbone.Collection.extend({
	model: User,
	url: function() {
		return Config.baseURL + "users/";
	}
});
