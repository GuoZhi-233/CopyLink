let imageLinks =[];
let currentPrefix = '';
let currentSuffix = '';

// 1. 获取当前标签页的图片
document.getElementById('getImages').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractImages,
  }, (results) => {
    if (results && results[0] && results[0].result) {
      imageLinks = results[0].result;
      
      // 获取链接时，自动读取输入框的前后缀
      currentPrefix = document.getElementById('prefixText').value;
      currentSuffix = document.getElementById('suffixText').value;
      
      updateTextarea();
      
      const statusEl = document.getElementById('status');
      if(imageLinks.length > 0) {
        statusEl.innerText = `成功获取 ${imageLinks.length} 个图片链接！`;
        statusEl.style.color = "#28a745";
      } else {
        statusEl.innerText = `未找到图片，请尝试上下滚动网页后再试`;
        statusEl.style.color = "#d9534f";
      }
    }
  });
});

// 解析链接末尾的数字用于排序
function getLastNumberFromUrl(url) {
  try {
    const baseUrl = url.split('?')[0].split('#')[0];
    const match = baseUrl.match(/(\d+)\D*$/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  } catch (e) {
    console.error(e);
  }
  return Infinity;
}

// 2. 按数字从小到大排序
document.getElementById('sortNum').addEventListener('click', () => {
  if(imageLinks.length === 0) return;
  
  imageLinks.sort((a, b) => {
    const numA = getLastNumberFromUrl(a);
    const numB = getLastNumberFromUrl(b);
    if (numA === Infinity && numB === Infinity) return a.localeCompare(b);
    return numA - numB;
  });
  
  updateTextarea();
  document.getElementById('status').innerText = "✅ 已按链接末尾数字从小到大排序";
  document.getElementById('status').style.color = "#28a745";
});

// 3. 筛选功能（删除不包含关键词的链接）
document.getElementById('applyFilter').addEventListener('click', () => {
  const keyword = document.getElementById('filterKeyword').value;
  if (!keyword) {
    document.getElementById('status').innerText = "❌ 请先在左侧输入需要保留的关键词！";
    document.getElementById('status').style.color = "#d9534f";
    return;
  }
  
  const originalLength = imageLinks.length;
  // 核心过滤逻辑：只保留包含 keyword 的链接
  imageLinks = imageLinks.filter(link => link.includes(keyword));
  updateTextarea();
  
  document.getElementById('status').innerText = `✅ 筛选完成：保留 ${imageLinks.length} 个 (剔除了 ${originalLength - imageLinks.length} 个)`;
  document.getElementById('status').style.color = "#28a745";
});

// 4. 格式化功能（应用前后缀）
document.getElementById('applyFormat').addEventListener('click', () => {
  currentPrefix = document.getElementById('prefixText').value;
  currentSuffix = document.getElementById('suffixText').value;
  updateTextarea();
  
  document.getElementById('status').innerText = "✅ 已应用自定义前后缀格式";
  document.getElementById('status').style.color = "#28a745";
});

// 5. 一键复制
document.getElementById('copyLinks').addEventListener('click', () => {
  const textarea = document.getElementById('linkOutput');
  if (!textarea.value) {
    document.getElementById('status').innerText = "没有可复制的链接！";
    document.getElementById('status').style.color = "#d9534f";
    return;
  }
  
  navigator.clipboard.writeText(textarea.value).then(() => {
    document.getElementById('status').innerText = "✅ 复制成功！";
    document.getElementById('status').style.color = "#28a745";
  }).catch(err => {
    document.getElementById('status').innerText = "❌ 复制失败，请手动选择复制。";
  });
});

// 6. 一键下载所有图片
document.getElementById('downloadLinks').addEventListener('click', () => {
  if (imageLinks.length === 0) {
    document.getElementById('status').innerText = "没有可下载的图片！";
    document.getElementById('status').style.color = "#d9534f";
    return;
  }
  
  // 下载时使用原始 imageLinks 数组，不受前后缀字符影响
  imageLinks.forEach((url) => {
    chrome.downloads.download({ url: url });
  });
  
  document.getElementById('status').innerText = `✅ 开始下载 ${imageLinks.length} 张图片！`;
  document.getElementById('status').style.color = "#17a2b8";
});

// 更新文本框内容（在显示时，动态加上前后缀）
function updateTextarea() {
  const formattedLinks = imageLinks.map(link => `${currentPrefix}${link}${currentSuffix}`);
  document.getElementById('linkOutput').value = formattedLinks.join('\n');
}

// ==========================================
// 注入到网页中运行的提取逻辑
// ==========================================
function extractImages() {
  const imgs = document.querySelectorAll('img');
  const links = new Set();
  
  imgs.forEach(img => {
    let realSrc = img.getAttribute('data-src') || img.src;
    if (realSrc && realSrc.startsWith('http')) {
      links.add(realSrc);
    }
  });
  
  return Array.from(links);
}