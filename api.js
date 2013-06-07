/**
 * Module dependencies.
 */
var mongo = require("mongodb");

// DB setup & connection
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server("localhost", 27017, { auto_reconnect: true }),
	db = new Db("TaskDB", server, { w: 1 });
	
db.open(function(err, db){
	if(!err) {
		console.log("Connected to the 'TaskDB' database");
	}
});

var collection = db.collection("tasks");

/**
 * GET a list of all tasks 
 */
exports.tasks = function(req, res) {
	console.log("Retrieving all tasks");
	collection.find().toArray(function(err, items) {
		res.send(items);
	});
};

/**
 * GET a single task
 */
exports.getById = function(req, res) {
	var id = req.params.id;
	console.log("Retrieving task with ID - " + id);
	collection.findOne({"_id": new BSON.ObjectID(id)}, function(err, item) {
		res.send(item);
	});
};

/**
 * POST a new task
 */
exports.add = function(req, res) {
	var task = req.body;
	console.log("Adding task: " + JSON.stringify(task));
	collection.insert(task, {w:1}, function(err, result) {
		if (err) {
			res.send({ "error": "An error occured - " + err });
		} else {
			res.send(result[0]);
		}
	});
	res.json(req.body);
};

/**
 * PUT update a task
 */
exports.edit = function(req, res) {
	var id = req.params.id,
		task = req.body;
	collection.update({"_id": new BSON.ObjectID(id)}, task, function(err, result) {
		if (err) {
			console.log("Error updating task: " + err);
			res.send({"error": "An error occured - " + err});
		} else {
			console.log("" + result + " document updated");
			res.send(task);
		}
	});
};

/**
 * DELETE delete a task
 */
exports.remove = function(req, res) {
	var id = req.params.id;
	console.log("Deleting task: " + id);
	collection.remove({"_id": new BSON.ObjectID(id)}, {w:1}, function(err, result) {
		if (err) {
			console.log("Error deleting task: " + err);
			res.send("error": "An error occured - " + err);
		} else {
			console.log("" + result + " document deleted");
			res.send(req.body);
		}
	});
};