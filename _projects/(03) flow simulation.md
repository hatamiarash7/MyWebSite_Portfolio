---
title: شبیه ساز ذرات
tools: [Simulating, JavaScript, Visualization]
image: ../assets/img/flow-simulation.webp
description: شبیه سازی ذرات معلق در هوا با جاوا اسکریپت
developed_date: 1389
lang: JavaScript
open_source: خیر
---

<h1 class="center">
<img src="../assets/img/flow-simulation.webp"/>
</h1>

<h2 class="center">
{% include elements/button.html text="نسخه تحت وب" size="lg" disabled="1" event="Demo" %}
</h2>

{% include project-info.html %}

در این پروژه سعی شده است تا با استفاده از کتابخانه های جاوا اسکریپت حرکت فیزیکی ذرات معلق در هوا شبیه سازی شود.

در این شبیه سازی 3 متغییر وجود دارد :

- تعداد ذرات
- سرعت حرکت
- تلاطم یا آشفتگی ذرات

<h1 class="center">
<img src="../assets/img/flow-simulation-2.webp"/>
</h1>

البته توجه داشته باشید که افزایش متغیر تعداد ذرات نیازمند سیستم پردازش قوی تری نیز خواهد بود. برای مثال نمایش 1 میلیون ذره با سرعت و تلاطم پیشفرض روی سیستمی با مشخصات زیر به راحتی صورت می پذیرد :

- <span class="colored">پردازنده :</span> Intel i7-8700K
- <span class="colored">کارت گرافیک :</span> Nvidia GeForce GTX 1070

<h1 class="center">
<img src="../assets/img/flow-simulation-3.webp"/>
</h1>
