<script>
    export default {

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
                        <form action="#" class="signin-form">
                            <div class="form-group">
                                <input type="text" class="login-form-control" placeholder="Username" required>
                            </div>
                            <div class="form-group">
                                <input id="password-field" type="password" class="login-form-control" placeholder="Password" required>
                                <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="login-form-control btn btn-primary submit px-3">Sign In</button>
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
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
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
  opacity: .5;
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
  margin-bottom:30px;
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