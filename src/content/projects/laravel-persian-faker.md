---
title: Faker فارسی برای Laravel
description: Seeding دیتابیس یکی از قابلیت های جالب در لاراول هست که همه دوستش داریم. بهرحال افزودن چندین رکورد در دیتابیس با نوشت تک تک اونها ، میتونه کار خسته کننده ای باشه و وقت زیادی ببره. اینجاست که کتابخانه ی Faker مطرح میشه
order: 12
year: 1398
openSource: true
featured: false
stack:
  - Laravel
  - PHP
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/Laravel-PersianFaker
    kind: repo
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/Laravel-PersianFaker/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

Faker یک کتابخانه ی php هست که برای تولید اطلاعات ساختگی با هدف تست ، طراحی شده. این کتابخانه میتونه برای تولید انواع اطلاعات به کار بیاد از جمله :

- اعداد
- متن لورم
- اطلاعات فردی از قبیل نام ، جنسیت ، شهرت و ...
- آدرس
- شماره تلفن
- شرکت ها
- تاریخ و زمان
- اطلاعات اینترنتی مانند دامنه ، آدرس سایت ، ایمیل و ...
- اطلاعات کارت های بانکی
- بارکد
- ...

برای اطلاعات بیشتر به [مستندات اصلی](https://github.com/fzaninotto/Faker) مراجعه کنید ✔

> ❗❗❗ این پروژه دیگه توسعه داده نمیشه و از رده خارج شده. توضیحات توسعه دهنده اش رو در [این آدرس](https://marmelab.com/blog/2020/10/21/sunsetting-faker.html) می تونید بخونید. ❗❗❗

اما این اطلاعات به صورت پیشفرض به زبان انگلیسی تولید می شوند. راه های زیادی برای تولید اطلاعات Fake به زبان های دیگه موجوده. می تونید یه Provider تعریف کنید ، میتونید Locale خود کتابخانه اصلی رو عوض کنید و ...

اما با استفاده از این پروژه کارها ساده میشه و بدون هیچ کار اضافه میتونید متون مورد نظرتون رو به صورت فارسی تولید کرده و استفاده کنید.

## نصب

طبق معمول همیشه باید از Composer استفاده کنید :

```sh
composer require hatamiarash7/persian-faker
```

## استفاده

مانند کتابخانه اصلی اینجا هم توابع مختلفی داریم که میتونید ازشون استفاده کنید :

| تابع                      |                                                                      توضیحات |
| :------------------------ | ---------------------------------------------------------------------------: |
| `()PFaker::firstName`     |                                                                          نام |
| `()PFaker::lastName`      |                                                                 نام خانوادگی |
| `()PFaker::fullName`      |                                                                     نام کامل |
| `()PFaker::company`       |                                                                     نام شرکت |
| `()PFaker::mobile`        |                                                                 شماره موبایل |
| `()PFaker::telephone`     |                                                              شماره تلفن ثابت |
| `()PFaker::email`         |                                                                   آدرس ایمیل |
| `()PFaker::domain`        |                                 آدرس کامل سایت مانند : <https://www.test.ir> |
| `PFaker::age($min,$max)`  |                                                     سن بین اعداد $min و $max |
| `PFaker::birthday($sign)` | تاریخ تولد با استفاده از علامت $sign برای تولید تاریخ مانند : year/month/day |
| `()PFaker::address`       |                                                                    آدرس پستی |
| `()PFaker::city`          |                                                                          شهر |
| `()PFaker::state`         |                                                                        استان |
| `()PFaker::melliCode`     |                                                                       کد ملی |
| `()PFaker::word`          |                                                                         کلمه |
| `()PFaker::sentence`      |                                                                         جمله |
| `()PFaker::paragraph`     |                                                                     پاراگراف |

توابع دیگری نیز به زودی اضافه خواهند شد 😉
