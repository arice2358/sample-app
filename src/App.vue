<template>
  <div>
    <div>{{ message }}</div>
    <a href="/.auth/login/aadb2c">Login Email</a>
    <a href="/.auth/login/profile">Edit Profile</a>
    <div>{{ clientPrincipal }}</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "",
      clientPrincipal: null
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