<script>
    import { defineComponent, computed, h } from 'vue';

    const NotificationMessage = defineComponent({

        render() {
            let html = document.createElement('div');
            html.innerHTML = '<div>{{ title }}</div>';
            return h({template:html, props:{title: 'Sourov Pal'}}, { title: 'Sourov Pal' });
        },
    });
    export default NotificationMessage;
</script>