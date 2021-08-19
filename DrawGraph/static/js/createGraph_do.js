var device_name_do = "close"
var hosturl_do = "https://peshturxjf.execute-api.ap-northeast-1.amazonaws.com/handson"
var apiurl_do = hosturl_do + "/datas/" + device_name_do

//-------------------------------------------
function createChart_do() {
    reqGet_do(device_name_do);
}
//-------------------------------------------
// QueryDyanmo()
//    execute query to DynamoDB
//-------------------------------------------
function reqGet_do(device_name_do) {
    console.log("reqGet_do() start");
    res = $.get(apiurl_do, function(){

        }).done(function(data){
            jsonData = JSON.stringify(data);
            console.log(jsonData);
            drawChart_do(data[device_name_do]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        });
}
//-------------------------------------------
// drawChart()
//-------------------------------------------
function drawChart_do(vals) {
    console.log("drawChart_do() start");
    var val_list = []
    for (i=vals.length-1; i >= 100; i--){
      console.log(vals[i])
      var item = {"label": vals[i].timestamp, "y": vals[i].value};        
      val_list.push(item)
    }
    //! DrawChart kick
    var canvas = document.getElementById('chart_do');
    var charts = new CanvasJS.Chart(canvas,
        {
            axisY:{
                title: "Door",
                minimum:0,
                maximum:1,
                labelFontSize: 14
            },
            axisX:{
                title: "timestamp",
                interval:20
            },
            title:{
                text:"ドアの開閉 1=open 0=close"
            },
            data:[{
                type:"area",
                dataPoints: val_list,
            }]
        });
    charts.render();
}