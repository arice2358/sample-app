<template>
  <div>
    <div>{{ message }}</div>

    <a href="/.auth/login/aadb2c?post_login_redirect_uri=https://nice-wave-049615103.3.azurestaticapps.net/">Login</a>


    <div>{{ clientPrincipal }}</div>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "",
      clientPrincipal: ""
    };
  },
  async mounted() {
    const { text } = await (await fetch("/api/message")).json();
    this.message = text;

    const response = await fetch('/.auth/me');
    const payload = await response.json();
    this.clientPrincipal = payload;



  }
};
</script>