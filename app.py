#!/usr/bin/env python
'''
The  server-side application for HWPC

Copyright 2016 zach wick <zach@zachwick.com>
 
This file is part of HWPC.

HWPC is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

HWPC is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with HWPC.  If not, see <http://www.gnu.org/licenses/>.

'''

import web
import re
import base64
import model

'''
If web.config.debug is not explicitly set to False, sessions will not work.
That is, you be unable to log in or out.
'''
web.config.debug = False

'''
Routing URLS
'''
urls = (
    '/',       'Index',
    '/admin',  'Admin',
    '/admin/', 'Admin',
    '/login',  'Login',
    '/login/', 'Login',
)

'''
Templates
Look in a folder named "templates" for our webpy HTML templates, and use a file
base.html as a base template for all views that webpy creates.
NB: These are templates for the HTML that the webpy application returns to
    connected clients.
'''
render = web.template.render ("templates",base="base")

'''
Create the webpy application
'''
app = web.application(urls, globals())

'''
HTTP Basic Auth allowed credential sets
'''
allowed = (
    ('hello',  'world')
)

class Index:
    def GET(self):
        return render.index()

class Admin:
    def GET(self):
        if web.ctx.env.get('HTTP_AUTHORIZATION') is not None:
            data = {
                "users": model.get_all_users()
            }

            accept_header = web.ctx.env.get("Accept")

            if accept_header is "text/html":
                # Show an HTML table
                return render.admin(data)
            elif accept_header is "application/json":
                # Return a JSON string
                return json.dumps(data)
            else:
                # Return a 406 Not Acceptable because the client is
                # requesting data be returned in a media type that we
                # don't support
                web.ctx.status = '406 Not Acceptable'
                return

        
class Login:
    def GET(self):
        auth = web.ctx.env.get('HTTP_AUTHORIZATION')
        authreq = False

        print("HERE")
        
        if auth is None:
            authreq = True
        else:
            auth = re.sub('^Basic ', '', auth)
            username, password = base64.decodestring(auth).split(':')
            if (username, password) in allowed:
                raise web.seeother('/admin')
            else:
                authreq = True

        if authreq:
            web.header('WWW-Authenticate', 'Basic realm="Bareo Stats"')
            web.ctx.status = '401 Unauthorized'
            return


if __name__ == "__main__":
    '''
    If you are running bareo-stats behind nginx (like we do on api.bareo.io) on
    your local machine, then you need the following lambda defined.
    If you are running bareo-stats locally by issuing `python app.py` in a
    terminal, then you _must_ comment out the lambda definition or your local
    API will error at start up.
    '''
    web.wsgi.runwsgi = lambda func, addr=None: web.wsgi.runfcgi(func, addr)

    '''
    Start the app listening for connections/requests
    '''
    app.run()
