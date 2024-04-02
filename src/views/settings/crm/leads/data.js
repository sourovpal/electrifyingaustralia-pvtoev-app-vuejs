const datatypeList = [
    {
        id:'free_text',
        data_type:'Free Text',
        html_tag:'input',
        attributes:{
            type:'text',
            value:'',
        }
    },
    {
        id:'multiline_free_text',
        data_type:'Multiline Free Text',
        html_tag:'textarea',
        attributes:{
            type:'text',
            value:'',
        }
    },
    {
        id:'yes_or_no',
        data_type:'Yes or No',
        html_tag:'input',
        attributes:{
            type:'checkbox',
            value:'',
        }
    },
    {
        id:'date',
        data_type:'Date',
        html_tag:'input',
        attributes:{
            type:'date',
            value:'',
        }
    },
    {
        id:'date_and_time',
        data_type:'Date and Time',
        html_tag:'input',
        attributes:{
            type:'datetime',
            value:'',
        }
    },
    {
        id:'single_choice',
        data_type:'Single Choice',
        html_tag:'select',
        attributes:{
            type:'text',
            values:[], // {label:'', value:''}
        }
    },
    {
        id:'multiple_choice',
        data_type:'Multiple Choice',
        html_tag:'select',
        attributes:{
            type:'text',
            multiple:true,
            values:[], // {label:'', value:''}
        }
    },
    {
        id:'real_number',
        data_type:'Real Number',
        html_tag:'input',
        attributes:{
            type:'number',
            value:'',
        }
    },
    {
        id:'read_only',
        data_type:'Read Only',
        html_tag:'input',
        attributes:{
            type:'text',
            value:'',
            readonly:true,
        }
    },
];

const propertiesIconList = {
    free_text:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22" viewBox="0 0 24 24" width="22"><g><rect fill="none" height="24" width="24"></rect></g><g><g><g><path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z"></path></g></g></g></svg>`,
    multiline_free_text:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"></path></svg>`,
    yes_or_no:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></svg>`,
    date:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></svg>`,
    date_and_time:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>`,
    single_choice:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22" viewBox="0 0 24 24" width="22"><g><rect fill="none" height="24" width="24"></rect><path d="M16.54,11L13,7.46l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L16.54,11z M11,7H2v2h9V7z M21,13.41L19.59,12L17,14.59 L14.41,12L13,13.41L15.59,16L13,18.59L14.41,20L17,17.41L19.59,20L21,18.59L18.41,16L21,13.41z M11,15H2v2h9V15z"></path></g></svg>`,
    multiple_choice:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z"/></svg>`,
    real_number:`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"></path><path d="M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z"></path></svg>`,
    read_only :`<svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></svg>`,
};




export {
    datatypeList,
    propertiesIconList
}