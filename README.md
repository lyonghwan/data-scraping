# data-sraping

1. Check list, Make url & fileName
   - ctrlNos-urls
   - 검색 대상 페이지 구성하여 Crawler에 queque로 넣어 줌
   - Crawler는 해당 queque에서 하나하나 처리하며 callback호출
   - callback에서 특정 CSS Element에서 Link조회 -> ID추출 -> selectionView의 URL에 변수 치환 
     -> List의 Page별로 데이터 저장

2. Split
   - 한페이지당 데이터가 너무 많으면 해당 파일만 여러파일로 분리 시킨다.

3. Url에 의거하여 해당 화면의 html table을 다운로드한다.
   - download-table

4. Html to Json Data, and Json to Xlsx
   - make-selection-view-to-data

5. rewrite excel with formatting
   - rewrite-xlsx-style
