
$(document).ready(function () {
    //多文件上传
    $("#ImageFileUpload").change(function (event) {
        if (document.getElementById('ImageFileUpload').value != '') {
        //检查扩展名
//var stuff = obj.value.substr(obj.value.length-3, 3);  
//        if (stuff != 'xls') {  
//            alert('文件类型不正确，请选择xls文件');  
//            return false;  
            //        }  
//开始上传
            document.getElementById('imgplusmsg').innerHTML = '上传中...';
            document.getElementById('FormUpload').submit(); 
        }
    });
    $("#ImageFileUpload").click(function (event) {
        $('#imgplusmsg').text('');
    });
    //对话框显示图片
//    $(".imgthumbnail").click(function (event) {
//        $('#dialogImage').modal('show');
//        $('#imgFull').attr("src", $(this).children(0).attr("src"));
//        window.open($(this).children(0).attr("src"), 'imgwindow', 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
    });

//    $(".close").click(function (event) {
//        //确认删除，调用删除，刷新页面
//        $('#dialogImage').modal('hide');
//        alert($('#imgFull').attr("src"));
//        window.location.reload();
//    });


//    $(".DraggableModal").draggable({
//        handle: ".modal-header",
//        cursor: 'move',
//        refreshPositions: false
//    });
//});

//----------------------------------------------------------------------------------------
function DelFile(UploadID,KV,FileName) {
    var msg = '您确定要删除吗？';
    if (!confirm(msg)) return false;
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=DeleteUploadFile&UploadID=" + UploadID + "&KV=" + KV + "&FN=" + FileName + "&Token=" + dt.getMilliseconds();
    //alert(url);
    $.get(url, function (json) {
        if (json.LoginResult == "OK") {
            window.location.href = window.location.href;
        }
    });
}