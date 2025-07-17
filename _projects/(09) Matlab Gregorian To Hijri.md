---
title: تاریخ شمسی Matlab
tools: [Matlab, Date, Persian]
image: https://socialify.git.ci/hatamiarash7/Matlab_GregorianToHijri/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این کتابخانه به راحتی می توانید از تاریخ شمسی در پروژه متلب خود استفاده کنید
developed_date: 1400
open_source: بله
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/Matlab_GregorianToHijri/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/Matlab_GregorianToHijri" text="گیت‌هاب" size="lg" event="Github+Link" %}
</h2>

{% include project-info.html %}

متلب توابع زیادی برای کار با زمان و تاریخ داره اما در حال حاضر از تاریخ هجری شمسی پشتیبانی نمیکنه. با استفاده از این کتابخانه می توانید به راحتی چنین قابلیتی رو به پروژه های خودتون اضافه کرده و ازش استفاده کنید.

## نصب

ابتدا ریپازیتوری مربوطه رو Clone کرده و در دایرکتوری پروژه خودتون قرار بدید :

```sh
cd <YOUR PROJECT>
git clone https://github.com/hatamiarash7/Matlab_GregorianToHijri Hijri
```

سپس می توانید از توابع این کتابخانه استفاده کنید. توجه داشته باشید در صورتی که این کتابخانه را به صورت پوشه ای جداگانه در پروژه خود قرار دهید باید آن را به Path اضافه کنید.

```matlab
addpath(genpath('Hijri'));
```

## استفاده

در اینجا دو تابع وجود داره که میتونید ازش استفاده کنید :

- تابع `datetoday` برای دریافت تاریخ امروز
- تابع `dateconv` برای تبدیل تاریخ میلادی به شمسی

```matlab
[sh, sh_fa] = dateconv(2021, 5, 6);
```

نتایج به این صورت است :

```txt
Today's date is :
    06-Jun-2021

    1400    2   16

    ۱۶ اردیبهشت/ثور ۱۴۰۰
```
