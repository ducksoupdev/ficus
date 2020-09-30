import { createComponent } from 'https://unpkg.com/ficusjs?module'
import { render as renderer, html } from 'https://unpkg.com/lit-html?module'
import { store } from './store.js'
import { router } from './router.js'

createComponent('todo-footer', {
  store,
  renderer,
  handleClick (e) {
    e.preventDefault()
    router.push(e.target.getAttribute('href'))
  },
  render () {
    if (!this.store.state.todos || this.store.state.todos.length === 0) {
      return ''
    }
    return html`<footer class="footer">
    <todo-items-left></todo-items-left>
    <ul class="filters">
     <li><a href="/" @click="${this.handleClick}">All</a></li>
     <li><a href="/active" @click="${this.handleClick}">Active</a></li>
     <li><a href="/completed" @click="${this.handleClick}">Completed</a></li>
    </ul>
    <todo-footer-clear></todo-footer-clear>
   </footer>`
  }
})

createComponent('todo-items-left', {
  store,
  renderer,
  render () {
    return html`<span class="todo-count"><strong>${this.store.getters.itemsLeft}</strong> item${this.store.getters.itemsLeft !== 1 ? 's' : ''} left</span>`
  }
})

createComponent('todo-footer-clear', {
  store,
  renderer,
  clearCompleted () {
    this.store.dispatch('clearCompleted')
  },
  render () {
    if (!this.store.getters.completedCount) {
      return ''
    }
    return html`<button class="clear-completed" @click=${this.clearCompleted}>Clear completed</button>`
  }
})