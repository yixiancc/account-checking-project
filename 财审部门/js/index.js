$(document).ready(function () {
    const ip = "192.168.1.134";
    const port = 8080;

    //判断浏览器是否支持sessionstorage
    if (window.sessionStorage.token) {

    } else {
        alert("无token，请重新登录。");
        window.location.href = 'login.html'
    }

    //登出
    $("#logout").click(function () {
        sessionStorage.clear();
        window.location.href = "login.html";
    })

    $("#apply").click(function () {
        window.location.href = "apply.html"
    })

    projlist()
    subsidylist()
    //首页
    querywaitclose()
    waitclose()
    finishprocess()

    //projlist 惠民政策
    function projlist() {
        data = "{\n" +
            "\t\"pageNum\":0,\n" +
            "\t\"pageSize\":20\n" +
            "}"

        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/approve/proj/getData",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            let result = data.info.result
            let projcard = ""
            let projmodal = ""
            $(".modal-backdrop").remove()

            for (i = 0; i < result.length; i++) {
                projcard = projcard + "<div class=\"card\" style=\"border-bottom: 0px;border-left: 0px;border-right: 0px\">\n" +
                    "                    <div class=\"card-header\" style=\"background-color: white;border-bottom: 1px\">\n" +
                    "                        <div class=\"row\">\n" +
                    "                            <div class=\"col-1\" style=\"font-size: 23px\">•</div>\n" +
                    "                            <div class=\"col-4\"\n" +
                    "                                 style=\"padding-top: 5px;margin-left: -5%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                                " + result[i].proj_name + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6\"\n" +
                    "                                 style=\"padding-top: 5px;margin-left: -7%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                                " + result[i].create_time + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-1\" style=\"margin-left: 4%\">\n" +
                    "                                <button class=\"btn btn-link shadow-none\"\n" +
                    "                                        style=\"color: red\" data-toggle=\"modal\" data-target=\"#projmodal" + result[i].proj_id + "\">\n" +
                    "                                    [查看]\n" +
                    "                                </button>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>"

                if (result[i].record_type == 0) {
                    record_type = "按次记账"
                } else if (result[i].record_type == 1) {
                    record_type = "按折扣记账"
                } else if (result[i].record_type == 2) {
                    record_type = "按金额记账"
                }
                projmodal = projmodal + "<div class=\"modal fade\" id=\"projmodal" + result[i].proj_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editformmodal\">\n" +
                    "            <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                    "                <div class=\"modal-content\">\n" +
                    "                    <div class=\"modal-header\">\n" +
                    "                        <div class=\"modal-title\" id=\"editformmodal\"\n" +
                    "                             style=\"margin-left: 1%;border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                            茉莉分惠民政策\n" +
                    "                        </div>\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
                    "                                aria-hidden=\"true\">×</span></button>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"modal-body text-style\"\n" +
                    "                         style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 2px;padding-bottom: 2px;padding-left: 40px;padding-right: 40px;\">\n" +
                    "                        <div style=\"padding-top: 5px\">\n" +
                    "                            <div class=\"row\"\n" +
                    "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px\">\n" +
                    "                                    项目唯一标识:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px\">\n" +
                    "                                    " + result[i].proj_id + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    项目名称:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_name + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    项目代码:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\"\n" +
                    "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_code + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    企业代码:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\"\n" +
                    "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].company_code + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    茉莉分起点:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].moli_value + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    信用等级:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].moli_value_rank + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    优先级:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_priority + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    记账方式:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + record_type + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    开始时间:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_starttime + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    终止时间:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_endtime + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    优惠金额:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_rebate_cash + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    折扣率:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_debate + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    优惠说明:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_describe + "\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div style=\"padding-top: 10px\">\n" +
                    "                            <div class=\"row\"\n" +
                    "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                                <div class=\"col-4 text-style\" style=\"font-size: 18px;padding-top: 4px\">项目相关文件</div>\n" +
                    "\n" +
                    "                                <div class=\"col-8\">\n" +
                    "                                    <button class=\"btn btn-primary\"\n" +
                    "                                            style=\"background-color: #3587B0; border-radius: 4px;margin-top: -2px\"\n" +
                    "                                            value=\"" + result[i].proj_id + "\" onclick=\"projdownload(value)\">一键下载\n" +
                    "                                    </button>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"modal-footer\">\n" +
                    "                        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭\n" +
                    "                        </button>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>"
            }

            $("#projlist").html(projcard)
            $("#projmodallist").html(projmodal)
            setTimeout(function () {
                projlist()
            }, 60000)
        }

        function error_of_respons_function() {

        }

    }

    //一键下载
    projdownload = function (value) {

        reqdata = "{\"PROJ_ID\": \"" + value + "\"}";

        request(reqdata);

        function request(reqdata) {
            const req = new XMLHttpRequest();
            req.open('POST', 'http://192.168.1.134:8080/approve/proj/download', true);
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
            req.send(reqdata);
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

    //subsidylist 补贴方案
    function subsidylist() {
        data = "{\n" +
            "\t\"pageNum\":0,\n" +
            "\t\"pageSize\":20\n" +
            "}"

        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/approve/subsidy/getData",
            type: "POST",
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            let result = data.info.result
            let subsidycard = ""
            let subsidymodal = ""
            $(".modal-backdrop").remove()

            for (i = 0; i < result.length; i++) {
                subsidycard = subsidycard + "<div class=\"card\" style=\"border-bottom: 0px;border-left: 0px;border-right: 0px\">\n" +
                    "                    <div class=\"card-header\" style=\"background-color: white;border-bottom: 1px\">\n" +
                    "                        <div class=\"row\">\n" +
                    "                            <div class=\"col-1\" style=\"font-size: 23px\">•</div>\n" +
                    "                            <div class=\"col-4\"\n" +
                    "                                 style=\"padding-top: 5px;margin-left: -5%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                                标识：" + result[i].subsidy_id + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-6\"\n" +
                    "                                 style=\"padding-top: 5px;margin-left: -7%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                                " + result[i].create_time + "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"col-1\" style=\"margin-left: 4%\">\n" +
                    "                                <button class=\"btn btn-link shadow-none\"\n" +
                    "                                        style=\"color: red\" data-toggle=\"modal\" data-target=\"#subsidymodal" + result[i].subsidy_id + "\">\n" +
                    "                                    [查看]\n" +
                    "                                </button>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>"

                subsidymodal = subsidymodal + "<div class=\"modal fade\" id=\"subsidymodal" + result[i].subsidy_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editformmodal\">\n" +
                    "            <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                    "                <div class=\"modal-content\">\n" +
                    "                    <div class=\"modal-header\">\n" +
                    "                        <div class=\"modal-title\" id=\"editformmodal\"\n" +
                    "                             style=\"margin-left: 1%;border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                    "                            惠民补贴方案\n" +
                    "                        </div>\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
                    "                                aria-hidden=\"true\">×</span></button>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"modal-body text-style\"\n" +
                    "                         style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 2px;padding-bottom: 2px;padding-left: 40px;padding-right: 40px;\">\n" +
                    "                        <div style=\"padding-top: 5px\">\n" +
                    "                            <div class=\"row\"\n" +
                    "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px\">\n" +
                    "                                    补贴方案标识:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px\">\n" +
                    "                                    " + result[i].subsidy_id + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    项目标识:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_id + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    项目名称:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\"\n" +
                    "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_name + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    项目代码:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\"\n" +
                    "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].proj_code + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    企业代码:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\"\n" +
                    "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].company_code + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    企业名称:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\"\n" +
                    "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].company_name + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    补贴年度:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].subsidy_year + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    起始时间:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].time_start + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    终止时间:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].time_end + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    补贴类型:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].subsidy_type + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    补贴方式:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].subsidy_way + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    补贴率:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].subsidy_rate + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    计算公式:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].subsidy_formula + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    管理部门ID:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].manage_depid + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    部门名称:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].manage_depname + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    分管领导:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].manage_header + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    经办人:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].manage_handler + "\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    签名:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].manage_sign + "\n" +
                    "                                </div>\n" +
                    "\n" +
                    "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    事项说明:\n" +
                    "                                </div>\n" +
                    "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                    "                                    " + result[i].subsidy_describe + "\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div style=\"padding-top: 10px\">\n" +
                    "                            <div class=\"row\"\n" +
                    "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                    "                                <div class=\"col-4 text-style\" style=\"font-size: 18px;padding-top: 4px\">补贴方案相关文件</div>\n" +
                    "\n" +
                    "                                <div class=\"col-8\">\n" +
                    "                                    <button class=\"btn btn-primary\"\n" +
                    "                                            style=\"background-color: #3587B0; border-radius: 4px;margin-top: -2px\"\n" +
                    "                                            value=\"" + result[i].subsidy_id + "\" onclick=\"subsidydownload(value)\">一键下载\n" +
                    "                                    </button>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"modal-footer\">\n" +
                    "                        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭\n" +
                    "                        </button>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>"
            }

            $("#subsidylist").html(subsidycard)
            $("#subsidymodallist").html(subsidymodal)
            setTimeout(function () {
                subsidylist()
            }, 60000)
        }

        function error_of_respons_function() {

        }

    }

    //一键下载
    subsidydownload = function (value) {

        reqdata = "{\"SUBSIDY_ID\": \"" + value + "\"}";

        request(reqdata);

        function request(reqdata) {
            const req = new XMLHttpRequest();
            req.open('POST', 'http://192.168.1.134:8080/approve/subsidy/download', true);
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
            req.send(reqdata);
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

    //首页待结算
    function querywaitclose() {

        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/financial/queryWaitClose",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            let result = data.info
            let reviewcard = ""
            let reviewmodal = ""
            $(".modal-backdrop").remove()

            let length = result.length
            //通知栏
            $("#message").text(length)
            $("#waitdo").text(length)

            if (data.code === "510") {

            } else {

                if (length <= 4) {

                } else {
                    length = 4
                }

                for (let i = 0; i < length; i++) {
                    reviewcard = reviewcard + "<div class=\"card\" style=\"border-bottom: 0px;border-left: 0px;border-right: 0px\">\n" +
                        "                    <div class=\"card-header\" style=\"background-color: white;border-bottom: 1px\">\n" +
                        "                        <div class=\"row\">\n" +
                        "                            <div class=\"col-1\" style=\"font-size: 23px\">•</div>\n" +
                        "                            <div class=\"col-5\"\n" +
                        "                                 style=\"padding-top: 5px;margin-left: -7%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                                " + result[i].company_name + "\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-5\"\n" +
                        "                                 style=\"padding-top: 5px;margin-left: -7%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                                申请单标识：" + result[i].qacc_id + "\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-1\" style=\"margin-left: 14%\">\n" +
                        "                                <button class=\"btn btn-link shadow-none\" style=\"color: red\" data-toggle=\"modal\" data-target=\"#reviewmodal" + result[i].qacc_id + "\">\n" +
                        "                                    [查看]\n" +
                        "                                </button>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>"

                    reviewmodal = reviewmodal + "<div class=\"modal fade\" id=\"reviewmodal" + result[i].qacc_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editformmodal\">\n" +
                        "            <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                        "                <div class=\"modal-content\">\n" +
                        "                    <div class=\"modal-header\">\n" +
                        "                        <div class=\"modal-title\" id=\"editformmodal\"\n" +
                        "                             style=\"margin-left: 1%;border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                            审核对账表单\n" +
                        "                        </div>\n" +
                        "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
                        "                                aria-hidden=\"true\">×</span></button>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"modal-body text-style\"\n" +
                        "                         style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 2px;padding-bottom: 2px;padding-left: 40px;padding-right: 40px;\">\n" +
                        "                        <div style=\"padding-top: 5px\">\n" +
                        "                            <div class=\"row\"\n" +
                        "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px\">\n" +
                        "                                    申请单标识:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px\">\n" +
                        "                                    " + result[i].qacc_id + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    开始时间:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].qacc_starttime + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    结束时间:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].qacc_endtime + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    企业名称:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].company_name + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    企业领导:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].company_header + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    申请金额(元):\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].advise_cash + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    审批金额(元):\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].verify_cash + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    表单进程:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    <a style=\"color:red\">待结算</a>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "\n" +
                        "                    </div>\n" +
                        "                    <div class=\"modal-footer\">\n" +
                        "                        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭\n" +
                        "                        </button>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>"
                }

                $("#reviewlist").html(reviewcard)
                $("#reviewmodallist").html(reviewmodal)
                setTimeout(function () {
                    querywaitclose()
                }, 60000)
            }
        }

        function error_of_respons_function() {

        }
    }

