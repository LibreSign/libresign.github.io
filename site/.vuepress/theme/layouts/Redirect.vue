<template>
  <div>
    <p>Redirecting...</p>
  </div>
</template>

<script>
export default {
  mounted () {
    const redirect = this.$page.frontmatter.redirect
    if (redirect) {
      window.location.replace(redirect)
    }
  }
}
</script>
