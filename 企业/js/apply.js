$(document).ready(function () {
    const ip = "192.168.1.134";
    const port = 8080;

    //判断浏览器是否支持sessionstorage
    if (window.sessionStorage.token) {

    } else {
        alert("无token，请重新登录。");
        window.location.href = 'login.html';
    }

    //登出
    $("#logout").click(function () {
        sessionStorage.clear();
        window.location.href = "login.html";
    });

    //等待效果隐藏
    $("#waiting").hide();
    $("#waitingupload").hide();
    // 链接跳转
    $("#index").click(function () {
        window.location.href = "index.html";
    });

    // 全局初始化
    color();
    $("#waitapply").css({"background-color": "#434343"});
    $("#waitapply").children(".text-center").css({"color": "white"});
    waitapply();

    //赋予申请单公司名，并只读
    $("#companyname").attr("value", "福州市公交公司");
    $("#companyname").attr("disabled", true);

    //提交申请单
    $("#submit").click(function () {
        applyform();
    });

    //生成区块链对账单
    $("#makebill").click(function () {
        makebill();
    });

    //待审核
    $("#waitapply").click(function () {
        color();
        waitapply();
        $("#waitapply").css({"background-color": "#434343"});
        $("#waitapply").children(".text-center").css({"color": "white"});
        $("#title").html("首页>我的申请>待审核")
    });

    //待结算
    $("#waitaccount").click(function () {
        color();
        waitaccount();
        $("#waitaccount").css({"background-color": "#434343"});
        $("#waitaccount").children(".text-center").css({"color": "white"});
        $("#title").html("首页>我的申请>待结算");
    });

    //已结算
    $("#account").click(function () {
        color();
        account();
        $("#account").css({"background-color": "#434343"});
        $("#account").children(".text-center").css({"color": "white"});
        $("#title").html("首页>我的申请>已结算");
    });

    //已拒绝
    $("#refuse").click(function () {
        color();
        refuse();
        $("#refuse").css({"background-color": "#434343"});
        $("#refuse").children(".text-center").css({"color": "white"});
        $("#title").html("首页>我的申请>已拒绝");
    });

    // function login() {
    //     data = "{\"username\":\"root\",\"password\":\"123456\"}"
    //     $.ajax({
    //         async: true,
    //         url: "http://" + ip + ":" + port + "/login/auth",
    //         type: "POST",
    //         data: data,
    //         contentType: "application/json;charset=utf-8",
    //         dataType: "json",
    //         success: success_of_respons_function,
    //         error: error_of_respons_function,
    //     })
    //
    //     function success_of_respons_function() {
    //
    //     }
    //     function error_of_respons_function() {
    //         swal("连接失败", "请检查网络连接！", "error");
    //     }
    // }

    // 企业申请单
    function applyform() {
        $("#submit").attr("disabled", true);
        $("#waitingupload").show();
        companyname = $("#companyname").val();
        policyname = $("#policyname").val();
        frdb = $("#frdb").val();
        companyid = $("#companyid").val();
        allmoney = $("#allmoney").val();
        applymoney = $("#applymoney").val();
        starttime = $("#autoclose-datepicker1").val();
        endtime = $("#autoclose-datepicker2").val();
        companyboss = $("#companyboss").val();
        companyjbr = $("#companyjbr").val();
        companytel = $("#companytel").val();
        sshd = $("#sshd").val();
        sscw = $("#sscw").val();
        note = $("#note").val();
        btxm = $("#btxm").val();
        btje = $("#btje").val();
        sxsm = $("#sxsm").val();
        qyqm = $("#qyqm").val();
        item_cash = "[{\"" + btxm + "\":" + btje + "}]";
        sessionStorage.setItem('QY_NAME', companyname);

        if (starttime > endtime) {
            swal("时间错误", "请重新选择时间！", "error");
        } else {

            data = "{\"COMPANY_NAME\": \"" + companyname + "\"," +
                "\"QACC_NAME\": \"" + policyname + "\"," +
                "\"COMPANY_CODE\": \"" + companyid + "\"," +
                "\"COMPANY_MANAGER\": \"" + frdb + "\"," +
                "\"QACC_DESCRIBE\": \"" + sxsm + "\"," +
                "\"COMPANY_SIGN\": \"" + qyqm + "\"," +
                "\"QACC_TOTAL_CASH\": " + allmoney + "," +
                "\"QACC_ADVISE_CASH\": " + applymoney + "," +
                "\"QACC_STARTTIME\": \"" + starttime + "\"," +
                "\"QACC_ENDTIME\": \"" + endtime + "\"," +
                "\"COMPANY_HANDLER\": \"" + companyjbr + "\"," +
                "\"COMPANY_HEADER\": \"" + companyboss + "\"," +
                "\"COMPANY_CONTACT\": \"" + companytel + "\"," +
                "\"COPYTO_FINANCEDEP\": \"" + sscw + "\"," +
                "\"COPYTO_CHECKDEP\": \"" + sshd + "\"," +
                "\"ITEM_CASH\": " + item_cash + "," +
                "\"HEADER_ADVISE\": \"" + note + "\"}";


            $.ajax({
                async: true,
                url: "http://" + ip + ":" + port + "/enterprise/form",
                type: "POST",
                data: data,
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: success_of_respons_function,
                error: error_of_respons_function,
            });

            function success_of_respons_function(data) {
                sessionStorage.setItem('QKL_ID', data.info.qacc_id);
                sessionStorage.setItem('QY_DM', '1');

                setTimeout(function () {
                    uploadfile();
                }, 100);
            }

            function error_of_respons_function() {
                swal("连接失败", "请检查网络连接！", "error");
            }
        }
    }

    //生成区块链对账单
    function makebill() {

        companyname = "福州市公交公司";
        starttime = $("#autoclose-datepicker1").val();
        endtime = $("#autoclose-datepicker2").val();
        if (starttime == "" || endtime == "") {
            swal("生成失败", "起算时间或终算时间不能为空", "error");
        } else {
            reqdata = "{\"company\": \"" + companyname + "\"," +
                "\"queryStr\": \"csmc\"," +
                "\"startTime\": \"" + starttime + "T00:00:00\"," +
                "\"endTime\": \"" + endtime + "T00:00:00\"}";

            $("#waiting").show();
            $("#makebill").attr("disabled", true);
            request(reqdata);

            function request(reqdata) {
                const req = new XMLHttpRequest();
                req.open('POST', 'http://192.168.1.134:8080/enterprise/createForm', true);
                req.responseType = 'blob';
                req.setRequestHeader('Content-Type', 'application/json');
                req.onload = function () {
                    //获取相应
                    const data = req.response;
                    // 获取响应头中的文件名并转码
                    const fileName = decodeURIComponent(req.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1]);
                    const a = document.createElement('a');
                    const blob = new Blob([data]);
                    const blobUrl = window.URL.createObjectURL(blob);
                    download(blobUrl, fileName);
                };
                req.send(reqdata);
            }

            function download(blobUrl, fileName) {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.download = fileName;
                a.href = blobUrl;
                a.click();
                $("#waiting").hide();
                $("#makebill").attr("disabled", false);
                // document.body.removeChild(a);
            }
        }
    }


// 上传文件
    function uploadfile() {
        files_length = document.getElementById("ledger").files;
        formData = new FormData();
        for (let i = 0; i < files_length.length; i++) {
            formData.append("file", $("#ledger")[0].files[i]);
        }

        QKL_ID = sessionStorage.getItem("QKL_ID");
        QY_NAME = sessionStorage.getItem("QY_NAME");
        QY_DM = sessionStorage.getItem("QY_DM");

        $.ajax({
            url: "http://" + ip + ":" + port + "/enterprise/upload?QKL_ID=" + QKL_ID + "&QY_NAME=" + QY_NAME + "&QY_DM=" + QY_DM + "",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            if (data.code == 100) {
                $("#waitingupload").hide();
                $("#submit").attr("disabled", false);
                $("#addform").modal('hide');      //手动关闭
                swal("申请成功", "请等待审批...", "success");
            } else {
                swal("申请失败", "" + data.msg + "", "error");
            }
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

// 判断文件大小
    uploadfilesize = function () {
        let size = 0;
        files_length = document.getElementById("ledger").files;
        for (let i = 0; i < files_length.length; i++) {
            if ($("#ledger")[0].files[i].size == 0) {
                swal("请注意", "您上传了一个空文件，请重新上传", "error");
                size = $("#ledger")[0].files[i].size;
                $("#ledger").val("");
                break;
            }
            size = size + $("#ledger")[0].files[i].size;
        }
        maxsize = size / 1048576;
        if (maxsize > 500) {
            swal("请注意", "文件大小不能超过500M,请重新选择上传！", "error");
            $("#ledger").val("")
        }
    };

    //变色
    function color() {
        $("#waitapply").css({"background-color": "white"});
        $("#waitaccount").css({"background-color": "white"});
        $("#account").css({"background-color": "white"});
        $("#refuse").css({"background-color": "white"});

        $("#waitapply").children(".text-center").css({"color": "black"});
        $("#waitaccount").children(".text-center").css({"color": "black"});
        $("#account").children(".text-center").css({"color": "black"});
        $("#refuse").children(".text-center").css({"color": "black"})
    }

    //待审核
    function waitapply() {
        companyname = sessionStorage.getItem("QY_NAME");
        data = "{\"COMPANY_NAME\":\"福州市公交公司\"}";

        $.ajax({
            url: "http://" + ip + ":" + port + "/enterprise/queryReview",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            var table_middle = "";
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">经办人</th>\n" +
                "                            <th scope=\"col\">审批部门</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>";

            //表格中部
            for (let i = 0; i < data.info.length; i++) {
                table_middle = table_middle + "<tr>\n" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_advise_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: red\">待审核</a></td>\n" +
                    "                            <td>" + data.info[i].company_handler + "</td>\n" +
                    "                            <td>审批部门</td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>";
            //整合
            table = table_head + table_middle + table_back;
            //展示
            $("#table").html(table)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //待结算
    function waitaccount() {
        companyname = sessionStorage.getItem("QY_NAME");
        data = "{\"COMPANY_NAME\":\"福州市公交公司\"}";

        $.ajax({
            url: "http://" + ip + ":" + port + "/enterprise/queryWaitClose",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            var table_middle = "";
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">经办人</th>\n" +
                "                            <th scope=\"col\">审批部门</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>";

            //表格中部
            for (let i = 0; i < data.info.length; i++) {
                table_middle = table_middle + "<tr>\n" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_advise_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: rgb(0, 153, 51)\">已审核&nbsp&nbsp<a style=\"color: red\">待结算</a></td>\n" +
                    "                            <td>" + data.info[i].company_handler + "</td>\n" +
                    "                            <td>审批部门</td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>";
            //整合
            table = table_head + table_middle + table_back;
            //展示
            $("#table").html(table)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //已结算
    function account() {
        companyname = sessionStorage.getItem("QY_NAME");
        data = "{\"COMPANY_NAME\":\"福州市公交公司\"}";

        $.ajax({
            url: "http://" + ip + ":" + port + "/enterprise/queryFinishClose",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            var table_middle = "";
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">经办人</th>\n" +
                "                            <th scope=\"col\">审批部门</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>";

            //表格中部
            for (let i = 0; i < data.info.length; i++) {
                table_middle = table_middle + "<tr>\n" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_advise_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: rgb(0, 153, 51)\">已审核&nbsp&nbsp<a style=\"color: rgb(0, 153, 51)\">已结算</a></td>\n" +
                    "                            <td>" + data.info[i].company_handler + "</td>\n" +
                    "                            <td>审批部门</td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>";
            //整合
            table = table_head + table_middle + table_back;
            //展示
            $("#table").html(table)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //已拒绝
    function refuse() {
        companyname = sessionStorage.getItem("QY_NAME");
        data = "{\"COMPANY_NAME\":\"福州市公交公司\"}";

        $.ajax({
            url: "http://" + ip + ":" + port + "/enterprise/queryFinishProcess",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            var table_middle = "";
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">经办人</th>\n" +
                "                            <th scope=\"col\">审批部门</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>";

            //表格中部
            for (let i = 0; i < data.info.length; i++) {
                table_middle = table_middle + "<tr>\n" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_advise_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: red\">已驳回</a></td>\n" +
                    "                            <td>" + data.info[i].company_handler + "</td>\n" +
                    "                            <td>审批部门</td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>";
            //整合
            table = table_head + table_middle + table_back;
            //展示
            $("#table").html(table)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }
});