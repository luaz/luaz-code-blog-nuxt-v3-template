<script setup>
const util = useUtil()

// find all tags - useAsyncData for cache
const { data: tags } = await useAsyncData("tags", async () => {
  let tags = await queryContent().only(["tags"]).find()

  // create: { "python": 2, "javascript": 1, "string": 1, "file": 1, "hello-world": 1 }
  tags = tags.reduce(function(map, obj) {
      obj?.tags?.forEach(tag => {
        if (!map[tag])
          map[tag] = 0
        map[tag] += 1
      })
      return map;
  }, {});


  // sort by count
  tags = Object.fromEntries(
      Object.entries(tags).sort(([,a],[,b]) => b-a)
  );

  return tags
});

const type = 'tutorials'
const pageSize = 2
const query = { 
  path: '/tutorials', 
  only: ['title', 'description', 'date', 'tags', '_path', 'weight'],
  limit: pageSize, 
  sort: { weight: 1, date: -1} 
}

const { data: maxSize } = await useAsyncData(`max-${type}`, async () => {
  let items = await queryContent(`/${type}`).only('id').find()
  return items.length
})

const pagination = {
  length: Math.ceil(maxSize.value / pageSize),
  page: 1
}


</script>

<template>
  <div>
    <h1>Navigate</h1>
    <NuxtLink to="/tutorials/python/write-hello-world">Write Hello World</NuxtLink>

    <h1>Tags</h1>
    <ul>
      <li v-for="(value, key) in tags">
        <NuxtLink :to="`/tags/${key}`" >{{ key }}</NuxtLink> <span>[{{ value }}]</span>
      </li>
    </ul>

    <h1>All Tutorials</h1>
    <!-- path="/tutorials" -->
    <ContentList :query="query" >
      <template v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
          <h3><NuxtLink :to="article._path">{{ article.title }}</NuxtLink></h3>
          <p>[{{ util.formatDate(article.date) }}] ({{ article.weight }}) <span v-for="tag in article.tags">[{{ tag }}]</span> {{ article.description }}</p>
        </div>
      </template>

      <template #not-found>
        <p>No articles found.</p>
      </template>

    </ContentList>

    <NuxtLink v-if="pagination.length > 1" to="/tutorials">-- More Tutorials</NuxtLink>
  </div>
</template>