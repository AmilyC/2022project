function start() {
    var button = $("#dinner").val();
}
$(function () {
    $("#button").on("click", function () {
        //$("h1").text($("li").eq(2).text());
        var numberoflistitem = $("li").length;
        var randomChildNumber = Math.floor(Math.random() * numberoflistitem);
        $("h1").text($("li").eq(randomChildNumber).text());
       // $("h1").text($("li").eq(randomChildNumber).text());
        $("#b").attr("src", randomChildNumber + ".jpg").attr("width", "500px").attr("hright", "500px");
        //$("img").attr("width",  "100px");
    })
})