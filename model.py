'''
DB access layer

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
import datetime
import os

db = web.database (dbn='mysql', db="hwpc", user="hwpc", passwd="")

def get_all_users():
    users = db.select("User", order="registerDate")
    return users;

def get_user_by_id(user_id):
    user = db.select("User", where="id=$user_id", limit="1",
                     vars=locals())
    if len(user) > 0:
        # db.select returns an iterable, but we want a single obj
        user = user[0]
        return user
    else:
        # No such User record was found
        return None

def new_user(data):
    fname = data['fname']
    lname = data['lname']
    address1 = data['address1']
    address2 = data['address2']
    city = data['city']
    state = data['state']
    zipcode = data['zip']
    country = data['country']

    # TODO: server-side data validation goes here

    new_user = db.insert('User',
                         fname=fname,
                         lname=lname,
                         address1=address1,
                         address2=address2,
                         city=city,
                         state=state,
                         zipcode=zipcode)
    return new_user
