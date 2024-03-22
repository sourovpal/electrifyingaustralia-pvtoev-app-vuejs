<script>
  import {LoginAction} from '../../actions/AuthAction';
  export default {
    data() {
      return {
        username:'sourovpal35@gmail.com',
        password:'12345678',
        errors:{},
        isSubmit:false,
      }
    },
    methods: {
      async submitLoginForm(e){
        e.preventDefault();
        if(this.isSubmit){
          return false;
        }
        this.isSubmit = true;
        try{
          
          const res = await LoginAction({
            username:this.username,
            password:this.password,
          });
          if(res){
            try{
              const {user, access_token, company, app} = res;

              this.$cookies.remove(import.meta.env.VITE_AUTH_USER, '/');
              this.$cookies.remove(import.meta.env.VITE_AUTH_COMPANY, '/');
              this.$cookies.remove(import.meta.env.VITE_AUTH_TOKEN, '/');
              this.$cookies.remove(import.meta.env.VITE_AUTH_APP, '/');

              this.$cookies.set(import.meta.env.VITE_AUTH_USER, user);
              this.$cookies.set(import.meta.env.VITE_AUTH_COMPANY, company);
              this.$cookies.set(import.meta.env.VITE_AUTH_TOKEN, (access_token.token));
              if(app){
                this.$cookies.set(import.meta.env.VITE_AUTH_APP, app);
              }
              
            }catch(e){}
            
            try{

              this.$toast[res.message.type](res.message.text);
              if(res.message.redirect_url){
                  window.location.replace(res.message.redirect_url);
                  return false;
              }else{
                  window.location.replace('/app');
                  return false;
              }
            }catch(e){
            }
          }
        }catch(error){

          try{
            var data = error.response.data;
            this.errors = data.errors;
          }catch(e){}

          try{
            var data = error.response.data.message;
            this.$toast[data.type](data.text);
          }catch(e){
            this.$toast.error('Oops, something went wrong');
          }
          
        }finally{
          this.isSubmit = false;
        }
        return false;
      }
    },
  }
</script>

<template>
    <div class="body-img" style="background-image: url(https://images.pexels.com/photos/2800845/pexels-photo-2800845.jpeg);">
        <section class="login-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6 text-center mb-5 mt-5 pt-5">
                        <h2 class="heading-section">Electrifying Australia</h2>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-6 col-lg-4">
                        <div class="login-wrap p-0">
                        <form @submit.prevent="submitLoginForm" method="post" class="signin-form">
                            <div class="form-group mb-3">
                                <input @focus="delete errors?.username" v-model="username" type="text" class="login-form-control" placeholder="Username or Email Address">
                                <span class="text-center fs-14px text-danger py-1 w-100 d-block" v-if="errors?.username?.length">{{ errors?.username[0] }}</span>
                              </div>
                              <div class="form-group mb-3">
                                <input @focus="delete errors?.password" v-model="password" id="password-field" type="password" class="login-form-control" placeholder="Password">
                                <span class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                <span class="text-center fs-14px text-danger py-1 w-100 d-block" v-if="errors?.password?.length">{{ errors?.password[0] }}</span>
                            </div>
                            <div class="form-group">
                              <button :disabled="isSubmit" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                                <div v-if="isSubmit">
                                  <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;">
                                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                  </svg>
                                  <span>Loading...</span>
                                </div>
                                <span v-if="!isSubmit">Sign In</span>
                              </button>
                            </div>
                            <div class="form-group d-md-flex">
                                <div class="w-50">
                                    <label class="checkbox-wrap checkbox-primary">Remember Me
                                    <input type="checkbox" checked>
                                    <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="w-50 text-md-right">
                                    <a href="#" style="color: #fff">Forgot Password</a>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="w-100 text-left">
                                  <span>Don't have an account ? <router-link to="/register" style="color: #1662ee">Sign Up.</router-link></span>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.body-img {
  font-family: "Lato", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.8;
  font-weight: normal;
  color: gray;
  position: relative;
  z-index: 0;
  padding: 0;
}
.body-img:after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: #000;
  opacity: .7;
  z-index: -1;
}
a {
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease;
  color: #fbceb5;
}
a:hover, a:focus {
  text-decoration: none !important;
  outline: none !important;
  -webkit-box-shadow: none;
  box-shadow: none;
}
h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5 {
  line-height: 1.5;
  font-weight: 400;
  font-family: "Lato", Arial, sans-serif;
  color: #000;
}
.bg-primary {
  background: #fbceb5 !important;
}
.login-section {
  padding: 7em 0;
  height: 100vh;
}
.heading-section {
  font-size: 28px;
  color: #fff;
}
.body-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.login-wrap {
  position: relative;
  color: rgba(255, 255, 255, 0.9);
}
.login-wrap h3 {
  font-weight: 300;
  color: #fff;
}
.login-wrap .social {
  width: 100%;
}
.login-wrap .social a {
  width: 100%;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #000;
  background: #fff;
}
.login-wrap .social a:hover {
  background: #000;
  color: #fff;
  border-color: #000;
}
.form-group {
  position: relative;
}
.field-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.9);
}
.login-form-control {
  background: transparent;
  border: none;
  height: 50px;
  color: white !important;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  width: 100%;
}
@media (prefers-reduced-motion: reduce) {
  .login-form-control {
      -webkit-transition: none;
      -o-transition: none;
      transition: none;
 }
}
.login-form-control::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8) !important;
}
.login-form-control::-moz-placeholder {
  color: rgba(255, 255, 255, 0.8) !important;
}
.login-form-control:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8) !important;
}
.login-form-control:-moz-placeholder {
  color: rgba(255, 255, 255, 0.8) !important;
}
.login-form-control:hover, .login-form-control:focus {
  background: transparent;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-color: rgba(255, 255, 255, 0.4);
}
.login-form-control:focus {
  border-color: rgba(255, 255, 255, 0.4);
}
textarea.login-form-control {
  height: inherit !important;
}
.checkbox-wrap {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-wrap input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
}
.checkmark:after {
  content: "\f0c8";
  font-family: "FontAwesome";
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 20px;
  margin-top: -4px;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
@media (prefers-reduced-motion: reduce) {
  .checkmark:after {
      -webkit-transition: none;
      -o-transition: none;
      transition: none;
 }
}
.checkbox-wrap input:checked ~ .checkmark:after {
  display: block;
  content: "\f14a";
  font-family: "FontAwesome";
  color: rgba(0, 0, 0, 0.2);
}
.checkbox-primary {
  color: #fbceb5;
}
.checkbox-primary input:checked ~ .checkmark:after {
  color: #fbceb5;
}
.btn {
  cursor: pointer;
  border-radius: 40px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  font-size: 15px;
  text-transform: uppercase;
}
.btn:hover, .btn:active, .btn:focus {
  outline: none;
}
.btn.btn-primary {
  background: #fbceb5 !important;
  border: 1px solid #fbceb5 !important;
  color: #000 !important;
}
.btn.btn-primary:hover {
  border: 1px solid #fbceb5;
  background: transparent;
  color: #fbceb5;
}
.btn.btn-primary.btn-outline-primary {
  border: 1px solid #fbceb5;
  background: transparent;
  color: #fbceb5;
}
.btn.btn-primary.btn-outline-primary:hover {
  border: 1px solid transparent;
  background: #fbceb5;
  color: #fff;
}

</style>