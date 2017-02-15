$(function () {
    var app = new Vue({

        el: 'body',

        data: function () {
            return {
                name: 'name',
                time: 'time',
                location: 'location',
                event: 'event',
                people: 'people',
                showcanvas: true,
                imgsrc: ''
            }
        },

        created: function () {
            var self = this;
            this.name = decodeURI(this.GetQueryString('name'));
            this.age = this.GetQueryString('age');
            this.sex = this.GetQueryString('sex');
            $('title').html(this.name + '的春天竟然在......');
            var queryData = {
                name: this.name,
                age: this.age,
                sex: this.sex
            };
            // var data = {
            //     status: 200,
            //     data: {
            //         "time": "time1",
            //         "location": "location2",
            //         "event": "event3",
            //         "people": "people4"
            //     },
            //     message: 'success'
            // };
            $.getJSON('./search', queryData, function (data) {
                if (data.status == 200) {
                    self.time = data.data.time;
                    self.location = data.data.location;
                    self.event = data.data.event;
                    self.people = data.data.people;
                } else {
                    alert(data.message);
                }
            });
        },

        methods: {

            GetQueryString: function (name) {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return decodeURI(r[2]);
                };
                return null;
            },

            drawResult: function () {
                $(".result span").css({
                    fontSize: $(".result").height()  * 0.6 / 8 + "px",
                    lineHeight: $(".result").height() / 8 + "px"
                });
            }

        },

        ready: function () {
            var self = this;
            this.drawResult();

            $('.save').click(function () {

                // 生成可以保存的canvas
                var mwidth = 250;
                var saveimg = new Image();
                saveimg.src = "./public/save.png";
                saveimg.onload = function () {
                    var hwdivision = saveimg.height / saveimg.width;
                    saveimg.width = mwidth;
                    saveimg.height = mwidth * hwdivision;
                    var mheight = saveimg.height;
                    $('#resultcanvas').attr('width', mwidth);
                    $('#resultcanvas').attr('height', mwidth * hwdivision);
                    var c = $('#resultcanvas')[0].getContext('2d');
                    c.drawImage(saveimg, 0, 0, mwidth, mheight);

                    // 画文字
                    html2canvas($('.result')[0], {
                        onrendered: function(canvas) {
                            // var canvasimg = document.createElement("img");
                            // canvasimg.src = canvas.toDataURL("image/png");
                            // $(canvasimg).attr('width', 170);
                            // $(canvasimg).attr('height', 170);
                            c.drawImage(canvas, mwidth * 0.15, mheight * 0.3, 170, 180);
                            self.imgsrc = $('#resultcanvas')[0].toDataURL("image/png");
                            self.showcanvas = false;
                        }
                    });
                };
                $('#mcover1').fadeIn();
            })

            // 点击关闭模态框
            $('.mclose').click(function () {
                $('#mcover1').fadeOut();
            })

            // 再测一次
            $('.repeat').click(function () {
                window.location.href = './index.html';
            })

            // 分享
            $('.share').click(function () {
                $('#mcover2').fadeIn();
                $('#mcover2').click(function () {
                    $('#mcover2').fadeOut();
                })
            })

            // 点击音乐开关
            $("#audio_btn").click(function(){
                var music = document.getElementById("music");
                if (music.paused) {
                    music.play();
                    $("#music_btn").attr("src","./public/music-on.png");
                } else {
                    music.pause();
                    $("#music_btn").attr("src","./public/music-off.png");
                }
            });
            $('html').one('touchstart',function(){
                document.getElementById("music").play();
            });

        }

    })
})