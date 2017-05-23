var express = require ('express');
var sentences = require(__dirname + '/models/sentences.js');
var bodyParser = require('body-parser');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.locals.showTests = (app.get('env') !== 'production' && req.query.test === '1');
	next();
});

app.get('/',function(req, res){
	res.render('home');	
})

app.get('/about',function(req, res){
	res.render('about', {pageTestScript: '/qa/tests-about.js'});
});

app.post('/', function(req, res){
	sentences.getSentence(res);
});

app.use(function(req, res, next){
	res.status(404);
	res.render('404');	
})

app.listen(app.get('port'),function(){
	
	console.log('listening on port ' + app.get('port') + ' env: ' + app.get('env'));
	
});