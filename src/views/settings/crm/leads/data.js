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
            type:'select',
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


export {
    datatypeList
}