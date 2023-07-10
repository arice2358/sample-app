<template>
  <div>
    <div>{{ message }}</div>
    <ul>
      <li><a href="/.auth/login/aadb2c">Login Email</a></li>
      <li><a
          href="https://sampleb2corg.b2clogin.com/sampleB2Corg.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_profile&client_id=9c188c62-253a-4795-8eb7-606f17ce5993&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fnice-wave-049615103.3.azurestaticapps.net%2F.auth%2Flogin%2Faadb2c%2Fcallback&scope=openid&response_type=code">Edit
          Profile</a></li>
      <li>
        <button type="button" id="signIn" onclick="signIn()">Sign-in</button>
      </li>
    </ul>
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