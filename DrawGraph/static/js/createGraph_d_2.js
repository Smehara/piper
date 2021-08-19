var device_name_d = "close"
var hosturl_d = "https://k114257953.execute-api.ap-northeast-1.amazonaws.com/handson"
var apiurl_d = hosturl_d + "/datas/" + device_name_d

//-------------------------------------------
function createChart_d() {
    reqGet_d(device_name_d);
}
//-------------------------------------------
// QueryDyanmo()
//    execute query to DynamoDB
//-------------------------------------------
function reqGet_d(device_name_d) {
    console.log("reqGet_d() start");
    res = $.get(apiurl_d, function(){

        }).done(function(data){
            jsonData = JSON.stringify(data);
            console.log(jsonData);
            drawChart_d(data[device_name_d]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        });
}
//-------------------------------------------
// drawChart()
//-------------------------------------------
function drawChart_d(vals) {
    console.log("drawChart_d() start");
    var val_list = []
    for (i=vals.length-100; i >= 0; i--){
      console.log(vals[i])
      var item = {"label": vals[i].timestamp, "y": vals[i].value};        
      val_list.push(item)
    }
    //! DrawChart kick
    var canvas = document.getElementById('chart_d');
    var charts = new CanvasJS.Chart(canvas,
        {
            axisY:{
                title: "distance",
                minimum:0,
                maximum:1.5,
                labelFontSize: 14
            },
            axisX:{
                title: "timestamp",
                interval:20,
                gridThickness: 2
            },
            title:{
                text:"距離（m）"
            },
            data:[{
                type:"line",
                dataPoints: val_list
            }]
        });
    charts.render();
}