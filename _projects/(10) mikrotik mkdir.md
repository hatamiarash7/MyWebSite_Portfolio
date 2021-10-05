---
name: تابع Mkdir برای میکروتیک
tools: [Mikrotik]
image: https://socialify.git.ci/hatamiarash7/Mikrotik-Mkdir/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این کتابخانه می توانید تابع mkdir را در ترمینال دستگاه های میکروتیک خود استفاده کنید
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/Mikrotik-Mkdir/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/Mikrotik-Mkdir" text="گیت هاب" size="lg" %}
</h2>

<br>

این پروژه شامل یک اسکریپت است که با استفاده از آن تابع گلوبال `mkdir$` به دستگاه میکروتیک اضافه شده و می توانید به سادگی در حافظه دستگاه پوشه ایجاد کنید.

```sh
$mkdir some/new/path.
```

## نصب

برای نصب کافی است فایل `mkdir_function.rsc` را به دستگاه مورد نظر منتقل کنید ( آپلود کنید ) و دستور زیر را اجرا کنید :

```sh
/import mkdir_function.rsc
```

یا به راحتی می توانید با اجرای دستور زیر در ترمینال روند نصب را سریعتر انجام دهید :

```sh
{
    :local result [/tool fetch \
    url="https://raw.githubusercontent.com/hatamiarash7/Mikrotik-Mkdir/main/mkdir_function.rsc" \
    as-value output=user];
    :local script [:parse ($result->"data")]
    $script;
}
```

### استفاده

ابتدا باید این کتابخانه را به اسکریپت خود اضافه کنید ، به این صورت که در ابتدای اسکریپت خود عبارت `;global mkdir:` را قرار دهید.

با اجرای دستور `mkdir your/path$` در ترمینال پوشه مربوطه ساخته میشود. در صورتی که پوشه ای با همین نام قبلا موجود باشد ، عملیات این تابع کار خاصی انجام نداده و به پایان میرسد.

### مثال استفاده

برای مثال اگر بخواهیم اسکریپتی بنویسیم که از دستگاه میکروتیک Backup تهیه کند به این صورت عمل می کنیم :

```sh
:global mkdir;
$mkdir "backups";
/system backup save name=backups/2021-04-02;
```
