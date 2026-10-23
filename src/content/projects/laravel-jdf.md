---
title: تاریخ شمسی Laravel
description: با استفاده از این کتابخانه به راحتی می توانید از تاریخ شمسی در پروژه لاراول خود استفاده کنید
order: 6
year: 1397
openSource: true
featured: false
stack:
  - Laravel
  - PHP
  - Date
  - Persian
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/Laravel-JDF
    kind: repo
  - label: Packagist
    url: https://packagist.org/packages/hatamiarash7/jdf
    kind: download
---

## نصب

دستور زیر را اجرا نمایید

```sh
composer require hatamiarash7/jdf
```

در نسخه 5.5 به بعد لاراول کتابخانه ها به صورت خودکار تشخیص داده می شوند. در صورتی که از نسخه های قدیمی استفاده می کنید ، ServiceProvider را به صورت دستی به فایل `config/app.php` اضافه کنید

## استفاده

```php
use Hatamiarash7\JDF\Generator;

$jdf = new Generator();
```

جهت دریافت تاریخ فعلی از دستور زیر استفاده نمایید

```php
$date = $jdf->getTimestamp(); // Output : ۱۳۹۷/۱۱/۰۲ - ۰۰:۳۸
```

جهت تبدیل تاریخ عددی به متنی از دستور زیر استفاده نمایید

```php
$finalDate = $jdf->jdate_words(['ss'=>1390, 'mm'=>5, 'rr'=>20]);

// Output :
[
    'ss' => 'هزار و سیصد و نود' ,
    'mm' => 'مرداد' ,
    'rr' => 'بیست'
]
```

توجه کنید که مقدار برگشتی به صورت آرایه می باشد
