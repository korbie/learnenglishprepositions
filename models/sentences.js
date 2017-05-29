var fs = require('fs');

var sampleSentence1 = {
	text : ['The pen is', '#on#1', 'the notebook', '.'],
	img : '1000'
};
var sampleSentence2 = {
	text : ['The saucer is', '#under#1', 'the cup', '.'],
	img : '1000'
};
var sampleSentence3 = {
	text : ['The pencils are', '#in#1', 'the cup', '.'],
	img : '1001'
};
var sampleSentence4 = {
	text : ['The notebook is', '#beside#1', 'the cup', '.'],
	img : '1001'
};

var sentences = [sampleSentence1, sampleSentence2, sampleSentence3, sampleSentence4];

var isPunctuation = function(e){
	return (e === '.' || e === '?' || e === '!' || e === '...');
};

var findDefinition = function(j){
	return j;
};

var parsePreposition = function(e, i){
	var chars = e.split('');
	var txt = '';
	var def = '';
	var output = {t : '', p : true, d : 'unknown definition'};
	var i = 1;
	var foundEnd = false;
	for (i = 1; i < chars.length; i++){
		if (chars[i] === '#'){
			foundEnd = true;
			continue;
		}
		else if (foundEnd){
			def += chars[i];
		}
		else{
			txt += chars[i];
		}
	}
	output.t = (txt);
	output.d = findDefinition(parseInt(def));
	return output;
};

var getSentence = function(res){
	var sentenceNumber = Math.floor(Math.random() * 4);
	var output = {	txt : [],
					fileName: ''};
	output.fileName = sentences[sentenceNumber].img;
	sentences[sentenceNumber].text.forEach(function(e, i){
		if (i !== 0 && e.charAt(0) !== '#' && !isPunctuation(e)){
			output.txt.push({t : (' ' + e), p : false});
		}
		else if ((i === 0 || isPunctuation(e)) && e.charAt(0) !== '#'){
			output.txt.push({t : e, p : false});
		}
		else if (e.charAt(0) === '#'){
			output.txt.push(parsePreposition(e, i));
			if (i !== 0){//add space to end of prior string
				output.txt[i - 1].t = (output.txt[i - 1].t += ' ')
			}
		}
	});
	res.json(output);
};

exports.getSentence = getSentence;
