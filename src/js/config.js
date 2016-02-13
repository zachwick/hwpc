/**
 * HWPC web client JavaScript bootstrapping file
 *
 * Copyright 2016 zachwick <zach@zachwick.com>
 * Licensed under the GNU AGPLv3 or later
 *
 **/

var Config = {
	baseURL: "https://hwpc.zachwick.com/",
	localURL: "http://localhost:8080/",

	// Usefull for running a local web UI against a remote API
	createCORSRequest: function(method, url) {
		var xhr = new XMLHttpRequest();

		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	}

};

/**
 * Uncomment the following line to point the webapp at a non-production
 * API
 **/
Config.baseURL = Config.localURL;
