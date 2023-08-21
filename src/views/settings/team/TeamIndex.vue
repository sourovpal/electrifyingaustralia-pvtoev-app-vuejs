<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'AccountIndex',
    data() {
      return{
      }
    },
    components:{
        vueCustomScrollbar,
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>Team members</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-sm table-striped- table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="35%" scope="col">Team member</th>
                                <th class="fw-bold" width="15%" scope="col">Role</th>
                                <th class="fw-bold" width="10%" scope="col">CRM seat</th>
                                <th class="fw-bold" width="10%" scope="col">CRM user type</th>
                                <th class="fw-bold" width="15%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://www.gravatar.com/avatar/ff67065d71fc7f9f2b21ec06db77aa06?s=64&d=mp&r=PG" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary w-75 px-3 d-inline-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Admin</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://static.getpylon.com/images/users/aNthsNkQYNUeydQXSizygmYmv4NJPqTyLIPxNDXD.jpg.png" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary px-3 w-75 d-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Super User</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://www.gravatar.com/avatar/ff67065d71fc7f9f2b21ec06db77aa06?s=64&d=mp&r=PG" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary w-75 px-3 d-inline-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Admin</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://static.getpylon.com/images/users/aNthsNkQYNUeydQXSizygmYmv4NJPqTyLIPxNDXD.jpg.png" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary px-3 w-75 d-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Super User</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://www.gravatar.com/avatar/ff67065d71fc7f9f2b21ec06db77aa06?s=64&d=mp&r=PG" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary w-75 px-3 d-inline-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Admin</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://static.getpylon.com/images/users/aNthsNkQYNUeydQXSizygmYmv4NJPqTyLIPxNDXD.jpg.png" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary px-3 w-75 d-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Super User</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://www.gravatar.com/avatar/ff67065d71fc7f9f2b21ec06db77aa06?s=64&d=mp&r=PG" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary w-75 px-3 d-inline-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Admin</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://static.getpylon.com/images/users/aNthsNkQYNUeydQXSizygmYmv4NJPqTyLIPxNDXD.jpg.png" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary px-3 w-75 d-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Super User</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://www.gravatar.com/avatar/ff67065d71fc7f9f2b21ec06db77aa06?s=64&d=mp&r=PG" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary w-75 px-3 d-inline-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Admin</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="member-info">
                                    <img class="avatar" src="https://static.getpylon.com/images/users/aNthsNkQYNUeydQXSizygmYmv4NJPqTyLIPxNDXD.jpg.png" alt="">
                                    <div class="text">
                                        <span class="member-name">Bijoy Chowdhury</span> 
                                        <span class="member-email">admin@electrifyingaustralia.com.au</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="btn btn-secondary px-3 w-75 d-flex jsutify-content-center align-items-center">
                                        <svg class="me-1" fill="#00467f" width="18" height="18" viewBox="0 0 24 24"><path  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                        <span class="fw-bold fs-12px"> Super User</span>
                                    </span>
                                </td>
                                <td>
                                    <div class="toggle toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                                        <div class="toggle-slider">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fs-14px">Full access</span>
                                </td>
                                <td class="text-end">
                                    <a class="btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M400-485q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM80-164v-94q0-35 17.5-63t50.5-43q72-32 133.5-46T400-424h23q-6 14-9 27.5t-5 32.5h-9q-58 0-113.5 12.5T172-310q-16 8-24 22.5t-8 29.5v34h269q5 18 12 32.5t17 27.5H80Zm587 44-10-66q-17-5-34.5-14.5T593-222l-55 12-25-42 47-44q-2-9-2-25t2-25l-47-44 25-42 55 12q12-12 29.5-21.5T657-456l10-66h54l10 66q17 5 34.5 14.5T795-420l55-12 25 42-47 44q2 9 2 25t-2 25l47 44-25 42-55-12q-12 12-29.5 21.5T731-186l-10 66h-54Zm27-121q36 0 58-22t22-58q0-36-22-58t-58-22q-36 0-58 22t-22 58q0 36 22 58t58 22ZM400-545q39 0 64.5-25.5T490-635q0-39-25.5-64.5T400-725q-39 0-64.5 25.5T310-635q0 39 25.5 64.5T400-545Zm0-90Zm9 411Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-12 mt-3">
                    <a class="btn btn-primary fw-bold" href="">Add new installer</a>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.member-info{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    .avatar{
        width: 36px;
        height: 36px;
        border-radius:50%;
    }
    .text{
        margin-left :8px ;
        line-height: 18px;
        font-size:13px;
        .member-name{
            display: block;
            line-height: 1.25;
        }
        .member-email{
            display: block;
            color: #616e7c;
            line-height: 1.25;
        }
    }
}
.toggle{
    position: relative;
    display: inline-block;
    width: 2.625rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    background-color: #cbd2d9;
    cursor: pointer;
    &.toggle-active{
        background-color: #007ee5;
        .toggle-slider{
            transform: translateX(1.125rem);
            svg {
                opacity: 1 !important;
            }
        } 
    }
    .toggle-slider{
        position: absolute;
        top: 0.1875rem;
        left: 0.1875rem;
        width: 1.125rem;
        height: 1.125rem;
        background-color: #fff;
        border-radius: 50%;
        transition: -webkit-transform .2s ease;
        transition: transform .2s ease;
        transition: transform .2s ease,-webkit-transform .2s ease;
        svg {
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.content{
    .content-header{
        margin-top: 1.5rem;
        margin-bottom: 3rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        line-height: 1.1;
        h1{
            height: 2rem;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 1.5rem;
            color: #1f2933;
            line-height: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-weight: 600;
        }
    }
    .content-body{
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

}

</style>