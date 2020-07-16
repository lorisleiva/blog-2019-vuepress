---
permalink: unlock-your-frontend-skills
image: /covers/unlock-your-frontend-skills.png
description: The first article of a series dedicated to homemade frontend patterns.
title: 'Unlock your frontend skills - Part 1: Services'
header_title: 'Unlock your frontend skills'
subtitle: 'Part 1: Services'
tags: ['JavaScript', 'Vue']
date: 2020-07-15T18:00:00Z
---

## Introduction
In an era where developers are trying to run away from JavaScript by using tools like LiveWire, I decided to put together an article that I hope will help developers make peace with the frontend world.

There are certainly valid use cases where a JavaScript framework is not needed and tools like Alpine and LiveWire make total sense. However, making the switch to an almost-no-js environment undeniably comes with its own set of technical debt.

When [Sam](https://twitter.com/slashequip) and I started creating [Octohook](https://octohook.com), we immediately followed the LiveWire hype train. We thought: "we don't need too much frontend magic, all we need is a few modals and some tab navigation". After less than a month we started spending days implementing fairly trivial frontend tasks that would have taken a few hours with a JavaScript framework. It had literally become the bottleneck of most new features. A few weeks later, we had enough and reverted everything to use VueJs within blade.

After an entire weekend of copy/pasting some code from old side projects, I finally felt like I had control over my frontend. And whilst Single-File-Components in VueJs are great, they can only be partially credited for that success.

The real heroes are the various patterns I added to my `js` folder in order to remove some of the burden from my VueJs components.

In this article, I'd like you to meet these heroes.

## We can be heroes 🦸‍♂️ 
<small>...and not just for one day.</small>

![Services, models, stores and plugins as a comics page where each of them as their own panel and superhero logo.](./all_heroes.png)

Meet our 4 new heroes: Services, Models, Stores and Plugins.

The first thing to note here is that everything will be homemade. None of these patterns are difficult to implement from scratch and we want to use them to clean our frontend and encapsulate the outside world. Adding more libraries to do this feels like an anti-pattern to me. Additionally, most libraries will try to create a one-size-fit-all solution that ends up not really fitting anyone and requires adjustments to make it work. I have actually created such library for one of these patterns that I, myself, never use on any of my projects because it's just overkill most of the time (more on that later). Let's keep things clean, simple and adequate.

Another thing to note is: this is how I ended up thriving and maintaining complexity in the frontend world but things might be different for you. Don't see this as a universal way to assemble your frontend but as me sharing my frontend heroes so you can be inspired to create your own.

Finally, I will assume your stack is Laravel and VueJs. If it's not, you can still follow along and learn some nice vanilla JavaScript tips but this is the stack that I feel most comfortable with and end up writing about.

At the end of the day this article is all about relieving our final "Components" hero from most of the frontend complexity so it can focus on its children.

![A components superhero logo in the middle of a single comics panel.](./components.png)

<small>I admit, I might have gone over the top with that superhero thing. 😅</small>

## Services

Let start with the simplest and most obvious hero but nonetheless a very important one.

![Services logo with a diagram showing the services Realtime, Http, Form and FormErrors.](./services.png)

Services are very common in the backend world but for some reasons we tend to ignore them in the `js` folder of our Laravel projects. We use `axios`, `lodash`, `moment`, and more without any encapsulation throughout our code.

Perhaps we're so used to these APIs that we see them more as part of the JavaScript language rather than as the libraries that they are.

Nevertheless, wrapping these libraries in services will:
* **Make it easier to switch to a different library.** For example, when you realise that the `moment` library is overkill for your feature set.
* **Give you back control on an API that makes sense to your domain.** E.g. If all you need is a way to render a video from a URL, you can create a `Video.render(url)` method and let the `Video` service worry about which API to delegate to (e.g. YouTube).
* **Provide a Single Point of Failure for that API and its configuration.** E.g. wrapping `axios` inside an `Http` service allows you to configure all `axios` options and interceptors in one place and ensures every single external API call run through that one `Http.send(...)` method.

Additionally, once you take the habit of wrapping your libraries into services, you will be more inclined to extract internal pieces of logic into services too.

Right, enough theory! Let's dig into some real-life examples of services I use in my projects.

### Realtime

Let's start with a simple example wrapping [Laravel Echo](https://github.com/laravel/echo).

```js
// resources/js/services/Realtime.js

import Echo from 'laravel-echo'

// Make Pusher globally accessible for Laravel Echo.
window.Pusher = require('pusher-js');

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    csrfToken: Octohook.csrfToken,
    forceTLS: true,
    namespace: '',
})

export default {
    subscribe (channel, listeners, publicChannel = false) {
        channel = publicChannel
            ? echo.channel(channel)
            : echo.private(channel)

        Object.keys(listeners).forEach(function (event) {
            channel.listen(`.${event}`, listeners[event])
        })
    },

    unsubscribe (channel) {
        echo.leave(channel)
    },
}
```

As you can see, all that application need is a way to subscribe and unsubscribe to a channel. When subscribing, I want to pass an object of event listeners that the service will take care of registering for me. That's it. Now the rest of the frontend doesn't need to be aware of the ins and out of Laravel Echo nor how it is configured. Before moving on to our next service, let's see a basic usage example of Realtime.

```js
// resources/js/components/SomeComponent.vue

import { Realtime } from '@services'

export default {
    props: ['initialSuperPower'],
    data () {
        return {
            superPower: this.initialSuperPower,
        }
    },
    created () {
        // Register real-time listeners.
        Realtime.subscribe('my-channel', {
            'power.updated': newSuperPower => this.superPower = newSuperPower,
            'power.level-up': () => this.superPower.level++,
            'power.level-down': () => this.superPower.level--,
        })

        // Unsubscribe when the component gets destroyed.
        this.$once('hook:beforeDestroy', () => Realtime.unsubscribe('my-channel'))
    }
}
```

### Http

Following the same concept of our Realtime service, we will now encapsulate or dear friend `axios` in an Http service.

```js
// resources/js/services/Http.js

import axios from 'axios'

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': Octohook.csrfToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export default {
    async get (url, config = {}) {
        return this.send('get', url, {}, config)
    },

    async post (url, data = {}, config = {}) {
        return this.send('post', url, data, config)
    },

    async put (url, data = {}, config = {}) {
        return this.send('put', url, data, config)
    },

    async patch (url, data = {}, config = {}) {
        return this.send('patch', url, data, config)
    },

    async delete (url, data = {}, config = {}) {
        return this.send('delete', url, data, config)
    },

    async send (method, url, data = {}, config = {}) {
        const response = await axios({ method, url, data, ...config })
        return response.data
    },
}
```

Now say we want to refresh the page whenever we receive a 419 status code due to the expiration of the CSRF token. 

We can do this as an `axios` interceptor...


```js
axios.interceptors.response.use(response => response, error => {
    if (error.response !== undefined) {
        return Promise.reject(error)
    }

    switch (error.response.status) {
        case 419:
            window.location.reload()
            break
    }

    return Promise.reject(error)
})
```

... or directly within our `send` method.


```js
export default {
    // ...

    async send (method, url, data = {}, config = {}) {
        try {
            const response = await axios({ method, url, data, ...config })
            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    },

    handleError (error) {
        if (error.response && error.response.status === 419) {
            window.location.reload()
        }

        throw error
    },
}
```

No matter how we decide to do it, the value here is in abstracting all the quirks of your Http logic within one file. Once you close this file, you can use it as a black box within the rest of your code.

Basic usage examples:

```js
import { Http } from '@services'

const newVillain = await Http.post('/villains', attributes)
const allVillains = await Http.get('/villains')
const firstVillain = await Http.get('/villains/1')
const updatedVillain = await Http.put('/villains/1', attributes)
await Http.delete('/villains/1')
```

### Form and FormErrors

For our last service, we will not encapsulate a library but some custom code that enables us to interacts with Forms in a more intuitive manner.

This technique was heavily inspired by the source code of [Spark](https://spark.laravel.com/) and has been tweaked over the years as I've used this in various projects since then.

The idea is simple, a Form contains some data and a submit callback that either results in a successful response or a set of errors. Before digging into the code that makes this happen, let's have a look at some usage example to get a better understanding of what it does.

Say we have a component that updates the name and email address of a user. Let's create a Form object that takes care of that for us.

```js
// resources/js/components/SomeComponent.vue

import { Form } from '@services'

export default {
    props: ['user'],
    data () {
        const initialData = {
            name: this.user.name,
            email: this.user.email,
        }
    
        return {
            form: new Form(initialData, async form => {
                const user = await Http.put(`/users/${this.user.id}`, form.export())
                this.$emit('user-updated', user)
            }),
        }
    }
}
```

Note that it's important for the form to be declared as a `data` variable so that it can be reactive.

Now we can use that form object in our template like this.

<small>I have omitted most of the styling to keep things to the point.</small>

```html
<!-- Name field. -->
<label>Name</label>
<input
    v-model="form.name"
    @input="form.errors.clear('name')"
></input>
<div
    v-if="form.errors.has('name')"
    v-text="form.errors.get('name')"
    class="text-red-500"
></div>

<!-- Email field. -->
<label>Email</label>
<input
    v-model="form.email"
    @input="form.errors.clear('email')"
></input>
<div
    v-if="form.errors.has('email')"
    v-text="form.errors.get('email')"
    class="text-red-500"
></div>

<!-- Submit button. -->
<button v-if="! form.busy" @click="form.submit()">
    Update details
</button>
<div v-else>
    Loading state...
</div>

<!-- Success alert. -->
<div v-if="form.successful">
    Your details have been updated successfully.
</div>
```

Et voilà! Everything will work as you expect it to.

* Whilst the submit callback is being executed, `form.busy` will be `true` allowing you to provide a visual loading state.
* When the submit callback is over, either `form.successful` will be `true` or you will have errors matching your Laravel validation rules in `form.errors`.
* You can use `form.errors.has(key)`, `form.errors.get(key)` or `form.errors.clear(key)` to respectively check, retrieve or remove a validation error.
* You can use `form.errors.message` to retrieve any global error message provided by the backend.
* You can use `form.errors.clear()` to remove all form errors.
* You can use `form.reset()` the revert the form to its original state using the `initialData` object provided when instantiating the form.
* You can provide arguments to `form.submit()`  and they will be injected to the form submit callback after the `form` argument. E.g. by providing this submit callback when creating a form: `(form, answerToEverything) => { ... }`, you can run `form.submit(42)` and `answerToEverything` will be equal to `42`.

Phew! So many features! Yet the code itself for that service is quicker to read than my explanation above. The `Form` service is only 58 lines of code and the `FormErrors` class used to handle errors contains 32 lines.

That's one of the reasons I see no point in extracting such service — as useful as it might be — into a JavaScript library. The other and arguably more important reason being that every project is different. For my next project, I might not need all that fuss around clearing errors or I might want my global error message to be provided differently. More often than not, I find copy/pasting/adapting a piece of code from one project to another more valuable and easier to maintain in the long run.

Right Loris, shut up and show us the code! Fair enough, there you go: 😘

#### Form.js

```js
import FormErrors from './FormErrors'

export default class {
    
    constructor (initialData = {}, submitCallback = null) {
        this._initialData = initialData
        this._submitCallback = submitCallback
        this.errors = new FormErrors()
        this.reset()
    }

    reset () {
        this.busy = false
        this.successful = false
        this.errors.clear()
        Object.assign(this, this._initialData)
    }

    async submit (...args) {
        if (this.busy || ! this._submitCallback) {
            return
        }
        this.beforeStart()
        const result = await this._submitCallback(this, ...args).catch(error => {
            this.onFailure(error)
            throw error
        })
        this.onSuccess()
        return result
    }

    export () {
        return { ...this }
    }

    beforeStart () {
        this.busy = true
        this.successful = false
        this.errors.clear()
    }

    onSuccess () {
        this.busy = false
        this.successful = true
    }

    onFailure (error) {
        this.busy = false
        if (error.response && error.response.data) {
            const { errors, message } = error.response.data
            this.setErrors(errors, message)
        }
    }

    setErrors (errors, message) {
        this.errors.set(errors, message)
    }
}
```

#### FormErrors.js

```js
export default class {
    
    constructor () {
        this.errors = {}
        this.message = null
    }

    set (errors, message) {
        this.errors = errors || {};
        this.message = message || null;
    }

    has (field) {
        return Object.keys(this.errors).includes(field)
    }

    get (field) {
        if (this.has(field)) {
            const error = this.errors[field]
            return Array.isArray(error) && error.length > 0 ? error[0] : error
        }
    }

    clear (field) {
        if (field) {
            Vue.delete(this.errors, field);
        } else {
            this.errors = {}
            this.message = null
        }
    }
}
```

### Form and Http

If you scroll up a bit to our Form usage example, you'll notice that, inside our submit callback, we used `form.export()` to transform the form object into a plain JavaScript object in order to pass it to our Http service.

Well, we own that service. So let's make life easier for ourselves and automatically export the form data before sending an HTTP request.

```js
// resources/js/services/Http.js

import Form from './Form'

export default {
    // ...

    async send (method, url, data = {}, config = {}) {
        if (data instanceof Form) {
            data = data.export()
        }
        const response = await axios({ method, url, data, ...config })
        return response.data
    }
}
```

This is just a small example on how your services can benefit from each other now that you have complete control over them.

### Utils

Not every reusable piece of logic is a service. Sometimes, you just have a few helper methods that you want to store somewhere and organise them by categories in different files.

For that I use a traditional `utils` directory containing files such as `dates.js`, `strings.js`, `collections.js`, etc. These files can sometimes import external libraries but always export individual helper methods rather than abstracting a full ecosystem as a black box.

For example, here's the `utils/strings.js` of one of my projects.

```js
import Dinero from 'dinero.js'

export const slugify = value => value.toLowerCase().replace(/[\s\W-]+/g, '-')

export const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

export const titleCase = value => value.replace(/\w[^\s-\_]*/g, capitalize)

export const currency = (amount, currency, locale = 'en-US') => {
    return Dinero({ amount: Math.round(amount * 100), currency })
        .setLocale(locale)
        .toFormat('$0,0.00');
}
```

Arguably this could also be a valid `Str` service — to follow Laravel‘s naming convention — and you'd call these methods like so: `Str.slugify(text)`, `Str.capitalize(text)`, etc. It depends on the needs of your projects but most importantly it depends on the API you — and 6-months-from-now you — like the most.

### Index files and webpack aliases

A quick note on imports before moving on to our next hero.

You might have noticed that I used webpack aliases to import services in the above examples.

This enables us to import our custom code using the same beautiful syntax we would use to import from a library.

```js
// Without webpack aliases.
import Http from '../services/Http'
import RealTime from '../services/RealTime'
import { slugify } from '../utils/strings'
import { fromNow } from '../utils/dates'

// With webpack aliases.
import { Http, RealTime } from '@services'
import { slugify, fromNow } from '@utils'
```

From this point forward I will assume we have webpack aliases that points to an `index.js` file for each of our frontend folders. If you're interested in knowing how to achieve this, I've create a little GitHub gist that shows how to set this up.

<GithubButton url="https://gist.github.com/lorisleiva/877004cc7650f458903d357bce45298e" title="Gist on webpack aliases"></GithubButton>

## Next up

Our next hero will be about using Models in your frontend. Stay tuned. 📻
