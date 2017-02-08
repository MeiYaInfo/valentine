$(function () {
    var options = '';
    for (var i = 1; i <= 100; i ++) {
        options += '<option value="' + i + '">' + i + '</option>';
    }
    $('#age').append(options);
    $('#age').val('20');
    $('#age').mobiscroll().select({
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom',
        minWidth: 200
    });
})