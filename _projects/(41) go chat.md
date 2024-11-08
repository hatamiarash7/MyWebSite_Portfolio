---
title: چت سرور رمزنگاری شده
tools: [Chat]
image: https://socialify.git.ci/hatamiarash7/Go-Chat/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: این پروژه یک چت سرور رمزنگاری شده است که از زبان برنامه نویسی Go برای سرور و کلاینت استفاده شده است.
developed_date: 1401
lang: GO
techs: [GPG, Docker]
open_source: بله
---

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/Go-Chat" text="گیت‌هاب" size="lg" %}
</h2>

{% include project-info.html %}

[![GitHub release](https://img.shields.io/github/release/hatamiarash7/Go-Chat.svg)](https://GitHub.com/hatamiarash7/Go-Chat/releases/) [![Release](https://github.com/hatamiarash7/Go-Chat/actions/workflows/release.yaml/badge.svg)](https://github.com/hatamiarash7/Go-Chat/actions/workflows/release.yaml) [![Image size](https://img.shields.io/docker/image-size/hatamiarash7/go-chat-server/latest?maxAge=30)](https://hub.docker.com/r/hatamiarash7/go-chat-server/)

این پروژه یک سیستم ساده چت بوده که با یک کانال Pub/Sub کار می کند. تمامی پیام های ارسالی توسط کلاینت ها رمزنگاری شده و در سمت دیگر رمزگشایی می شوند.

```text
             ┌────────┐                  ┌────────┐
Message ─────► Client │                  │ Client ├──Decrypt──►
             └───┬────┘                  └────▲───┘
                 │                            │
                 │           ┌────────┐       │
                 └─Encrypt───► Server ├───────┘
                             └────────┘
```

## تنظیمات

جهت کار با پروژه به تعدادی متغییر Environment نیاز دارید که در فایل `.env` قرار می دهید.

```text
PORT=
HOST=
PUBLIC_KEY_FILE=
PRIVATE_KEY_FILE=
PASSPHRASE=
```

| مقدار پیشفرض | توضیحات                               | متغییر           |
| ------------ | ------------------------------------- | ---------------- |
| `server`     | حالت برنامه برای اجرا. کلاینت یا سرور | START_MODE       |
| `12345`      | پورت شبکه که سرور با آن کار می کند    | PORT             |
| `localhost`  | آدرس شبکه که سرور با آن کار می کند    | HOST             |
|              | آدرس فایل کلید عمومی                  | PUBLIC_KEY_FILE  |
|              | آدرس فایل کلید خصوصی                  | PRIVATE_KEY_FILE |
|              | کلمه عبور کلید خصوصی                  | PASSPHRASE       |

جهت مشخص نمودن نوع فعالیت پروژه می توانید از متغییر `START_MODE` استفاده کنید. مقادیر مجاز این متغییر `server` و `client` می باشد.

همچنین توجه داشته باشید تمامی کارکتر های خاص در کلمه عبور باید Escape شود.

## روش استفاده

ابتدا فایل باینری را با توجه به سیستم عامل و معماری خود از [صفحه ریلیز](https://github.com/hatamiarash7/Go-Chat/releases/latest) دانلود کنید.

### سرور

```bash
START_MODE=server ./go-chat-linux-amd64
```

### کلاینت

```bash
START_MODE=client ./go-chat-linux-amd64
```

> جهت اجرای برنامه در سیتم عامل MacOS باید به کلاینت دسترسی اجرا بدهید. برای این کار به آدرس `System Preferences > Security & Privacy > General` رفته و `Open Anyway` را بزنید.

### داکر

با توجه به ساختار پروژه ٬ برای کلاینت نیازی به ایمیج داکر نیست و تنها برای سرور نیاز به آن دارید.

```bash
docker run -it hatamiarash7/go-chat-server
```

می توانید از متغیر های `HOST` و `PORT` برای تنظیمات اتصال به سرور استفاده کنید.

```bash
docker run -it -e PORT=1234 -e HOST=0.0.0.0 hatamiarash7/go-chat-server
```

> مقادیر پیشفرض `PORT` و `HOST` برای سرور `12345` و `0.0.0.0` می باشد.
