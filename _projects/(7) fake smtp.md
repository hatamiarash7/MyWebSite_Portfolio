---
name: سرور SMTP جعلی
tools: [Email, Docker]
image: https://socialify.git.ci/hatamiarash7/FakeSMTP/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این پروژه می توانید یک سرور SMTP جعلی برای تست پروژه ها قبل از انتشار استفاده کنید.
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/FakeSMTP/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<div class="center badges">
<img src="https://github.com/hatamiarash7/FakeSMTP/actions/workflows/build-docker.yml/badge.svg" />
<img src="https://github.com/hatamiarash7/FakeSMTP/actions/workflows/dockerhub.yml/badge.svg" />
<img src="https://img.shields.io/docker/image-size/hatamiarash7/fake-smtp" />
</div>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/FakeSMTP" text="گیت هاب" size="lg" %}
{% include elements/button.html link="https://hub.docker.com/r/hatamiarash7/fake-smtp" text="داکر هاب" size="lg" %}
</h2>

<br>

## داستان چیه ؟

امروزه تقریبا تمام پروژه های تحت وب با ایمیل سر و کار دارن. از تایید هویت کاربرها گرفته تا ارسال پیغام و موارد دیگه. موقعی که شما در حال توسعه پروژه هاتون هستید روند وقت گیریه که همزمان یه Mail Server هم راه اندازی کنید و ازش برای تست استفاده کنید. یه مشکل بزرگ دیگه اینه که موقع برنامه نویسی و تست ممکنه پشت سرهم نیاز به ارسال ایمیل داشته باشید و در نتیجه با مشکلات Rate Limit تو سرویس های ایمیل مواجه میشید. 🤐

## راه حل ؟

ساده ترین راه حل اینه که یه سرور ارسال ایمیل ساده برای تست کردن داشته باشیم. این پروژه دقیقا همین کار رو واستون انجام میده 😉

## نصب

این پروژه کاملا داکرایز شده و به راحتی میتونید ازش استفاده کنید. برای نصب و راه اندازی کافیه دستور زیر رو اجرا کنید :

```sh
docker run -d --name fakesmtp -p 1025:25 -v /tmp/fakemail:/var/mail hatamiarash7/fake-smtp:master
```

- پورت پیشفرض SMTP همون 25 رایج که برای عدم تداخل میتونید اونو به پورت دیگه ای مثل 1025 مپ کنید
- جهت ذخیره سازی ایمیل ها یه Volume هم برای مسیر `var/mail/` تنظیم می کنیم

در صورتی که میخواید از Docker Compose استفاده کنید ، به این صورت عمل کنید :

```yaml
services:
  fakesmtp:
    image: hatamiarash7/fake-smtp:master
    ports:
      - 1025:25
    volumes:
      - /tmp/fakemail:/var/mail
```

## استفاده

بعد از اینکه سرور شما اجرا شد کافیه تا تنظیمات ایمیل رو در پروژه خودتون طوری انجام بدید که درخواست ها به این سرور ارسال بشه. توجه کنید که اینجا نیاز به Authentication نداریم !

برای مثال اگر بخوایم توی Host بهش دسترسی داشته باشیم :

```txt
Server: 127.0.0.1
Port: 1025

Mail URL : smtp://127.0.0.1:1025/
```

یا میتونید در کنار باقی سرویس ها ازش استفاده کنید. توجه داشته باشید که در یک Stack میتونیم از نام سرویس استفاده کنیم :

```txt
Server: fakesmtp
Port: 1025

Mail URL : smtp://fakesmtp:1025/
```
