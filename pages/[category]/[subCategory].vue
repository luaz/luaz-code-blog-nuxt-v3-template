<script setup>
const util = useUtil()
const { path, params: { category, subCategory } } = useRoute();

const article = await queryContent().where({ _path: path }).findOne();
const isDoc = article._file
</script>

<template>
  <ArticleList v-if="!isDoc" :title="util.title(subCategory)" :category="category" :subCategory="subCategory"></ArticleList>
  <Article v-else></Article>
</template>