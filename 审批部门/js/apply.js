$(document).ready(function () {
    const ip = "192.168.1.134";
    const port = 8080;

    //判断浏览器是否支持sessionstorage
    if (window.sessionStorage.token) {

    } else {
        alert("无token，请重新登录。");
        window.location.href = 'login.html'
    }

    //等待效果隐藏
    $("#policywaitingupload").hide()
    $("#programmewaitingupload").hide()

    //登出
    $("#logout").click(function () {
        sessionStorage.clear();
        window.location.href = "login.html";
    })

    $("#index").click(function () {
        window.location.href = "index.html"
    });

    color();
    $("#waitapply").css({"background-color": "#434343"});
    $("#waitapply").children(".text-center").css({"color": "white"});
    waitapply();

    //点击修改金额
    $("#edit").click(function () {
        $("#editinput").attr("disabled", false);
    });

    //待审批
    $("#waitapply").click(function () {
        color();
        waitapply();
        $("#waitapply").css({"background-color": "#434343"});
        $("#waitapply").children(".text-center").css({"color": "white"});
        $("#title").html("首页>审批中心>待审批");
    });

    //已审批
    $("#apply").click(function () {
        color();
        apply();
        $("#apply").css({"background-color": "#434343"});
        $("#apply").children(".text-center").css({"color": "white"});
        $("#title").html("首页>审批中心>已审批");
    });

    //已拒绝
    $("#refuse").click(function () {
        color();
        refuse();
        $("#refuse").css({"background-color": "#434343"});
        $("#refuse").children(".text-center").css({"color": "white"});
        $("#title").html("首页>审批中心>已驳回");
    });

    //提交惠民政策
    $("#submitpolicy").click(function () {
        policyform();
    })

    //提交补贴方案
    $("#submitprogramme").click(function () {
        programmeform();
    })

    //变色
    function color() {
        $("#waitapply").css({"background-color": "white"});
        $("#apply").css({"background-color": "white"});
        $("#refuse").css({"background-color": "white"});

        $("#waitapply").children(".text-center").css({"color": "black"});
        $("#apply").children(".text-center").css({"color": "black"});
        $("#refuse").children(".text-center").css({"color": "black"});
    }


    //待审核
    function waitapply() {
        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/approve/queryReview",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            let length = data.info.length
            //通知栏
            $("#message").text(length)
            $("#waitdo").text(length)
            var table_middle = ""
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">企业负责人</th>\n" +
                "                            <th scope=\"col\">操作</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>"

            //表格中部
            for (i = 0; i < data.info.length; i++) {
                table_middle = table_middle + "<tr>" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_advise_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: red\">待审核</a></td>\n" +
                    "                            <td>" + data.info[i].company_handler + "</td>\n" +
                    "                            <td><a href=\"#\"  value=\"" + data.info[i].qacc_id + "\" onclick=\"editdownload(this)\" data-toggle=\"modal\" data-target=\"#editmodal" + data.info[i].qacc_id + "\">审批</a></td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>"
            //整合
            table = table_head + table_middle + table_back
            //展示
            $("#table").html(table)

            //模态框
            var modal = ""
            var uploadmodal = ""
            //获取条数
            var waitlength = data.info.length

            for (i = 0; i < data.info.length; i++) {
                item_cash = data.info[i].item_cash[0]
                for (var key in item_cash) {
                    item_cash_key = key     //获取key值
                    item_cash_value = item_cash[key]; //获取对应的value值
                }
                modal = modal + "<div class=\"modal fade editmodal\" id=\"editmodal" + data.info[i].qacc_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editformmodal\">\n" +
                    "        <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                    "            <div class=\"modal-content\">\n" +
                    "                <div class=\"modal-header\">\n" +
                    "                    <div class=\"modal-title\" id=\"editformmodal\"\n" +
                    "                         style=\"border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                        企业对账申请表单\n" +
                    "                    </div>\n" +
                    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
                    "                            aria-hidden=\"true\">&times;</span></button>\n" +
                    "                </div>\n" +
                    "                <div class=\"modal-body text-style\"\n" +
                    "                     style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 2px;padding-bottom: 2px;padding-left: 40px;padding-right: 40px;\">\n" +
                    "                    <div style=\"padding-top: 5px\">\n" +
                    "                        <div class=\"row\" style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px\">\n" +
                    "                                表单唯一标识:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px\">\n" +
                    "                                " + data.info[i].qacc_id + "\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                申请单代码:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + data.info[i].qacc_number + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                企业名称:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + data.info[i].company_name + "\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                补贴申请起始时间:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" id='starttime" + data.info[i].qacc_id + "' value='" + data.info[i].qacc_starttime + "' style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + data.info[i].qacc_starttime + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                补贴申请终止时间:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" id='endtime" + data.info[i].qacc_id + "' value='" + data.info[i].qacc_endtime + "' style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + data.info[i].qacc_endtime + "\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                补贴申请金额(单位/元):\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + data.info[i].qacc_advise_cash + "\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                表单进程:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                <a style=\"color:red\">待审核</a>\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                企业负责人:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + data.info[i].company_handler + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                补贴项目代码:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + item_cash_key + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                补贴金额:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + item_cash_value + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                补贴金额:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-8 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                " + item_cash_value + "\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div style=\"padding-top: 10px\">\n" +
                    "                        <div class=\"row\" style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 18px;padding-top: 4px\">企业相关单据点击选择下载</div>\n" +
                    "\n" +
                    "                            <div class=\"col-8\">\n" +
                    "                                <button class=\"btn btn-primary\" style=\"background-color: #3587B0; border-radius: 4px\" value='" + data.info[i].qacc_id + "' onclick='download(value)'>一键下载</button>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-12 downloadhref" + data.info[i].qacc_id + "\" style=\"font-size: 18px;margin-top:1%;margin-bottom: -4%\"></div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div style=\"padding-top: 10px\">\n" +
                    "                        <div class=\"row\"\n" +
                    "                             style=\"padding-top:5px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                            <div class=\"col-3\" style=\"margin-top: 1%\">\n" +
                    "                                <button class=\"btn btn-danger\" id='makebill" + data.info[i].qacc_id + "' value='" + data.info[i].qacc_id + "' onclick='makebill(value)'>生成区块链对账表单</button>\n" +
                    "                            </div>\n" +
                    "\n" + "                            <div class=\"col-9 waiting\" id='waiting" + data.info[i].qacc_id + "' style=\"margin-top:1.5%\">\n" +
                    "                                <i class=\"fa fa-spinner fa-spin fa-2x\" aria-hidden=\"true\"\n" +
                    "                                   style=\"color: rgba(0,0,0,0.5)\"></i>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div\n" +
                    "                            style=\"margin-top: 1%;width: 43%;border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                        对账申请表单编辑(*为不可修改项)\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div style=\"padding-top: 10px\">\n" +
                    "                        <div class=\"row\" style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                *表单唯一标识:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" value=\"" + data.info[i].qacc_id + "\" disabled>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                *企业名称:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" value=\"" + data.info[i].company_name + "\" disabled>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                *补贴申请区间:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" value=\"" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "\" disabled>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                补贴申请金额(单位/元):\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" onkeyup=\"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,2})?).*$/g, '$1')\" id=\"editinput" + data.info[i].qacc_id + "\" value=\"" + data.info[i].qacc_advise_cash + "\">\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\">\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                管理部门:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='manage_depname" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                部门领导:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='manage_header" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                经办人:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='manage_handler" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                联系方式:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='manage_contact" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                抄送企业:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='copyto_company" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                抄送财务:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='copyto_financedep" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                审核签名:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='verify_sign" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                            <div class=\"col-4 text-style\" style=\"font-size: 16px;margin-top: 3%\">\n" +
                    "                                复核签名:\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6 text-style\" style=\"font-size: 16px;margin-top: 2%\">\n" +
                    "                                <input class=\"form-control\" id='reconsider_sign" + data.info[i].qacc_id + "'>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-2\"></div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"modal-footer\">\n" +
                    "                    <button type=\"button\" class=\"btn btn-primary\" style=\"background-color: #3587B0\" data-toggle=\"modal\"\n" +
                    "                            data-target=\"#uploadmodal" + data.info[i].qacc_id + "\" data-dismiss=\"modal\" onclick=\"$('#uploadmodal" + data.info[i].qacc_id + "').modal({backdrop: 'static', keyboard: false})\">审核通过\n" +
                    "                    </button>\n" +
                    "                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" value='" + data.info[i].qacc_id + "' onclick='editrefuse(value)'>驳回</button>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>"

                uploadmodal = uploadmodal + "<div class=\"modal fade uploadmodal\" id=\"uploadmodal" + data.info[i].qacc_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"uploadformmodal\">\n" +
                    "        <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                    "            <div class=\"modal-content\">\n" +
                    "                <div class=\"modal-header\">\n" +
                    "                    <div class=\"modal-title\" id=\"uploadformmodal\"\n" +
                    "                         style=\"text-align: left; font-size: 18px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                        请提交签字盖章表单\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"modal-body text-style\"\n" +
                    "                     style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 6px;padding-bottom: 6px;padding-left: 40px;padding-right: 40px;\">\n" +
                    "\n" +
                    "                    <div style=\"padding-top: 10px\">\n" +
                    "                        <div class=\"row\"\n" +
                    "                             style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                            <div class=\"col-12 text-style\" style=\"font-size: 16px\"\n" +
                    "                                 style=\"background-color: rgb(242, 242, 242);\">附件(请上传)文件不能大于500M\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-12\" style=\"margin-top: 2%\">\n" +
                    "                                <div class=\"card\">\n" +
                    "                                    <div class=\"card-body\">\n" +
                    "                                        <input type=\"file\" class=\"btn btn-primary\" style=\"background-color: #3587B0\"\n" +
                    "                                               name=\"" + data.info[i].qacc_id + "\" multiple='multiple' id=\"ledger" + data.info[i].qacc_id + "\" onchange='uploadfilesize(this)'>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div style=\"padding-top: 10px\">\n" +
                    "                        <div class=\"row\"\n" +
                    "                             style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                            <div class=\"col-12 text-style\" style=\"font-size: 16px\"\n" +
                    "                                 style=\"background-color: rgb(242, 242, 242);\">备注\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"col-12\" style=\"margin-top: 2%\">\n" +
                    "                                <div class=\"card\">\n" +
                    "                                    <div class=\"card-body\">\n" +
                    "                                        <textarea class=\"form-control\" id='note" + data.info[i].qacc_id + "' required=\"\" rows=\"3\"></textarea>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"modal-footer\">\n" +
                    "                    <div class='waitingupload' id=\"waitingupload" + data.info[i].qacc_id + "\">\n" +
                    "                        正在提交，请稍候。。。<i class=\"fa fa-spinner fa-spin fa-2x\" aria-hidden=\"true\"\n" +
                    "                           style=\"color: rgba(0,0,0,0.5)\"></i>\n" +
                    "                    </div>" +
                    "                    <button type=\"button\" class=\"btn btn-primary\" id='submit" + data.info[i].qacc_id + "' style=\"background-color: #3587B0\"\n" +
                    "                            value='" + data.info[i].qacc_id + "' onclick='editpass(value)'>提交\n" +
                    "                    </button>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>"
            }

            $("#allmodal").html(modal);
            $("#alluploadmodal").html(uploadmodal);
            for (let a = 0; a < waitlength; a++) {
                $(".waiting").eq(a).hide()
                $(".waitingupload").eq(a).hide()
            }
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    editdownload = function (qacc) {

        let qacc_id = $(qacc).attr("value")
        let data = "{\"QACC_ID\":\"" + qacc_id + "\"}"

        $.ajax({
            url: "http://" + ip + ":" + port + "/enterprise/fileMenu",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            let href = data.info
            let edithref = ""
            for (let i = 0; i < href.length; i++) {
                edithref = edithref + "<a value='" + href[i].url + "' href='#' onclick='onedownload(this)'>" + href[i].fileName + "</a><br><br>"
            }
            $(".downloadhref" + qacc_id).html(edithref)

        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //点击单文件下载
    onedownload = function (value) {

        let href = $(value).attr("value")

        let data = "{\"filePath\":\"" + href + "\"}"

        request(data);

        function request(data) {
            const req = new XMLHttpRequest();
            req.open('POST', 'http://192.168.1.134:8080/enterprise/download', true);
            req.responseType = 'blob';
            req.setRequestHeader('Content-Type', 'application/json');
            req.onload = function () {
                //获取相应
                const data = req.response;
                // 获取响应头中的文件名并转码
                const fileName = decodeURIComponent(req.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1])
                const a = document.createElement('a');
                const blob = new Blob([data]);
                const blobUrl = window.URL.createObjectURL(blob);
                download(blobUrl, fileName);
            };
            req.send(data);
        };

        function download(blobUrl, fileName) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.download = fileName;
            a.href = blobUrl;
            a.click();
            // document.body.removeChild(a);
        }
    }

    //一键下载
    download = function (value) {

        let data = "{\"QACC_ID\":\"" + value + "\"}"

        request(data);

        function request(data) {
            const req = new XMLHttpRequest();
            req.open('POST', 'http://192.168.1.134:8080/enterprise/downloadAll', true);
            req.responseType = 'blob';
            req.setRequestHeader('Content-Type', 'application/json');
            req.onload = function () {
                //获取相应
                const data = req.response;
                // 获取响应头中的文件名并转码
                const fileName = decodeURIComponent(req.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1])
                const a = document.createElement('a');
                const blob = new Blob([data]);
                const blobUrl = window.URL.createObjectURL(blob);
                download(blobUrl, fileName);
            };
            req.send(data);
        };

        function download(blobUrl, fileName) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.download = fileName;
            a.href = blobUrl;
            a.click();
            // document.body.removeChild(a);
        }
    }

    //已审核
    function apply() {
        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/queryFinishAndWaitClose",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            var table_middle = ""
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">审批金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">企业负责人</th>\n" +
                "                            <th scope=\"col\">盖章单据</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>"

            //表格中部
            for (i = 0; i < data.info.length; i++) {
                if (data.info[i].qacc_status == 1) {
                    status = "状态:&nbsp<a style=\"color: rgb(0, 153, 51)\">已审核&nbsp&nbsp<a style=\"color: red\">待结算</a></a>"
                } else {
                    status = "状态:&nbsp<a style=\"color: rgb(0, 153, 51)\">已审核&nbsp&nbsp<a style=\"color: rgb(0, 153, 51)\">已结算</a></a>"
                }
                table_middle = table_middle + "<tr>" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].advise_cash + "</td>\n" +
                    "                            <td>" + data.info[i].verify_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: rgb(0, 153, 51)\">已通过审核</td>\n" +
                    "                            <td>" + data.info[i].company_header + "</td>\n" +
                    "                            <td>点击查看</td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>"
            //整合
            table = table_head + table_middle + table_back
            //展示
            $("#table").html(table)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //已拒绝
    function refuse() {
        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/queryFinishProcess",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            var table_middle = ""
            // 表格前部
            table_head = "<table class=\"table table-striped text-center table-bordered shadow-light text-style\" style=\"font-size: 15px\">\n" +
                "                        <thead>\n" +
                "                        <tr>\n" +
                "                            <th scope=\"col\">唯一标识</th>\n" +
                "                            <th scope=\"col\">企业名称</th>\n" +
                "                            <th scope=\"col\">补贴申请区间</th>\n" +
                "                            <th scope=\"col\">申请金额(单位:元)</th>\n" +
                "                            <th scope=\"col\">表单进程</th>\n" +
                "                            <th scope=\"col\">企业负责人</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody>"

            //表格中部
            for (i = 0; i < data.info.length; i++) {
                table_middle = table_middle + "<tr>\n" +
                    "                            <td>" + data.info[i].qacc_id + "</td>\n" +
                    "                            <td>" + data.info[i].company_name + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_starttime + "-" + data.info[i].qacc_endtime + "</td>\n" +
                    "                            <td>" + data.info[i].qacc_advise_cash + "</td>\n" +
                    "                            <td>状态:&nbsp<a style=\"color: red\">已驳回</a></td>\n" +
                    "                            <td>" + data.info[i].company_header + "</td>\n" +
                    "                        </tr>"
            }

            //表格后部
            table_back = "</tbody></table>"
            //整合
            table = table_head + table_middle + table_back
            //展示
            $("#table").html(table)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //审核通过获取内容
    editpass = function (value) {
        $("#submit" + value).attr("disabled", true)
        $("#waitingupload" + value).show()
        data = "{\"QACC_ID\": \"" + value + "\"}"

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/getData",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            passdata = data.info[0]
            passform(passdata, value)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //发送审核通过表单数据
    function passform(passdata, value) {
        manage_depname = $("#manage_depname" + value).val();
        manage_header = $("#manage_header" + value).val();
        manage_handler = $("#manage_handler" + value).val();
        manage_contact = $("#manage_contact" + value).val();
        copyto_company = $("#copyto_company" + value).val();
        copyto_financedep = $("#copyto_financedep" + value).val();
        verify_sign = $("#verify_sign" + value).val();
        reconsider_sign = $("#reconsider_sign" + value).val();
        note = $("#note" + value).val();
        verify_cash = $("#editinput" + value).val();
        data = "{\"QACC_ID\":\"" + value + "\",\n" +
            "      \"QACC_NUMBER\":\"" + passdata.qacc_number + "\",\n" +
            "       \"MANAGE_DEPNAME\":\"" + manage_depname + "\",\n" +
            "       \"MANAGE_HEADER\":\"" + manage_header + "\",\n" +
            "       \"MANAGE_HANDLER\":\"" + manage_handler + "\",\n" +
            "       \"MANAGE_CONTACT\":\"" + manage_contact + "\",\n" +
            "       \"ADVISE_CASH\":" + passdata.qacc_advise_cash + ",\n" +
            "       \"VERIFY_ADVISE\":\"" + note + "\",\n" +
            "       \"RECONSIDER_ADVISE\":\"" + note + "\",\n" +
            "       \"VERIFY_CASH\":" + verify_cash + ",\n" +
            "       \"VERIFY_SIGN\":\"" + verify_sign + "\",\n" +
            "       \"RECONSIDER_ADVISE\":\"" + note + "\",\n" +
            "       \"RECONSIDER_CASH\":" + verify_cash + ",\n" +
            "       \"RECONSIDER_SIGN\":\"" + reconsider_sign + "\",\n" +
            "       \"COPYTO_COMPANY\":\"" + copyto_company + "\",\n" +
            "       \"COPYTO_FINANCEDEP\":\"" + copyto_financedep + "\",\n" +
            "       \"VERIFY_STATUS\":1,\n" +
            "       \"ITEM_CASH\":" + JSON.stringify(passdata.item_cash) + "\n" +
            "}"

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/form",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            uploadfile(value)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //驳回获取内容
    editrefuse = function (value) {
        data = "{\"QACC_ID\": \"" + value + "\"}"

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/getData",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            formdata = data.info[0]
            refuseform(formdata, value)
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //发送驳回表单数据
    function refuseform(formdata, value) {
        manage_depname = $("#manage_depname" + value).val();
        manage_header = $("#manage_header" + value).val();
        manage_handler = $("#manage_handler" + value).val();
        manage_contact = $("#manage_contact" + value).val();
        copyto_company = $("#copyto_company" + value).val();
        copyto_financedep = $("#copyto_financedep" + value).val();
        verify_sign = $("#verify_sign" + value).val();
        reconsider_sign = $("#reconsider_sign" + value).val();
        note = $("#note" + value).val();
        verify_cash = $("#editinput" + value).val();
        data = "{\"QACC_ID\":\"" + value + "\",\n" +
            "      \"QACC_NUMBER\":\"" + formdata.qacc_number + "\",\n" +
            "       \"MANAGE_DEPNAME\":\"" + manage_depname + "\",\n" +
            "       \"MANAGE_HEADER\":\"" + manage_header + "\",\n" +
            "       \"MANAGE_HANDLER\":\"" + manage_handler + "\",\n" +
            "       \"MANAGE_CONTACT\":\"" + manage_contact + "\",\n" +
            "       \"ADVISE_CASH\":" + formdata.qacc_advise_cash + ",\n" +
            "       \"VERIFY_ADVISE\":\"" + note + "\",\n" +
            "       \"RECONSIDER_ADVISE\":\"" + note + "\",\n" +
            "       \"VERIFY_CASH\":" + verify_cash + ",\n" +
            "       \"VERIFY_SIGN\":\"" + verify_sign + "\",\n" +
            "       \"RECONSIDER_ADVISE\":\"" + note + "\",\n" +
            "       \"RECONSIDER_CASH\":" + verify_cash + ",\n" +
            "       \"RECONSIDER_SIGN\":\"" + reconsider_sign + "\",\n" +
            "       \"COPYTO_COMPANY\":\"" + copyto_company + "\",\n" +
            "       \"COPYTO_FINANCEDEP\":\"" + copyto_financedep + "\",\n" +
            "       \"VERIFY_STATUS\":1,\n" +
            "       \"ITEM_CASH\":" + JSON.stringify(formdata.item_cash) + "\n" +
            "}"

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/form",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            swal("已驳回", "", "success");
            waitapply();
            $('.modal-backdrop').remove();
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    //生成区块链对账单
    makebill = function (value) {

        companyname = "福州市公交公司";
        starttime = $("#starttime" + value).text();
        starttime = starttime.replace(/ /g, "")
        starttime = starttime.replace(/\n/g, "")
        endtime = $("#endtime" + value).text();
        endtime = endtime.replace(/ /g, "")
        endtime = endtime.replace(/\n/g, "")
        if (starttime == "" || endtime == "") {
            swal("生成失败", "起算时间或终算时间不能为空", "error");
        } else {
            reqdata = "{\"company\": \"" + companyname + "\"," +
                "\"queryStr\": \"csmc\"," +
                "\"startTime\": \"" + starttime + "T00:00:00\"," +
                "\"endTime\": \"" + endtime + "T00:00:00\"}";

            $("#waiting" + value).show()
            $("#makebill" + value).attr("disabled", true)
            request(reqdata, value);

            function request(reqdata, value) {
                const req = new XMLHttpRequest();
                req.open('POST', 'http://192.168.1.134:8080/enterprise/createForm', true);
                req.responseType = 'blob';
                req.setRequestHeader('Content-Type', 'application/json');
                req.onload = function () {
                    //获取相应
                    const data = req.response;
                    // 获取响应头中的文件名并转码
                    const fileName = decodeURIComponent(req.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1])
                    const a = document.createElement('a');
                    const blob = new Blob([data]);
                    const blobUrl = window.URL.createObjectURL(blob);
                    download(blobUrl, fileName, value);
                };
                req.send(reqdata);
            };

            function download(blobUrl, fileName, value) {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.download = fileName;
                a.href = blobUrl;
                a.click();
                $("#waiting" + value).hide()
                $("#makebill" + value).attr("disabled", false)
                // document.body.removeChild(a);
            }
        }
    }

    // 上传文件
    function uploadfile(value) {
        files_length = document.getElementById("ledger" + value).files;
        formData = new FormData();
        for (let i = 0; i < files_length.length; i++) {
            formData.append("file", $("#ledger" + value)[0].files[i]);
        }

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/upload?QACC_ID=" + value + "",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: success_of_respons_function,
            error: error_of_respons_function,
        })

        function success_of_respons_function(data) {
            if (data.code == 100) {
                $("#waitingupload" + value).hide()
                $("#submit" + value).attr("disabled", false)
                $("#uploadmodal" + value).modal('hide');      //手动关闭
                $('.modal-backdrop').remove();
                swal("审批通过", "", "success");
                waitapply();
            } else {
                swal("审批失败", "" + data.msg + "", "error");
                $('.modal-backdrop').remove();
            }
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    // 判断文件大小
    uploadfilesize = function (file) {
        let value = $(file).attr("name")
        let size = 0;
        files_length = document.getElementById("ledger" + value).files;
        for (let i = 0; i < files_length.length; i++) {
            size = size + $("#ledger" + value)[0].files[i].size;
        }
        maxsize = size / 1048576
        if (maxsize > 500) {
            swal("请注意", "文件大小不能超过500M,请重新选择上传！", "error");
            $("#ledger" + value).val("")
        }
    }


    // 补贴政策表单
    function policyform() {
        $("#submitpolicy").attr("disabled", true)
        $("#policywaitingupload").show()
        policyname = $("#policyname").val();
        policyid = $("#policyid").val();
        companyid = $("#companyid").val();
        mlfstart = $("#mlfstart").val();
        xydj = $("#xydj").val();
        priority = $("#priority").val();
        starttime = $("#autoclose-datepicker1").val();
        endtime = $("#autoclose-datepicker2").val();
        jzfs = $("#jzfs").val();
        yhmoney = $("#yhmoney").val();
        discount = $("#discount").val();
        note = $("#note").val();

        data = "{\"PROJ_NAME\": \"" + policyname + "\"," +
            "\"PROJ_CODE\": \"" + policyid + "\"," +
            "\"COMPANY_CODE\": \"" + companyid + "\"," +
            "\"MOLI_VALUE\": " + mlfstart + "," +
            "\"MOLI_VALUE_RANK\": \"" + xydj + "\"," +
            "\"PROJ_PRIORITY\": " + priority + "," +
            "\"RECORD_TYPE\": " + jzfs + "," +
            "\"PROJ_DESCRIBE\": \"" + note + "\"," +
            "\"PROJ_STARTTIME\": \"" + starttime + "\"," +
            "\"PROJ_ENDTIME\": \"" + endtime + "\"," +
            "\"PROJ_REBATE_CASH\": " + yhmoney + "," +
            "\"PROJ_DEBATE\": " + discount + "}"

        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/approve/projForm",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            sessionStorage.setItem('PROJ_ID', data.info.proj_id);

            setTimeout(function () {
                policyuploadfile()
            }, 100)
        }

        function error_of_respons_function() {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }


    // 上传文件
    function policyuploadfile() {
        formData = new FormData();
        formData.append("file", $("#policyfile")[0].files[0]);
        PROJ_ID = sessionStorage.getItem("PROJ_ID");

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/projUpload?PROJ_ID=" + PROJ_ID + "",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            if (data.code == 100) {
                $("#policywaitingupload").hide()
                $("#submitpolicy").attr("disabled", false)
                $("#addpolicy").modal('hide');      //手动关闭
                swal("发布成功", "", "success");
            } else {
                swal("发布失败", "" + data.msg + "", "error");
            }
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    // 判断文件大小
    policyuploadfilesize = function () {
        let size = 0;
        files_length = document.getElementById("policyfile").files;
        for (let i = 0; i < files_length.length; i++) {
            size = size + $("#policyfile")[0].files[i].size;
        }
        maxsize = size / 1048576
        if (maxsize > 500) {
            swal("请注意", "文件大小不能超过500M,请重新选择上传！", "error");
            $("#policyfile").val("")
        }
    }

    // 补贴方案表单
    function programmeform() {
        $("#submitprogramme").attr("disabled", true)
        $("#programmewaitingupload").show()
        proj_id = $("#proj_id").val();
        company_name = $("#company_name").val();
        subsidy_year = $("#subsidy_year").val();
        subsidy_type = $("#subsidy_type").val();
        subsidy_way = $("#subsidy_way").val();
        subsidy_rate = $("#subsidy_rate").val();
        starttime = $("#autoclose-datepicker3").val();
        endtime = $("#autoclose-datepicker4").val();
        subsidy_formula = $("#subsidy_formula").val();
        manage_depid = $("#manage_depid").val();
        manage_depname = $("#manage_depname").val();
        manage_header = $("#manage_header").val();
        manage_handler = $("#manage_handler").val();
        manage_sign = $("#manage_sign").val();
        subsidy_describe = $("#subsidy_describe").val();

        data = "{\"PROJ_ID\": \"" + proj_id + "\"," +
            "\"COMPANY_NAME\": \"" + company_name + "\"," +
            "\"SUBSIDY_YEAR\": \"" + subsidy_year + "\"," +
            "\"SUBSIDY_TYPE\": " + subsidy_type + "," +
            "\"SUBSIDY_WAY\": " + subsidy_way + "," +
            "\"SUBSIDY_RATE\": " + subsidy_rate + "," +
            "\"TIME_START\": \"" + starttime + "\"," +
            "\"TIME_END\": \"" + endtime + "\"," +
            "\"SUBSIDY_FORMULA\": \"" + subsidy_formula + "\"," +
            "\"MANAGE_DEPID\": " + manage_depid + "," +
            "\"MANAGE_DEPNAME\": \"" + manage_depname + "\"," +
            "\"MANAGE_HEADER\": \"" + manage_header + "\"," +
            "\"MANAGE_HANDLER\": \"" + manage_handler + "\"," +
            "\"MANAGE_SIGN\": \"" + manage_sign + "\"," +
            "\"SUBSIDY_DESCRIBE\": \"" + subsidy_describe + "\"}"

        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/approve/subsidyForm",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            sessionStorage.setItem('SUBSIDY_ID', data.info.subsidy_id);

            setTimeout(function () {
                programmeuploadfile()
            }, 100)
        }

        function error_of_respons_function() {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }


    // 上传文件
    function programmeuploadfile() {
        formData = new FormData();
        formData.append("file", $("#programmefile")[0].files[0]);
        SUBSIDY_ID = sessionStorage.getItem("SUBSIDY_ID");

        $.ajax({
            url: "http://" + ip + ":" + port + "/approve/subsidyUpload?SUBSIDY_ID=" + SUBSIDY_ID + "",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {s
            if (data.code == 100) {
                $("#programmewaitingupload").hide()
                $("#submitprogramme").attr("disabled", false)
                $("#addprogramme").modal('hide');      //手动关闭
                swal("发布成功", "", "success");
            } else {
                swal("发布失败", "" + data.msg + "", "error");
            }
        }

        function error_of_respons_function(data) {
            swal("连接失败", "请检查网络连接！", "error");
        }
    }

    // 判断文件大小
    programmeuploadfilesize = function () {
        let size = 0;
        files_length = document.getElementById("programmefile").files;
        for (let i = 0; i < files_length.length; i++) {
            size = size + $("#programmefile")[0].files[i].size;
        }
        maxsize = size / 1048576
        if (maxsize > 500) {
            swal("请注意", "文件大小不能超过500M,请重新选择上传！", "error");
            $("#programmefile").val("")
        }
    }
})
