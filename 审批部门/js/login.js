$(document).ready(function () {
    const ip = "192.168.1.134"
    const port = 8080

    //判断浏览器是否支持sessionstorage
    if (window.sessionStorage) {

    } else {
        alert("浏览器暂不支持sessionStorage")
    }

    $("#login").click(function () {
        login();
    })

    //login ajax代码封装
    function login() {
        username = document.getElementById("username").value
        password = document.getElementById("password").value

        if (username == "" || password == "") {
            swal("用户名或密码不能为空！", "请重新输入", "error")
        } else {

            data = "{\n" +
                "\t\"name\":\"" + username + "\",\n" +
                "\t\"password\":\"" + password + "\"\n" +
                "}"
            $.ajax({
                async: true,
                url: "http://" + ip + ":" + port + "/approve/user/login",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: data,
                dataType: "json",
                success: success_of_respons_function,
                error: error_of_respons_function,
            })

            function success_of_respons_function(back) {
                if (back.status == 200) {
                    window.location.href = 'index.html'
                    sessionStorage.setItem('token', back.token)
                } else {
                    swal("密码错误！", "" + back.message + "","error");
                }
            }

            function error_of_respons_function() {
                swal("连接失败！", "error");
            }
        }

    }
})