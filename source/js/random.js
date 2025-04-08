function randomPost() {
    // 显示加载提示
    let loading = document.createElement('div');
    loading.style.position = 'fixed';
    loading.style.top = '0';
    loading.style.left = '0';
    loading.style.width = '100%';
    loading.style.height = '100%';
    loading.style.background = 'rgba(255, 255, 255, 0.8)';
    loading.style.display = 'flex';
    loading.style.justifyContent = 'center';
    loading.style.alignItems = 'center';
    loading.style.zIndex = '9999';
    loading.innerHTML = '<p>正在随机跳转中...</p>';
    document.body.appendChild(loading);

    fetch('/baidusitemap.xml')
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            let ls = data.querySelectorAll('url loc');
            while (true) {
                let path = ls[Math.floor(Math.random() * ls.length)].innerHTML;
                if (location.pathname === new URL(path).pathname) continue;
                let fullUrl = location.origin + new URL(path).pathname;
                location.href = fullUrl;
                return;
            }
        })
        .catch(err => {
            console.error('随机文章加载失败:', err);
            alert('随机文章加载失败，请稍后重试！');
        })
        .finally(() => {
            // 移除加载提示
            document.body.removeChild(loading);
        });
}