var Crawler = require("crawler");
const cheerio = require('cheerio')
const fs = require('fs');
const path = require("path");
const config = require('./config.json');

const DIST = config.destination;
var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

var totalPages = 921;
var wtriteTimes = 0;
var baseUrl ='http://www.koreantk.com/ktkp2014/thesis/';
var sectionviewUri = './selection-view.view?ctrlNos={0}&koFields=ttl%40%EC%A0%9C%EB%AA%A9&koFields=issn%40ISSN&koFields=socNm%40%ED%95%99%ED%9A%8C%EB%AA%85&koFields=jrlTtl%40%ED%95%99%EC%88%A0%EC%A7%80%EB%AA%85&koFields=volNoNm%40%EA%B6%8C%ED%98%B8%EB%AA%85&koFields=pg%40%ED%8E%98%EC%9D%B4%EC%A7%80&koFields=pbls%40%EB%B0%9C%ED%96%89%EA%B8%B0%EA%B4%80&koFields=pubYr%40%EB%B0%9C%ED%96%89%EB%85%84%EB%8F%84&koFields=pubDt%40%EB%B0%9C%ED%96%89%EC%9D%BC%EC%9E%90&koFields=locOrganizList%40%EC%86%8C%EC%9E%A5%EA%B8%B0%EA%B4%80&koFields=authorNmList%40%EC%A0%80%EC%9E%90%EB%AA%85&koFields=authorNmCnList%40%EC%A0%80%EC%9E%90%28%ED%95%9C%EC%9E%90%29&koFields=cprtSrcList%40%EC%86%8C%EC%86%8D%EA%B8%B0%EA%B4%80&koFields=keywrdList%40%EC%A0%80%EC%9E%90%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdMedList%40%EC%95%BD%EC%9E%AC%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdPreList%40%EC%B2%98%EB%B0%A9%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdDisList%40%EB%B3%91%EC%A6%9D%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdEtcList%40%EA%B8%B0%ED%83%80%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=abs%40%EC%B4%88%EB%A1%9D&koFields=chemList%40%EA%B4%80%EB%A0%A8%ED%99%94%ED%95%A9%EB%AC%BC&koFields=ipcClssCdList%40IPC%EB%B6%84%EB%A5%98%EC%BD%94%EB%93%9C';

var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            var $$ = cheerio.load($('.box_type2').html());
            $$('caption').remove();
            $$('.btn_wrap').remove();
            wtriteTimes = wtriteTimes+1;
            // console.log(wtriteTimes)
            fs.appendFile('./table-html/'+res.options.filename+wtriteTimes.toString(), $$('body').html(),function(err){
                if (err) console.log(err);
            });
        }
        done();
    }
});
 
// Queue just one URL, with default callback
var readfileAndCallTable = function(){
    // var totalData =[];
    for (i = 0; i < totalPages; i++) {
        var filename = './viewData/한국식품저장유통학회-'+i.toString()
        var fileBaseSection = {};
        var ctrlString ='';
        var data = fs.readFileSync(filename);
        var arr = JSON.parse(data);
        console.log(arr.length);
        var addrArr = [];
        arr.forEach(function(obj){
            addrArr.push(obj.filename);
        })
        ctrlString = addrArr.join(',');
        fileBaseSection.filename = '한국식품저장유통학회-view-';
        fileBaseSection.uri = sectionviewUri.replace('./',baseUrl).replace('{0}',ctrlString);
        c.queue(fileBaseSection);
    }
}
readfileAndCallTable();
