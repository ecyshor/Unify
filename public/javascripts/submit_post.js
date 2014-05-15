/**
 * Created by Nicu on 16/05/14.
 */
$('#postForm').submit(function (e) {
    e.preventDefault();
    $.post('/create',
        {channel: $('#postChannel').val(), data: $('#postData').val()});
});