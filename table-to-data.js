const cheerio = require('cheerio')
const fs = require('fs');
const json2xls = require('json2xls');
const path = require("path");
const config = require('./config.json');
 
const DIST = config.destination;
var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

var totalPages = 920;
var readfileAndParse = function(){
    // var totalData =[];
    var dataArray = [];
    for (i = 0; i < totalPages; i++) {
        var filename = '한국식품저장유통학회-view-'+(i+1).toString()
        var filepath = './table-html/';
        var data = fs.readFileSync(dist(filepath+filename));
        var $ = cheerio.load(data);
        $('caption').remove();
        $('.btn_wrap').remove();
        $('table').each(function(index, element){
            dataArray.push(htmlToJson($(this)));
        })
    }
    var j2xconf ={};
    j2xconf.name = "한국조리과학회";
    var xls = json2xls(dataArray,j2xconf);
    fs.writeFileSync(dist('./section-data/한국식품저장유통학회.xlsx'), xls, 'binary');
}

var htmlToJson = function(table) {
    var obj = {},
        itemsLength = table.find('tr').length;
    table.find('tr').each(function(index,element){
        key = cheerio(this).find('th').text();
        value = cheerio(this).find('td').text().replace(/\t/g,'');
        obj[key] = value;
    })
    return obj
}
readfileAndParse();