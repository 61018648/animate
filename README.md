# initScrollAnimations

为页面元素及其子元素实现基于 animate.css 的滚动动画效果，支持延迟、动画类型、动画时长等自定义。

## 功能简介

- 自动为 `.scroll-animate` 元素或其子元素添加动画效果。
- 支持通过 `data-effect`、`data-delay`、`data-child`、`data-duration` 属性自定义动画。
- 支持只触发一次或每次进入视口都触发动画。
- 兼容 animate.css 或类似动画库。

## 参数说明

| 参数名                | 类型      | 默认值                  | 说明                                                         |
|----------------------|-----------|-------------------------|--------------------------------------------------------------|
| parentSelector       | string    | `.scroll-animate`       | 目标元素的 CSS 选择器。                                       |
| observeOnce          | boolean   | `true`                  | 是否只触发一次动画。                                          |
| defaultEffect        | string    | `'fadeInDown'`          | 默认动画效果类名。                                            |
| defaultDelayIncrement| number    | `0.05`                  | 默认动画延迟递增（秒）。                                      |
| defaultChildSelector | string    | `'a, li'`               | 默认子元素选择器。                                            |

## 元素属性说明

- `data-effect`：自定义动画效果类名（如 `fadeInUp`）。
- `data-delay`：自定义延迟递增（如 `0.1`）。
- `data-child`：自定义子元素选择器（如 `'.item'`）。
- `data-duration`：自定义动画持续时间（如 `1s`、`800ms`）。

## 使用方式

### 1. 给父元素及子元素加动画

```html
<ul class="scroll-animate father" data-effect="fadeInUp" data-delay="0.1" data-duration="1s">
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
</ul>
```
- 所有 `li` 子元素会依次以 `fadeInUp` 效果、0.1s 递增延迟、1s 持续时间动画。

### 2. 给单个元素加动画

```html
<div class="scroll-animate" data-effect="fadeIn" data-duration="2s">
  单个动画元素
</div>
```
- 该元素本身会以 `fadeIn` 效果、2s 持续时间动画。

### 3. JS 初始化

```js
initScrollAnimations();
// 或自定义参数
initScrollAnimations('.scroll-animate.father', false, 'fadeInLeft', 0.2, '.item');
```

## 注意事项

- 需引入 animate.css 或类似动画库。
- 建议为动画元素设置初始 `visibility: hidden`，本函数会自动切换。
- `data-duration` 支持任何合法的 CSS 时间值（如 `1s`, `800ms`）。

## 兼容性

- 依赖 IntersectionObserver，IE 需 polyfill。

---

如需更多自定义，请参考源码注释。
