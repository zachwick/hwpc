/**
 * HWPC web client JavaScript bootstrapping file
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var page = _(window.location.href.split("/")).last();
var app = new AppView;
