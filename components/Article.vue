<script setup>
const util = useUtil()
const { path, params: { category, slug } } = useRoute();

/*
const { data, pending } = await useAsyncData(`content-${path}`, async () => {
  const article = await queryContent().where({ _path: path }).findOne();
  return { 
    article: await article,
  }
})
 */
const article = await queryContent().where({ _path: path }).findOne();
console.log(article, path)
// const pending = false
// const data = { article }
</script>

<template>
  <main>
    <div>
      <NuxtLink :to="`/${category}`">{{ util.title(category) }}</NuxtLink> <span v-if="slug && slug.length > 1">/ <NuxtLink :to="`/${category}/${slug[0]}`">{{ util.title(slug[0]) }}</NuxtLink></span>
      <h1>{{ article.title }}</h1>
      <blockquote v-if="article.description">{{ article.description }}</blockquote>
      <div v-if="article.date">{{ util.formatDate(article.date) }}</div>
      <ul>
        <li v-for="tag in article.tags"><NuxtLink :to="`/tags/${tag}`">{{ tag }}</NuxtLink></li>
      </ul>
      <ContentDoc :value="article" class="article" /> 
    </div>
  </main>
</template>

<style>
.article h2 a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}   
</style>