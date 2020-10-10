$(function () {
    //表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置按钮 实现重置表单
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo()
    })
    //修改表单
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //修改成功,更新头像
                window.parent.getUserInfo()
            }

        })
    })
})