<script setup>
definePageMeta({
  path: '/:category(tutorials|posts)'
})

const util = useUtil()
const {
  params: { category },
} = useRoute();
</script>

<template>
  <ArticleList :title="util.title(category)" :category="category" :page="1" :path="`/${category}`"></ArticleList>
</template>