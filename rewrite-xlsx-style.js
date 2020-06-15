var Excel = require('exceljs');
const path = require("path");
const config = require('./config.json');


const DIST = config.destination;
var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

var workbook = new Excel.Workbook();

workbook.xlsx.readFile(dist('section-data/한국식품저장유통학회.xlsx'))
    .then(function(data) {
        data.eachSheet(function(ws, sheetId) {
            
            for(i = 0;i < 21; i++){
            	if(i==18){
            		ws.getColumn(i+1).width = 50;
            	}else{
            		ws.getColumn(i+1).width = 12;
            	}
            }
            ws.eachRow(function(row, rowNumber) {
                row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                    if (rowNumber == 1) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'darkTrellis',
                            fgColor: { argb: 'FFFFFF00' },
                            bgColor: { argb: 'FF0000FF' }
                        };
                        cell.alignment = {
                            vertical: 'middle',
                            horizontal: 'center',
                            wrapText: true
                        };
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    }else{
                        cell.alignment = {
                            vertical: 'middle',
                            horizontal: 'left',
                            wrapText: true
                        };
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    }
                });
            });
        });
        workbook.xlsx.writeFile(dist('./final-data/한국식품저장유통학회-921.xlsx'))
        .then(function() {
            // done
        });
    });