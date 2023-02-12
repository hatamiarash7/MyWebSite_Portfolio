---
title: تولید کانفیگ های WireGuard
tools: [WireGuard]
image: https://socialify.git.ci/hatamiarash7/WireGuard-Config-Generator/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این پروژه می توانید همزمان برای چند Endpoint و آدرس های IP مختلف یک کانفیگ WireGuard تولید کنید
developed_date: 1401
lang: Python
techs: [JSON]
open_source: بله
---

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/WireGuard-Config-Generator" text="گیت هاب" size="lg" %}
</h2>

{% include project-info.html %}

[![GitHub release](https://img.shields.io/github/release/hatamiarash7/WireGuard-Config-Generator.svg)](https://GitHub.com/hatamiarash7/WireGuard-Config-Generator/releases/) [![Pylint](https://github.com/hatamiarash7/WireGuard-Config-Generator/actions/workflows/pylint.yml/badge.svg?branch=main)](https://github.com/hatamiarash7/WireGuard-Config-Generator/actions/workflows/pylint.yml) [![CodeQL](https://github.com/hatamiarash7/WireGuard-Config-Generator/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hatamiarash7/WireGuard-Config-Generator/actions/workflows/codeql-analysis.yml)

این پروژه یک Parser مخصوص برای WireGuard است که با استفاده از آن می توانید فایل های Tunnel خودتون رو همیشه به روز نگه دارید. معمولا به روزرسانی این فایل ها کار دشواری به حساب میاد به خصوص وقتی که چندین Endpoint مختلف داشته باشید و بخواهید مدام آدرس های آی پی را از لیست حذف یا به آن اضافه کنید.

فرض کنید که شما برای هر Endpoint نیاز به چنین فایل کانفیگی داشته باشید :

```ini
[Interface]
PrivateKey = <PRIVATE_KEY>
Address = <ADDRESS>
MTU = <MTU>

[Peer]
PublicKey = <PUBLIC_KEY>
Endpoint = wg-1.domain.xyz:1234
AllowedIPs = 1.2.3.4/32, 5.6.7.8/32, ...
PersistentKeepalive = <PERSISTENT_KEEPALIVE>
```

## روش استفاده

جهت استفاده و اجرا شما به سه فایل نیاز دارید :

- یک فایل JSON که شامل اطلاعات Endpoint هاست
- یک فایل شامل لیست کلیه IP هایی که می خواهید به آن ها دسترسی داشته باشید
- فایل env جهت ذخیره سازی اطلاعات حساس / تنظیمات ثانویه

برای مثال :

```json
[
  {
    "name": "Company-Server-1",
    "address": "wg-1.domain.xyz:1234"
  },
  {
    "name": "Company-Server-2",
    "address": "wg-2.domain.xyz:1234"
  }
]
```

و فایل آی پی ها :

```json
{
  "k8s-cluster": ["1.2.3.4/32", "5.6.7.8.9/32", "1.2.3.4/27"],
  "grafana": ["1.2.3.4/32", "5.6.7.8.9/32", "1.2.3.4/27"],
  "other": ["1.2.3.4/32", "5.6.7.8.9/32", "1.2.3.4/27"]
}
```

> توجه داشته باشید که اسامی در نظر گرفته شده برای فایل آی پی ها ( `k8s-cluster`, `grafana`, ... ) صرفا جهت راحتی کاربر بوده و هیچ استفاده دیگری نداره. با استفاده از این کلید ها میشه به سادگی آدرس ها رو دسته بندی کرد تا در آینده ویرایش اون ها سریع تر اتفاق بیوفته.

در نهایت باقی اطلاعات مورد نیاز Tunnel را در یک فایل env قرار دهید :

```text
PRIVATE_KEY=
PUBLIC_KEY=
ADDRESS=
MTU=
PERSISTENT_KEEPALIVE=
```

در صورتی که نیاز به تنظیمات دیگری دارید ٬ گزینه مربوطه رو هم در فایل env و هم در فایل اصلی پروژه باید قرار دهید.

## نحوه اجرا

پس از اینکه فایل های خودتون رو آماده کردید ٬ برای تولید کانفیگ ها کافیه دستور زیر را اجرا کنید :

```bash
make run
```

در اینصورت به ازای هر Endpoint تعریف شده یک فایل کانفیگ برای شما تولید میشه. برای مثال خروجی فایل های بالا شامل دو فایل خواهد بود :

```text
Company-Server-1.conf
Company-Server-2.conf
```
