---
title: بررسی دامنه های فیلتر شده
description: با استفاده از این پروژه می‌توانید وضعیت فیلتر بودن یک یا چند دامنه را در ایران بررسی کنید.
order: 42
year: 1399
openSource: true
featured: true
stack:
  - Python
  - Internet
  - Filtering
  - dnspython
  - Poetry
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/CheckFiltering
    kind: repo
---

[![GitHub release](https://img.shields.io/github/v/release/hatamiarash7/CheckFiltering.svg)](https://GitHub.com/hatamiarash7/CheckFiltering/releases/)

فرایند شناسایی در این پروژه از طریق بررسی DNS انجام می‌شود. توجه کنید که قابلیت شناسایی اختلالات ناشی از فیلترینگ توسط این پروژه **شناسایی نخواهد شد**.

## روش نصب

جهت استفاده و اجرا کافی است دستور زیر را در ترمینال اجرا کنید تا عملیات نصب انجام شود:

```bash
pip install check-filter
```

## روش استفاده

شما به سه روش مختلف می‌توانید از این پکیج استفاده کنید

### بررسی یک دامنه

```bash
check-filter domain github.com
```

![Single Domain](https://github.com/hatamiarash7/CheckFiltering/raw/master/.github/single.png)

### بررسی چند دامنه

```bash
check-filter domains github.com,google.com
```

![Multiple Domain](https://github.com/hatamiarash7/CheckFiltering/raw/master/.github/multiple.png)

### خواندن از فایل

یک فایل با نام دلخواه ( مثلا `list` ) حاوی دامنه های مورد نظر خود را بسازید:

```text
github.com
arash-hatami.ir
facebook.com
gitlab.com
google.com
pornhub.com
pypi.org
twitter.com
gsm.ir
xnxx.com
cloudflare.com
stackoverflow.com
```

سپس از دستور زیر استفاده کنید:

```bash
check-filter file list
```

![File](https://github.com/hatamiarash7/CheckFiltering/raw/master/.github/file.png)
