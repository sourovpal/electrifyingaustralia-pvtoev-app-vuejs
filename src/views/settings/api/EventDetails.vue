<script>
    import JsonViewer from 'vue-json-viewer';

    export default {
        name: 'AccountIndex',
        data() {
            return {
                sample: {
                    total: 25,
                    limit: 10,
                    skip: 0,
                    links: {
                        previous: undefined,
                        next: function () { },
                    },
                    data: [
                        {
                            id: '5968fcad629fa84ab65a5247',
                            firstname: 'Ada',
                            lastname: 'Lovelace',
                            awards: null,
                            known: [
                                'mathematics',
                                'computing'
                            ],
                            position: {
                                lat: 44.563836,
                                lng: 6.495139,
                                awards: [
                                    'Defense Distinguished Service Medal',
                                    'Legion of Merit',
                                    'Meritorious Service Medal',
                                    'American Campaign Medal',
                                    'World War II Victory Medal',
                                    'National Defense Service Medal',
                                    'Armed Forces Reserve Medal',
                                    'Naval Reserve Medal',
                                    'Presidential Medal of Freedom',
                                    {
                                        awards: [
                                            'Defense Distinguished Service Medal',
                                            'Legion of Merit',
                                            'Meritorious Service Medal',
                                            'American Campaign Medal',
                                            'World War II Victory Medal',
                                            'National Defense Service Medal',
                                            'Armed Forces Reserve Medal',
                                            'Naval Reserve Medal',
                                            'Presidential Medal of Freedom'
                                        ],
                                    }

                                ],
                            },
                            description: `Augusta Ada King, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer,
                    chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer,
                    the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation,
                    and published the first algorithm intended to be carried out by such a machine.
                    As a result, she is sometimes regarded as the first to recognise the full potential of a "computing machine" and the first computer programmer.`,
                            bornAt: '1815-12-10T00:00:00.000Z',
                            diedAt: '1852-11-27T00:00:00.000Z'
                        }, {
                            id: '5968fcad629fa84ab65a5246',
                            firstname: 'Grace',
                            lastname: 'Hopper',
                            awards: [
                                'Defense Distinguished Service Medal',
                                'Legion of Merit',
                                'Meritorious Service Medal',
                                'American Campaign Medal',
                                'World War II Victory Medal',
                                'National Defense Service Medal',
                                'Armed Forces Reserve Medal',
                                'Naval Reserve Medal',
                                'Presidential Medal of Freedom',
                            ],
                            known: null,
                            position: {
                                lat: 43.614624,
                                lng: 3.879995
                            },
                            description: `Grace Brewster Murray Hopper (née Murray; December 9, 1906 – January 1, 1992)
                    was an American computer scientist and United States Navy rear admiral.
                    One of the first programmers of the Harvard Mark I computer,
                    she was a pioneer of computer programming who invented one of the first compiler related tools.
                    She popularized the idea of machine-independent programming languages, which led to the development of COBOL,
                    an early high-level programming language still in use today.`,
                            bornAt: '1815-12-10T00:00:00.000Z',
                            diedAt: '1852-11-27T00:00:00.000Z'
                        }
                    ]
                }
            }
        },
        components: {
            JsonViewer
        }
    }

</script>

<template>

    <section class="content">

        <div class="content-header d-flex justify-content-start align-items-center">
            <router-link to="/settings/api">
                <h1 class="mb-0">API settings</h1>
            </router-link>
            <div class="mx-2">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                    <path fill="none"
                        d="M0 0h24v24H0V0z"></path>
                </svg>
            </div>
            <router-link to="/settings/api/event-logs">
                <h1 class="mb-0">Event Logs</h1>
            </router-link>
            <div class="mx-2">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                    <path fill="none"
                        d="M0 0h24v24H0V0z"></path>
                </svg>
            </div>
            <h1 class="mb-0">Event Details</h1>
        </div>
        <div class="content-body">
            <section class="">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card shadow-1">
                            <div class="card-header">
                                <h4 class="mb-0 text-muted fs-14px fw-bold">Event data</h4>
                            </div>
                            <div class="card-body p-0 mb-3"
                                style="height: calc(100vh - 180px);">
                                <json-viewer :value="sample"
                                    :expand-depth="10"></json-viewer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </section>

</template>

<style lang="scss"
    scoped>
    .card {
        border-radius: 3px !important;

        &.shadow-1 {
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px !important;

        }

        .card-body {
            border-radius: 3px !important;

            .card-header {
                border-bottom: 1px solid #f3f3f3 !important;
            }
        }
    }
</style>