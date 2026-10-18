---
title: API استخراج اطلاعات فایل های APK
description: این پروژه یک APK Parser است که اطلاعات اصلی فایل های APK اندروید را استخراح کرده و به کاربر تحویل می دهد. پنل کاربری نداشته و به صورت API عمل می کند.
cover: ../../assets/projects/apk-parser/apkparser_1.webp
order: 29
year: 1398
openSource: false
featured: false
stack:
  - Python
  - Django
  - Android
  - API
  - Parser
  - Django REST Framework
  - XML
---

این پروژه یک API ساده و کامل جهت Parse کردن فایل های اندرویدی شما است. بدین صورت که فایل ( یا آدرس آن ) را به سامانه داده و مشخصات آن را دریافت می کنید. اطلاعاتی شامل :

- name
- package name
- version code
- version name
- min sdk
- permissions
- icon

قابل ذکره که آیکون برنامه به صورت یک رشته در قالب base64 به شما داده میشه تا بتونید همه جا ازش استفاده کنید.

مزایای اصلی این Parser در پروژه هایی مانند مارکت های اندرویدی نمایان میشه ، به صورتی که وقتی کاربران فایل های اندرویدی خودشون رو بارگذاری می کنن تمام داده های اون فایل استخراج و نمایش داده میشه ( تعریف از خود نباشه ، خیلی از مال کافه بازار سریع تره 😁 ).

در حال حاضر این پروژه به فروش رفته و دسترسی عمومی برای آن وجود نداره. در صورت نیاز به صورت خصوصی پیاده سازی میشه.

![مشخصات - صفحه DRF](../../assets/projects/apk-parser/apkparser_2.webp)
_مشخصات - صفحه DRF_

![مشخصات در قالب JSON](../../assets/projects/apk-parser/apkparser_3.webp)
_مشخصات در قالب JSON_
