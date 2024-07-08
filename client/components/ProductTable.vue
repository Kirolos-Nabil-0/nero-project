<template>
    <v-text-field label="بحث" v-model="searchQuery"></v-text-field>
    <v-data-table :headers="headers" :items="filteredItems" item-value="_id" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>المنتجات</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <slot name="add-button"></slot>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small @click="$emit('edit', item)">mdi-pencil</v-icon>
            <v-icon small @click="$emit('delete', item)" color="red">mdi-delete</v-icon>
        </template>
    </v-data-table>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['items']);
const searchQuery = ref('');

const filteredItems = computed(() => {
    return props.items.filter((item) => {
        return item.name.includes(searchQuery.value);
    });
});

const headers = [
    { title: 'الاسم', value: 'name' },
    { title: 'الكمية', value: 'amount', sortable: true },
    { title: 'سعر الشراء', value: 'buyPrice', sortable: true },
    { title: 'سعر البيع', value: 'sellPrice', sortable: true },
    { title: 'الإجراءات', value: 'actions', sortable: false },
];
</script>
