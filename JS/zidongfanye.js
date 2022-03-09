/*
 * @name: 自动拼接下一页
 * @Author: 谷花泰
 * @version: 1.0
 * @description: 已适配百度、谷歌、搜狗、神马、必应
 * @include: *
 * @createTime: 2019-11-16 23:10:18
 * @updateTime: 2019-11-17 07:33:04
 */
(function () {
  /* 执行判断 */
  const key = encodeURIComponent('谷花泰:自动拼接下一页:执行判断');
  if (window[key]) {
    return;
  };
  window[key] = true;

  class AutoNextPage {
    /**
     * 初始化配置
     */
    constructor(_configs) {
      const that = this;
      this.configs = _configs;
      /* 最终配置  */
      this.config = {};

      /* 是否执行代码 */
      const canLoad = this.configs.some(config => {
        if (that.siteInList(config.sites)) {
          that.config = config;
        };
        return that.siteInList(config.sites);
      });
      if (!canLoad) {
        return;
      };

      /* 添加样式 */
      this.addStyle(this.config.style || '');

      /* 保存获取链接的方法 */
      this._getNextPageUrl = this.config.getNextPageUrl || this.getNextPageUrl;

      /* 获取下一页方法 */
      this._getNextPage = this.config.getNextPage || null;

      /* 请求状态判断 */
      this.isRequesting = false;

      /* 上一次的文档高度 */
      this.lastScrollHeight = top.document.documentElement.scrollHeight;
      this.init();
    };
    /**
     * 监听滚动
     */
    init() {
      const html = top.document.documentElement;

      /* 刚进来直接加载下一页 */
      this.loadNextPage();
      window.addEventListener('scroll', this.debounce(() => {
        if (html.scrollTop >= this.lastScrollHeight) {
          this.loadNextPage();
        };
      }, 10));
    };
    /**
     * 判断网站是否在名单内，支持正则
     */
    siteInList(sites) {
      const hostname = window.location.hostname;
      const result = sites.some(site => {
        if (hostname.match(site)) {
          return true;
        }
        return false;
      });
      return result;
    };
    /**
     * 默认获取下一页链接的方法
     */
    getNextPageUrl() {
      const nextPageNodes = document.querySelectorAll('.se-page-controller a');
      const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
      return nextPageNode && nextPageNode.getAttribute('href') || '';
    };
    /**
     * 根据 url 获取已渲染的 dom 的 html 代码
     */
    getFrameHtml(url) {
      return new Promise((resolve, reject) => {
        const iframe = top.document.createElement('iframe');
        iframe.src = url;
        iframe.setAttribute('style', `
          position:fixed; 
          width:0; 
          height:0; 
          overflow:hidden; 
          opacity:0;
        `);
        top.document.body.appendChild(iframe);
        const framesLength = top.frames.length;
        iframe.onload = () => {
          const lastWindow = top.frames[framesLength - 1] || top;
          const html = lastWindow.document.body.innerHTML;
          resolve(html);
          this.isRequesting = false;
          top.document.body.removeChild(iframe);
        };
      });
    };
    /**
     * 添加样式
     */
    addStyle(css) {
      const style = document.querySelector('style') || document.createElement('style');
      style.innerHTML += css;
    };
    /**
     * 防抖函数
     */
    debounce(fn, delay) {
      let timer = null;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      };
    };
    /**
     * 加载下一页
     */
    loadNextPage() {
      /* 点击类 */
      if (this._getNextPage) {
        this.lastScrollHeight = top.document.documentElement.scrollHeight;
        this._getNextPage();
        console.log('点击类：加载下一页');
        return;
      };

      /* 链接类 */
      const nextPageUrl = this._getNextPageUrl();
      if (this.isRequesting) {
        return;
      };
      console.log('链接类：加载下一页', nextPageUrl);
      this.isRequesting = true;
      this.getFrameHtml(nextPageUrl).then(html => {
        this.lastScrollHeight = top.document.documentElement.scrollHeight;
        top.document.body.innerHTML += `
          <div class="via-next-page">
            ${html}
          </div>
        `;
      });
    };
  };

  try {
    const configs = [
      {
        sites: ['m.baidu.com', 'www.baidu.com'],
        style: `
          .se-page-ft,
          .se-page-copyright.se-copyright-zbios {
            display: none !important;
          }
        `,
        getNextPageUrl() {
          const nextPageNodes = document.querySelectorAll('.se-page-controller a');
          const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
          let nextPageLink = nextPageNode && nextPageNode.getAttribute('href') || '';
          let reg = /(https*?:\/\/\w+\.\w+?\.com)([\w\W]*)/i;
          nextPageLink = nextPageLink.replace(reg, (res, $1, $2) => {
            return top.location.origin + $2;
          });
          return nextPageLink;
        }
      },
      {
        sites: ['www.google.com'],
        style: `
          #sfooter {
            display: none !important;
          }
        `,
        getNextPageUrl() {
          const moreResultNodes = document.querySelectorAll('a[aria-label="更多结果"]');
          const moreResultNode = moreResultNodes[moreResultNodes.length - 1];
          const moreResultLink = moreResultNode && moreResultNode.getAttribute('href') || '';

          const nextPageNodes = document.querySelectorAll('a[aria-label="下一页"]');
          const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
          const nextPageLink = nextPageNode && nextPageNode.getAttribute('href') || '';

          return nextPageLink || moreResultLink;
        }
      },
      {
        sites: ['m.sogou.com', 'wap.sogou.com'],
        style: ``,
        getNextPage() {
          const nextPageNodes = document.querySelectorAll('a.nextpage');
          const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
          nextPageNode && nextPageNode.click();
        }
      },
      {
        sites: ['m.sm.cn', 'quark.sm.cn'],
        style: ``,
        getNextPage() {
          const nextPageNodes = document.querySelectorAll('span.p-next');
          const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
          nextPageNode && nextPageNode.click();
        }
      },
      {
        sites: ['cn.bing.com'],
        style: `
          .b_footer,
          .b_msg {
            display: none !important;
          }
        `,
        getNextPageUrl() {
          const nextPageNodes = document.querySelectorAll('[title="下一页"]');
          const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
          let nextPageLink = nextPageNode && nextPageNode.getAttribute('href') || '';
          let reg = /(https*?:\/\/\w+\.\w+?\.com)([\w\W]*)/i;
          nextPageLink = nextPageLink.replace(reg, (res, $1, $2) => {
            return top.location.origin + $2;
          });
          return nextPageLink;
        }
      },
      {
        sites: ['m.so.com'],
        style: ``,
        getNextPage() {
          const nextPageNodes = document.querySelectorAll('.load-more');
          const nextPageNode = nextPageNodes[nextPageNodes.length - 1];
          nextPageNode && nextPageNode.click();
        }
      }
    ];

    if (document.readyState === 'complete') {
      new AutoNextPage(configs);
      return;
    };
    window.addEventListener('load', () => {
      new AutoNextPage(configs);
    });
  } catch (err) {
    console.log(':自动拼接下一页：', err);
  };
})();
