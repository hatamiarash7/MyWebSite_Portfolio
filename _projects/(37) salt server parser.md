---
title: تولید کانفیگ های SSH از روی SaltStack
tools: [SaltStack, SSH]
image: https://socialify.git.ci/hatamiarash7/Salt-Server-Parser/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این پروژه می توانید از روی فایل های SaltStack یک کانفیگ SSH بسازید
developed_date: 1401
lang: Python
techs: [JSON, YAML]
open_source: بله
---

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/Salt-Server-Parser" text="گیت‌هاب" size="lg" event="Github+Link" %}
</h2>

{% include project-info.html %}

[![GitHub release](https://img.shields.io/github/v/release/hatamiarash7/Salt-Server-Parser.svg)](https://GitHub.com/hatamiarash7/Salt-Server-Parser/releases/) [![Pylint](https://github.com/hatamiarash7/Salt-Server-Parser/actions/workflows/pylint.yml/badge.svg?branch=main)](https://github.com/hatamiarash7/Salt-Server-Parser/actions/workflows/pylint.yml) [![CodeQL](https://github.com/hatamiarash7/Salt-Server-Parser/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hatamiarash7/Salt-Server-Parser/actions/workflows/codeql-analysis.yml)

این پروژه یک Parser مخصوص برای SaltStack بوده که با استفاده از اون میتونید فایل های کانفیگ مربوط به SSH تولید کنید.

برای مثال در پروژه SaltStack شما لیست سرور های موجود در Pillar چنین ساختاری خواهند داشت :

```yaml
servers:
  lab-kube-1:
    main_ip: XXX.XXX.XXX.XXX
    ...
  lab-kube-2:
    main_ip: XXX.XXX.XXX.XXX
    ...
  lab-kube-3:
    main_ip: XXX.XXX.XXX.XXX
    ...
  lab-kube-4:
    main_ip: XXX.XXX.XXX.XXX
    ...
  ...
```

در صورتی که تعداد این سرور ها زیاد باشه ٬ پس از هربار ویرایش یا اضافه شدن سرور جدید باید فایل کانفیگ SSH رو سمت کلاینت های خودمون ویرایش کنیم که تجربه ثابت کرده این مورد واقعا عذاب الهی به حساب میاد 😃

با استفاده از این پروژه میتونید فایل کانفیگ SSH رو به صورت خودکار تولید کنید.

## نحوه استفاده

جهت اجرا به متغیر های زیر نیاز دارید :

- آدرس فایل سرور ها
- آدرس فایل خروجی
- پورت SSH
- نام کاربری SSH
- نام محیط مورد نظر - برای مثال Staging/Production

```bash
python main.py <servers.sls> <output> <ssh port> <ssh user> <mode>
```

> باقی تنظیمات ثانویه مستقیما در فایل `main.py` قرار دارند.

## مثال

```bash
python main.py /Salt/pillar/dev/servers.sls out.txt 22 arash Staging
```

خروجی شما چنین چیزی خواهد بود :

```text
#------- Staging Servers ------#

Host lab-kube-1
    HostName XXX.XXX.XXX.XXX
    Port 22
    User arash
    IdentitiesOnly yes
    IdentityAgent ~/.gnupg/S.gpg-agent.ssh
    IdentityFile ~/.ssh/id_rsa_yubikey.pub

Host lab-kube-2
    HostName XXX.XXX.XXX.XXX
    Port 22
    User arash
    IdentitiesOnly yes
    IdentityAgent ~/.gnupg/S.gpg-agent.ssh
    IdentityFile ~/.ssh/id_rsa_yubikey.pub
```

همچنین در کنار فایل خروجی یک فایل با نام `ip-list.json` نیز تولید میشه که شامل لیست آی پی ها به صورت JSON خواهد بود. از این فایل می تواندی بعدا جهت مصارف دیگری استفاده داشته باشید.

برای مثال آن ها را در WireGuard تنظیم کنید. جهت اطلاعات بیشتر به [این پروژه](36-wireguard-config-generator) مراجعه کنید.
