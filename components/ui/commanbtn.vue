<template>
   <div>
    <button v-if="!link" :class="mode">
      <slot></slot>
    </button>
    <router-link v-else :class="mode" :to="to">
      <slot></slot>
    </router-link>
   </div>
</template>
<script>
export default {
  props:{
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>
<style>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #52004a;
  border: 1px solid #52004a;
  color: #deb50e;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  width: 100%;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #52004a;
  border-color: #52004a;
}

.flat {
  background-color: transparent;
  color: #52004a;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #52004a;
  color: #52004a;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
