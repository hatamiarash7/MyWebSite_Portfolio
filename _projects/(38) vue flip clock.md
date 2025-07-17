---
title: ساعت Flip برای Vue JS
tools: [Vue, JavaScript, UI]
image: ../assets/img/vue-flip-clock.jpg
description: این پروژه یک ساعت Flip برای Vue JS است که می توانید آن را در وبسایت خود استفاده کنید
developed_date: 1401
lang: JavaScript
techs: [JavaScript, Vue, NPM]
open_source: بله
---

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/vue-flip-clock" text="گیت‌هاب" size="lg" event="Github+Link" %}
{% include elements/button.html link="https://codesandbox.io/s/vue-flip-clock-f3pr7e?fontsize=14&hidenavigation=1&theme=dark" text="دمو" size="lg" event="Demo" %}
</h2>

{% include project-info.html %}

[![GitHub release](https://img.shields.io/github/v/release/hatamiarash7/vue-flip-clock.svg)](https://GitHub.com/hatamiarash7/vue-flip-clock/releases/)

در برخی پروژه ها نیاز به طراحی و پیاده سازی ساعت دیجیتال دارید. این پروژه یک ساعت Flip برای Vue JS است که می توانید آن را در وبسایت خود استفاده کنید. نیازمندی های کمی داشته و استفاده از آن خیلی ساده است.

<h1 class="center">
<img src="../assets/img/vue-flip-clock2.png"/>
</h1>

## نصب

ابتدا کتابخانه را با استفاده از NPM نصب کنید.

```bash
npm i @hatamiarash7/vue-flip-clock --save
```

سپس آن را در پروژه خود وارد کنید.

```js
import Clock from "@hatamiarash7/vue-flip-clock";
import "@hatamiarash7/vue-flip-clock/dist/vue-flip-clock.css";

Vue.component("flip-clock", Clock);
```

> می توانید از `Vue.use` یا `Vue.component` استفاده کنید.

در نهایت Component را در صفحه خود قرار دهید.

```html
<template>
  ...
  <flip-clock innerColor="#2980b9" />
  ...
</template>
```

## تنظیمات

تنها تنظیماتی که برای این کتابخانه در نظر گرفته شده ٬ قابلیت تغییر رنگ ساعت است که با استفاده از `innerColor` قابل تنظیم است.

```html
<flip-clock innerColor="#2980b9" />
```
