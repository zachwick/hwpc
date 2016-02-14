/**
 * UserEdit BackboneJS view for HWPC
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var UserView = Backbone.View.extend({
	// UserViews are tr elements
	tagName: "tr",

	model: User,

	// A conveniece wrapper around the UnderscoreJS template function.
	// The structure of the template can be found in /templates/base.html
	template: function() {
		return _.template($("#user-template").html());
	},

	events: {

	},

	// The UserView.initialize method is called whenever we create a new
	// UserView object
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	// Create and manipulate the DOM to create and display the UserView
	render: function() {
		this.$el.html(this.template()(this.model.toJSON()));
		return this;
	}
});
