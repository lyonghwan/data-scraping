var Crawler = require("crawler");
const cheerio = require('cheerio')
const fs = require('fs');
const path = require("path");
const config = require('./config.json');

const DIST = config.destination;
var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};
/**
 * 식품류의 코드
 * @type {Number}
 */
var listPage = 'http://www.koreantk.com/ktkp2014/thesis/search-by-expr.page?expr=SNM%3A%ED%95%9C%EA%B5%AD%EC%B6%95%EC%82%B0%EC%8B%9D%ED%92%88%ED%95%99%ED%9A%8C&sl=&setId={sessionId}&pageNo={pageNo}';
var totalPages = 9;
var x = 0;
var baseUrl ='http://www.koreantk.com/ktkp2014/thesis/';
var sectionviewUri = './selection-view.view?ctrlNos={0}&koFields=ttl%40%EC%A0%9C%EB%AA%A9&koFields=issn%40ISSN&koFields=socNm%40%ED%95%99%ED%9A%8C%EB%AA%85&koFields=jrlTtl%40%ED%95%99%EC%88%A0%EC%A7%80%EB%AA%85&koFields=volNoNm%40%EA%B6%8C%ED%98%B8%EB%AA%85&koFields=pg%40%ED%8E%98%EC%9D%B4%EC%A7%80&koFields=pbls%40%EB%B0%9C%ED%96%89%EA%B8%B0%EA%B4%80&koFields=pubYr%40%EB%B0%9C%ED%96%89%EB%85%84%EB%8F%84&koFields=pubDt%40%EB%B0%9C%ED%96%89%EC%9D%BC%EC%9E%90&koFields=locOrganizList%40%EC%86%8C%EC%9E%A5%EA%B8%B0%EA%B4%80&koFields=authorNmList%40%EC%A0%80%EC%9E%90%EB%AA%85&koFields=authorNmCnList%40%EC%A0%80%EC%9E%90%28%ED%95%9C%EC%9E%90%29&koFields=cprtSrcList%40%EC%86%8C%EC%86%8D%EA%B8%B0%EA%B4%80&koFields=keywrdList%40%EC%A0%80%EC%9E%90%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdMedList%40%EC%95%BD%EC%9E%AC%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdPreList%40%EC%B2%98%EB%B0%A9%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdDisList%40%EB%B3%91%EC%A6%9D%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=keywrdEtcList%40%EA%B8%B0%ED%83%80%ED%82%A4%EC%9B%8C%EB%93%9C&koFields=abs%40%EC%B4%88%EB%A1%9D&koFields=chemList%40%EA%B4%80%EB%A0%A8%ED%99%94%ED%95%A9%EB%AC%BC&koFields=ipcClssCdList%40IPC%EB%B6%84%EB%A5%98%EC%BD%94%EB%93%9C';

var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        var viewUrlList = [];
        if(error){
            console.log('ERROR',error);
        }else{
            var $ = res.$;
            $('.tss-ttl').each(function(el){
                var obj = {};
                obj.filename = $(this).attr('href').replace('/ktkp2014/thesis/thesis-view.view?ctrlNo=','');
                obj.uri = sectionviewUri.replace('./',baseUrl).replace('{0}',obj.filename);
                viewUrlList.push(obj);
            });
        }
        // var i,j,temparray,chunk = 1;
        // for (i=0,j=viewUrlList.length; i<j; i+=chunk) {
            // temparray = viewUrlList.slice(i,i+chunk);
            var filename = './viewData/한국식품저장유통학회'+'-'+x.toString();
            fs.appendFileSync(filename, JSON.stringify(viewUrlList));
            x=x+1;
            // do whatever
        // }
        done();
    }
});

var makeListUrlAndCall = function (){
    var i;
    var queue = [];
    var listpageForJeJang = 'http://www.koreantk.com/ktkp2014/thesis/list-by-society.page?&socTpCd=2&socCd=postap&kojic=SPOSBX&pubYr={yr}';

    for (i = 0; i < totalPages; i++) {
        var obj = {};
        var yr = 2010 + i;
        obj.uri = listpageForJeJang.replace('{sessionId}','678128').replace('{yr}',(yr).toString());
        // obj.uri = listPage.replace('{sessionId}','678128').replace('{pageNo}',(i+1).toString());
        obj.filename = '한국식품저장유통학회-'+i.toString();
        queue.push(obj);
    }
    c.queue(queue);
}

makeListUrlAndCall();









