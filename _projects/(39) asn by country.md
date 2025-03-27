---
title: لیست ASN های یک کشور
tools: [BGP,ASN]
image: https://socialify.git.ci/hatamiarash7/ASN-By-Country/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این پروژه می توانید لیست تمامی ASN های یک کشور را دریافت کنید.
developed_date: 1401
lang: Python
techs: [LXML, BS4]
open_source: بله
---
    
<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/ASN-By-Country" text="گیت‌هاب" size="lg" %}
</h2>

{% include project-info.html %}

[![GitHub release](https://img.shields.io/github/release/hatamiarash7/ASN-By-Country.svg)](https://GitHub.com/hatamiarash7/ASN-By-Country/releases/) [![CodeQL](https://github.com/hatamiarash7/ASN-By-Country/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hatamiarash7/ASN-By-Country/actions/workflows/codeql-analysis.yml)

این پروژه یک Parser مخصوص جهت دریافت لیست تمامی ASN های یک کشور است. داده های این پروژه با استفاده از اطلاعات سایت [https://imtbs-tsp.eu](https://imtbs-tsp.eu) تولید میشود.

لیست تولید شده توسط این پروژه را می توان در پروژه های دیگر استفاده کرد.

## روش استفاده

جهت استفاده و اجرا کافی است دستور زیر را در ترمینال اجرا کنید :

```bash
python main.py <country>
```

برای مثال کشور ایران را میخواهیم دریافت کنیم :

```bash
python main.py IR
```

### داکر

برای استفاده از این پروژه در داکر می توانید از دستور زیر استفاده کنید :

```bash
docker run --rm  -v /results:/app hatamiarash7/asn-by-country:latest <country>
```

## خروجی

این اسکریپت دو فایل خروجی تولید میکند :

- `asn_list.csv` : جدول شامل تمامی ASN های کشور مورد نظر به همراه جزیات
- `ranges.txt` : لیست رنج های ASN کشور مورد نظر
