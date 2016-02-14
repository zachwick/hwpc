/**
 * HWPC web client JavaScript bootstrapping file
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var page = _(_(window.location.href.split("/")).last(2)).first();

if (_(window.location.href.split("/")).last() === "admin" || page === "admin") {
	var userlist = new UserListView;
} else if (page === "users") {
	var user = new UserEditView;
} else if (page === _(_(Config.baseURL.split("/")).last(2)).first()) {
	var app = new AppView;
}
