var myAudio = mAudio.default;
// MP3文件播放方法
function playMp3(file) {
    var audio = myAudio({
        file: file,
        loop: false,
        volume: 1,
    });
    audio.play();
}
// 文章内容播放逻辑
var playList = $("b,i");
playList.click(function () {
    var file = "./static/audios/" + $(this).html() + ".mp3";
    file && playMp3(file)
})
/* var bList = document.getElementsByTagName("b");
var iList = document.getElementsByTagName("i");
for (var i = 0; i < bList.length; i++) {
    bList[i].addEventListener("click", function (event) {
        var file = event.target.getAttribute("src");
        file && playMp3(file);
    }, false)
} */



// 显示生词与否
$(".show-words").click(function () {
    $(this).next("div").slideToggle()
})