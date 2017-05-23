var fs = require('fs');

var sampleSentence = {
	text : 'The cup is on the table.',
	on : {start : 11, length : 2, definition: 'on1'},
	iteration: 0
};


var getSentence = function(res){
	fs.readFile(__dirname + '/../data_development/in.txt', 'utf8', function(err, data){
		var sentences = [];
		if (err){
			console.error(err);
		}
		else {
			console.log('getting sentence...');
			sentences = data.split('\n');
			sampleSentence.iteration ++;
			res.json(sampleSentence);
		}
	}); 
};

exports.getSentence = getSentence;
