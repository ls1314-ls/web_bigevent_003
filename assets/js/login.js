$(function () {
    //点击注册账号 显示注册区域,隐藏登录区域
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //自定义验证表单规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()

            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    //注册账号
    var layer = layui.layer
    $("#form_reg").on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    // console.log(res);
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $("#link_login").click();
                $("#form_reg")[0].reset()
            }
        })
    })

    //登录账号
    $("#form_login").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})