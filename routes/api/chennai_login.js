var config = require('../../config');
var express = require('express');
var unirest = require('unirest');
var fs = require('fs');
var router = express.Router();

router.get(
    '/', function (req, res)
    {
        res.send('Chennai Login API Documentation');
    }
);

router.get(
    '/login/manual', function (req, res)
    {
        var RegNo = req.query.regno;
        var DoB = req.query.dob;

        var uri = 'Chennai URL';
        unirest.get(uri)
            .encoding(null)
            .set('Content-Type', 'image/bmp')
            .end(
            function (response)
            {
                fs.writeFile(
                        './captcha/' + RegNo + '.bmp', response.body, function (err)
                    {
                        if (err)
                        {
                            throw err;
                        }
                        var doc = {"RegNo": RegNo, "DoB": DoB, "Cookie": response.cookies};
                        login(
                            doc, function (callback)
                            {
                                callback();
                            }
                        );
                        res.writeHead(200, {"Content-Type": "image/bmp"});
                        res.write(response.body);
                        res.end();
                    }
                );
            }
        );
    }
);

router.get(
    '/login/auto', function (req, res)
    {
        var RegNo = req.query.regno;
        var DoB = req.query.dob;
        /*
         login(doc, function (callback) {
         callback();
         });
         */
        res.send('Captchaless login!');
    }
);

module.exports = router;

function login(doc, callback)
{
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(
        config.MongoLab, function (err, db)
        {
            if (err)
            {
                throw err;
            }
            console.log("MongoDB Connection Opened");
            var collection = db.collection('chennai_student');
            collection.update(
                {"RegNo": doc.RegNo}, doc, {upsert: true}, function (err, /**/docs)
                {
                    callback(
                        function ()
                        {
                            db.close();
                            console.log("MongoDB Connection Closed");
                        }
                    );
                }
            );
        }
    );
}