//首页已结算
    function waitclose() {
        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/financial/queryFinishClose",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            let result = data.info
            let waitclosecard = ""
            let waitclosemodal = ""
            $(".modal-backdrop").remove()

            let length = result.length

            if (data.code === "510") {

            } else {

                if (length <= 4) {

                } else {
                    length = 4
                }

                for (let i = 0; i < length; i++) {
                    waitclosecard = waitclosecard + "<div class=\"card\" style=\"border-bottom: 0px;border-left: 0px;border-right: 0px\">\n" +
                        "                    <div class=\"card-header\" style=\"background-color: white;border-bottom: 1px\">\n" +
                        "                        <div class=\"row\">\n" +
                        "                            <div class=\"col-1\" style=\"font-size: 23px;margin-left: -5%\">•</div>\n" +
                        "                            <div class=\"col-5\"\n" +
                        "                                 style=\"padding-top: 5px;margin-left: -5%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                                " + result[i].company_name + "\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-5\"\n" +
                        "                                 style=\"padding-top: 5px;margin-left: -7%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                                申请单标识：" + result[i].qacc_id + "\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-1\" style=\"margin-left: 12%\">\n" +
                        "                                <button class=\"btn btn-link shadow-none\" style=\"color: red\" data-toggle=\"modal\" data-target=\"#waitclosemodal" + result[i].qacc_id + "\">\n" +
                        "                                    [查看]\n" +
                        "                                </button>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>"

                    waitclosemodal = waitclosemodal + "<div class=\"modal fade\" id=\"waitclosemodal" + result[i].qacc_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editformmodal\">\n" +
                        "            <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                        "                <div class=\"modal-content\">\n" +
                        "                    <div class=\"modal-header\">\n" +
                        "                        <div class=\"modal-title\" id=\"editformmodal\"\n" +
                        "                             style=\"margin-left: 1%;border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                            审核对账表单\n" +
                        "                        </div>\n" +
                        "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
                        "                                aria-hidden=\"true\">×</span></button>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"modal-body text-style\"\n" +
                        "                         style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 2px;padding-bottom: 2px;padding-left: 40px;padding-right: 40px;\">\n" +
                        "                        <div style=\"padding-top: 5px\">\n" +
                        "                            <div class=\"row\"\n" +
                        "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px\">\n" +
                        "                                    申请单标识:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px\">\n" +
                        "                                    " + result[i].qacc_id + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    开始时间:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].qacc_starttime + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    结束时间:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].qacc_endtime + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    企业名称:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].company_name + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    企业领导:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].company_header + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    申请金额(元):\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].advise_cash + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    审批金额(元):\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].verify_cash + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    表单进程:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    <a style=\"color:rgb(0, 153, 51)\">已结算</a>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "\n" +
                        "                    </div>\n" +
                        "                    <div class=\"modal-footer\">\n" +
                        "                        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭\n" +
                        "                        </button>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>"
                }

                $("#querywaitcloselist").html(waitclosecard)
                $("#querywaitclosemodallist").html(waitclosemodal)
                setTimeout(function () {
                    waitclose()
                }, 60000)
            }
        }

        function error_of_respons_function() {

        }
    }

