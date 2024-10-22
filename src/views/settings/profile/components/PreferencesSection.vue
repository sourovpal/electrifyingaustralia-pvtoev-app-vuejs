<script setup>
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Preferences</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Map base layer style</label>
                <div class="select-box">
                    <select class="form-control">
                        <option value="">Select Options</option>
                        <option value="">Select Options</option>
                        <option value="">Select Options</option>
                    </select>
                </div>
            </div>

            <div>
                <loading-button disabled="true">
                    Save Settings
                </loading-button>
            </div>
        </div>
    </div>
</template>