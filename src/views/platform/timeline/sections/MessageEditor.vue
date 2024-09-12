<script setup>
    import Quill from 'quill';
    import { reactive, ref, onMounted, onUnmounted, computed } from 'vue';
    import { useAppStore } from '@stores/app';
    import "quill-mention/autoregister";
    import "quill/dist/quill.core.css";
    import "quill-mention/dist/quill.mention.css";
    import { leadImageTypes, fileNameToExtension } from '@helpers';
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";

    const appStore = useAppStore();
    const quillEditorRef = ref();
    const quillEditor = ref();
    const quillDraftId = 'quill_local_draft_history_message';
    const selectedUsers = ref([]);
    const users = computed(() => appStore.getUsers);
    const mentions = ref([]);
    const clipboardFiles = ref([]);

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
                    var divElement = document.createElement('div');
                    divElement.classList = 'd-flex flex-row';
                    divElement.innerHTML = `
                        <img class="ql-mention-avatar" src="${user.profile_avatar}">
                        <span class="ql-mention-name text-head">${user.value}<span>
                    `;
                    return divElement;
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
        window.addEventListener("paste", function (event) {
            console.log(Array.from(event.clipboardData.files))
            clipboardFiles.value = Array.from(event.clipboardData.files);
        });
    });

    onUnmounted(() => {
        removeDraft();
    });

    function getFileIcon(file) {
        var ext = fileNameToExtension(file.name);
        if (leadImageTypes.includes(ext)) {
            return URL.createObjectURL(file);
        }
        return getMaterialFileIcon(file.name);
    }

    function removeClipboardFile(index) {
        clipboardFiles.value.splice(index, 1);
    }


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
    <div v-if="clipboardFiles.length"
        class="clipboard-files pb-2 px-3 d-flex justify-content-start align-items-center">
        <div class="files-item me-1"
            v-for="(file, index) in clipboardFiles"
            :key="index">
            <img :src="getFileIcon(file)"
                :alt="file.name">
            <span @click="removeClipboardFile(index)"
                class="remove-file">
                <font-awesome-icon icon="fas fa-close"
                    class="fs-12px"></font-awesome-icon>
            </span>
        </div>
    </div>
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
    .clipboard-files {}

    .files-item {
        width: 50px;
        overflow: hidden;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 3px;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        border: 1px solid #b9c1c7;
        position: relative;
        cursor: pointer;

        .remove-file {
            position: absolute;
            top: 0px;
            right: 0;
            width: 20px;
            height: 20px;
            background-color: lab(58 73.8 31.17 / 0.33);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ff0000;
            opacity: 0;
            transition: all 0.3s ease-in-out;
        }
        &:hover .remove-file{
            opacity: 1;
        }

        img {
            width: 100%;
            object-fit: cover;
        }
    }

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