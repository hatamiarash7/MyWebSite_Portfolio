---
title: تاریخ شمسی Laravel
tools: [Laravel, Date, Persian, PHP]
image: https://socialify.git.ci/hatamiarash7/Laravel-JDF/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این کتابخانه به راحتی می توانید از تاریخ شمسی در پروژه لاراول خود استفاده کنید
developed_date: 1397
lang: Laravel ( PHP )
open_source: بله
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/Laravel-JDF/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<div class="center badges">
<img src="https://poser.pugx.org/hatamiarash7/jdf/v/stable" />
<img src="https://poser.pugx.org/hatamiarash7/jdf/downloads" />
</div>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/Laravel-JDF" text="گیت‌هاب" size="lg" event="Github+Link" %}
{% include elements/button.html link="https://packagist.org/packages/hatamiarash7/jdf" text="Packagist" size="lg" event="Download" %}
</h2>

{% include project-info.html %}

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
