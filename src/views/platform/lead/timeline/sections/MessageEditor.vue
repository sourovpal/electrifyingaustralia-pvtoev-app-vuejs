<script setup>
    import Quill from 'quill';
    import { reactive, ref, onMounted, onUnmounted, computed } from 'vue';
    import { useAppStore } from '@stores/app';
    import "quill-mention/autoregister";
    import "quill/dist/quill.core.css";
    import "quill-mention/dist/quill.mention.css";

    const appStore = useAppStore();
    const quillEditorRef = ref();
    const quillEditor = ref();
    const quillDraftId = 'quill_local_draft_history_message';
    const selectedUsers = ref([]);
    const users = computed(() => appStore.getUsers);
    const mentions = ref([]);

    const quillOptions = {
        theme: 'bubble',
        placeholder: 'Type a message.....',
        modules: {
            mention: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: ["@", "#"],
                source: function (searchTerm, renderList, mentionChar) {
                    var mentionUsers = users.value.map((user) => ({ id: user.id, value: user.name, profile_avatar: user.profile_avatar }))

                    if (searchTerm.length === 0) {
                        renderList(mentionUsers, searchTerm);
                    } else {
                        const matches = [];
                        for (var i = 0; i < users.value.length; i++) {
                            if (~mentionUsers[i].name.toLowerCase().indexOf(searchTerm.toLowerCase())) {
                                matches.push(mentionUsers[i]);
                            }
                        }
                        renderList(matches, searchTerm);
                    }
                },
                renderItem: function (user) {
                    var div = document.createElement('div');
                    div.classList = 'd-flex flex-row';
                    div.innerHTML = `
                        <img class="ql-mention-avatar" src="${user.profile_avatar}&id=${user.id}">
                        <span class="ql-mention-name text-head">${user.value}<span>
                    `;
                    return div;
                },
                onClose: () => {
                    console.log('on close eve: ');
                },
                onSelect: (item, insertItem) => {
                    insertItem(item);
                    selected()
                },
            },
        },
    }


    onMounted(() => {
        quillEditor.value = new Quill(quillEditorRef.value, quillOptions);
        loadDraft();
        quillEditor.value.on('text-change', saveDraft);
    });

    onUnmounted(() => {
        removeDraft();
    });

    function selected() {
        mentions.value = [];
        quillEditor.value.getContents().ops.forEach(op => {
            if (op.insert && typeof op.insert === 'object' && op.insert.mention) {
                mentions.value.push(op.insert.mention?.id);
            }
        });
    }


    function saveDraft() {
        const content = quillEditor.value.root.innerHTML;
        window.localStorage.setItem(quillDraftId, JSON.stringify(content));
    }

    function loadDraft() {
        const savedContent = localStorage.getItem(quillDraftId);
        if (savedContent && quillEditor.value) {
            quillEditor.value.root.innerHTML = JSON.parse(savedContent);
        }
    }

    function removeDraft() {
        localStorage.removeItem(quillDraftId);
    }

</script>


<template>
    <div class="tab-content flex-grow-1 d-flex flex-column">
        <div ref="quillEditorRef"
            class="flex-grow-1"></div>
        <div class="d-flex px-2 py-2">
            <button @click="selected"
                class="ms-auto btn btn-sm btn-primary">Send Message</button>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .tab-content {
        &:deep(.ql-mention-list-container) {
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px !important;
            background-color: rgb(255, 255, 255) !important;
            min-height: 0rem;
            max-height: 18rem;
            overflow: auto;
            border: none;
            width: 200px !important;
            ;

            .ql-mention-list-item {
                padding: 4px 12px !important;
                line-height: inherit !important;

                &.selected,
                &:hover {
                    background-color: rgb(28 61 102 / 8%) !important;
                }
            }

            .ql-mention-avatar {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
            }

            .ql-mention-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                margin-left: 10px;
                font-size: 14px;
            }
        }

    }
</style>