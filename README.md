# 🖼️ CopyLink For Picture

**CopyLink For Picture** 是一款轻量、高效的浏览器插件。旨在帮助用户一键提取网页中的所有图片链接，并提供**智能排序、关键词筛选、自定义前后缀格式化、一键复制与批量下载**等一站式功能。

特别针对使用了“图片懒加载”技术的网页进行了深度优化，能够精准抓取到隐藏的真实图片链接。

---

## ✨ 核心功能

- 📥 **一键收集**: 突破网页懒加载限制，提取页面所有真实的图片链接（支持 `data-src` 和常规 `src`）。
- 🔢 **智能排序**: 自动提取链接末尾的数字并进行从小到大排序（非数字链接自动靠后），非常适合处理序列化命名的组图。
- 🔍 **精准筛选**: 支持输入关键词（如 `imgIndex`），一键保留目标链接，剔除无关的网页元素（如头像、图标等）。
- ✨ **自定义格式**: 支持为链接批量添加**开头**与**结尾**字符（如 `'` 和 `',` ），方便开发者或排版人员直接复制为代码数组格式。
- 📋 **一键复制**: 将处理完毕的链接一键复制到系统剪贴板。
- ⬇️ **批量下载**: 一键将提取列表中的所有图片快速下载到本地电脑。

---

## 🚀 安装指南（本地开发者模式）

由于本项目目前未上架 Chrome 应用商店，你可以通过“开发者模式”轻松安装：

1. **下载源码**：
   点击页面右上角的 `Code` -> `Download ZIP` 下载本项目，并解压到一个固定的文件夹中（如 `D:\Extensions\CopyLink-For-Picture`）。
   *(或者使用 git clone: `git clone https://github.com/你的用户名/CopyLink-For-Picture.git`)*

2. **打开扩展管理页面**：
   在 Chrome 或 Edge 浏览器地址栏中输入 `chrome://extensions/`（Edge 为 `edge://extensions/`）并回车。

3. **开启开发者模式**：
   打开页面右上角的 **“开发者模式” (Developer mode)** 开关。

4. **加载插件**：
   点击左上角的 **“加载已解压的扩展程序” (Load unpacked)** 按钮，选择你刚刚解压的 `CopyLink-For-Picture` 文件夹。

5. **固定插件**（可选）：
   在浏览器右上角的拼图图标中找到本插件，点击“钉子”图标将其固定在工具栏，方便随时使用。

---

## 💡 使用说明

打开任意包含图片的网页（例如微信公众号文章），点击浏览器右上角的插件图标，即可呼出操作面板：

1. **[收集当前页图片链接]**：点击后将抓取网页内所有有效图片。*(提示：如果是长文章，建议先滚动到底部再点击，以确保所有图片均被加载或识别)*
2. **[按链接末尾数字排序]**：对抓取到的乱序图片进行重新排列。
3. **[筛选保留]**：在左侧输入特定的特征词（如 `wx_fmt=jpeg` 或 `imgIndex`），点击后将过滤掉所有不包含该词的链接。
4. **[加前后缀]**：在左侧输入你想添加的前缀和后缀，点击后可对展示的文本进行批量包裹排版。
5. **[一键复制]** / **[一键下载]**：对最终处理好的列表进行复制或触发浏览器的批量下载。*(注：首次下载多张图片时，浏览器顶部会提示“是否允许下载多个文件”，请务必点击“允许”)*

---

## 🛠️ 技术栈

- HTML / CSS (Flexbox 布局)
- JavaScript (ES6+)
- Chrome Extension Manifest V3 架构
- `chrome.scripting` API (DOM 注入)
- `chrome.downloads` API (文件下载)

---

## 🤝 贡献与反馈

欢迎提交 Issue 报告 Bug 或者提出新功能建议！如果你有代码优化方案，也非常欢迎提交 Pull Request。

如果这个小工具帮助到了你，请点右上角的 **⭐ Star** 支持一下！

----------------------------------------------------------------------
# 🖼️ CopyLink For Picture

