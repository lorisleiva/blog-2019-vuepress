---
permalink: drag-drop-made-easy
image: /covers/drag-drop-made-easy.jpg
description: When you need a quick drag&drop that reorders your data in VueJS as well as elements in the DOM.
tags: [ 'Vue Lab' ]
date: 2018-02-28T09:47:00Z
disqus: ghost-5a952ce3191ea008997df9aa
---

# Drag&Drop reordering made easy

When you need a quick drag&drop that reorders your data as well as elements in the DOM.

<GithubButton url="https://github.com/lorisleiva/vue-lab/tree/master/directives/dragdrop" />

## Introduction
Whilst the [Dragula](https://github.com/bevacqua/dragula) library has mastered the art of quick and easy drag&drop, it still has to be complete enough to appeal to a vast majority of projects. As a result it can be pretty cumbersome to implement a very simple drag&drop reordering that keeps track of the new order within your data.

VueJS has a few plugins that helps us encapsulate Dragula but they also carry a lot of complexity that most of my projects don't need.

Therefore, I decided to create a little directive that I can copy/paste into components that need data reordering using drag&drop.

## The expected result
Let's say I have an array of `chapters` each containing an `order` property which is used to display them in the order requested by the user. What we want is a simple drag&drop directive that reorders the DOM elements but also reorders the `chapters` array and edits the `order` properties accordingly. Let's start by writing the directive's usage as we wish it could be and we'll make it happen.

```html
<div v-dragdrop="chapters" order="order">
    <div 
        v-for="chapter in chapters" :key="chapter.id"
        v-text="chapter.title"
    ></div>
</div>
```

With that first line, we tell our directive `v-dragdrop` to:
* initialize Dragula on this `<div>` container
* that dragging and dropping will be updating our `chapters` array
* and we let it know where to find the order property in our items.

You can find a working example in the CodePen below.

<CodePen id="JpeBdr" title="Drag&Drop made easy"></CodePen>

## The Dragdrop directive

Let's go through the steps of creating such a directive. I believe its important to understand how to create such a directive in order to be comfortable reusing it and modifying it in future projects.

### Step 1. Initialize and destroy Dragula

We start by creating a `Dragdrop.js` file with the following code.

```js
// resources/assets/js/directives/Dragdrop.js

// npm install dragula -D
import dragula from 'dragula';

// Make the drake instance available globally in order to destroy it later.
let drake;

export default {
    // When the directive is first bound to the container.
    bind (container, binding, vnode) {
    
        // Use dragula on the container.
        drake = dragula([container]);
    },

    // When the directive is unbound from the container.
    unbind (container, binding, vnode) {
    
        // Kill the drake instance.
        drake.destroy();
    }
}
```

This code makes sure that we bind dragula to the container and unbind it when we don't need it anymore. The problem with this implementation is that the `drake` global variable is shared with all components that use that directive. Therefore it only works with one drag&drop list.

### Step 2. Multiple drag&drop lists
In order to overcome this problem, we need to introduce some kind of mapping between a drag&drop container and its drake instance. Existing libraries tackle this problem by asking us to add an additional attribute with some unique key that will identify the drake instance. E.g. `bag="my_chapters"` or `drake="my_chapters"`. That way, if you give the same identifier to multiple containers, the library knows that they should share the same drake instance.

However, in most use cases, I only need a new drake instance per drag&drop list. Dragging & dropping items from different lists together is out of scope when all you need is reordering a list.

Therefore, every time we bind a new `dragdrop` directive to a container, we add a mapping between that container and the drake instance just so that we can destroy it when we're done with it.

Since the container received in the `bind` function and the one received later in the `unbind` function have different object references, I instead bind the array of elements from VueJS to the drake instance.

```js
// resources/assets/js/directives/Dragdrop.js

import dragula from 'dragula';

// Map drake instances to their data structure globally in order to destroy them later.
// An array at index `x` will have its drake instance at index `x` as well.
let arrays = [];
let drakes = [];

export default {
    bind (container, binding, vnode) {
    
        let drake = dragula([container]);
        
        // Map the items with the drake instance.
        addDrake(items, drake);
    },

    unbind (container, binding, vnode) {
    
        // Retrieve the drake instance and kill it.
        let drake = getDrake(binding.value);
        if (drake) drake.destroy();
    }
}
```

For the sake of clarity, the above code uses two helper methods.
* The `addDrake` method which registers a drake instance based on the reference of the given array.
* The `getDrake` method which retrieves a drake instance based on the reference of the given array.

So far, all we've done is dynamically bind and unbind Dragula to our containers. Whilst this will magically enable dragging and dropping DOM elements, it won't do anything about our `chapters` array in VueJS. We need to do this logic ourselves by adding some event listeners.

### Step 3. Listen to drag and listen to drop
In the `bind` method of our directive we add some event listeners to our drake instance. The idea here is to keep track of the original index of a DOM element when it is being dragged and the final index of that same DOM element when it is being dropped. With those two indexes, we can mirror the DOM changes into our VueJs array.

```js
bind (container, binding, vnode) {

    // Get the array of items to update.
    // E.g. this would be `chapters` if `v-dragdrop="chapters"`
    let items = binding.value || [];

    // Keep track of the last dragging index to do some reordering.
    let dragIndex;

    let drake = dragula([container])

        // When we drag an item, memorize its index.
        .on('drag', (el, source) => {
            dragIndex = findDomIndex(source, el);
        })

        // When we drop an item, reorder the array.
        .on('drop', (el, target) => {

            // Move the dragged and dropped item from `dragIndex` to the new index.
            move(items, dragIndex, findDomIndex(target, el));
        });
        
    addDrake(items, drake);
}
```

The above code uses the following helper methods.
* The `findDomIndex` method finds the index of a DOM element within a given DOM container.
* The `move` method moves an array item from one index to another. The given array is transformed, not returned.

### Step 4. Update the order attribute
So far when we drag&drop, our DOM is being correctly reordered (by Dragula) and our VueJS array is being correctly reordered (by us). One last thing missing from our implementation is the ability to update the `order` property of our chapters to match the new array order.

Implementing this is quite easy. We start a counter from 0 and go through the reordered array's items assigning and incrementing that counter.

```js
bind (container, binding, vnode) {

    // Get the `order` attribute if it exists.
    let orderProperty = vnode.data.attrs ? vnode.data.attrs.order : undefined;

    let items = binding.value || [];
    let dragIndex;

    let drake = dragula([container])
        .on('drag', (el, source) => {
            dragIndex = findDomIndex(source, el);
        })
        .on('drop', (el, target) => {
            move(items, dragIndex, findDomIndex(target, el));
            
            // If the container has a `order` attribute, use it to reorder them.
            if (orderProperty) {
                let newOrder = 0;
                array.forEach(items => { _.set(item, orderProperty, newOrder++) })
            }
        });
        
    addDrake(items, drake);
}
```

Note that I use lodash's `set` function here so we can provide a nested property via dot notation. In our chapter example, `order="order"` will update `chapter.order` whilst `order="meta.order"` will update `chapter.meta.order`.

## Conclusion

And that's it! Next time you need to reorder some array by dragging and dropping just pull that code in a directive and use it wherever you like.

If more control over dragula's options is needed (like adding a handle), one can easily use an `options` attribute (similarly to the `order` attribute) to register these options when instantiating Dragula.


<GithubButton url="https://github.com/lorisleiva/vue-lab/tree/master/directives/dragdrop" />
