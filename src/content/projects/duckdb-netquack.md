---
title: تحلیل دامنه، URL و IP در DuckDB با Netquack
description: افزونه‌ای برای پردازش داده‌های وب و شبکه با SQL در DuckDB؛ از استخراج اجزای URL و دامنه تا تحلیل IP، یکسان‌سازی آدرس‌ها و اتصال به رتبه‌بندی Tranco.
order: 50
year: 1403
openSource: true
featured: true
stack:
  - DuckDB
  - C++
  - SQL
  - CMake
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/duckdb-netquack
    kind: repo
  - label: معرفی در DuckDB
    url: https://duckdb.org/community_extensions/extensions/netquack.html
    kind: post
---

در تحلیل لاگ‌های وب و داده‌های شبکه، معمولاً باید نام میزبان را از URL جدا کنیم، درخواست‌های زیردامنه‌های مختلف را کنار هم قرار دهیم یا IPها را بر اساس شبکه دسته‌بندی کنیم. انجام این کارها با چند عبارت منظم پراکنده، به‌خصوص برای دامنه‌های چندبخشی و آدرس‌های IPv6، نگه‌داری پرس‌وجوها را دشوار می‌کند.

**Netquack** مجموعه‌ای از توابع را به DuckDB اضافه می‌کند تا این پردازش‌ها مستقیماً در SQL انجام شوند. می‌توانید خروجی توابع را در فیلتر، گروه‌بندی و اتصال جدول‌ها به کار ببرید و مرحلهٔ جداگانه‌ای برای استخراج اجزای آدرس‌ها نسازید.

## روش کار و قابلیت‌ها

افزونه با C++ نوشته شده و توابع اسکالر و جدولی را در DuckDB ثبت می‌کند. توابع اسکالر برای هر ورودی یک مقدار، ساختار یا فهرست برمی‌گردانند؛ توابع جدولی، مثل استخراج پارامترهای Query، نتیجه را به شکل ردیف‌های قابل پرس‌وجو ارائه می‌کنند.

برای تشخیص مرز دامنه، پروژه از داده‌های **Public Suffix List** و جدول جست‌وجوی تولیدشده با `gperf` استفاده می‌کند. این داده‌ها داخل افزونه قرار دارند و استخراج دامنه هنگام اجرای پرس‌وجو به دانلود فهرست نیاز ندارد. به همین دلیل، پسوندهایی مانند `co.uk` را می‌توان فراتر از جداکردن آخرین بخش بعد از نقطه پردازش کرد.

قابلیت‌های اصلی عبارت‌اند از:

- استخراج میزبان، دامنهٔ اصلی، زیردامنه، پسوند عمومی، مسیر، پورت، Query و Fragment.
- دریافت اجزای URI در یک `STRUCT` با `parse_uri` و تبدیل پارامترهای Query یا بخش‌های مسیر به ردیف‌های مستقل.
- یکسان‌سازی URLها، اعتبارسنجی قالب دامنه و URL و تبدیل‌های URL encoding و Base64.
- اعتبارسنجی IPv4 و IPv6، بررسی عضویت در CIDR، دسته‌بندی IP و تبدیل نمایش IPv6.
- استخراج URL، دامنه و IP از متن و تبدیل آدرس‌ها به شکل Defang یا قالب مرتب‌سازی SURT.
- افزودن رتبه و دستهٔ محبوبیت دامنه‌ها از فهرست Tranco به داده‌های تحلیلی.

