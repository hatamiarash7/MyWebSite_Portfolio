---
name: تجزیه کننده گرامر LL1
tools: [Python, Parser]
image: https://socialify.git.ci/hatamiarash7/LL1_Parser/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: در علوم کامپیوتر، تجزیه‌کنندهٔ ال‌ال یک پارسر بالا به پایین برای یک زیرمجموعه از گرامرهای مستقل از متن است. با استفاده از این پروژه می توانید چنین گرامر هایی را بررسی کنید.
---

<h1 class="center">
<img src="https://socialify.git.ci/hatamiarash7/LL1_Parser/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark"/>
</h1>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/LL1_Parser" text="گیت هاب" size="lg" %}
</h2>

<br>

> در علوم کامپیوتر، تجزیه‌کنندهٔ ال‌ال یک پارسر بالا به پایین برای یک زیرمجموعه از گرامرهای مستقل از متن است. این پارسر ورودی را از چپ به راست و بر اساس چپ ترین اشتقاق جملات می‌خواند. (از این رو LL با LR مقایسه می‌شود) به مجموعه گرامرهایی که به وسیله این روش قابل پارس هستند، گرامرهای LL می‌گویند.
>
> ویکی پدیا فارسی

این پروژه یک تجزیه کننده ( Parser ) برای گرامر های LL1 می باشد که با زبان پایتون نوشته شده است و فابلیت های زیر را دارد :

- تعیین مفادیر First و Follow
- تشکیل جدول گرامر
- دریافت رشته و بررسی اینکه مورد قبول گرامر تعیین شده می باشد یا خیر

## استفاده

ابتدا باید یک فایل برای گرامر خودمان آماده کنیم. به طور پیشفرض دو فایل نمونه با نام های `grammar` و `grammar2` در ریپازیتوری موجود است. گرامر خود را به این گونه می نویسیم :

```txt
S -> aA | bB | dC
A -> aA | bA | d
B -> bB | d
C -> d
```

یا

```txt
S -> AB | aS
A -> eAc | d | @
B -> cB | b | @
```

سپس در فایل `parser.py` و انتهای آن رشته مورد نظر خودمان را جهت بررسی قرار می دهیم :

```python
parse("aabd", start, ll1Table)
```

حال کافی است که فایل مورد نظر را اجرا نماییم :

```sh
python parser.py
```

خروجی مشابه زیر خواهد بود :

```txt
First

S : {'a', 'd', 'b'}
A : {'a', 'd', 'b'}
B : {'b', 'd'}
C : {'d'}


Follow

S : {'$'}
A : {'$'}
B : {'$'}
C : {'$'}

Parsing Table

('S', 'a') => aA
('S', 'd') => dC
('S', 'b') => bB
('A', 'd') => d
('A', 'a') => aA
('A', 'b') => bA
('B', 'd') => d
('B', 'b') => bB
('C', 'd') => d


Table

    a   b   d
A  aA  bA   d
B   -  bB   d
C   -   -   d
S  aA  bB  dC


Top => S
Current_Input =>  a
('S', 'a')
Top => a
Current_Input =>  a
Top => A
Current_Input =>  a
('A', 'a')
Top => a
Current_Input =>  a
Top => A
Current_Input =>  b
('A', 'b')
Top => b
Current_Input =>  b
Top => A
Current_Input =>  d
('A', 'd')
Top => d
Current_Input =>  d
Top => $
Current_Input =>  $

String accepted!
```
