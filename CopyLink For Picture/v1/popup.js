let imageLinks =[];

// 1. 获取当前标签页的图片
document.getElementById('getImages').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractImages,
  }, (results) => {
    if (results && results[0] && results[0].result) {
      imageLinks = results[0].result;
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

// 2. 正序排序 (A-Z)
document.getElementById('sortAsc').addEventListener('click', () => {
  if(imageLinks.length === 0) return;
  imageLinks.sort();
  updateTextarea();
  document.getElementById('status').innerText = "已按 A-Z 排序";
});

// 3. 倒序排序 (Z-A)
document.getElementById('sortDesc').addEventListener('click', () => {
  if(imageLinks.length === 0) return;
  imageLinks.sort((a, b) => b.localeCompare(a));
  updateTextarea();
  document.getElementById('status').innerText = "已按 Z-A 排序";
});

// 4. 一键复制
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

// 更新文本框内容
function updateTextarea() {
  document.getElementById('linkOutput').value = imageLinks.join('\n');
}

// ==========================================
// 注入到网页中运行的核心逻辑（已针对微信公众号优化）
// ==========================================
function extractImages() {
  const imgs = document.querySelectorAll('img');
  const links = new Set();
  
  imgs.forEach(img => {
    // 微信公众号的真实图片链接通常储存在 data-src 属性中
    // 我们优先获取 data-src，如果没有，再去获取常规的 src
    let realSrc = img.getAttribute('data-src') || img.src;
    
    if (realSrc) {
      // 过滤掉 base64 数据和无效链接，只保留 http/https 链接
      if (realSrc.startsWith('http')) {
        links.add(realSrc);
      }
    }
  });
  
  return Array.from(links);
}