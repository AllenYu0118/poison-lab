<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>
