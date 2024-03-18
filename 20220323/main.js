let player;//youtube player
let currentPlay = 0;//record now play songs order

//Youtube API ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars: {
            autoplay: 0,//是否自動撥放
            controls: 0,//是否顯示控制項
            start: playTime[currentPlay][0],//開始秒數
            end: playTime[currentPlay][1],//end sec
            iv_load_policy: 3

        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });

}

//Youtube Player Ready

function onPlayerReady(event) {
    $("#playButton").on("click", function () {
        $("h2").text(player.getVideoData());
        player.playVideo();
    });
    $("#pauseButton").on("click", function () {
        player.pauseVideo();

    });
    $("#setsec").on("click", function () {
        player.seekTo(player.getCurrentTime() + 5);
    });


}//除了播放以外增加暫停和快進五秒的功能

//Player State Change

function onPlayerStateChange(event) {
    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        }
    }

    $("h2").text(player.getVideoData().title);


}
