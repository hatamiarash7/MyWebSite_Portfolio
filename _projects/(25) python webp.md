---
title: تبدیل عکس ها به WEBP
tools: [Python, Convertor, Images]
image: https://socialify.git.ci/hatamiarash7/Python-WebP/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این پروژه می توانید تصاویر خود را به صورت آفلاین به فرمت WebP تبدیل کنید.
developed_date: 1400
lang: Python
open_source: بله
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/Python-WebP/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/Python-WebP" text="گیت هاب" size="lg" %}
</h2>

{% include project-info.html %}

این کدک دو حالت فشرده‌سازی برای فشرده کردن تصاویر معمولی با پسوند jpg و تصاویر بدون افت کیفیت با پسوند png دارد که گونه‌ی اول با افت کیفیت همراه است و یک روش Lossy ( همراه با افت کیفیت ) محسوب می‌شود و گونه‌ی دوم بدون افت کیفیت یا Lossless است. در هر دو حالت وپی ( تلفظ webp به صورت weppy‌ است ) حجم تصاویر را ۳۰ تا ۷۰ درصد کمتر می‌کند! و این به معنی بارگذاری سریع‌تر وب‌سایت و مصرف ترافیک کمتر است.

## استفاده

ابتدا پروژه را Clone نمایید :

```sh
gh repo clone hatamiarash7/Python-WebP
```

عکس های خود را با فرمت PNG و JPG در پوشه `images` قرار داده و فایل اصلی را اجرا نمایید :

```sh
python convert.py
```

تصاویر تبدیل شده با فرمت WebP و همان نام در کنار عکس های قبلی ذخیره می شوند.
