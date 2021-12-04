---
name: API استخراج اطلاعات فایل های APK
tools: [Android, API, Parser]
image: ../assets/img/apkparser_1.webp
description: این پروژه یک APK Parser است که اطلاعات اصلی فایل های APK اندروید را استخراح کرده و به کاربر تحویل می دهد. پنل کاربری نداشته و به صورت API عمل می کند.
---

<h1 class="center">
<img src="../assets/img/apkparser_1.webp"/>
</h1>

<br>

<ul>
    <li>
        <span class="colored">سال طراحی : </span>1398
    </li>
    <li>
        <span class="colored">فریمورک / زبان برنامه نویسی : </span>Python ( Django )
    </li>
    <li>
        <span class="colored">تکنولوژی ها : </span> Django Rest Framework - XML و ...
    </li>
</ul>

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

<h1 class="center">
<figure>
<img src="../assets/img/apkparser_2.webp"/>
<figcaption>مشخصات - صفحه DRF</figcaption>
</figure>
</h1>

<hr>

<h1 class="center">
<figure>
<img src="../assets/img/apkparser_3.webp"/>
<figcaption>مشخصات در قالب JSON</figcaption>
</figure>
</h1>
