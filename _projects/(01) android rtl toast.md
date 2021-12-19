---
name: کتابخانه Toast فارسی برای اندروید
tools: [Android, UI, RTL, Java]
image: https://socialify.git.ci/hatamiarash7/RTL-Toast/image?description=1&font=KoHo&language=1&owner=1&pattern=Circuit%20Board&theme=Dark
description: با استفاده از این کتابخانه می توانید از Toast هایی شخصی سازی شده با قالب های پیشفرض در برنامه خود استفاده کنید
developed_date: 1397
lang: Java
open_source: بله
---

<h1 class="center">
<img src="https://raw.githubusercontent.com/hatamiarash7/RTL-Toast/master/assets/template.jpg"/>
</h1>

<div class="center badges">
<a href="https://android-arsenal.com/details/1/7695" target="_blank">
<img src="https://img.shields.io/badge/Android%20Arsenal-RTL%20Toast-brightgreen.svg?style=flat" />
</a>
<a href="https://jitpack.io/#hatamiarash7/RTL-Toast" target="_blank">
<img src="https://img.shields.io/jitpack/v/github/hatamiarash7/rtl-toast.svg" />
</a>
</div>

<h2 class="center">
{% include elements/button.html link="https://github.com/hatamiarash7/RTL-Toast" text="گیت هاب" size="lg"%}
</h2>

{% include project-info.html %}

## نصب

ابتدا مخزن jitpack را در فایل build.gradle پروژه خود قرار دهید :

```groovy
allprojects {
    repositories {
        ...
        maven {
            url 'https://jitpack.io'
        }
    }
}
```

سپس کتابخانه را در build.gradle ماژول خود وارد کنید :

```groovy
dependencies {
    implementation 'com.github.hatamiarash7:RTL-Toast:1.2'
}
```

## استفاده

با استفاده از توابع آماده می توانید Toast های گوناگون با توجه به نیاز خود نمایش دهید :

```java
RTLToast.error(context, message, length, withIcon);
RTLToast.success(context, message, length, withIcon);
RTLToast.info(context, message, length, withIcon);
RTLToast.warning(context, message, length, withIcon);
RTLToast.normal(context, message, length, withIcon);
```

همچنین می توانید متن Toast خود را شخصی سازی کنید :

```java
RTLToast.info(context, getFormattedMessage())

private CharSequence getFormattedMessage() {
    final String prefix = "متن ";
    final String highlight = "با فرمت ";
    final String suffix = " مخصوص";
    SpannableStringBuilder ssb = new SpannableStringBuilder(prefix).append(highlight).append(suffix);
    int prefixLen = prefix.length();
    ssb.setSpan(new StyleSpan(BOLD_ITALIC), prefixLen, prefixLen + highlight.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
    return ssb;
}
```

با استفاده از تابع `RTLToast.Config` می توانید Toast را مدیریت کنید :

```java
RTLToast.Config.getInstance()
    .setTextColor(Color.GREEN)
    .setToastTypeface(Typeface.createFromAsset(getAssets(), "IRANSans.ttf"))
    .apply();
RTLToast.custom(context, message, getResources().getDrawable(R.drawable.laptop512), Color.BLACK, length, withIcon, shouldTint).show();
RTLToast.Config.reset();
```
