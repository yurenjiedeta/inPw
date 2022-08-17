var myAudio = mAudio.default;
var AudioPlaylist = mAudio.AudioPlaylist;
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

//上面是针对单条的，下面是针对一个列表的

var pall = $("#play-all");
pall.click(function () {
    playAll();
})
function playAll() {
    var files = [];
    playList.each(function (v, k) {
        var file = "./static/audios/" + $(this).html() + ".mp3";
        files.push(file)
    })
    const playlist = AudioPlaylist({
        files: files
        // files: ['./songOne.mp3', './songTwo.mp3', './songThree.mp3'],
        // volume: 0.7,
    });
    playlist.play();
}
/* var bList = document.getElementsByTagName("b");
var iList = document.getElementsByTagName("i");
for (var i = 0; i < bList.length; i++) {
    bList[i].addEventListener("click", function (event) {
        var file = event.target.getAttribute("src");
        file && playMp3(file);
    }, false)
} */



// 显示生词与否
/* $(".show-words").click(function () {
    $(this).next("div").slideToggle()
}) */