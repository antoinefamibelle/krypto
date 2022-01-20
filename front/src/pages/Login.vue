<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-12">
          <p class="text-weight-bold text-center text-h3">Login</p>
        </div>
        <div class="col-12">
          <q-input rounded outlined v-model="email" label="Email or Username" />
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
          <q-btn class="full-width" outline rounded color="primary" size="md" label="Login" @click="login" />
        </div>
          <div class="col-12" style="margin-top: 25px">
          <p class="text-weight-bold">Vous n'avez pas de compte ? <router-link to='/Register'>Creer un compte </router-link> </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      isPwd: ref(true)
    }
  },
  methods: {
    async login() {
      if (!this.email && !this.password) {
        this.$q.notify('Tout les champs sont obligatoires');
        return;
      }
      const response = await this.$api.post('/user/login', {user_email: this.email, user_password: this.password});
      this.$router.push('/')
      this.$q.notify(`Bienvenue ${response.data.data[0].user_email}`);
    }
  }
})
</script>
