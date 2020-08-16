<template>
    <modal :id="id" class="confirm-modal" @open="onOpen">
        <template #default="{ close, cancel }">
            <div>
                <p>{{ message }}</p>
            </div>
            <div class="confirm-modal__actions" layout="row center-right">
                <button class="button margin__right--small" @click="cancel">{{ cancelLabel }}</button>
                <button class="button button--primary" @click="close">{{ confirmLabel }}</button>
            </div>
        </template>
    </modal>
</template>

<script lang="ts">
import MODALS from '../../constants/modals';

import Modal from '../modal/modal.vue';

import {
    defineComponent,
    ref
} from 'vue';

import type {
    IConfirmModalPayload
} from '../../interfaces/index';

export default defineComponent({

    components: {
        Modal
    },

    setup() {
        const id = MODALS.confirm;
        const message = ref('');
        const confirmLabel = ref('');
        const cancelLabel = ref('');

        function onOpen(payload: IConfirmModalPayload): void {
            message.value = payload.message;

            confirmLabel.value = payload.confirmLabel || 'Ok';
            cancelLabel.value = payload.cancelLabel || 'Cancel';
        }

        return {
            id,
            onOpen,
            message,
            confirmLabel,
            cancelLabel
        };
    }

});
</script>