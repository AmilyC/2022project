//const { event } = require("jquery");

let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;//障礙物，主角

//mapArray -決定地圖中每個格子的元素
//ctx - HTML5 Canvas 用
//currentImgMainX,currentImgMainY 
//- 決定主角所在座標
const gridLength = 200;
//網頁載入後完成初始化動作
$(function () {
    mapArray = [
        //0可走1障礙2終點3敵人
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };

    imgMain.onload = function () {
        ctx.drawImage(
            imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);//放人從0,0-80,130
    }

    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    //ensure 山和敵人都在
    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (var x in mapArray) {
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 1) {
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);

                    }
                    else if (mapArray[x][y] == 3) {
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);

                    }
                }
            }
        }
    }




});






//處理使用者按下按鍵
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    //targetImg targetBlock主角要到的座標 /主角要到的
    //cutImagePositionX - 決定主角臉朝的方向
    targetImg = {
        "x": -1,
        "y": -1
    }

    targetBlock = {
        "x": -1,
        "y": -1
    }

    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁
    switch (event.code) {

        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;

        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;

        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝又
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝上
            break;

        default://其他案件不處理
            return;
    }
    //判斷是否為合法範圍
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    //清空主角原本所在位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);


    if (targetBlock.x != -1 && targetBlock.y != -1) {

        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0://一般道路(可移動)
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1://有障礙物(不可移動)
                $("#talkBox").text("有山");
                break;
            case 2://終點(可移動)
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;

                break;
            case 3: //敵人(不可移動)
                $("#talkBox").text("哈囉");
                break;




        }

    }
    else {
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);



});

