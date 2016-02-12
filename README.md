# HelloWorld Coding Challenge

## Requirements

* Registration form

    * First Name
    * Last Name
	* Address 1
	* Address 2
	* City
	* State
	* Zip (5 or 9 digits)
	* Country (US only)
	
* Confirm supplied data page
* Registered user report

    * must show all data records sorted by descending registration
    date
	
* client side data validation
* server side data validation
* data must be stored in a DB for later recall


## URLs

- hwpc.zachwick.com/
    - GET receives registration page
    - POST posts data
	    - data is json encoded
- hwpc.zachwick.com/confirm/<ID>
    - GET shows an unconfirmed data record
    - PUT allows confirming the data record
	    - data is json encoded
- hwpc.zachwick.com/admin
	- HTTP Basic Auth (this is a terrible scheme for production admin
      pages, but putting a public admin page out with no auth at all
      feels very irresponsible)
	- GET displays all data records in an HTML table
- hwpc.zachwick.com/admin.json
	- HTTP Basic Auth (this is a terrible scheme for production admin
      pages, but putting a public admin page out with no auth at all
      feels very irresponsible)
	- GET displays all data records as a JSON string
	
## Build Requirements

- python >= 2.7.5
- web.py
- python-mysqldb
- yoyo-migrations
- nodejs
- npm

## How to Build

### Backend

The python script runs as a WSGI script on the server, so provided
that the required python dependencies are installed and available, all
that needs to happen is that the nginx -> fastcgi handoff be
configured correctly.

### Front-End

1. use npm to install the grunt-cli package globally

    sudo npm install -g grunt-cli

2. use npm to install the project's dependencies from within your
   working directory

    npm install

3. Concate, Transpile, and Minify the LESS into CSS, and the all the
JS files by running grunt within your working directory

    grunt

4. Run the backend python script locally by first commenting out the
wsgi configuration line towards the bottom of app.py, then simply
executing

    python app.py

5. Point your web user agent of choice (or curl commands) at
http://localhost:8080/ to register a user

6. Point your web user agent of choice (or curl commands) at
http://localhost:8080/admin (make sure to use HTTP Basic Auth in your
curl command) to see a list of all registered users.

## Deploy Requirements

- python >= 2.7.5
- web.py
- python-mysqldb
- yoyo-migrations
- nginx
- mysql OR mariadb

## DB Migrations

This project uses yoyo-migrations to do DB migrations and
rollbacks. From within the top-level directory of the project, execute
the following:

    yoyo-migrate apply ./migrations mysql://hwpc:""@localhost/hwpc


## Copyright and Licensening

All code is Copyright 2016 zachwick <zach@zachwick.com>

The python server-side code is licensed under the GNU GPLv3 or later

The front-end code (LESS, CSS, JS, HTML) is all licensed under the GNU
AGPLv3 or later
