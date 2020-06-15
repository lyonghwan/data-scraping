var Crawler = require("crawler");
const cheerio = require('cheerio')
const fs = require('fs');
const path = require("path");
const config = require('./config.json');

const DIST = config.destination;
var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

// Queue just one URL, with default callback
var readfileAndCallTable = function(){
    // var totalData =[];
    var filename = './viewData/한국식품저장유통학회-53'
    var ctrlString ='';
    var data = fs.readFileSync(dist(filename));
    var arr = JSON.parse(data);
    
    var i =67;
    arr.forEach(function(obj){
        var addrArr = [];
        addrArr.push(obj)
        fs.appendFileSync(dist('./viewData/한국식품저장유통학회-'+i.toString()),JSON.stringify(addrArr));
        i= i+1;
    })
}
readfileAndCallTable();