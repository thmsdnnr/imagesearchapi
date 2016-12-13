var express=require('express');
var mongo=require('mongodb').MongoClient;
var https=require('https');
var path=require('path');
var bodyParser=require('body-parser');
var request=require('request');
var db_url=process.env.PROD_DB||'mongodb://localhost:27017/';
var app=express();
app.use(express.static('/'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*
function returnIfExists(squee,offset) {
mongo.connect(db_url, function(err, db){ if (!err) {
db.collection('squeeze').findOne({'term':squee, 'offset':offset},{'_id':0,'term':0,'when':0,'offset':0}, function(err, data){
if (data!==null) { return rawDataPretty(JSON.parse(data)); }
else { return false; }
});
}});}*/

function addQuery(squee,offset,res_set) {//default to zero offset
// doesn't exist so save
mongo.connect(db_url, function(err, db){ if (!err) {
db.collection('squeeze').save({'term':squee, 'when': new Date().toISOString(), 'offset':(offset||0), 'result':res_set});
}});}

function latestQueries(res,num_res) {
var howMany=(num_res||10);
mongo.connect(db_url, function(err, db){
if (!err) { 
db.collection('squeeze').find({},{sort:{'when':1}, fields:{'offset':0,'result':0,'_id':0}}).limit(howMany).toArray(function(err, results){
if(!err){res.send(results);} 
else{console.log(err);} 
})}});}

app.get('/api/imagesearch/*', function(req,res) {
var q=req.query.q; 
var o=(req.query.o||0); 

var options = {
url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+q+'&count=10&offset='+o+'&mkt=en-us&safeSearch=Moderate',
method: 'GET',
headers: {'Ocp-Apim-Subscription-Key': process.env.API_KEY } 
};

if((q.match(/^[A-Za-z]{2,}/))&&(q.length<1500)){ //go ahead and submit query after reasonable validation
function callback(err, response, body) {
if (!err && response.statusCode == 200) {
var info=JSON.parse(body);
var resultArr=[];
for (var im in info.value) {
var s=info.value[im];
resultArr.push({'image_url':s.contentUrl,'thumb_url':s.thumbnailUrl,'alt_text':s.name,'page_url':s.hostPageUrl});
}
addQuery(q,o,resultArr);
res.send(resultArr);
}
}
request(options, callback);
}});

app.get('/api/latest', function(req,res) {latestQueries(res);});
app.get('*', function(req,res) {res.sendFile(path.join(__dirname,'index.html'));});
app.listen((process.env.PORT||8080), function(){console.log('listening to uuuuu');});
