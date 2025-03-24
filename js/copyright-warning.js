new Vue({
    data: function () {
        this.$notify({
            title: "复制成功",
            message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
        });
    }
})