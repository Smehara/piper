var device_name_h = "close"
var hosturl_h = "https://rlkfb5ndw1.execute-api.ap-northeast-1.amazonaws.com/handson"
var apiurl_h = hosturl_h + "/datas/" + device_name_h

//-------------------------------------------
function createChart_h() {
    reqGet_h(device_name_h);
}
//-------------------------------------------
// QueryDyanmo()
//    execute query to DynamoDB
//-------------------------------------------
function reqGet_h(device_name_h) {
    console.log("reqGet_h() start");
    res = $.get(apiurl_h, function(){

        }).done(function(data){
            jsonData = JSON.stringify(data);
            console.log(jsonData);
            drawChart_h(data[device_name_h]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        });
}
//-------------------------------------------
// drawChart()
//-------------------------------------------
function drawChart_h(vals) {
    console.log("drawChart_h() start");
    var val_list = []
    for (i=vals.length-1; i >= 100; i--){
      console.log(vals[i])
      var item = {"label": vals[i].timestamp, "y": vals[i].value};        
      val_list.push(item)
    }
    //! DrawChart kick
    var canvas = document.getElementById('chart_h');
    var charts = new CanvasJS.Chart(canvas,
        {
            axisY:{
                title: "humidity",
                minimum:50,
                maximum:100,
                labelFontSize: 14
            },
            axisX:{
                title: "timestamp",
                interval:20,
                gridThickness: 2
            },
            title:{
                text:"湿度（％）"
            },
            data:[{
                type:"line",
                dataPoints: val_list
            }]
        });
    charts.render();
}