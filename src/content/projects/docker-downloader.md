---
title: دانلود ایمیج های Docker
description: با استفاده از این پروژه میتونید ایمیج های Docker رو دانلود کرده و به صورت آفلاین ذخیره و استفاده کنید.
order: 26
year: 1399
openSource: true
featured: false
stack:
  - Docker
  - DevOps
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/Docker-downloader
    kind: repo
  - label: پست وبلاگ
    url: https://virgool.io/hatamiarash7/%D8%B2%DB%8C%D8%B1-%D8%AA%DB%8C%D8%BA-%D8%A7%DB%8C%D9%86%D8%AA%D8%B1%D9%86%D8%AA-avqkbvfs9wed
    kind: post
---

اکثر ماها یه سرور مجازی / فیزیکی داریم که خارج ایران هاست شده ( اگر ندارید بخرید که به کار میاد ). خب مسلما شرایط اینترنت و سرعت دانلود و غیره و غیره روی اون سرور ها خیلی تفاوت داره با شرایطی که ما داریم. اگر بتونیم Image های خودمون رو روی اون سرور Pull کنیم و سپس دانلودش کنیم چی ؟ خب مسلما سرعت کار خیلی بالا میره

نتیجه این صحبت ها شد یه اسکریپت پایتون که این کار رو برای ما انجام میده و می تونید از این ریپازیتوری اون رو ببینید

## استفاده

ابتدا پروژه را Clone نمایید :

```sh
gh repo clone hatamiarash7/Docker-downloader
```

با یه دستور ساده Image رو دانلود می کنیم

```sh
python pull.py hello-world
```

این اسکریپت Image رو در قالب یه فایل tar به شما تحویل میده که میتونید اون رو دانلود کرده و با دستور docker load روی سیستم خودتون نصبش کنید
