<script setup>
</script>
<template>
    <div class="row">
        <div class="col-lg-3 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Preferences</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">

                <label class="form-label-title">Map base layer style</label>

                <input-text type="text"
                    class="form-control"
                    size="small" />

            </div>

            <div>

                <loading-button disabled="true">
                    Save Settings
                </loading-button>

            </div>
        </div>
    </div>
</template>