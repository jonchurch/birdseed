var express = require('express');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
//db set to rest.db for testing
var db = new sqlite3.Database('rest.db');
var port = process.env.APIPORT || 3000;

app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', function(req, res) {
    res.send('hello ROOT world!');
});


var ateRouter = express.Router();

ateRouter.get('/', function(req, res) {

});

ateRouter.post('/', function(req, res) {
	db.serialize(function() {
	
        var stmt = db.prepare('INSERT INTO ate (algorithm, dataset, value) VALUES (?, ?, ?)');
        var data = [
            req.body.algorithm,
            req.body.dataset,
            req.body.value
        ];
        if (!data[0] || !data[1] || !data[2]) {
        res.status(400);
        return res.json({errors: ['Missing  in POST']});
    }
        stmt.run(data, function(err, row) {
            if (err) {
            	console.log(err);
                res.status(500);
                return res.json({
                	errors: ['Failed to create ATE entry']
                });
            } else {
                res.status(202);
                db.get('SELECT * FROM ate  WHERE id=?', this.lastID, function(err, row) {
                	console.log('NEW ATE ENTRY= id: ' + row.id + ', algorithm: ' + row.algorithm + ', dataset: ' + row.dataset + ', val: ' + row.value);
                    if (err) {
                        console.log(err);
                    }
                });
            }
            stmt.finalize();
            res.end();
        });
    });

});

ateRouter.get('/:id', function(req, res) {

});

ateRouter.patch('/:id', function(req, res) {

});

ateRouter.delete('/:id', function(req, res) {

});
app.use('/ate', ateRouter);

var rpeRouter = express.Router();

rpeRouter.get('/', function(req, res) {

});

rpeRouter.post('/', function(req, res) {

});

rpeRouter.get('/:id', function(req, res) {

});

rpeRouter.patch('/:id', function(req, res) {

});

rpeRouter.delete('/:id', function(req, res) {

});



app.listen(port, function() {
    console.log('Now Listening on port...' + port);
});

function lookupATE(req, res, next) {
    /*
	var entryId = req.params.id;
var sql = db.get('SELECT * FROM ate WHERE id = ?');

	if (err) {
		console.error(err);
		res.statusCode = 500;
		resturn res.json({ errors: ['Could not retrieve ATE'] });
	}
	if (results.ros.length === 0) 
	*/
}
