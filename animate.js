/**
 * 初始化滚动动画效果。
 * 该函数会查找所有带有 'scroll-animate father' 类的父元素，
 * 根据其 data-* 属性为子元素应用动画效果和延迟。
 * 依赖 animate.css 或类似库提供动画效果的初始隐藏和最终状态管理。
 *
 * 支持的 data 属性：
 * - data-effect: 动画效果类名
 * - data-delay: 延迟递增值
 * - data-child: 子元素选择器
 * - data-duration: 动画持续时间（如 "2s", "500ms"）
 *
 * @param {string} [parentSelector='.scroll-animate.father'] - 父元素的 CSS 选择器。
 * @param {boolean} [observeOnce=true] - 如果为 true，动画只触发一次；如果为 false，每次进入视口都触发。
 * @param {string} [defaultEffect='fadeInDown'] - 默认的动画效果类名。
 * @param {number} [defaultDelayIncrement=0.05] - 默认的延迟递增值。
 * @param {string} [defaultChildSelector='a, li'] - 默认的子元素选择器。
 */
function initScrollAnimations(
  parentSelector = '.scroll-animate',
  observeOnce = true,
  defaultEffect = 'fadeInDown',
  defaultDelayIncrement = 0.05,
  defaultChildSelector = 'a, li'
) {
  const parents = document.querySelectorAll(parentSelector);

  if (parents.length === 0) {
      console.warn(`未找到任何父元素，请检查选择器：${parentSelector}`);
      return;
  }

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  parents.forEach(parent => {
      const isFather = parent.classList.contains('father');
      const hasDataChild = parent.hasAttribute('data-child');
      const effectClass = parent.dataset.effect || defaultEffect;
      const delayIncrement = parseFloat(parent.dataset.delay || defaultDelayIncrement);
      const duration = parent.dataset.duration; // 获取动画持续时间

      // 1. 有father类或有data-child属性，给子元素加动画
      if (isFather || hasDataChild) {
          const childSelector = parent.dataset.child || defaultChildSelector;
          const children = parent.querySelectorAll(childSelector);
          if (children.length === 0) {
              console.warn(`未找到子元素，请检查 data-child 选择器（或默认值）：${childSelector}`, parent);
              return;
          }

          // 初始化子元素状态
          children.forEach(child => {
              child.classList.add('animated');
              child.classList.remove(effectClass);
              child.style.animationDelay = '';
              child.style.visibility = 'hidden';
              // 如果有data-duration属性，设置动画持续时间
              if (duration) {
                  child.style.animationDuration = duration;
              }
          });

          const observerCallback = (entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      let delay = 0;
                      children.forEach(child => {
                          child.style.animationDelay = `${delay}s`;
                          child.classList.add(effectClass);
                          child.style.visibility = 'visible';
                          delay += delayIncrement;
                      });
                      if (observeOnce) observer.unobserve(entry.target);
                  } else if (!observeOnce) {
                      children.forEach(child => {
                          child.classList.remove(effectClass);
                          child.style.animationDelay = '';
                          child.style.visibility = 'hidden';
                      });
                  }
              });
          };
          const observer = new IntersectionObserver(observerCallback, observerOptions);
          observer.observe(parent);

      // 2. 没有father类且没有data-child属性，给元素本身加动画
      } else {
          parent.classList.add('animated');
          parent.classList.remove(effectClass);
          parent.style.animationDelay = '';
          parent.style.visibility = 'hidden';
          // 如果有data-duration属性，设置动画持续时间
          if (duration) {
              parent.style.animationDuration = duration;
          }

          const observerCallback = (entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      parent.classList.add(effectClass);
                      parent.style.visibility = 'visible';
                      if (observeOnce) observer.unobserve(entry.target);
                  } else if (!observeOnce) {
                      parent.classList.remove(effectClass);
                      parent.style.visibility = 'hidden';
                  }
              });
          };
          const observer = new IntersectionObserver(observerCallback, observerOptions);
          observer.observe(parent);
      }
  });
}
