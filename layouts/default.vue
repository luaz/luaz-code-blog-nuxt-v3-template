<template>
  <div>
    <h1 class="site-title"><pre><NuxtLink to="/">Code Blog</NuxtLink></pre></h1>
    <hr />
    <slot />
    <hr />
    <ul>
      <li><NuxtLink to="/about">About Us</NuxtLink></li>
      <li><NuxtLink to="/tutorials">Tutorials</NuxtLink></li>
      <li><NuxtLink to="/posts">Posts</NuxtLink></li>
    </ul>
  </div>
</template>


<style>
.site-title a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}  


</style>