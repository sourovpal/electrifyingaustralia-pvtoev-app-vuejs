<script setup>
    // import { GoogleMap, Marker, Polyline, CustomMarker } from 'vue3-google-map';
    import { ref, onMounted, reactive, watchEffect, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import SearchBar from '../../components/SearchBar.vue';
    import L from 'leaflet';
    import 'leaflet.gridlayer.googlemutant';
    import "leaflet/dist/leaflet.css";
    import Hello from './Hello.vue';

    const route = useRoute();

    const map = ref();
    const googleMapRef = ref();
    const zoom = ref(10);
    const center = ref({ lat: 0, lon: 0 });
    const location = ref();

    function setLocation() {
        try {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        center.value = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }
                    },
                    (error) => {
                        console.error('Error getting geolocation:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        } catch (error) {
        }
    }

    var moveMarkerDevIcon = L.divIcon({
        className: 'marker',
        html:`
        <div style="width: 50px;height: 50px;background: rgb(255 255 255 / 30%);border-radius: 50%;display:flex;justify-content:center;align-items:center;">
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#ffffff"><path d="M480-80 310-250l57-57 73 73v-166h80v165l72-73 58 58L480-80ZM250-310 80-480l169-169 57 57-72 72h166v80H235l73 72-58 58Zm460 0-57-57 73-73H560v-80h165l-73-72 58-58 170 170-170 170ZM440-560v-166l-73 73-57-57 170-170 170 170-57 57-73-73v166h-80Z"/></svg>
        </div>
        `,
    });

    function initializeGoogleMap() {
        map.value = L.map(googleMapRef.value, {
            center: [center.value.lat, center.value.lon],
            zoom: zoom.value,
            zoomControl: false,
            attributionControl: false
        });

        L.gridLayer.googleMutant({ type: 'hybrid' }).addTo(map.value);
        L.control.zoom({ position: 'bottomleft' }).addTo(map.value);

        var moveMarker = L.marker([center.value.lat, center.value.lon], { icon: moveMarkerDevIcon, draggable: true }).addTo(map.value);

        watch(
            () => center.value,
            (position) => {
                var bounds = [[position.lat, position.lon], [position.lat-2, position.lon+2]];
                // L.rectangle(bounds, { color: "#ff7800", weight: 1, draggable:true }).addTo(map.value);
                // map.value.fitBounds(bounds);
                map.value.setView([position.lat, position.lon], map.value.getZoom());
                moveMarker.setLatLng([position.lat, position.lon]).update()
            },
            { deep: true }
        );

    }




    onMounted(() => {
        try {
            const { lat, lon } = route.query;
            if (lat && lon) {
                center.value = {
                    lat: Number(lat),
                    lon: Number(lon)
                }
                zoom.value = 19;
            } else {
                setLocation();
            }
        } catch (error) {
        }
        initializeGoogleMap();
    });






</script>

<template>
    <section class="map-design">
        <SearchBar />
        <div ref="googleMapRef"
            class="map">
        </div>
    </section>
</template>

<style lang="scss"
    scoped>
    .map-design {
        height: 100vh;
        background: rgb(255, 255, 255);
        margin-left: 4rem;
        display: flex;
        flex-direction: column;

        &:deep(.map) {
            width: 100%;
            flex-grow: 1;

            .leaflet-control-attribution,
            img[alt="Google"],
            .gmnoprint,
            .gm-style-cc {
                display: none !important;
            }
        }
    }
</style>