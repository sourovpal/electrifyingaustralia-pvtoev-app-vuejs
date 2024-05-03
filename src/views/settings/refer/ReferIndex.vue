<script>
export default {
  name:'AccountIndex',
    data() {
      return{
      }
    },
    components:{
    }
  }
  
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1>Refer a friend</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-9">
                    <div class="card pt-3 pb-2 px-3 d-flex flex-row justify-content-start align-items-center shadow-0 settings__item--wide">
                        <div class="mx-3">
                            <img src="https://app.getpylon.com/img/success-gems.png" style="width:120px;height:120px;">
                        </div> 
                        <div>
                            <div class="title mb-2">
                                Limited time referral bonus!
                            </div>
                            <p class="sub-title">Receive <strong>500 bonus credits</strong> for referring a friend... <br>
                                Or refer <strong>5 friends</strong> to receive our brand new official Pylon t-shirt! <br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div class="row">
                <div class="col-lg-6 col-12">
                    <div class="settings-group-header">
                        <h2 class="fw-initial">Earn free credits</h2>
                        <p class="sub-title">
                            Know someone who'd love to use Observer?
                            <br>
                            Invite them here and you'll both get 500 bonus credits the first time they purchase credits.
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-12"><br>
                    <div class="settings-group-item">
                        <input type="text" class="form-control">
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Send invitation</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12">
                    <div class="settings-group-header">
                        <h2 class="">Existing referrals</h2>
                        <p class="sub-title mt-2">You haven't sent any referrals yet.</p>
                    </div>
                </div>
                <div class="col-lg-8 col-12">
                    <table class="table table-bordered table-sm table-striped table-hover table-light">
                        <thead>
                            <tr>
                                <th class="fw-bold" scope="col">Username</th>
                                <th class="fw-bold" scope="col">Email</th>
                                <th class="fw-bold" scope="col">Created At</th>
                                <th class="fw-bold" scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.fw-initial{
    font-weight:inherit !important;
}
.settings__item--wide{
    background: #f2f5fa !important;
    border: 1px solid #007ee5 !important;
    margin-bottom: 1.5rem;
    .title{
        font-size:1.125rem;
        font-weight: bold;
        color: #007ee5;
    }
    .sub-title{
        color: #004680;
        font-size: .875rem;
        opacity: .87;
    }
}

</style>