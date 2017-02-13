$(function () {

    // 首次点击年龄载入年龄数据，并设置初始值为20
    $('#ageinput').click(function (e) {
        e.preventDefault();
        $('#ageinput').hide();
        $('#ageselect_dummy').show();
        $('#ageselect_dummy').click();
    });
    var options = '';
    for (var i = 1; i <= 100; i ++) {
        options += '<option value="' + i + '">' + i + '</option>';
    }
    $('#ageselect').html(options);
    $('#ageselect').val('20');
    $('#ageselect').mobiscroll().select({
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom',
        minWidth: 200
    });

    // 设置性别
    var sex = 'female';
    var female = $('.female');
    var male = $('.male');
    $('.female').click(function () {
        if (sex == 'male') {
            sex = 'female';
            male.removeClass('selected');
            female.addClass('selected');
        }
    })
    $('.male').click(function () {
        if (sex == 'female') {
            sex = 'male';
            female.removeClass('selected');
            male.addClass('selected');
        }
    })

    // 点击提交按钮
    $('.btn-submit').click(function () {
        var name = encodeURI($('#name').val()),
            age = $('#ageselect').val(),
            sex = $('.sex').find('.selected').data('sex');
        if (name == '') {
            return alert('请输入姓名');
        }
        if ($('#ageinput').css('display') != 'none') {
            return alert('请选择年龄');
        }
        window.location.href = './result.html?name=' + name + '&age=' + age + '&sex=' + sex;
    })
    
});







