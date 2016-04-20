$(function () {
    //初始化页面

    //过滤特殊字符//~'",;!<>@#$%^&*()-+_=:
    $("#TaskName").change(function (event) {
        $("#TaskName").val($("#TaskName").val().replace(/['";]/g, ""));
    });
    $("#TaskPrompt").change(function (event) {
        $("#TaskPrompt").val($("#TaskPrompt").val().replace(/['";]/g, ""));
    });
    $("#TaskReply").change(function (event) {
        $("#TaskReply").val($("#TaskReply").val().replace(/['";]/g, ""));
    });

    $("#TaskSend1").click(function (event) {
        //提交任务
        if ($("#TaskSend1").prop('checked') && $("#TaskReply").val() == '') $("#TaskReply").val('转发');
    });

});


//保存任务列表----------------------------------------------------------------------------------------
function SaveTask(TaskID,TaskFlag) {

    if ($("#TaskName").val() == "") { alert('请输入工作名称!'); return false; }
    if ($("#TaskPrompt").val() == "") { alert('请输入工作说明!'); return false; }

        var org = "";
        $("input[name='TaskOrg']:checked").each(function () {
            org += $(this).val() + ",";
        });
        //alert(org);
        if (org == "") { 
            alert('请至少选择一个发布对象!'); return false; }
        else {
            org = org.substr(0, org.length - 1);
        }

        var msg = '您确定要保存这个工作吗？';
        if (!confirm(msg)) return false;

        document.getElementById("cmdSave").nodeValue = "正在保存...";
        document.getElementById("cmdSave").disabled = true;

        var dt = new Date;
        //dt = dt.getMilliseconds();
        var url = "WebAPI.aspx?ServiceID=SaveTask"
         + "&TaskID=" + TaskID
         + "&Org=" + org
         + "&TaskFlag=" + TaskFlag
         + "&Type=" + $("input[name='TaskType']:checked").val()
         + "&DT=" + $("input[name='TaskReplyDT']:checked").val()
         + "&MaxReply=" + $("input[name='MaxReply']:checked").val()
         + "&Token=" + dt.getMilliseconds();

        //alert(url);
        var PostData = { TaskName: escape($("#TaskName").val()), Prompt: escape($("#TaskPrompt").val()) };

        $.ajax({
            url: url,
            type: 'POST', //GET
            data: PostData,
            async: true, //true 异步      false 同步
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.responseText);
                document.getElementById("cmdSave").disabled = false;
                document.getElementById("cmdSave").value = "保存并发布工作";
            },
            success: function (json) {
                //alert(data);
                if (json.LoginResult == 'OK') {
                    //window.location.replace("TaskEdit.htm");
                    alert("工作保存成功！所选分组成员共" + json.TaskCount + "人。");
                    window.location.href="default.aspx";
                }
                else {
                    alert(json.LoginResult);
                }
                document.getElementById("cmdSave").disabled = false;
                document.getElementById("cmdSave").value = "保存并发布工作";
            }
        });
}

function TaskDelete(selTaskID) {
    var msg = '您确定要删除这个工作吗？删除之后无法恢复。';
    if (!confirm(msg)) return false;

    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=TaskDelete&TaskID=" + selTaskID + "&Token=" + dt.getMilliseconds();
    //alert(url);
    $.get(url, function (json) {

        if (json.LoginResult == "OK") {
            window.location.href = "default.aspx";
        } else {
            alert(json.LoginResult);
        }
    });
}

//保存任务----------------------------------------------------------------------------------------
function SaveTaskReply(TaskID) {

    var txtReply = document.getElementById('TaskReply').value;

    if (txtReply == "") { alert('请输入实际应答内容!'); return false; }


    //        var msg = '您确定已经上传应答截图并要保存工作信息吗？';
    //        if (!confirm(msg)) return false;

    document.getElementById("cmdSave").disabled = true;
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=SubmitTask" + "&TaskID=" + TaskID + "&Reply=" + escape(txtReply) + "&SendFlag=0"
         + "&Token=" + dt.getMilliseconds();
    //$("#txtPrompt").val(url);+ "&EmpID=" + EmpID + "&LoadDate=" + LabelLoadDate

    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(textStatus);
            document.getElementById("cmdSave").disabled = false;
        },
        success: function (json) {
            if (json.LoginResult == 'OK') {

                alert("工作提交成功，本月已完成 " + json.TaskScore + " 次工作。");
                window.location.reload(true);
            }
            else {

                alert(json.LoginResult);
            }
            document.getElementById("cmdSave").disabled = false;
        }
    });
}


function SaveScoreUser(TaskReplyID) {
    //保存加分
    var ScoreUser = $('input[name="ScoreUser"]:checked').val();
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=SaveReplyScoreUser&TaskReplyID=" + TaskReplyID
         + "&ScoreUser=" + ScoreUser + "&Token=" + dt.getMilliseconds(); // 
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
            //$("#" + divs).html(data);
            //alert(data);
            //var json = eval('(' + data + ')');
            if (json.LoginResult == 'OK') {
                alert("质量加分保存成功。");
                //window.location.reload(true);
            }
            else {

                alert(json.LoginResult);
            }

        }
    });
}

function DelReply(TaskReplyID) {
    var msg = '您确定要删除这个应答及得分吗？';
    if (!confirm(msg)) return false;

    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=TaskReplyDelete&TaskReplyID=" + TaskReplyID
         + "&Token=" + dt.getMilliseconds(); // 

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
                window.location.href = "TaskDetail.aspx?TaskID=" + json.TaskID;
            }
            else {

                alert(json.LoginResult);
            }

        }
    });
}
//修改保存应答
function SaveReply(TaskReplyID) {

    var txtReply = document.getElementById('TaskReply').value;
    var sendFlag = "0";
    if (document.getElementById('TaskSend1').checked) {
        sendFlag = "1";
    }
    if (txtReply == "") { alert('请输入实际应答内容!'); return false; }

    document.getElementById("cmdSave").disabled = true;
    var dt = new Date;
    var url = "WebAPI.aspx?ServiceID=SubmitTask&TaskReplyID=" + TaskReplyID + "&Reply=" + escape(txtReply) + "&SendFlag=" + sendFlag
         + "&Token=" + dt.getMilliseconds();

    //alert(url);
    $.ajax({
        url: url,
        type: 'GET', //post
        data: '',
        async: true, //true 异步      false 同步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(textStatus);
            document.getElementById("cmdSave").disabled = false;
        },
        success: function (json) {
            if (json.LoginResult == 'OK') {

                alert("应答保存成功。");
                //window.location.reload(true);
            }
            else {

                alert(json.LoginResult);
            }
            document.getElementById("cmdSave").disabled = false;
        }
    });
}