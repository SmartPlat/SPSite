
//保存----------------------------------------------------------------------------------------
function SaveOrg(OrgID) {

    if ($("#OrgID").val() == "") { alert('请输入分组编号!'); return false; }
    if ($("#OrgName").val() == "") { alert('请输入分组名称!'); return false; }
    if ($('input[name="OrgFlag"]:checked').val() == undefined) { alert('请选择分组类别!'); return false; }
    var roles = "";
    $("input[name='OrgRoles']:checked").each(function () {
        roles += $(this).val() + " ";
    });
    //alert(roles);
    if (roles == "") {
        alert('请至少选择一个角色!'); return false;
    }
    else {
        roles = roles.substr(0, roles.length - 1);
    }
    //alert($('input[name="OrgFlag"]:checked').val());
    var msg = '您确定要保存吗？';
    if (!confirm(msg)) return false;

    //$("#cmdSaveTask").fadeOut("slow");

    var dt = new Date;
    dt = dt.getMilliseconds();
    var url = "WebAPI.aspx?ServiceID=SaveOrg" + "&OrgID=" + $("#OrgID").val()
         + "&OrgName=" + escape($("#OrgName").val())
         + "&OrgCode=" + escape($("#OrgCode").val())
         + "&OrgFlag=" + escape($('input[name="OrgFlag"]:checked').val())
         + "&OrgRoles=" + escape(roles)
         + "&Memo=" + escape($("#Memo").val())
         + "&OldID=" + OrgID
         + "&Token=" + dt.toString();
    //$("#txtPrompt").val(url);
    //$("#form").serialize();
    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            //$("#cmdSaveTask").fadeIn("slow");
        },
        success: function (json) {
            //$("#" + divs).html(data);
            //alert(data);
            //var json = eval('(' + data + ')');
            if (json.LoginResult == 'OK') {
                alert('分组信息保存成功！');
                //window.location.href = "info.aspx";
                //window.location.reload(true);
            }
            else {

                alert(json.LoginResult);
            }

        }
    });
}

//保存----------------------------------------------------------------------------------------
function DelOrg(OrgID) {

    var msg = '您确定要删除分组 ' + OrgID + ' 吗？'; //组内的所有成员也会被删除！
    if (!confirm(msg)) return false;

    //按钮动画效果
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=DelOrg" + "&OrgID=" + OrgID
         + "&Token=" + dt.getMilliseconds();

    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            //$("#cmdSaveTask").fadeIn("slow");
        },
        success: function (json) {
            if (json.LoginResult == 'OK') {
                window.location.href = "info.aspx";
            }
            else {
                alert(json.LoginResult);
            }
        }
    });
}

//保存----------------------------------------------------------------------------------------
function SaveEmp(EmpID) {

    if ($("#EmpID").val() == "") { alert('请输入人员编号!'); return false; }
    if ($("#EmpName").val() == "") { alert('请输入人员姓名!'); return false; }
    if ($("#EmpNick").val() == "") { alert('请输入人员昵称!'); return false; }
    var UserRoles = "";
    $("input[name='UserRoles']:checked").each(function () {
        UserRoles += $(this).val() + " ";
    });
    //alert(UserRoles);
    if (UserRoles == "") {
        alert('请至少选择一个人员角色!'); return false;
    }
    else {
        UserRoles = UserRoles.substr(0, UserRoles.length - 1);
    }

    var msg = '您确定要保存吗？';
    if (!confirm(msg)) return false;

    //$("#cmdSaveTask").fadeOut("slow");

    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=SaveEmp" + "&EmpID=" + $("#EmpID").val()
         + "&EmpName=" + escape($("#EmpName").val())
         + "&EmpNick=" + escape($("#EmpNick").val())
         + "&EmpDuty=" + escape($("#EmpDuty").val())
         + "&UserRoles=" + UserRoles
         + "&UserFlag=" + $('input[name="UserFlag"]:checked').val()
         + "&EmpPhone=" + escape($("#EmpPhone").val())
         + "&OpenID=" + $("#OpenID").val()
         + "&Memo=" + escape($("#Memo").val())
         + "&OldID=" + EmpID
         + "&Token=" + dt.getMilliseconds();
    //$("#txtPrompt").val(url);

    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            //$("#cmdSaveTask").fadeIn("slow");
        },
        success: function (json) {
            if (json.LoginResult == 'OK') {
                //window.location.href = "InfoEmp.aspx?OrgID=" + json.OrgID;
                alert('人员信息保存成功！');
            }
            else {

                alert(json.LoginResult);
            }

        }
    });
}

//保存----------------------------------------------------------------------------------------
function DelEmp(EmpID) {

    var msg = '您确定要删除 ' + EmpID + ' 吗？';
    if (!confirm(msg)) return false;

    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=DelEmp" + "&EmpID=" + EmpID
         + "&Token=" + dt.getMilliseconds();

    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            //$("#cmdSaveTask").fadeIn("slow");
        },
        success: function (json) {
            if (json.LoginResult == 'OK') {
                //alert(GetQueryString('OrgID'));
                window.location.href = "InfoDetail.aspx?OrgID=" + GetQueryString('OrgID');
            }
            else {

                alert(json.LoginResult);
            }

        }
    });
}
//修改组员密码
var CurEmpID = '';
function SaveEmpPwd(empid, empname) {
    CurEmpID = empid;
    $("#txtEmpID").val(empid);
    $("#txtEmpName").val(empname);
    $("#txtEmpNewPWD").val('');
    $('#dialogChangeEmpPassword').modal('show');
}

//保存组员密码
function SaveEmpPassword() {
    if ($("#txtEmpNewPWD").val() == "") { alert('请输入新密码!'); return false; }

    var dt = new Date;
    dt = dt.getMilliseconds();
    var url = "WebAPI.aspx?ServiceID=ChangeEmpPassword&P=" + $("#txtEmpNewPWD").val() + "&EmpID=" + CurEmpID + "&Token=" + dt.toString();
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
                $('#dialogChangeEmpPassword').modal('hide');
                alert('密码修改成功!');
            }
            else {
                alert(json.LoginResult);
            }

        }
    });
}

