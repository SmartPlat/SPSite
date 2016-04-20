//$(function () {
var CurProblemID = 1;
var iProgress = 0;
$(document).ready(function () {
    //alert(document.body.scrollHeight + "," + document.body.offsetHeight);
    //初始化页面
    //    $(".DraggableModal").draggable({
    //        handle: ".modal-header",
    //        cursor: 'move',
    //        refreshPositions: false
    //    });
    $('[data-toggle="tooltip"]').tooltip();

    //事件处理函数
    $("#cmdQuit").click(function (event) {
        event.preventDefault();
        if (confirm('您确定要退出吗？'))
            window.location.replace("login.aspx");
    });

    $("#cmdPwd").click(function (event) {
        ChangePassword();
    });
    $("#cmdSavePwd").click(function (event) {
        SavePassword();
    });
    $("#cmdDelMessage").click(function (event) {
        DelMessage();
    });

    $("#LastProblem").click(function (event) {
        //alert(CurProblemID);
        ShowProblem(CurProblemID - 1);
    });
    $("#NextProblem").click(function (event) {
        //alert(CurProblemID);
        ShowProblem(CurProblemID + 1);
    });

    //过滤特殊字符//~'",;!<>@#$%^&*()-+_=:
    $("#txtPWD").change(function (event) {
        $("#txtPWD").val($("#txtPWD").val().replace(/['";]/g, ""));
    });
    $("#txtPWD2").change(function (event) {
        $("#txtPWD2").val($("#txtPWD2").val().replace(/['";]/g, ""));
    });
    //修改密码回车保存
    $('#txtPWD2').keydown(function (e) {
        if (e.keyCode == 13) {
            SavePassword();
        }
    });
    //窗体大小改变时判断,有滚动条就取消fix
    //    ChangeFooter();
    //    window.onresize = function () {
    //        ChangeFooter();
    //    }

});
//
function ChangeFooter() {
    //alert(document.body.scrollHeight + "," + document.body.offsetHeight);
    if (document.body.scrollHeight == document.body.offsetHeight) {
        $('#footer').attr('class', 'footer');
    } else {
        $('#footer').attr('class', 'footerfix');
    }
}
//点击按钮
function ChangePassword() {
    $("#txtPWDP").val('');
    $("#txtPWD").val('');
    $("#txtPWD2").val('');
    $('#dialogChangePassword').modal('show');
}
//保存当前用户密码
function SavePassword() {
    if ($("#txtPWDP").val() == "") { alert('请输入旧密码!'); return false; }
    if ($("#txtPWD").val() == "") { alert('请输入新密码!'); return false; }
    if ($("#txtPWD2").val() == "") { alert('请确认新密码!'); return false; }
    if ($("#txtPWD").val() != $("#txtPWD2").val()) { alert('两次输入的新密码不一致!'); return false; }

    var dt = new Date;
    dt = dt.getMilliseconds();
    var url = "WebAPI.aspx?ServiceID=ChangePassword&P=" + $("#txtPWD").val() + "&O=" + $("#txtPWDP").val() + "&Token=" + dt.toString();
    //$("#txtPrompt").val(url);

    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('错误信息：' + textStatus + errorThrown);

        },
        success: function (json) {
            if (json.LoginResult == 'OK') {
                $('#dialogChangePassword').modal('hide');
                alert('密码修改成功!');
            }
            else {
                alert(json.LoginResult);
            }

        }
    });
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//查看试题

function ShowProblem(ProblemID) {
    if (ProblemID < 1) ProblemID = 1;
    if (ProblemID > 12) ProblemID = 12;
    CurProblemID = ProblemID;
    iProgress =Math.floor( CurProblemID * 100 / 12);
    //alert(document.documentElement.clientHeight);
    $(".modal-body").css('height', document.documentElement.clientHeight - 125 + 'px');
    $(".progress-text").html(iProgress + '%');
    $(".progress-bar").css('width', iProgress + '%');
    $("#MsgTitle").html($("#Task_" + ProblemID + " .media-heading").html());
    //alert($('#cmdMessage .badge').html());
    $('#dialogMessage').modal('show');
    //
    $.get("WebAPI.aspx?ServiceID=GetProblem&PID=" + ProblemID, function (strhtml) {
        //alert(strhtml);

        if (strhtml != '') {
            $("#MsgText").html(strhtml);
        }
        else {
            //alert(json.LoginResult);
        }
    });
}

//删除消息
function DelMessage() {
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=MessageDel&MsgID=" + CurMsgID + "&Token=" + dt.getMilliseconds();

    //alert(url);
    $.get(url, function (json) {
        if (json.LoginResult == 'OK') {
            //alert('删除消息成功!');
            $('#dialogChangePassword').modal('hide');
            window.location.reload(true);
        }
        else {
            alert(json.LoginResult);
        }
    });

}
//保存报表权重设置
function SaveOption() {
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=SaveOption"
            + "&ReportWeight1=" + $("#ReportWeight1").val()
            + "&ReportWeight2=" + $("#ReportWeight2").val()
            + "&Token=" + dt.getMilliseconds();
    //alert(url);
    $.get(url, function (json) {
        if (json.LoginResult == 'OK') {
            alert('保存设置成功!');
            //window.location.reload(true);
        }
        else {
            alert(json.LoginResult);
        }
    });
}
