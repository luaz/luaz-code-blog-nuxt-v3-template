<script setup>
const util = useUtil()
const {
  params: { category, page },
} = useRoute();
</script>

<template>
  <ArticleList v-if="!isDoc" :title="util.title(category)" :category="category" :page="parseInt(page)" :path="`/${category}`"></ArticleList>
</template>