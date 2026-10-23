---
title: ایجاد لیست دایرکتوری با Nginx و Docker
description: با استفاده از این پروژه می توانید با بهره مندی از Nginx یک لیست دایرکتوری ایجاد کنید
cover: ../../assets/projects/docker-directory-index/docker-directory-index.webp
order: 11
year: 1399
openSource: true
featured: false
stack:
  - Docker
  - Nginx
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/docker-directory-index
    kind: repo
---

بعضی مواقع نیاز دارید تا به چندتا فایل روی سرور خودتون دسترسی داشته باشید و اونا رو روی سیستم خودتون دانلود کنید. خب در حالت عادی این کار خیلی دردسر داره و نیاز به وقت و کار زیاد داره. با استفاده از این پروژه میتونید خیلی سریع و راحت یک کانتینر بسازید و به Nginx اجازه بدید تا در محل مورد نظر یک Directory Index ایجاد کند.

## نصب و استفاده

به سادگی کانتینر خودتون رو اجرا کرده و دایرکتوری مورد نظرتون رو به آدرس `data/` مپ کنید. برای مثال میخواهیم فایل های Log سیستم عامل رو دانلود کنیم :

```sh
docker run -p 8080:80 -v /var/log:/data hatamiarash7/directory-index
```

با مراجعه به آدرس `http://127.0.0.1:8080` می تونید ایندکس خودتون رو مشاهده کنید.