فهرست توابع و نمونه‌های بیشتر در [مستندات پروژه](https://github.com/hatamiarash7/duckdb-netquack#usage-examples-) قرار دارد.

## نصب و بارگذاری

Netquack در [فهرست افزونه‌های جامعهٔ DuckDB](https://duckdb.org/community_extensions/extensions/netquack.html) منتشر شده است. برای استفاده به DuckDB و نسخه‌ای از افزونه نیاز دارید که برای نسخه و پلتفرم شما ارائه شده باشد؛ پیش از نصب، جدول سازگاری همان صفحه و راهنمای مخزن را بررسی کنید.

دستورهای زیر را در محیط SQL خود DuckDB اجرا کنید:

```sql
SET allow_community_extensions = true;
INSTALL netquack FROM community;
LOAD netquack;
```

مرحلهٔ نصب به دسترسی به مخزن افزونه‌ها نیاز دارد. در نشست‌های بعدی، برای فعال‌کردن افزونهٔ نصب‌شده از `LOAD netquack` استفاده کنید. برای بررسی نسخهٔ نصب‌شده:

```sql
SELECT * FROM netquack_version();
```

به‌روزرسانی افزونهٔ نصب‌شده نیز با دستور زیر انجام می‌شود:

```sql
UPDATE EXTENSIONS (netquack);
```

قابلیت‌های نسخه‌های مختلف یکسان نیستند؛ اگر تابعی در دسترس نبود، نسخه و سازگاری افزونه را بررسی کنید.

## استخراج دامنه و اجزای URL

نام میزبان با دامنهٔ اصلی فرق دارد. برای نمونه، در آدرس زیر میزبان `api.shop.example.co.uk` است، اما دامنهٔ اصلی `example.co.uk` و پسوند عمومی `co.uk` خواهد بود:

```sql
SELECT
    extract_host(url) AS host,
    extract_domain(url) AS domain,
    extract_subdomain(url) AS subdomain,
    extract_tld(url) AS suffix
FROM (
    VALUES ('https://api.shop.example.co.uk/products?id=42')
) AS input(url);
```

در این مثال، مقدار `subdomain` برابر با `api.shop` است. نام تابع `extract_tld` را باید با توجه به رفتار آن خواند: خروجی می‌تواند پسوند عمومی چندبخشی باشد، نه فقط آخرین برچسب دامنه.

اگر چند جزء آدرس را هم‌زمان لازم دارید، `parse_uri` یک ساختار شامل `scheme`، `host`، `port`، `path`، `query` و `fragment` برمی‌گرداند:

```sql
SELECT uri.host, uri.port, uri.path, uri.query, uri.fragment
FROM (
    SELECT parse_uri(
        'https://api.example.com:8443/Products?Page=2#Details'
    ) AS uri
);
```

طبق [پیاده‌سازی `parse_uri`](https://github.com/hatamiarash7/duckdb-netquack/blob/main/src/functions/parse_uri.cpp)، Scheme و Host به حروف کوچک تبدیل می‌شوند، اما بزرگی و کوچکی حروف در Path، Query و Fragment حفظ می‌شود. این تفاوت برای آدرس‌هایی که مسیرشان به حروف حساس است اهمیت دارد.

## نمونهٔ عملی: گروه‌بندی درخواست‌ها بر اساس دامنه

فرض کنید چند URL از لاگ‌های وب در اختیار داریم. مثال زیر مستقل است و داده‌های نمونه را داخل خود پرس‌وجو می‌سازد:

```sql
WITH logs(url) AS (
    VALUES
        ('https://www.example.com/products'),
        ('https://api.example.com/orders'),
        ('https://docs.example.org/guide')
)
SELECT extract_domain(url) AS domain, count(*) AS requests
FROM logs
GROUP BY domain
ORDER BY requests DESC, domain;
```

دو درخواست اول زیر دامنهٔ `example.com` جمع می‌شوند و درخواست سوم به `example.org` تعلق دارد. همین الگو را می‌توانید روی ستون URL در جدول واقعی خود اجرا کنید.

برای تحلیل پارامترهای یک آدرس نیز تابع جدولی زیر هر جفت کلید و مقدار را در یک ردیف برمی‌گرداند:

```sql
SELECT *
FROM extract_query_parameters(
    'https://example.com/search?q=duckdb&source=newsletter'
);
```

ستون‌های خروجی `key` و `value` هستند. برای پردازش URLهای یک جدول، این تابع از اتصال `LATERAL` هم پشتیبانی می‌کند؛ نمونهٔ آن در [راهنمای استخراج Query](https://github.com/hatamiarash7/duckdb-netquack/blob/main/docs/functions/extract-query.md) آمده است.

## یکسان‌سازی آدرس‌ها

تابع `normalize_url` تغییراتی مانند کوچک‌کردن Scheme و Host، حذف پورت پیش‌فرض، حل بخش‌های `.` و `..` در مسیر، مرتب‌کردن پارامترها و حذف Fragment را انجام می‌دهد:

```sql
SELECT normalize_url(
    'HTTP://WWW.EXAMPLE.COM:80/a/b/../c/?z=1&a=2#frag'
) AS normalized;
```

خروجی این نمونه `http://www.example.com/a/c?a=2&z=1` است و می‌تواند کلید گروه‌بندی آدرس‌ها باشد.

این تبدیل را متناسب با معنای داده‌ها انتخاب کنید. [پیاده‌سازی تابع](https://github.com/hatamiarash7/duckdb-netquack/blob/main/src/functions/normalize_url.cpp) اسلش انتهای مسیر و Fragment را حذف می‌کند و ترتیب پارامترها را تغییر می‌دهد؛ اگر برنامهٔ مقصد میان این حالت‌ها تفاوت می‌گذارد، برای حذف رکوردهای تکراری صرفاً به خروجی این تابع تکیه نکنید.

## تحلیل آدرس‌های IP

برای تشخیص نسخهٔ IP، بررسی عضویت در یک شبکه و دسته‌بندی آدرس‌ها می‌توانید توابع را کنار هم استفاده کنید:

```sql
WITH clients(ip) AS (
    VALUES
        ('192.168.1.100'),
        ('203.0.113.5'),
        ('2001:db8::1')
)
SELECT
    ip,
    ip_version(ip) AS version,
    ip_type(ip) AS address_type,
    ip_in_range(ip, '192.168.1.0/24') AS in_local_subnet
FROM clients;
```

آدرس‌های این نمونه برای شبکهٔ خصوصی و مستندسازی انتخاب شده‌اند. تابع `ip_in_range` از هر دو خانوادهٔ IPv4 و IPv6 پشتیبانی می‌کند و برای IP یا CIDR نامعتبر `NULL` برمی‌گرداند. تطبیق یک آدرس IPv6 با شبکهٔ IPv4 نیز نتیجهٔ `false` دارد.

چند تفاوت مهم میان توابع:

- `is_private_ip` علاوه بر محدوده‌های خصوصی، محدوده‌های رزروشده‌ای مانند Loopback و آدرس‌های مستندسازی را هم در نظر می‌گیرد. برای دسته‌بندی تفکیکی از `ip_type` استفاده کنید.
- تبدیل‌های `ip_to_int` و `int_to_ip` برای IPv4 هستند؛ پشتیبانی سایر توابع از IPv6 را نباید به این دو تعمیم داد.
- `ip_to_ptr` نام مناسب جست‌وجوی معکوس DNS را می‌سازد؛ خودش درخواست DNS ارسال نمی‌کند.
- تابع `ip_anonymize` به‌طور پیش‌فرض بیت‌های بعد از پیشوند `/24` در IPv4 و `/48` در IPv6 را صفر می‌کند. این عملیات کاهش دقت آدرس است.
- تابع جدولی `ipcalc` برای محاسبات شبکهٔ IPv4 ارائه شده و در مستندات پروژه آزمایشی معرفی شده است.

جزئیات ورودی‌ها و رفتار هر تابع در [راهنمای توابع IP](https://github.com/hatamiarash7/duckdb-netquack/blob/main/docs/ip-address/README.md) در دسترس است.

## افزودن اطلاعات Tranco

برای مقایسهٔ دامنه‌های موجود در داده‌ها با فهرست محبوبیت Tranco، ابتدا دادهٔ موردنیاز را دریافت کنید:

```sql
SELECT update_tranco(true);
```

این عملیات به شبکه و امکان نوشتن فایل در دایرکتوری جاری نیاز دارد. فهرست مربوط به روز قبل در فایلی با الگوی `tranco_list_YYYY-MM-DD.csv` ذخیره می‌شود و جدول `tranco_list` در پایگاه داده ساخته یا جایگزین می‌شود.

طبق [کد بارگذاری Tranco](https://github.com/hatamiarash7/duckdb-netquack/blob/main/src/functions/get_tranco.cpp)، مقدار `true` دانلود مجدد را انجام می‌دهد. مقدار `false` فقط فایل محلی موردانتظار را می‌خواند و اگر آن فایل موجود نباشد خطا می‌دهد؛ بنابراین برای دریافت اولیه از `true` استفاده کنید.

پس از آماده‌شدن فهرست، می‌توانید آن را به داده‌های خود متصل کنید:

```sql
WITH urls(url) AS (
    VALUES
        ('https://duckdb.org/docs/'),
        ('https://github.com/hatamiarash7/duckdb-netquack')
)
SELECT u.url, t.rank, t.category
FROM urls AS u
LEFT JOIN tranco_list() AS t
    ON t.domain = extract_domain(u.url);
```

رتبه‌ها به فهرست دریافت‌شده وابسته‌اند. اتصال `LEFT JOIN` دامنه‌های غایب از فهرست را نیز نگه می‌دارد و برای رتبه و دستهٔ آن‌ها `NULL` قرار می‌دهد.

## کاربرد در جریان تحلیل داده

Netquack برای زمانی مناسب است که داده‌های وب و شبکه را در DuckDB تحلیل می‌کنید و می‌خواهید استخراج، تبدیل و دسته‌بندی آدرس‌ها بخشی از همان پرس‌وجو باشد. توابع استخراج و اعتبارسنجی، ثبت‌بودن دامنه یا در دسترس بودن سرویس مقصد را بررسی نمی‌کنند؛ کار آن‌ها پردازش ساختار دادهٔ ورودی است.

کد پروژه با [مجوز MIT](https://github.com/hatamiarash7/duckdb-netquack/blob/main/LICENSE) منتشر شده است. برای توسعه و ساخت افزونه از سورس، وابستگی‌ها و مراحل لازم در [راهنمای ساخت](https://github.com/hatamiarash7/duckdb-netquack/blob/main/docs/getting-started/how-to-build.md) توضیح داده شده‌اند.
