$(function(){//=document.ready()
    //存目前答題數
    var currentQuiz=null;
    //當按鈕按下之後要做的事情
    $("#startButton").on("click",function(){
        //如果還沒作答就從這裡開始
        if(currentQuiz==null){
            //設定目前作答從地靈提開始
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //將選向區清空
            $("#options").empty();
            //將選項逐個加入
            //question[0].answer is array, use forEach to search
            questions[0].answers.forEach
            (function (element,index,array){
                $("#options").append(`<input name='options' type='radio'
                value='${index}'><label>${element[0]}</label><br><br>`);
                //element 0 是選項內容
                
            });
            //按鈕文字換成next
            $("#startButton").attr("value","Next");

        }
        else{
            //已經開始作答從這繼續
            //檢查哪個選項被選取radio document
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    //是否要產生結果
                    //debugger;//answer
                    //isNaN判斷是否為數字        後面的判斷是否需要繼續
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最終結果
                        var finalResult=questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //選項區域清空
                        $("#options").empty();
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><r>`);
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else{
                        //指定下議題
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;//題目陣列從零開始
                        //顯示新題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' 
                            type='radio' value='${index}'<label>${element[0]}</label><br><br>`);
                        })

                    }
                    return false;//跳離迴圈的方式//若第一個就選到，可以省時間
                }
            });
        }
    });
});