$(function () {
    $('#UserPassword').keydown(function (e) {
        if (e.keyCode == 13) {
            login_submit();
        }
    });
    //显示上次账号
    $('#UserID').val(getCookie("ztid"));
    $("#loginbox").animate({ height: "360px" }, "slow", "swing", function () {
        $("#footer").animate({ width: "280px" }, "slow");
        //alert(document.body.clientWidth + ":" + document.body.scrollHeight);
    });


    
});
function login_submit() {
    var UserID = document.getElementById('UserID').value;
    if (UserID == "") { alert('请输入用户账号!'); return false; }
    var UserPassword = document.getElementById('UserPassword').value;
    if (UserPassword == "") { alert('请输入用户密码!'); return false; }


    document.getElementById("btnOK").disabled=true;
    document.getElementById("btnOK").value="正在登录...";

    var dt = new Date;
    dt = dt.getMilliseconds();
    var url = "WebAPI.aspx?ServiceID=Login" + "&UserID=" + escape(UserID) + "&UserPassword=" + UserPassword + "&Token=" + dt.toString();
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            document.getElementById("btnOK").disabled = false;
            document.getElementById("btnOK").value = "登录";
        },
        success: function (json) {
            if (json.LoginResult == 'OK') {
                //记住账号
                if ($("#SaveFlag").is(':checked') )
                { setCookie("ztid", $('#UserID').val()); }
                window.location.href = "Default.aspx";
            }
            else {
                document.getElementById("btnOK").disabled =  false;
                document.getElementById("btnOK").value = "登录";
                alert(json.LoginResult);
            }
        }
    });
}

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value) {
    var expires_date = new Date();
    expires_date.setDate(expires_date.getDate() + 30);
    value = name + '=' + escape(value) + ';expires=' + expires_date.toGMTString() + ';'
    document.cookie = value;
}