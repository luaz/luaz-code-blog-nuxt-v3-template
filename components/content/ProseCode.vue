<template>
  <div class="prose-code">
    <slot />
  </div>

</template>

<style>
.prose-code {
  background-color: #f4f4f5;
  border: 1px solid #d4d4d8;
  border-radius: .5rem;
  margin: 32px 0;
}

.prose-code pre {
  margin: 0;
  line-height: 1.625;
  padding: 16px;
}

pre code .line {
  display: block;
  min-height: 1rem;
}
</style>