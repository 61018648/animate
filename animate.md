# 滚动动画函数文档

## 概述

`initScrollAnimations` 是一个用于初始化滚动动画效果的 JavaScript 函数。该函数使用 Intersection Observer API 来检测元素是否进入视口，并根据配置为元素或其子元素应用动画效果。

## 功能特性

- ✅ 支持滚动触发动画
- ✅ 支持子元素逐个动画
- ✅ 支持自定义动画效果
- ✅ 支持自定义延迟时间
- ✅ 支持自定义动画持续时间
- ✅ 支持一次性或重复触发
- ✅ 兼容 animate.css 动画库

## 依赖

- **animate.css** 或类似的 CSS 动画库
- 现代浏览器（支持 Intersection Observer API）

## 函数签名

```javascript
function initScrollAnimations(
  parentSelector = '.scroll-animate',
  observeOnce = true,
  defaultEffect = 'fadeInDown',
  defaultDelayIncrement = 0.05,
  defaultChildSelector = 'a, li'
)
```

## 参数说明

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `parentSelector` | string | `'.scroll-animate'` | 父元素的 CSS 选择器 |
| `observeOnce` | boolean | `true` | 是否只触发一次动画 |
| `defaultEffect` | string | `'fadeInDown'` | 默认动画效果类名 |
| `defaultDelayIncrement` | number | `0.05` | 默认延迟递增值（秒） |
| `defaultChildSelector` | string | `'a, li'` | 默认子元素选择器 |

## 支持的 data 属性

| 属性 | 描述 | 示例 |
|------|------|------|
| `data-effect` | 动画效果类名 | `data-effect="fadeInUp"` |
| `data-delay` | 延迟递增值 | `data-delay="0.1"` |
| `data-child` | 子元素选择器 | `data-child=".item"` |
| `data-duration` | 动画持续时间 | `data-duration="2s"` |

## 使用方法

### 1. 基本用法

```html
<!-- 引入 animate.css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

<!-- HTML 结构 -->
<div class="scroll-animate">
    <h2>这是一个标题</h2>
</div>

<script>
// 初始化动画
initScrollAnimations();
</script>
```

### 2. 子元素动画

使用 `father` 类或 `data-child` 属性来为子元素添加动画：

```html
<!-- 使用 father 类 -->
<div class="scroll-animate father">
    <a href="#">链接1</a>
    <a href="#">链接2</a>
    <a href="#">链接3</a>
</div>

<!-- 使用 data-child 属性 -->
<div class="scroll-animate" data-child=".item">
    <div class="item">项目1</div>
    <div class="item">项目2</div>
    <div class="item">项目3</div>
</div>
```

### 3. 自定义动画效果

```html
<div class="scroll-animate" data-effect="bounceIn">
    <p>弹跳进入效果</p>
</div>

<div class="scroll-animate father" data-effect="slideInLeft">
    <span>从左滑入</span>
    <span>从左滑入</span>
</div>
```

### 4. 自定义延迟时间

```html
<div class="scroll-animate father" data-delay="0.2">
    <li>项目1 (0s)</li>
    <li>项目2 (0.2s)</li>
    <li>项目3 (0.4s)</li>
</div>
```

### 5. 自定义动画持续时间

```html
<!-- 给子元素设置持续时间 -->
<div class="scroll-animate father" data-duration="2s">
    <a href="#">慢速动画链接1</a>
    <a href="#">慢速动画链接2</a>
</div>

<!-- 给元素本身设置持续时间 -->
<div class="scroll-animate" data-duration="1.5s">
    <h3>1.5秒动画标题</h3>
</div>

<!-- 支持毫秒单位 -->
<div class="scroll-animate father" data-duration="500ms">
    <span>快速动画</span>
</div>
```

### 6. 组合使用

```html
<div class="scroll-animate father" 
     data-effect="fadeInUp" 
     data-delay="0.1" 
     data-duration="1s"
     data-child=".card">
    <div class="card">卡片1</div>
    <div class="card">卡片2</div>
    <div class="card">卡片3</div>
</div>
```

### 7. 重复触发动画

```javascript
// 每次进入视口都触发动画
initScrollAnimations('.scroll-animate', false);
```

## 工作原理

### 1. 元素分类

函数会根据元素的类名和属性将其分为两类：

- **子元素动画**：有 `father` 类或 `data-child` 属性的元素
- **自身动画**：普通的 `.scroll-animate` 元素

### 2. 初始化过程

1. 查找所有匹配的父元素
2. 为每个元素创建 Intersection Observer
3. 初始化元素状态（隐藏、移除动画类）
4. 设置动画持续时间（如果指定）

### 3. 动画触发

当元素进入视口时：
- 应用动画效果类
- 设置可见性
- 为子元素设置递增延迟

## CSS 要求

确保引入 animate.css 或提供相应的动画类：

```css
/* 如果不使用 animate.css，需要自定义动画 */
.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.fadeInDown {
    animation-name: fadeInDown;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
```

## 浏览器兼容性

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

对于不支持 Intersection Observer 的浏览器，可以使用 polyfill：

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
```

## 常见问题

### Q: 动画不生效？
A: 检查以下几点：
1. 是否正确引入 animate.css
2. 元素是否有正确的类名
3. 动画效果类名是否存在
4. 浏览器是否支持 Intersection Observer

### Q: 如何自定义触发阈值？
A: 目前阈值固定为 0.1，如需修改可以编辑函数中的 `observerOptions.threshold` 值。

### Q: 可以同时使用多个动画效果吗？
A: 每个元素只能设置一个 `data-effect`，但可以通过 CSS 组合多个动画类。

## 示例项目

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>滚动动画示例</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <style>
        body { margin: 0; padding: 20px; }
        .section { height: 100vh; padding: 50px; }
        .card { padding: 20px; margin: 10px; background: #f0f0f0; }
    </style>
</head>
<body>
    <div class="section">
        <h1>向下滚动查看动画效果</h1>
    </div>
    
    <div class="section">
        <div class="scroll-animate" data-effect="bounceIn">
            <h2>弹跳进入的标题</h2>
        </div>
    </div>
    
    <div class="section">
        <div class="scroll-animate father" data-effect="fadeInLeft" data-delay="0.2" data-duration="1.5s">
            <div class="card">卡片 1</div>
            <div class="card">卡片 2</div>
            <div class="card">卡片 3</div>
        </div>
    </div>
    
    <script src="animate.js"></script>
    <script>
        initScrollAnimations();
    </script>
</body>
</html>
```

## 更新日志

### v1.1.0
- ✅ 新增 `data-duration` 属性支持
- ✅ 改进文档注释
- ✅ 优化代码结构

### v1.0.0
- ✅ 基础滚动动画功能
- ✅ 子元素动画支持
- ✅ 自定义动画效果
- ✅ 延迟时间配置
