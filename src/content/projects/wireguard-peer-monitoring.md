---
title: پایش Peerهای WireGuard با رویدادهای کرنل
description: پایش تغییر آدرس Peerها و رویدادهای Handshake و Keepalive در WireGuard، با ذخیره‌سازی در Redis، اعلان وب‌هوک و متریک‌های Prometheus.
order: 45
year: 1403
openSource: true
featured: false
stack:
  - Python
  - WireGuard
  - Linux
  - Redis
  - Prometheus
  - Docker
links:
  - label: گیت‌هاب
    url: https://github.com/hatamiarash7/Wireguard-Peer-Monitoring
    kind: repo
---

وقتی یک Peer در WireGuard شبکهٔ خود را عوض می‌کند، آدرس IP یا پورت آن هم ممکن است تغییر کند. برای دنبال‌کردن این تغییرات و ثبت آخرین فعالیت مشاهده‌شده، می‌توان از پیام‌هایی استفاده کرد که خود WireGuard در کرنل لینوکس تولید می‌کند.

پروژهٔ **WireGuard Peer Monitoring** این پیام‌ها را دریافت و پردازش می‌کند، آخرین اطلاعات هر Peer را در Redis نگه می‌دارد و هنگام مشاهدهٔ یک Endpoint جدید، وب‌هوک می‌فرستد. متریک‌های Prometheus هم امکان پایش رویدادها و خطاهای این مسیر را فراهم می‌کنند.

## روش کار

ابتدا قابلیت Dynamic Debug برای WireGuard روی میزبان فعال می‌شود. سپس rsyslog پیام‌های کرنل را از طریق UDP به برنامه می‌فرستد. برنامه فقط رویدادهای مربوط به اینترفیس تنظیم‌شده را پردازش می‌کند:

- دریافت پیام آغاز Handshake؛
- دریافت پاسخ Handshake؛
- دریافت بستهٔ Keepalive.

از هر رویداد، شناسهٔ Peer، آدرس IP و پورت استخراج می‌شود. مقایسهٔ Endpoint قبلی و ذخیرهٔ اطلاعات جدید با یک اسکریپت Lua به‌صورت اتمیک در Redis انجام می‌شود. اگر Peer جدید باشد یا IP و پورت آن تغییر کرده باشد، اعلان در صف وب‌هوک قرار می‌گیرد؛ حتی اگر تغییر برای اولین بار در یک Keepalive دیده شده باشد.

