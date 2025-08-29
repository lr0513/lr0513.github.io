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
            // 获取所有链接并转换为数组
            let allLinks = Array.from(data.querySelectorAll('url loc')).map(loc => loc.innerHTML);

            // 过滤出仅包含文章的链接（根据实际路径调整规则）
            let articleLinks = allLinks.filter(link => {
                const url = new URL(link);
                const path = url.pathname;

                // 保留包含文章特征路径的链接（根据你的博客调整）
                const isArticle = path.includes('/post/') || path.includes('/article/');

                // 排除非文章页面（根据你的博客页面路径调整）
                const isExcluded =
                    path.includes('/categories/') ||
                    path.includes('/tags/') ||
                    path.includes('/music/') ||
                    path.includes('/about/') ||
                    path.includes('/archive/') ||
                    path === '/' ||  // 排除首页
                    path.endsWith('/');  // 排除目录页

                return isArticle && !isExcluded;
            });

            // 检查是否有可用的文章链接
            if (articleLinks.length === 0) {
                throw new Error('未找到可用的文章链接');
            }

            // 随机选择一个不重复当前页面的文章链接
            while (true) {
                let randomLink = articleLinks[Math.floor(Math.random() * articleLinks.length)];
                let targetPath = new URL(randomLink).pathname;

                // 确保不跳转到当前页面
                if (location.pathname !== targetPath) {
                    let fullUrl = location.origin + targetPath;
                    location.href = fullUrl;
                    return;
                }

                // 如果只剩最后一个链接且是当前页面，直接跳转（避免无限循环）
                if (articleLinks.length === 1) {
                    location.href = location.origin + targetPath;
                    return;
                }
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