**CopyLink For Picture** is a lightweight and efficient browser extension. It is designed to help users extract all image links from a webpage with one click, providing an all-in-one solution including **smart sorting, keyword filtering, custom prefix/suffix formatting, one-click copying, and batch downloading**.

It is specifically optimized for webpages using "lazy loading" techniques (such as **WeChat Official Account articles**), capable of accurately capturing hidden, real image links.

---

## ✨ Core Features

- 📥 **One-Click Collection**: Bypasses webpage lazy loading limits to extract all real image links (supports both `data-src` and standard `src`).
- 🔢 **Smart Sorting**: Automatically extracts numbers at the end of URLs and sorts them in ascending order (links without numbers are automatically placed at the bottom), perfect for handling sequentially named image groups.
- 🔍 **Precise Filtering**: Supports inputting keywords (e.g., `imgIndex`) to retain target links with one click, filtering out irrelevant web elements (like avatars, icons, etc.).
- ✨ **Custom Formatting**: Supports batch adding **prefix** and **suffix** characters (e.g., `'` and `',`) to links, making it convenient for developers or typesetters to directly copy them as a code array format.
- 📋 **One-Click Copy**: Copies the processed links to the system clipboard with one click.
- ⬇️ **Batch Download**: Quickly downloads all images in the extracted list to your local computer with one click.

---

## 🚀 Installation Guide (Developer Mode)

Since this project is not currently published on the Chrome Web Store, you can easily install it via "Developer mode":

1. **Download Source Code**: 
   Click `Code` -> `Download ZIP` at the top right of the repository page and extract it to a specific folder (e.g., `D:\Extensions\CopyLink-For-Picture`).
   *(Or use git clone: `git clone https://github.com/YourUsername/CopyLink-For-Picture.git`)*

2. **Open Extensions Page**: 
   Enter `chrome://extensions/` (or `edge://extensions/` for Edge) in the browser address bar and hit Enter.

3. **Enable Developer Mode**: 
   Turn on the **"Developer mode"** toggle at the top right of the page.

4. **Load Extension**: 
   Click the **"Load unpacked"** button at the top left, and select the `CopyLink-For-Picture` folder you just extracted.

5. **Pin the Extension** (Optional): 
   Find this extension in the puzzle piece icon at the top right of your browser, and click the "pin" icon to keep it on your toolbar for easy access.

---

## 💡 Usage Instructions

Open any webpage containing images (e.g., a WeChat Official Account article), and click the extension icon at the top right of the browser to open the operation panel:

1. **[收集当前页图片链接]** *(Collect image links)*: Click to grab all valid images on the webpage. *(Tip: For long articles, it's recommended to scroll to the bottom first to ensure all images are loaded or recognized)*
2. **[按链接末尾数字排序]** *(Sort by trailing number)*: Rearranges the grabbed out-of-order image links in ascending numerical order.
3. **[筛选保留]** *(Filter and keep)*: Enter a specific keyword (like `wx_fmt=jpeg` or `imgIndex`) in the left input box, and click this button to filter out all links that do not contain this keyword.
4. **[加前后缀]** *(Add prefix/suffix)*: Enter the prefix and suffix you want to add in the left input boxes, and click to batch wrap and format the displayed text.
5. **[一键复制]** / **[一键下载]** *(Copy / Download)*: Copy the final processed list to your clipboard or trigger the browser's batch download. *(Note: When downloading multiple images for the first time, the browser may prompt "Allow downloading multiple files" at the top. Please be sure to click "Allow")*

---

## 🛠️ Tech Stack

- HTML / CSS (Flexbox)
- JavaScript (ES6+)
- Chrome Extension Manifest V3
- `chrome.scripting` API (DOM Injection)
- `chrome.downloads` API (File Downloading)

---

## 🤝 Contributing & Feedback

Issues and Pull Requests are always welcome! If you have any code optimization suggestions or bug reports, feel free to contribute.

If this little tool helped you, please consider giving it a **⭐ Star** on the top right!
