---
permalink: renderless-resizable-textarea
image: /covers/renderless-resizable-textarea.gif
description: Following the eye-opening course on Advance Vue Component Design from Adam Wathan, here is a renderless component that resize a textarea based on its content.
tags: [ 'Vue Lab' ]
date: 2018-05-11T12:31:00Z
disqus: ghost-5af5828b04de1b2a0fd20f58
---

# Renderless resizable textarea

The recent course of Adam Wathan on [Advance Vue Component Design](https://adamwathan.me/advanced-vue-component-design/) has been a real eye opening for me on the power of renderless components. That is components that provides extra behaviour without committing to any UI decisions using VueJS's `render` function.

Following Adam's course, I went back to some of my projects and spent hours of joyful refactoring. Using renderless components I managed to extract some generic behaviour logic from my project-specific components to free them of that burden.

One of them was this `<resizable-component>`.

<GithubButton url="https://github.com/lorisleiva/vue-lab/tree/master/components/resizable-textarea" />

## Crazy simple usage

Using this component is as easy as:

```html
<resizable-textarea>
    <textarea></textarea>
</resizable-textarea>
```

The `<resizable-textarea>` component does not interfere at all with the textarea attributes nor does it create an extra wrapping `div`. Its entire purpose is to update the height of the textarea to match its content.

<CodePen id="XqqKKP" title="Resizable Textarea" />

## How this works

First, the component simply renders its content, i.e. its default slot.

```js
render () {
    return this.$slots.default[0]
}
```

Then, it provides a `resizeTextarea` event listener that updates the height of the `event.target` to match its content. It registers the event listener when the component is mounted and removes it right before the component is destroyed.

```js
export default {
    methods: {
        resizeTextarea (event) {
            event.target.style.height = 'auto'
            event.target.style.height = (event.target.scrollHeight) + 'px'
        },
    },
    mounted () {
        this.$el.addEventListener('input', this.resizeTextarea)
    },
    beforeDestroy () {
        this.$el.removeEventListener('input', this.resizeTextarea)
    },
    // ...
}
```

Finally, if the textarea has some initial content, we must make sure to update its height initially. We do this in the `mounted` hook.

```js
mounted () {
    this.$nextTick(() => {
        this.$el.setAttribute('style', 'height:' + (this.$el.scrollHeight) + 'px;overflow-y:hidden;')
    })
    // ...
}
```

## Full code

```js
export default {
    methods: {
        resizeTextarea (event) {
            event.target.style.height = 'auto'
            event.target.style.height = (event.target.scrollHeight) + 'px'
        },
    },
    mounted () {
        this.$nextTick(() => {
            this.$el.setAttribute('style', 'height:' + (this.$el.scrollHeight) + 'px;overflow-y:hidden;')
        })

        this.$el.addEventListener('input', this.resizeTextarea)
    },
    beforeDestroy () {
        this.$el.removeEventListener('input', this.resizeTextarea)
    },
    render () {
        return this.$slots.default[0]
    },
}
```

## Conclusion

Whilst very simple, this component enabled me to remove that logic from other components that did not need to care about the size of my textareas.

⭐️ The force is strong with renderless components. Stay tuned for some more cool stuff.

<GithubButton url="https://github.com/lorisleiva/vue-lab/tree/master/components/resizable-textarea" />