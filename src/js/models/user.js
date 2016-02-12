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
		zip: "12345-1234",
		country: "USA"
	},

	url: function() {
		if (this.id) {
			return Config.baseURL + "confirm/" + this.id;
		} else {
			return Config.baseURL + "confirm/";
		}
	},

	initialize: function(options) {
		
	}
});

var Users = Backbone.Collection.extend({
	model: User,
	url: function() {
		return false;
	}
});
