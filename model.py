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

