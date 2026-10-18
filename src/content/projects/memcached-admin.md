---
title: داشبورد Memcached
description: این پروژه یک داشبورد مدیریتی برای سرور یا کلاستر Memcached شما می باشد. ساده و کامل طراحی شده و به راحتی قابل استفاده است.
order: 8
year: 1399
openSource: true
featured: false
stack:
  - PHP
  - Cache
  - UI
  - Dashboard
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/Memcached-Admin
    kind: repo
  - label: داکر هاب
    url: https://hub.docker.com/r/hatamiarash7/memcached-admin
    kind: download
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/Memcached-Admin/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<div class="center badges">
<img src="https://github.com/hatamiarash7/Memcached-Admin/actions/workflows/docker-image.yml/badge.svg" />
<img src="https://github.com/hatamiarash7/Memcached-Admin/actions/workflows/docker-publish.yml/badge.svg" />
<img src="https://img.shields.io/docker/image-size/hatamiarash7/memcached-admin" />
</div>

این پروژه به شما اجازه میده که وضعیت سرور های Memcached خودتون رو به صورت زنده مشاهده کنید. مواردی از جمله :

- عملیات های get, set, delete, increment, decrement, evictions, reclaimed
- شبکه ( ترافیک و پهنای باند )
- حافظه و هدررفت آن
- ...

همچنین توانایی اجرای دستورات مختلفی را نیز دارید :

- get, set, delete, flush_all, ...
- دریافت داده ها
- حذف کلید ها
- پاک کردن کل داده ها
- اجرای دستورات telnet
- جستجو
- ...

<h1 class="center">
<img src="../assets/img/memcached-admin.webp"/>
</h1><br>

## نصب

این پروژه داکرایز شده است و به راحتی می توانید از آن استفاده کنید. قابلیت استفاده برای یک یا چند سرور وجود داره.

**نصب برای یک سرور :**

```sh
docker run --rm -p 8080:80 -e MEMCACHED_HOST='127.0.0.1' -e MEMCACHED_PORT='11211' hatamiarash7/memcached-admin:master
```

**نصب برای چند سرور ( کلاستر ) :**

```sh
docker run --rm -p 8080:80 -e MEMCACHED_HOST='127.0.0.1:11211,127.0.0.1:11212' hatamiarash7/memcached-admin:master
# or
docker run --rm -p 8080:80 -e MEMCACHED_HOST='127.0.0.1,127.0.0.2' -e MEMCACHED_PORT='11211' hatamiarash7/memcached-admin:master
# or
docker run --rm -p 8080:80 -e MEMCACHED_HOST='127.0.0.1:11212,127.0.0.1' -e MEMCACHED_PORT='11211' hatamiarash7/memcached-admin:master
```

می توانید کلاستر خود را در بخش Configuration تنظیم نمایید.
