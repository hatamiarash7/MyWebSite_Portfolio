---
title: ایجاد لیست دایرکتوری با Nginx و Docker
tools: [Docker, Nginx]
image: ../assets/img/docker-directory-index.webp
description: با استفاده از این پروژه می توانید با بهره مندی از Nginx یک لیست دایرکتوری ایجاد کنید
developed_date: 1399
techs: [Docker]
open_source: بله
---

<h1 class="center">
<img src="../assets/img/docker-directory-index.webp"/>
</h1>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/docker-directory-index" text="گیت‌هاب" size="lg" %}
</h2>

{% include project-info.html %}

بعضی مواقع نیاز دارید تا به چندتا فایل روی سرور خودتون دسترسی داشته باشید و اونا رو روی سیستم خودتون دانلود کنید. خب در حالت عادی این کار خیلی دردسر داره و نیاز به وقت و کار زیاد داره. با استفاده از این پروژه میتونید خیلی سریع و راحت یک کانتینر بسازید و به Nginx اجازه بدید تا در محل مورد نظر یک Directory Index ایجاد کند.

## نصب و استفاده

به سادگی کانتینر خودتون رو اجرا کرده و دایرکتوری مورد نظرتون رو به آدرس `data/` مپ کنید. برای مثال میخواهیم فایل های Log سیستم عامل رو دانلود کنیم :

```sh
docker run -p 8080:80 -v /var/log:/data hatamiarash7/directory-index
```

با مراجعه به آدرس `http://127.0.0.1:8080` می تونید ایندکس خودتون رو مشاهده کنید.
