<template>
  <amplify-authenticator>
    <amplify-sign-out></amplify-sign-out>
    <amplify-sign-up
      slot="sign-up"
      username-alias="email"
      :form-fields.prop="formFields"
    ></amplify-sign-up>
  </amplify-authenticator>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      formFields: [
        { type: "email" },
        { type: "password" },
      ]
    }
  }
}
</script>