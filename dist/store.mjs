class t{constructor(t,s){this.namespace=t,this.storage=s}setState(t){t?(this.storage.setItem(`${this.namespace}:state`,"string"==typeof t?t:JSON.stringify(t)),this.storage.setItem(`${this.namespace}:lastUpdated`,(new Date).getTime().toString())):this.removeState()}getState(){const t=this.storage.getItem(`${this.namespace}:state`);return t?JSON.parse(t):void 0}lastUpdated(){const t=this.storage.getItem(`${this.namespace}:lastUpdated`);return t?parseInt(t,10):void 0}removeState(){this.storage.removeItem(`${this.namespace}:state`),this.storage.removeItem(`${this.namespace}:lastUpdated`)}}class s{constructor(t){const s=this;s.actions={},s.state={},s.getterCache={},s.status="resting",s.transaction=!1,s.transactionCache={},s.callbacks=[],t.actions&&(s.actions=t.actions);let e=t.initialState||{};if(s.copyOfInitialState=s._copyValue(e),s.ttl=-1,s.lastUpdatedState={},t.ttl&&(s.ttl=t.ttl,Object.keys(s.copyOfInitialState).forEach((t=>s.lastUpdatedState[t]=(new Date).getTime()))),t.persist){s.persist="string"==typeof t.persist?createPersist(t.persist):t.persist;const a=s.persist.getState(),i=s.persist.lastUpdated();a&&i&&(-1===s.ttl||s._lastUpdatedTimeDiff(i)<s.ttl)&&(e=a)}this._processState(e)}_processState(t){const s=this;s.state=new Proxy(t,{set:(t,e,a)=>(s.transaction&&!s.transactionCache[e]&&(s.transactionCache[e]=s._copyValue(t[e])),t[e]=a,s.lastUpdatedState[e]=(new Date).getTime(),s.getterCache={},s.transaction||(s.persist&&s.persist.setState(s.state),s.status="resting",s._processCallbacks(s.state)),!0),get:(t,e)=>s.ttl>-1&&s._lastUpdatedTimeDiff(s.lastUpdatedState[e])>s.ttl?(s.persist&&s.persist.removeState(),s.copyOfInitialState[e]):t[e]})}_lastUpdatedTimeDiff(t){return Math.round(((new Date).getTime()-t)/1e3)}dispatch(t,s){return"function"!=typeof this.actions[t]?(console.error(`Dude, the store action "${t}" doesn't exist.`),!1):(this.status="action",this.actions[t](this,s))}setState(t){const setter=t=>{if(!t||"object"!=typeof t)return;const s=this.transaction;s||this.begin();for(const s in t)this.state[s]&&this.state[s]===t[s]||(this.state[s]=t[s]);s||this.end()},s=t(this.state);var e;"object"!=typeof(e=s)&&"function"!=typeof e||"function"!=typeof e.then?setter(s):s.then(setter)}getState(t){if(t){if(!this.getterCache[t]){const s=(Array.isArray(t)?t:t.match(/([^[.\]])+/g)).reduce(((t,s)=>t&&t[s]),this.state);if(null==s)return;this.getterCache[t]=s}return this.getterCache[t]}}_processCallbacks(t){return!!this.callbacks.length&&(this.callbacks.forEach((s=>s(t))),!0)}subscribe(t){if("function"!=typeof t)return console.error("Dude, you can only subscribe to store changes with a valid function"),!1;return this.callbacks.push(t),()=>{this.callbacks=this.callbacks.filter((s=>s!==t))}}_copyValue(t){return JSON.parse(JSON.stringify(t))}begin(){this.transactionCache={},this.transaction=!0}end(){this.transaction=!1,this.persist&&this.persist.setState(this.state),this._processCallbacks(this.state)}rollback(){Object.keys(this.transactionCache).forEach((t=>this.state[t]=this.transactionCache[t])),this.end()}clear(t=!0){this.getterCache={},this.transactionCache={},this.lastUpdatedState={},this.persist&&this.persist.removeState(),this.transaction=!0,this.status="clear";const s=this._copyValue(this.copyOfInitialState);for(const t in s)this.state[t]=s[t];this.transaction=!1,this.status="resting",t&&this._processCallbacks(this.state)}}function createStore(t,e){const a=new s(e);return globalThis.__ficusjs__=globalThis.__ficusjs__||{},globalThis.__ficusjs__.store=globalThis.__ficusjs__.store||{},globalThis.__ficusjs__.store[t]=a,a}function createPersist(s,e="session"){return new t(s,"local"===e?globalThis.localStorage:globalThis.sessionStorage)}function getStore(t){if(globalThis.__ficusjs__&&globalThis.__ficusjs__.store&&globalThis.__ficusjs__.store[t])return globalThis.__ficusjs__.store[t]}export{createPersist,createStore,getStore};