پردازش اعلان‌های HTTP در یک Worker جدا انجام می‌شود. آدرس‌های IPv4 و IPv6 پشتیبانی می‌شوند و برنامه نیازی به دسترسی به محتوای ترافیک تونل ندارد. جزئیات این مسیر در [کد پردازش رویدادها](https://github.com/hatamiarash7/Wireguard-Peer-Monitoring/blob/main/monitoring/handler.py) و [لایهٔ ذخیره‌سازی](https://github.com/hatamiarash7/Wireguard-Peer-Monitoring/blob/main/monitoring/redis_handler.py) قابل بررسی است.

## راه‌اندازی با Docker Compose

روی میزبان به WireGuard لینوکسی با پشتیبانی از Dynamic Debug، فایل‌سیستم `debugfs` در مسیر `/sys/kernel/debug` و rsyslog با ورودی فعال پیام‌های کرنل نیاز دارید. در روش زیر، Docker Compose برنامه و Redis را اجرا می‌کند.

ابتدا مخزن و فایل تنظیمات را آماده کنید:

```bash
git clone https://github.com/hatamiarash7/Wireguard-Peer-Monitoring.git
cd Wireguard-Peer-Monitoring
cp config.toml.example config.toml
```

برای شروع می‌توانید محتوای `config.toml` را با نمونهٔ زیر جایگزین کنید. نام `wg0` باید با اینترفیس واقعی شما یکسان باشد:

```toml
[app]
host = "0.0.0.0"
port = 9999
metrics_host = "0.0.0.0"
metrics_port = 9998

[wireguard]
interface = "wg0"

[redis]
host = "redis"
port = 6379
db = 3

[manager]
url = ""
```

گزینه‌های حذف‌شده از پیش‌فرض برنامه استفاده می‌کنند. مقدار خالی `manager.url` ارسال وب‌هوک را غیرفعال می‌کند؛ برای فعال‌کردن آن، نشانی HTTP یا HTTPS گیرندهٔ خود را وارد کنید. در شبکهٔ Compose، نام میزبان Redis برابر `redis` است، نه `localhost`.

برنامه داخل کانتینر روی همهٔ اینترفیس‌ها گوش می‌دهد، اما فایل Compose پورت‌های UDP و متریک را فقط روی آدرس Loopback میزبان منتشر می‌کند. فایل تنظیمات باید برای کاربر کانتینر با UID برابر `10001` خواندنی باشد.

```bash
docker compose up -d --build
docker compose logs -f monitoring
```

Compose کد همین نسخهٔ دریافت‌شده را می‌سازد و داده‌های Redis را با AOF در Volume نگه می‌دارد. برای فهرست کامل گزینه‌ها، [نمونهٔ تنظیمات مخزن](https://github.com/hatamiarash7/Wireguard-Peer-Monitoring/blob/main/config.toml.example) را ببینید.

### ارسال لاگ‌های WireGuard

روی **میزبان WireGuard**، لاگ‌های Debug را فعال کنید:

```bash
echo 'module wireguard +p' | sudo tee /sys/kernel/debug/dynamic_debug/control
```

اگر فایل کنترل وجود ندارد، پشتیبانی کرنل و Mount بودن `debugfs` را بررسی کنید. این تنظیم بدون پیکربندی جداگانه برای ماندگاری، پس از راه‌اندازی مجدد میزبان باید دوباره اعمال شود.

سپس قانون زیر را در `/etc/rsyslog.d/99-wireguard.conf` قرار دهید:

```text
if $syslogfacility-text == 'kern' and $msg contains 'wireguard:' then {
    action(type="omfwd" target="127.0.0.1" port="9999" protocol="udp")
}
```

تنظیمات را اعتبارسنجی و سرویس را راه‌اندازی مجدد کنید:

```bash
sudo rsyslogd -N1
sudo systemctl restart rsyslog
```

این فیلتر به وجود عبارت `wireguard:` در پیام‌های کرنل وابسته است. با `sudo journalctl -k -f` قالب واقعی پیام‌ها را بررسی کنید و در صورت نیاز فیلتر را تغییر دهید. پردازشگر برنامه نیز انتظار دارد نام دقیق اینترفیس با `: ` دنبال شده باشد.

برای غیرفعال‌کردن لاگ‌های اضافه:

```bash
echo 'module wireguard -p' | sudo tee /sys/kernel/debug/dynamic_debug/control
```

## اطلاعات ذخیره‌شده و وب‌هوک

اطلاعات هر Peer در یک Hash با الگوی `wireguard_peer:{peer_id}` ذخیره می‌شود. فیلدهای `ip` و `port` آخرین Endpoint مشاهده‌شده را نگه می‌دارند. فیلدهای `handshake` و `keepalive` هم با دریافت رویداد مربوط به خود ایجاد یا به‌روزرسانی می‌شوند؛ زمان آن‌ها زمان پردازش رویداد در برنامه و بر مبنای UTC است.

برای خواندن اطلاعات Peer شمارهٔ ۱۲ در تنظیمات بالا:

```bash
docker compose exec redis redis-cli -n 3 HGETALL wireguard_peer:12
```

اگر وب‌هوک فعال باشد، مشاهدهٔ Endpoint جدید یک درخواست POST با بدنه‌ای مانند نمونهٔ زیر ایجاد می‌کند. این آدرس صرفاً برای مثال است:

```json
{
  "peer": "192.0.2.10:51820"
}
```

در IPv6، آدرس داخل براکت قرار می‌گیرد؛ برای مثال `[2001:db8::10]:51820`. گیرنده باید امکان دریافت اعلان تکراری را در نظر بگیرد. خطاهای موقت شبکه و پاسخ‌های HTTP با کدهای `408`، `429` و `5xx` دوباره امتحان می‌شوند.

صف اعلان محدود و فقط در حافظه است. پرشدن صف، پایان تلاش‌های مجدد یا توقف برنامه می‌تواند باعث ازدست‌رفتن اعلان شود. ذخیره‌شدن اطلاعات در Redis تضمین نمی‌کند که وب‌هوک تحویل شده باشد؛ ثابت‌ماندن Endpoint نیز اعلان ناموفق قبلی را دوباره وارد صف نمی‌کند.

## اتصال به Prometheus

پس از اجرای سرویس، متریک‌ها از روی همان میزبان در دسترس‌اند:

```bash
curl --fail http://127.0.0.1:9998/metrics
```

اگر Prometheus هم روی همین میزبان اجرا می‌شود، یک تنظیم ساده برای جمع‌آوری متریک‌ها به این شکل است:

```yaml
scrape_configs:
  - job_name: wireguard-peer-monitoring
    static_configs:
      - targets: ["127.0.0.1:9998"]
```

اگر Prometheus داخل کانتینر دیگری است، `127.0.0.1` به همان کانتینر اشاره می‌کند و باید آدرس قابل‌دسترسی متناسب با شبکهٔ خود را تنظیم کنید.

متریک‌ها تعداد رویدادهای ذخیره‌شده، تغییر Endpoint، زمان آخرین رویداد و نتیجهٔ ارسال اعلان‌ها را پوشش می‌دهند. برای نمونه، پرس‌وجوی زیر نرخ رویدادها را به تفکیک نوع نمایش می‌دهد:

```text
sum by (event) (
  rate(wg_peer_monitoring_wg_wireguard_events_total[5m])
)
```

برای محاسبهٔ مدت سپری‌شده از آخرین Keepalive ثبت‌شده، بر حسب ثانیه:

```text
time() - wg_peer_monitoring_wg_last_event_timestamp_seconds{event="Keepalive"}
```

این Gauge پس از دریافت رویداد مرتبط ظاهر می‌شود. نمونه‌های دارای پسوند `_created` در Counterها زمان ایجاد سری متریک هستند و نباید به‌جای زمان آخرین رویداد استفاده شوند. [راهنمای مخزن](https://github.com/hatamiarash7/Wireguard-Peer-Monitoring#prometheus-monitoring) فهرست کامل متریک‌ها و برچسب‌ها را توضیح می‌دهد.

## نکات مهم در تفسیر داده‌ها

- **شناسهٔ Peer کلید عمومی آن نیست.** این شناسه عددی و داخلی کرنل است و با بازسازی Peer یا اینترفیس ممکن است تغییر کند یا دوباره استفاده شود. هر فرایند یک اینترفیس را پایش می‌کند؛ برای میزبان‌ها یا اینترفیس‌های مستقل، دیتابیس‌های Redis جدا در نظر بگیرید.
- **دریافت پیام Handshake، تکمیل آن را ثابت نمی‌کند.** برای آخرین Handshake کامل و آمار انتقال داده همچنان باید به ابزارهایی مثل `wg show` مراجعه کرد.
- **نبود Keepalive به معنی آفلاین‌بودن نیست.** Peer غیرفعال ممکن است رویدادی تولید نکند و ارسال Keepalive به نیاز ارتباط یا تنظیم Persistent Keepalive وابسته است.
- **این مسیر ثبت تضمین‌شدهٔ همهٔ رویدادها نیست.** لاگ کرنل، rsyslog و UDP ممکن است پیام از دست بدهند. خطای Redis هنگام پردازش نیز باعث ازدست‌رفتن همان رویداد می‌شود.
- **ورودی UDP احراز هویت ندارد.** اگر پورت را برای فرستندهٔ راه‌دور منتشر می‌کنید، دسترسی را به منابع مورداعتماد محدود کنید.
- **داده‌های Peer تاریخ انقضای خودکار ندارند.** برای پاک‌سازی Hashهای قدیمی Redis و کنترل تعداد سری‌های متریک در استقرارهای طولانی‌مدت برنامه داشته باشید.

این پروژه با مجوز [MIT](https://github.com/hatamiarash7/Wireguard-Peer-Monitoring/blob/main/LICENSE) منتشر شده است و برای افزودن پایش رویدادمحور و اعلان تغییر Endpoint به زیرساخت WireGuard کاربرد دارد.
