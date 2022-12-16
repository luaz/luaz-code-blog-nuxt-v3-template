<script setup>
const props = defineProps({
  title: String,
  page: Number, 
  category: String,
  subCategory: String,
  tag: String,
  path: String

})
const util = useUtil()

useHead({
  title: props.page == 1 ? props.title : `${props.title} - Page ${props.page}`
})

const pageSize = props.page ? 2 : 1000 // if no page, list all
const query = { 
  path: props.subCategory ? `/${props.category}/${props.subCategory}` : `/${props.category}`, 
  only: ['title', 'description', 'date', 'tags', '_path'],
  limit: pageSize, 
  skip: (props.page-1)*pageSize, 
  sort: { weight: 1, date: -1} 
}

if (props.tag) {
  query.where = {
    tags: {
      $contains: [props.tag],
    },
  }
}

const { data: maxSize } = await useAsyncData(props.subCategory ? `max-${props.category}-${props.subCategory}` : `max-${props.category}`, async () => {
  let items = await queryContent(query.path).only('id').find()
  return items.length
})

const pagination = computed(() => {
  return {
    length: Math.ceil(maxSize.value / pageSize),
    page: props.page
  }
})
</script>

<template>
  <div>
    <h1>{{ title }}</h1>

    <ContentList :query="query" >
      <template v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
          <h3><NuxtLink :to="article._path">{{ article.title }}</NuxtLink></h3>
          <p>[{{ util.formatDate(article.date) }}] <span v-for="tag in article.tags">[{{ tag }}]</span> {{ article.description }}</p>
        </div>
      </template>

      <template #not-found>
        <p>No articles found.</p>
      </template>

    </ContentList>   

    <ul v-if="pagination.length > 1">
      <li v-for="page in pagination.length">
        <NuxtLink :to="page == 1 ? path : `${path}/page/${page}`">Page {{ page }}</NuxtLink> <span v-if="pagination.page == page">[current]</span>
      </li>
    </ul> 
  </div>
</template>