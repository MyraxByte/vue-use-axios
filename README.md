# Vue useAxios
📦 this package allows [Axios](https://github.com/axios/axios) to be used in the [Composition API](https://composition-api.vuejs.org/#code-organization) for [vue@next](https://v3.vuejs.org/)

## Install
*required vue 3.0.0 or higher*
```bash
npm i vue-use-axios

yarn add vue-use-axios  
```

## Usage

### Common usage
```html
<template>
  <div>
    <strong>loading: {{ (state.requested && !state.finished && !state.canceled) ? 'true' : 'false' }}</strong>
    <button>Load posts</button>

    <div class="posts">
      <div class="post-item" v-for="(item, i) of state.payload" :key="i">
        <span> {{ item }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useAxios } from 'vue-use-axios';

export default {
  name: 'app',
  setup() {
    // get state and request method
    const { state, get } = useAxios('/path/to/posts');

    // run get request from /api/posts on submit
    const onSubmit = async () => {
      await get();
    }

    ...

    return {
      onSubmit,
      state,
      ...
    }
  },
}
</script>
```
### Options

useAxios() support config from Axios
**example:**
```js
import { useAxios } from 'vue-use-axios';

const { state } = useAxios('/path/to/url', {
  headers: {
    'content-type': 'application/json',
    ...
  }
})

```


### State properties
state contains the status about the current instance
```js
const state = {
  url, // instance url
  payload,  // payload data
  requested,  // request is running
  finished, // request success finished
  canceled, // request canceled with erorrs
  errorMessage, // request error message
}
```

## More examples

### One state for requests from instance
*all requests async/await*
```js
import { useAxios } from 'vue-use-axios';

const posts = useAxios('path/to/posts');

// Get Posts
posts.get()
console.log(posts.state.payload) // ['post-1', 'post-2'...]

// Create post
posts.post('Hello World!')
console.log(posts.state.payload) // ['Hello World!', 'post-1', 'post-2' ...]

// Delete post
posts.delete(1) // /:post-id
console.log(posts.state.payload) // ['Hello World!', 'post-2' ...]

...

```