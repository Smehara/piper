var device_name_t = "close"
var hosturl_t = "https://nogi2phqp6.execute-api.ap-northeast-1.amazonaws.com/handson"
var apiurl_t = hosturl_t + "/datas/" + device_name_t

//-------------------------------------------
function createChart_t() {
    reqGet_t(device_name_t);
}
//-------------------------------------------
// QueryDyanmo()
//    execute query to DynamoDB
//-------------------------------------------
function reqGet_t(device_name_t) {
    console.log("reqGet_t() start");
    res = $.get(apiurl_t, function(){

        }).done(function(data){
            jsonData = JSON.stringify(data);
            console.log(jsonData);
            drawChart_t(data[device_name_t]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        });
}
//-------------------------------------------
// drawChart()
//-------------------------------------------
function drawChart_t(vals) {
    console.log("drawChart_t() start");
    var val_list = []
    for (i=vals.length-100; i >= 0; i--){
      console.log(vals[i])
      var item = {"label": vals[i].timestamp, "y": vals[i].value};        
      val_list.push(item)
    }
    //! DrawChart kick
    var canvas = document.getElementById('chart_t');
    var charts = new CanvasJS.Chart(canvas,
        {
            axisY:{
                title: "temperature",
                minimum:26,
                maximum:29,
                labelFontSize: 14
            },
            axisX:{
                title: "timestamp",
                interval:20,
                gridThickness: 2
            },
            title:{
                text:"気温（℃）"
            },
            data:[{
                type:"line",
                dataPoints: val_list
            }]
        });
    charts.render();
}