<template>
    <v-dialog v-model="localDialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="editedItem.name" label="الاسم"></v-text-field>
                    <v-text-field v-model="editedItem.amount" label="الكمية"></v-text-field>
                    <v-text-field v-model="editedItem.buyPrice" label="سعر الشراء"></v-text-field>
                    <v-text-field v-model="editedItem.sellPrice" label="سعر البيع"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">الغاء</v-btn>
                <v-btn color="blue darken-1" text @click="save">حفظ</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import Swal from 'sweetalert2';

const props = defineProps({
    dialog: Boolean,
    initialItem: Object,
    title: String
});

const emit = defineEmits(['update:dialog', 'save']);

const localDialog = ref(props.dialog);
const editedItem = ref({ ...props.initialItem });
const formTitle = ref(props.title);

const save = () => {
    close();

    if (!editedItem.value.name || !editedItem.value.amount || !editedItem.value.buyPrice || !editedItem.value.sellPrice) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'يرجى ملء جميع الحقول'
        });
        return;
    }

    emit('save', { ...editedItem.value });
};

const close = () => {
    localDialog.value = false;
    emit('update:dialog', false);
    setTimeout(() => {
        resetForm();
    }, 300);
};

const resetForm = () => {
    editedItem.value = { ...props.initialItem };
};

watch(() => props.dialog, (newVal) => {
    localDialog.value = newVal;
    if (newVal) {
        resetForm();
    }
});

watch(localDialog, (newVal) => {
    if (!newVal) {
        setTimeout(() => {
            resetForm();
        }, 300);
    }
});
</script>

<style scoped>
.v-card-title {
    display: flex;
    justify-content: center;
}

.v-card-text {
    display: flex;
    flex-direction: column;
}
</style>
