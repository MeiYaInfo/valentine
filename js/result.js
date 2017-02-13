$(function () {
    var app = new Vue({

        el: 'body',

        data: function () {
            return {
                name: 'name',
                time: 'time',
                location: 'location',
                event: 'event',
                people: 'people'
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
            var data = {
                status: 200,
                data: {
                    "time": "time1",
                    "location": "location2",
                    "event": "event3",
                    "people": "people4"
                },
                message: 'success'
            };
            // $.get('./search', queryData, function (data) {
                if (data.status == 200) {
                    self.time = data.data.time;
                    self.location = data.data.location;
                    self.event = data.data.event;
                    self.people = data.data.people;
                } else {
                    console.log(data.message);
                }
            // });
        },

        methods: {

            GetQueryString: function (name) {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return decodeURI(r[2]);
                };
                return null;
            }

        },

        ready: function () {
            $(".result span").css({
                fontSize: $(".result span").height() * 0.6 + "px",
                lineHeight: $(".result span").height() + "px"
            });

            // 预加载
            // var img = new Image();
            // img.src = "./public/save.png";
            $('.save').click(function () {
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

        }

    })
})