
var conf = require('../config'),
    extend = require('xtend'),
    db = require('nano')({
        "url": conf.db,
        "log" : function (id, args) {
            //console.log(id, args);
        }
    });

db.get('_design/users', function(err, doc) {
    if (err && err.status_code !== 404) {
        return console.log(err);
    }

    doc = extend(doc, {
        language: 'javascript',
        views: {
            by_email: {
                map: 'function(doc) { ' +
                        'if (doc.type === "user" && doc.email) {' +
                            'emit(doc.email, doc);' +
                        '}' +
                    '}'
            }
        }
    });

    db.insert(doc, '_design/users', function(err, doc) {
        if (err) {
            return console.log(err);
        }
        console.log('Created/Updated: ' + doc.id);
    });

});

exports.instance = db;