<script setup>
const util = useUtil()

const {
  params: { tag },
} = useRoute();
</script>

<template>
  <ArticleList :title="util.title(tag)" category="tutorials" :tag="tag"></ArticleList>
</template>