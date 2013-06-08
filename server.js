/**
 * Module dependencies.
 */
var express = require("express"),
	api = require("./api");

/**
 * Serve the index to the browser.
 */
var index = function(req, res) {
	res.sendfile(__dirname + "/app/index.html");
};

var app = module.exports = express();

// Shared configurations
app.configure(function(){
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.logger("dev"));
	app.use(methodOverride());
	app.use(express.static(__dirname + "/app"));
	app.use(app.router);
});

// Configs shared between development and staging
app.configure("development", "staging", function(){
	app.use(express.errorHandler({ dumpExceptions: true, jsshowStack: true, showMessage: true }));
});

// Configs for development
app.configure("development", function(){
	app.set("port", 3000);
});

// Configs for staging
app.configure("staging", function(){
	app.set("port", 8100);
});

// Configs for production
app.configure("prodution", function(){
	app.use(express.errorHandler());
	app.set("port", 8100);
});

// Routes
app.get("/", index);

// GET
app.get("/api/tasks", api.tasks);
app.get("/api/tasks/:id", api.getById);

// POST
app.post("/api/tasks", api.add);

// PUT
app.put("/api/tasks/:id", api.edit);

// DELETE
app.del("/api/tasks/:id", api.remove);

// Redirect to index
app.get("*", index);

// Start server!
app.listen(app.get("port"), function(){
	console.log("Express server listening on port " + app.get("port") + " in " + app.setting.env + " mode.");
});
