$(function () {
    getUserInfo()
    // 实现推出功能
    $("#btnLogout").on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                // console.log(res);
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            //渲染头像
            renderAvatar(res.data);
        }

    })
}

function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username

    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text.avatar").hide()
    } else {
        //渲染文本头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()

        $(".text-avatar").html(first).show()
    }

}