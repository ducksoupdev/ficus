---
layout: doc.hbs
title: FicusJS documentation - Extending components
---
# Extending components

FicusJS provides a set of functions for extending components.

You can also write your own functions.

## `withStore` function

The `withStore` function extends a component and makes working with stores easier in component rendering, computed getters and methods.

```js
import { createComponent, withStore } from 'https://unpkg.com/ficusjs?module'

// import the renderer and html tagged template literal from the lit-html library
import { render as renderer, html } from 'https://unpkg.com/lit-html?module'

// import a single store or object of stores from a local file
import { store } from './store.js'

createComponent(
  'my-component',
  withStore(store, {
    renderer,
    props: {
      personName: {
        type: String,
        required: true
      }
    },
    render () {
      return html`
        <p>
          ${this.store.state.greeting}, there! My name is ${this.props.personName}
        </p>
      `
    }
  })
)
```

The `withStore` function provides a `this.store` property within the component.
It also makes the component reactive to store changes as well as handling automatic store subscriptions based on the component lifecycle hooks.
It will also refresh computed getters when store state changes.

## `withEventBus` function

The `withEventBus` function extends a component and makes working with an event bus easier in component methods.

```js
import { createComponent, withEventBus } from 'https://unpkg.com/ficusjs?module'

// import the renderer and html tagged template literal from the lit-html library
import { render as renderer, html } from 'https://unpkg.com/lit-html?module'

// import an event bus from a local file
import { eventBus } from './event-bus.js'

createComponent(
  'my-component',
  withEventBus(eventBus, {
    renderer,
    buttonClicked () {
      this.eventBus.publish('increment', undefined)
    },
    render () {
      return html`<button type="button" @click=${this.buttonClicked}>Increment</button>`
    }
  })
)
```

The `withEventBus` function provides a `this.eventBus` property within the component.
It handles automatic event bus subscription based on the component lifecycle hooks.

## `withStateTransactions` function

The `withStateTransactions` function extends a component with transactions so multiple state changes can occur without triggering a re-render.

```js
import { createComponent, withStateTransactions } from 'https://unpkg.com/ficusjs?module'

// import the renderer and html tagged template literal from the lit-html library
import { render as renderer, html } from 'https://unpkg.com/lit-html?module'

createComponent(
  'my-like-component',
  withStateTransactions({
    renderer,
    state () {
      return { count: 0, message: null, status: 'unliked' }
    },
    like () {
      // start a transaction
      this.beginTransaction()

      // change some state
      this.state.count = this.state.count + 1
      this.state.message = 'Thanks for liking this!'

      // save the like to the server
      window.fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: this.state.count, updatedBy: 'Jane Doe' })
      })
      .then(res => res.json())
      .then(data => {
        this.state.status = 'liked'
        this.endTransaction()
      })
      .catch(err => {
        this.rollbackTransaction()
        this.state.status = 'error'
      })
    },
    render () {
      if (this.state.status === 'liked') {
         return html`<p>${this.state.message}</p>`
      }
      return html`<button type="button" @click=${this.like}>Like</button>`
    }
  })
)
```

A transaction is a sequence of operations performed on state as a single logical unit of work.
The transaction can be either all committed (applied to state) or all rolled back (undone from state).

### `beginTransaction` method

The `beginTransaction` method starts a transaction.

### `endTransaction` method

The `endTransaction` method ends the transaction and triggers a component render.

### `rollbackTransaction` method

The `rollbackTransaction` method rolls back the state changes carried out within the transaction.
This is used if an error occurs, and the state needs to be reset.