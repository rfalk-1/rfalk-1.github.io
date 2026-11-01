# RFALK · Personal Space

使用当前 Lively 壁纸「诺艾尔」制作的静态个人主页，可直接部署到 GitHub Pages。无需安装依赖或构建。

## 发布到现有网站

1. 解压下载的 `rfalk-site.zip`，进入解压后的文件夹。
2. 打开 https://github.com/rfalk-1/rfalk.github.io ，选择 **Add file → Upload files**。
3. 将 `index.html`、`style.css`、`script.js`、`.nojekyll`、`README.md` 和整个 `assets` 文件夹拖入上传区域。请上传这些内容本身，不要再套一层 `rfalk-site` 文件夹，也不要只上传 ZIP 压缩包。
4. 点击 **Commit changes**，将首页更新提交到 `main`。同名的 `index.html` 会被新版替换。
5. 等待 **Actions** 中 Pages 部署成功，打开 **Settings → Pages** 显示的网址。

当前仓库未改名时，网站地址为 https://rfalk-1.github.io/rfalk.github.io/ 。如果已经改名为 `rfalk-1.github.io`，请上传到改名后的仓库，使用 https://rfalk-1.github.io/ 。

## 本地预览

直接打开 `index.html` 即可查看页面。如浏览器限制本地视频，请用编辑器的本地预览服务器打开整个文件夹。

## 内容维护

- 修改个人介绍、项目文字：编辑 `index.html`。
- 修改颜色、字号、布局：编辑 `style.css`。
- 真实 GitHub 入口：`https://github.com/rfalk-1`。原来的 `hello@example.com` 是示例邮箱，已移除。
- 更换背景：替换 `assets/noelle.mp4` 和 `assets/noelle-poster.jpg`，或修改页面中的资源路径。

## 背景与交互

- 背景来自本机正在使用的 Lively「诺艾尔」壁纸，保留原始 30 秒、1920 × 1080、30 fps 的动画，视频压缩后约 3.6 MB，无音轨。
- 静态封面先显示，视频静音循环播放；播放失败时回退到封面。
- 底部可暂停动画、隐藏界面欣赏壁纸；按 Escape 返回主页。
- 页面切到后台时暂停视频；尊重系统“减少动态效果”和浏览器节省流量设置。
- 本项目未附第三方壁纸的授权声明；壁纸素材的权利仍属于原作者，本页源码不改变其授权。

## 已验证

已在浏览器检查 320、390、768、1440 像素宽度下无横向溢出；确认 1080p 视频加载、播放与暂停、刷新后记住暂停偏好、纯壁纸模式及 Escape 返回正常。未提交到线上仓库。
