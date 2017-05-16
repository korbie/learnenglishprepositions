var express = require ('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.get('/',function(req, res){
	res.render('home');	
})

app.get('/about',function(req, res){
	res.render('about');
});

app.use(function(req, res, next){
	res.status(404);
	res.render('404');	
})



app.listen(app.get('port'),function(){
	
	console.log('listening on port ' + app.get('port'));
	
});