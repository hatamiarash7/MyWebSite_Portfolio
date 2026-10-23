---
title: لیست ASN های یک کشور
description: با استفاده از این پروژه می توانید لیست تمامی ASN های یک کشور را دریافت کنید.
order: 39
year: 1401
openSource: true
featured: false
stack:
  - Python
  - BGP
  - ASN
  - lxml
  - BeautifulSoup
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/ASN-By-Country
    kind: repo
---

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
