var startDate = new Date();
var input;
var month;
var day;
document.getElementById("date").addEventListener("change", function () {
    input = this.value;
    month = (input.slice(5, 7));
    day = (input.slice(8, 10));
    //console.log(month);
    //console.log(day);

    setMonthAndDay(month, day);



});
/*date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2);*/
//console.log(date);
function setMonthAndDay(startMonth, startDay) {
    //一次設定好月分與日期

    startDate.setMonth(startMonth - 1, startDay);//setMonth function 可以同時指定月日，Jan 是零
    startDate.setHours(0);
    startDate.setSeconds(0);
    $("#courseTable").empty();
    table();

    //console.log(startDate);
    //console.log(new Date(startDate.getTime()).toLocaleDateString().slice(5));

}
//console.log(startDate);

function table() {

    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    let topicCount = topic.length;
    let millisecPerDay = 24 * 60 * 60 * 1000;

    //debugger;
    /*for (var x = 0; x < topicCount; x++) {
        $("#courseTable").append(
            //`可以有變數去做串接
            "<tr>" + `<td>${x + 1}` + `<td>預計日期</td>` + `<td>${topic[x]}</td>` + "<tr>"
        );
    }*/
    //debugger;
    /*for (var x = 0; x < topicCount; x++) {
        debugger;
        $("#courseTable").append(
            "<tr>" + `<td>${x + 1}` + `<td>${startDate + 7 * x}</td>` + `<td>${topic[x]}</td>` + "<tr>"
        );
    }*/
    console.log(startDate);
    for (var x = 0; x < topicCount; x++) {


        $("#courseTable").append(
            "<tr>" + `<td>${x + 1}` + `<td>${new Date(startDate.getTime() + 7 * x * millisecPerDay)
                .toLocaleDateString().slice(5)}</td>` + `<td>${topic[x]}</td>` + "<tr>"
        );
        if (topic[x] == "國定假日") {
            $(`tr:eq(3)`).css("color", "rgb(203,27,69)");

        }
    }


}
