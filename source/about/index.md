---
title: 关于
date: 2025-03-20 15:57:51
aside: false
top_img: false
background: "#f8f9fe"
comments: false
type: "about"
---
<div class="lorinda-theme" style="--theme-green:#90EE90;--theme-pink:#FF6B6B">

<!-- ========== 个人信息区 ========== -->
{% note green 'fas fa-leaf' modern%}
<div class="profile-card">
  <!-- <img src="https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/1579f090db820fb2a2f959cb27117bc.jpg" class="lorinda"> -->
  <div class="profile-content">
    <h3>🌱 Java青椒战士·Lorinda</h3>
    <div class="tag-cloud">
      <span class="tag-item" style="--tag-color:#FFD166">🐕 宠物指挥官（4狗1猫）</span>
      <span class="tag-item" style="--tag-color:#4ECDC4">📚 小说品鉴师（最爱《入蛊》）</span>
      <span class="tag-item" style="--tag-color:#AAD8FF">🎬 追剧达人（朋友×魅者）</span>
    </div>
    <div class="favorite-list">
      <p>🎶 战歌：<span class="music-bar">沈以诚《告白》</span></p>
      <p>最喜欢的颜色：💚<span class="color-block" style="background:#90EE90"></span></p>
    </div>
  </div>
</div>
{% endnote %}

<div class="shinchan-theme">

{% note pink 'fas fa-child' modern%}
### 🐾 野原新之助式自我介绍
人家是...春日部防卫队最帅的~~五岁儿童~~！<br>
特长是：
- 🎮 康达姆机器人变身（模仿失败版）
- 🐶 和小白一起创作"大象~大象~"
- 🎤 浴室限定演唱会《动感超人主题曲》
{% endnote %}

{% timeline timeline_year:1990-2025,color:#FF6B6B %}
<!-- timeline 1993年 🌸 -->
在双叶幼稚园向日葵班<br>
收获了：风间（精英朋友）妮妮（超真实扮家家酒受害者）正男（爱哭鬼）阿呆（鼻涕艺术家）
<!-- endtimeline -->

<!-- timeline 2001年 🚀 -->
成功让美冴妈妈达成成就：<br>
「一天生气18次」吉尼斯纪录保持者！
<!-- endtimeline -->
{% endtimeline %}

<div class="character-box">
<div class="character-card" style="--bg-color:#FFD166">
<img src="https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Screenshot_2025_0314_132922.png" class="shinchan-dance">
<div class="speech-bubble">
  <p>姐姐你喜欢吃青椒吗？</p>
  <div class="triangle"></div>
</div>
</div>

<div class="character-card" style="--bg-color:#AAD8FF">
<h3>🏆 经典台词收藏夹</h3>
<ul class="quote-list">
  <li>「妈妈你回来啦~」<br><small>（在百货公司走丢时）</small></li>
  <li>「打起精神来！<br>两串丸子我就复活啦~」</li>
  <li>「我是动感超人！<br>哈力哈力哈力——」</li>
</ul>
<img src="https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/4e357962b00044466380f6850a120ec.jpg" class="action-kamen">
</div>
</div>

{% note blue 'fas fa-comment' modern %}
### 🎤 美冴妈妈留言板
<div class="mom-comment">
  <img src="https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/adcf6edf76faf510086b424267a06a1.jpg" class="misae-img">
  <div class="comment-text">
    <p>这个月的零用钱...<br>
    <button onclick="showMoney()" class="allowance-btn">点击查看</button></p>
    <div id="money" class="money-hidden">💰 0日元</div>
  </div>
</div>
{% endnote %}

<style>
/* .profile-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: rgba(144,238,144,0.1);
  border-radius: 15px;
}
.tag-item {
  background: rgba(var(--tag-color),0.1);
  border: 2px solid var(--tag-color);
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9em;
  margin: 5px;
}
.shinchan-theme {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 15px;
} */

/* 野原新之助跳舞动画 */
.shinchan-dance {
  width: 120px;
  animation: dance 2s infinite;
  filter: drop-shadow(0 5px 3px rgba(0,0,0,0.3));
}

.misae-img {
    width: 100px;
    filter: drop-shadow(0 5px 3px rgba(0,0,0,0.3));
    margin-left: 20px;
    border-radius: 50%;
}

.lorinda {
    width: 100px;
    filter: drop-shadow(0 5px 3px rgba(0,0,0,0.3));
    margin-left: 20px;
    border-radius: 50%;
}

@keyframes dance {
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg) translateY(-10px); }
  100% { transform: rotate(-10deg); }
}

/* 经典台词气泡 */
.speech-bubble {
  background: white;
  padding: 15px;
  border-radius: 15px;
  position: relative;
  margin: 20px 0;
  box-shadow: 3px 3px 0 #FF6B6B;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid white;
  position: absolute;
  bottom: -15px;
  left: 20%;
}

/* 零用钱互动效果 */
.allowance-btn {
  background: #FF6B6B;
  border: none;
  padding: 5px 15px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.allowance-btn:hover {
  transform: scale(1.1);
  background: #FF4444;
}

.money-hidden {
  opacity: 0;
  transition: 0.5s;
}

.money-hidden.show {
  opacity: 1;
  animation: moneyJump 0.8s;
}

@keyframes moneyJump {
  50% { transform: translateY(-20px) rotate(10deg); }
}

/* 动感超人彩蛋 */
.action-kamen {
  width: 100px;
  position: absolute;
  right: -30px;
  bottom: -30px;
  opacity: 0.3;
  animation: fly 3s infinite;
}

@keyframes fly {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0); }
}
</style>

<script>
function showMoney() {
  const money = document.getElementById('money');
  money.classList.add('show');
  setTimeout(() => {
    money.textContent = '💰 又被妈妈没收了！';
  }, 800);
}
</script>
</div>