//首页已驳回
    function finishprocess() {

        $.ajax({
            async: true,
            url: "http://" + ip + ":" + port + "/approve/queryFinishProcess",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success_of_respons_function,
            error: error_of_respons_function,
        });

        function success_of_respons_function(data) {
            let result = data.info
            let finishclosecard = ""
            let finishclosemodal = ""
            $(".modal-backdrop").remove()

            let length = result.length

            if (data.code === "510") {

            } else {

                if (length <= 4) {

                } else {
                    length = 4
                }

                for (let i = 0; i < length; i++) {
                    finishclosecard = finishclosecard + "<div class=\"card\" style=\"border-bottom: 0px;border-left: 0px;border-right: 0px\">\n" +
                        "                    <div class=\"card-header\" style=\"background-color: white;border-bottom: 1px\">\n" +
                        "                        <div class=\"row\">\n" +
                        "                            <div class=\"col-1\" style=\"font-size: 23px;margin-left: -5%\">•</div>\n" +
                        "                            <div class=\"col-5\"\n" +
                        "                                 style=\"padding-top: 5px;margin-left: -5%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                                " + result[i].company_name + "\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-5\"\n" +
                        "                                 style=\"padding-top: 5px;margin-left: -7%;text-align: left; font-size: 17px; font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                                申请单标识：" + result[i].qacc_id + "\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-1\" style=\"margin-left: 12%\">\n" +
                        "                                <button class=\"btn btn-link shadow-none\" style=\"color: red\" data-toggle=\"modal\" data-target=\"#waitclosemodal" + result[i].qacc_id + "\">\n" +
                        "                                    [查看]\n" +
                        "                                </button>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>"

                    finishclosemodal = finishclosemodal + "<div class=\"modal fade\" id=\"waitclosemodal" + result[i].qacc_id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"editformmodal\">\n" +
                        "            <div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                        "                <div class=\"modal-content\">\n" +
                        "                    <div class=\"modal-header\">\n" +
                        "                        <div class=\"modal-title\" id=\"editformmodal\"\n" +
                        "                             style=\"margin-left: 1%;border-bottom: rgb(86,154,184) 3px solid;text-align: left; font-size: 20px;font-weight: 400; font-style: normal; text-decoration: none; font-family: 微软雅黑; color: rgb(0, 0, 0);\">\n" +
                        "                            审核对账表单\n" +
                        "                        </div>\n" +
                        "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
                        "                                aria-hidden=\"true\">×</span></button>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"modal-body text-style\"\n" +
                        "                         style=\"font-size: 14px;color: rgba(0,0,0,0.5);padding-top: 2px;padding-bottom: 2px;padding-left: 40px;padding-right: 40px;\">\n" +
                        "                        <div style=\"padding-top: 5px\">\n" +
                        "                            <div class=\"row\"\n" +
                        "                                 style=\"padding-top:15px;padding-bottom: 10px;border:1px solid rgba(0,0,0,0.2)\">\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px\">\n" +
                        "                                    申请单标识:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px\">\n" +
                        "                                    " + result[i].qacc_id + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    开始时间:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].qacc_starttime + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    结束时间:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].qacc_endtime + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    企业名称:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].company_name + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    企业领导:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].company_header + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    申请金额(元):\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\"\n" +
                        "                                     style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].advise_cash + "\n" +
                        "                                </div>\n" +
                        "\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    审批金额(元):\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    " + result[i].verify_cash + "\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-3 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    表单进程:\n" +
                        "                                </div>\n" +
                        "                                <div class=\"col-9 text-style\" style=\"font-size: 16px;margin-top: 4%\">\n" +
                        "                                    <a style=\"color:red\">已驳回</a>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "\n" +
                        "                    </div>\n" +
                        "                    <div class=\"modal-footer\">\n" +
                        "                        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭\n" +
                        "                        </button>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>"
                }

                $("#queryfinishcloselist").html(finishclosecard)
                $("#queryfinishclosemodallist").html(finishclosemodal)
                setTimeout(function () {
                    finishprocess()
                }, 60000)
            }
        }

        function error_of_respons_function() {

        }
    }
})