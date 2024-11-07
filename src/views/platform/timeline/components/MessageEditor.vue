<script setup>
    import Quill from 'quill';
    import { reactive, ref, onMounted, onUnmounted, computed } from 'vue';
    import { usePlatformStore } from '@stores';

    import { useDebounceFn, onClickOutside } from '@vueuse/core';
    import EmojiPicker from 'vue3-emoji-picker';
    import {
        imageExtensions,
        fileNameToExtension
    } from '@helpers';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    import "quill-mention/autoregister";
    import "quill/dist/quill.core.css";
    import "quill-mention/dist/quill.mention.css";
    import 'vue3-emoji-picker/css';

    const platformStore = usePlatformStore();
    const quillEditorRef = ref();
    const quillDraftId = 'quill_local_draft_history_message';
    const selectedUsers = ref([]);
    const users = computed(() => platformStore.getUsers);
    const mentions = ref([]);
    const clipboardFiles = ref([]);
    const $leadId = computed(() => platformStore.getEditLeadId);
    let quillEditor = null;
    const toggleEmojiBox = ref(false);
    const toggleEmojiRef = ref(null);
    const isSubmitMessage = ref(false);

    const quillOptions = {
        theme: 'bubble',
        placeholder: 'Type a message.....',
        modules: {
            mention: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: ["@", "#"],
                source: function (searchTerm, renderList, mentionChar) {
                    var mentionUsers = users.value.map((user) => ({ id: user.user_id, value: user.name, profile_avatar: user.profile_avatar }))

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
                    selectedMentions()
                },
            },
        },
    }


    onMounted(() => {
        quillEditor = new Quill(quillEditorRef.value, quillOptions);
    });

    function handleFetchUsers() {
        if (!users.value?.length) {
            platformStore.callFetchUsers(() => { });
        }
    }

    function selectedMentions() {
        mentions.value = [];
        quillEditor.getContents().ops.forEach(op => {
            if (op.insert && typeof op.insert === 'object' && op.insert.mention) {
                mentions.value.push(op.insert.mention?.id);
            }
        });
    }

    async function handleSubmitMessage() {

        var html = quillEditor.getSemanticHTML();
        var div = document.createElement('div');

        div.innerHTML = html;
        if (!div.innerText?.length) return;

        isSubmitMessage.value = true;

        await useApiRequest({
            url: `/platform/${$leadId.value}/message`,
            method: 'POST',
            payload: {
                mentions: mentions.value,
                message: html,
            }
        }).then(res => {
            const { success, message, errors } = res;

            if (success) {

                mentions.value = [];

                quillEditor.deleteText(0, quillEditor.getLength())

                platformStore.callFetchTimelineLogs();

                return;
            }

            $toast[message.type](message.text);

        }).catch(error => {
            $toast.clear();
            $toast.error(error.message);
        }).finally(() => {
            isSubmitMessage.value = false;
        });
    }


    function handleSelecgtedEmoji(emoji) {

        if (!quillEditor && !emoji.i) return;

        const selection = quillEditor.getSelection();
        if (selection) {
            quillEditor.insertText(selection.index, emoji.i);
            quillEditor.setSelection(selection.index + emoji.i.length);
        }
    }

    const handleToggleEmoji = useDebounceFn(() => {
        toggleEmojiBox.value = !toggleEmojiBox.value;
    }, 100);

    onClickOutside(toggleEmojiRef, () => handleToggleEmoji());



</script>


<template>
    <div class="tab-content h-100 d-flex flex-column pt-2">

        <div ref="quillEditorRef"
            @click="handleFetchUsers"></div>

        <div class="d-flex px-2 pt-1">

            <EmojiPicker ref="toggleEmojiRef"
                v-if="toggleEmojiBox"
                :native="true"
                @select="handleSelecgtedEmoji"></EmojiPicker>

            <button @click="handleToggleEmoji"
                class="ms-auto me-2 toolbar-btn btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center position-relative">
                <font-awesome-icon icon="fas fa-face-smile"
                    class="text-soft"></font-awesome-icon>
            </button>

            <loading-button @click="handleSubmitMessage"
                :is-loading="isSubmitMessage"
                loading-text="Sending..."
                class="btn btn-sm crm-btn">Send Message</loading-button>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
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

        &:hover .remove-file {
            opacity: 1;
        }

        img {
            width: 100%;
            object-fit: cover;
        }
    }

    .tab-content {
        &:deep(.v3-emoji-picker) {
            position: absolute;
            bottom: 1rem;
            right: 10.3rem;
        }

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