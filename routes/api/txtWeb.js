/*
 *  VITacademics
 *  Copyright (C) 2014  Aneesh Neelam <neelam.aneesh@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    if (req.query['txtweb-message'] && req.query['txtweb-mobile']) {
        console.log(req.query['txtweb-message']);
        console.log(req.query['txtweb-mobile']);
    }
    else {
        var GoogleAnalytics = process.env.GOOGLE_ANALYTICS || 'UA-35429946-2';
        res.render('txtweb', {GoogleAnalytics: GoogleAnalytics});
    }
});

module.exports = router;
