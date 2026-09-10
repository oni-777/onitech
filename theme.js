/* ============================================================
   THEME.JS — công tắc dark/light mode dùng CHUNG cho cả 3 trang
   (index.html, chi-tiet-sach.html, bai-viet.html).

   Cách hoạt động:
   - Lưu lựa chọn vào localStorage (key "onitech-theme") nên khi
     chuyển sang trang khác, chế độ vẫn giữ nguyên (đồng bộ).
   - File này tự vẽ nút bật/tắt (góc dưới-phải) và tự chèn CSS ghi
     đè màu cho dark mode — không cần sửa gì thêm ở từng trang.
   - Muốn đổi màu dark mode: sửa các giá trị trong biến CSS bên dưới.
   ============================================================ */
(function () {
  // Áp dụng ngay lập tức (trước khi trang kịp vẽ) để tránh bị
  // "chớp" sáng rồi mới chuyển tối.
  var saved = localStorage.getItem('onitech-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  var style = document.createElement('style');
  style.textContent = `
    html[data-theme="dark"] {
      --paper: #0d0b18;
      --paper-warm: #161228;
      --text-on-paper: #ece7fb;
      --text-muted: #9089b8;
      --border: rgba(236,231,251,0.14);
    }
    html[data-theme="dark"] .book-item { background: rgba(255,255,255,0.05); }
    html[data-theme="dark"] .search-wrap { background: var(--paper-warm); }

    .theme-toggle-btn {
      position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 60;
      width: 46px; height: 46px; border-radius: 50%;
      background: var(--ink); color: var(--gold);
      border: 1px solid rgba(236,231,251,0.15);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 4px 14px rgba(23,18,51,0.3);
      transition: transform 0.15s ease;
      padding: 0;
    }
    .theme-toggle-btn:hover { transform: scale(1.07); }
    .theme-toggle-btn svg { width: 20px; height: 20px; }
    @media (prefers-reduced-motion: reduce) {
      .theme-toggle-btn { transition: none; }
    }
  `;
  document.head.appendChild(style);

  var sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"/></svg>';
  var moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function paintButton(btn) {
    btn.innerHTML = isDark() ? sunIcon : moonIcon;
    btn.setAttribute('aria-label', isDark() ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối');
  }

  function init() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle-btn';
    paintButton(btn);
    btn.addEventListener('click', function () {
      if (isDark()) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('onitech-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('onitech-theme', 'dark');
      }
      paintButton(btn);
    });
    document.body.appendChild(btn);
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
