---
permalink: making-cron-expressions-human-readable
image: /covers/making-cron-expressions-human-readable.png
description: I’ve released a new PHP library that translates any valid CRON expression into some text that can be read and understood by humans.
tags: [ 'PHP' ]
date: 2019-06-07T15:19:00Z
ribbon: new
---
# Making CRON expressions human-readable

This weekend, I’ve released a new PHP library that translates any valid CRON expression into some text that can be read and understood by humans.

<GithubButton url="https://github.com/lorisleiva/cron-translator" title="CRON Translator on GitHub"></GithubButton>

It’s a simple input/output library and, once you’ve installed it through composer, you can use it like this.

```php
use Lorisleiva\CronTranslator\CronTranslator;

CronTranslator::translate('* * * * *');       // => Every minute
CronTranslator::translate('30 22 * * *');     // => Every day at 10:30pm
CronTranslator::translate('0 16 * * 1');      // => Every Monday at 4:00pm
CronTranslator::translate('0 0 1 1 *');       // => Every year on January the 1st at 12:00am
CronTranslator::translate('0 0 1 * *');       // => The 1st of every month at 12:00am
CronTranslator::translate('0 * * * 1');       // => Once an hour on Mondays
CronTranslator::translate('* 1-20 * * *');    // => Every minute 20 hours a day
CronTranslator::translate('0,30 * * * *');    // => Twice an hour
CronTranslator::translate('0 1-5 * * *');     // => 5 times a day
CronTranslator::translate('0 1 1-5 * *');     // => 5 days a month at 1:00am
CronTranslator::translate('*/2 * * * *');     // => Every 2 minutes
CronTranslator::translate('* 1/3 2 * *');     // => Every minute of every 3 hours on the 2nd of every month
CronTranslator::translate('1-3/5 * * * *');   // => 3 times every 5 minutes
CronTranslator::translate('1,2 0 */2 1,2 *'); // => Twice an hour every 2 days 2 months a year at 12am
```

Note that the library currently supports a subset of the CRON features (e.g. no `W` and `L`) and tries to make sense of the expression without cramming too much information in order to stay human-friendly.

For example, the CRON expression `* 0 * * 1,3,5` means it will only run on Mondays, Wednesdays and Fridays but translate to "Every minute 3 days a week at 12am". Whilst we lose the information regarding the exact days of the week, it keeps the translation concise and easier to reason with.

## Why did I build this?
I’m currently working on a new course on building Single Page Applications (SPA) using Laravel, VueJS and TailwindCSS. During that course, I will be implementing a new SPA from scratch called Paparazzi — an app that schedules screenshots for any web page. I’m still working on the design but here is a current screenshot of the app we will be building.

![Paparazzi app screenshot](./paparazzi.png)

As you can see, each "paparazzi" takes a screenshot at a certain frequency. Whilst we will leverage CRON expressions to define those frequencies, we need a human-friendly way to display that frequency to our users. **Hence the CRON translator library**.

This course will also use some of my other packages in order to provide additional documentation for them. That includes [Laravel Actions](https://github.com/lorisleiva/laravel-actions), [Javel](https://github.com/lorisleiva/javel), [Laravel Deployer](https://github.com/lorisleiva/laravel-deployer) and [TailwindCSS plugins](https://github.com/lorisleiva/tailwindcss-plugins).

I haven’t designed a landing page for the course just yet but when I do I’ll be notifying my blog’s subscribers so feel free to sign up in the meantime.

Thanks for reading this far and I hope you’ll see some use for that new CRON translator library. ⏰

<GithubButton url="https://github.com/lorisleiva/cron-translator" title="CRON Translator on GitHub"></GithubButton>
