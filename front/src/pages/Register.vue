<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-12">
          <p class="text-weight-bold text-center text-h3">Register</p>
        </div>
        <div class="col-12">
          <q-input rounded outlined v-model="email" type="email" label="Email" />
        </div>
        <div class="col-12" style="margin-top: 25px">
          <q-input rounded outlined v-model="username" label="Username" />
        </div>
        <div class="col-12" style="margin-top: 25px">
          <q-input rounded outlined v-model="password" label="Password" :type="isPwd ? 'password' : 'text'" >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
              </template>
          </q-input>
        </div>
        <div class="col-12" style="margin-top: 25px">
          <q-input rounded outlined v-model="password2" label="Confirm Password" :type="isPwd ? 'password' : 'text'" >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
              </template>
          </q-input>
        </div>
        <div class="col-12" style="margin-top: 25px">
          <q-btn class="full-width" outline rounded color="primary" size="md" label="Creer mon compte" @click="register" />
        </div>
        <div class="col-12" style="margin-top: 25px">
          <p class="text-weight-bold">Vous avez deja un compte ? <router-link to='/Login'>Se connecter </router-link> </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      email: "",
      password: "",
      username: "",
      password2: "",
      isPwd: ref(true),
    }
  },
  methods: {
    async register() {
      const data = {
        user_username: this.username,
        user_password: this.password,
        user_email: this.email
      }
      const response = await this.$api.post('/user/register', data)
      console.log('RESPONSE : ',response);
      this.$q.notify('Votre compte a ete creer avec success !');
    }
  }
})
</script>
