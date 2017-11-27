// require friends.js for friends array
var friends = require("../data/friends.js");

module.exports = function(app) {
	// API get request
	app.get("/api/friends", function (req, res){
		res.json(friends);
	});

// API post request
	app.post("/api/friends", function (req, res){
	var scores = req.body.scores;
	var scoresArray = [];
	var match = 0;
	// loop through friends array and calculate score difference
	for(var i = 0; i < friends.length; i++) {
		var difference = 0;
		for(var j = 0; j < scores.length; j++) {
			difference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(scores[j])));
		}
		scoresArray.push(difference);
	}

// set friend match
	for(var i = 0; i < scores.length; i++) {
		if(scoresArray[i] <= scoresArray[match]) {
			match = i;
		}
	}

// set new friend and return new friend match, push new friend object to friends array
	var newFriend = friends[match];
	res.json(newFriend);
	friends.push(req.body);
	});
};
