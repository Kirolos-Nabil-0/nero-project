<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-card-title class="text-center">
                        <span class="headline">قائمة المنتجات</span>
                    </v-card-title>
                    <v-card-text>
                        <ProductTable v-if="fetchedData && fetchedData.length" :items="fetchedData" @edit="editItem"
                            @delete="deleteItem">
                            <template #add-button>
                                <v-btn color="primary" dark class="mb-2" @click="openDialog('اضافة منتج', newItem)">
                                    اضافة منتج
                                </v-btn>
                            </template>
                        </ProductTable>
                        <template v-else>
                            <ProductTable :items="[]" @edit="editItem" @delete="deleteItem">
                                <template #add-button>
                                    <v-btn color="primary" dark class="mb-2" @click="openDialog('اضافة منتج', newItem)">
                                        اضافة منتج
                                    </v-btn>
                                </template>
                            </ProductTable>
                        </template>
                        <ProductForm :dialog="dialog" :initialItem="editedItem" :title="formTitle"
                            @update:dialog="dialog = $event" @save="saveItem"></ProductForm>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const dialog = ref(false);

const newItem = {
    _id: null,
    name: '',
    amount: 0,
    buyPrice: 0,
    sellPrice: 0
};

const editedItem = ref({ ...newItem });
const formTitle = ref('اضافة منتج');

const openDialog = (title, item) => {
    formTitle.value = title;
    editedItem.value = { ...item };
    dialog.value = true;
};

const editItem = (item) => {
    openDialog('تعديل المنتج', item);
};

function findSimilarItem(item = { name: "", amount: 0, buyPrice, sellPrice }, items) {
    for (let i = 0; i < items.length; i++) {
        const { name, amount, buyPrice, sellPrice } = items[i];

        if (name === item.name && amount === item.amount && buyPrice === item.buyPrice && sellPrice === item.sellPrice) {
            return items[i];
        }
    }

    return -1;
}

const deleteItem = async (item) => {
    var _id;

    if (!item._id) {
        await refresh();
        const element = findSimilarItem(item, fetchedData.value);
        _id = element._id;
    } else {
        _id = item._id;
    }

    try {
        const result = await Swal.fire({
            title: 'هل انت متأكد؟',
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفها!'
        });

        if (result.isConfirmed) {
            await $fetch(`http://localhost:5000/api/stores/${_id}`, {
                method: 'DELETE'
            });

            const index = fetchedData.value.findIndex(i => i._id === _id);
            fetchedData.value.splice(index, 1);
            Swal.fire('تم الحذف!', 'تم حذف المنتج بنجاح.', 'success');
        }
    } catch (error) {
        Swal.fire('خطأ!', 'حدث خطأ أثناء حذف المنتج.', 'error');
    }
};

const saveItem = async (item) => {
    if (!item._id) {
        await refresh();
        const element = findSimilarItem(item, fetchedData.value);
        item._id = element._id;
    }

    try {
        if (item._id) {
            await $fetch(`http://localhost:5000/api/stores/${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            const index = fetchedData.value.findIndex(i => i._id === item._id);
            fetchedData.value[index] = item;
            Swal.fire('تم التحديث!', 'تم تحديث المنتج بنجاح.', 'success');
        } else {
            const newItem = await $fetch('http://localhost:5000/api/stores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            fetchedData.value.push(newItem);
            Swal.fire('تم الإضافة!', 'تم اضافة المنتج بنجاح.', 'success');
        }
        dialog.value = false;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            let errorMsg = 'حدث خطأ أثناء حفظ المنتج:<br>';
            errors.forEach(err => {
                errorMsg += `<br>${err.msg}`;
            });
            Swal.fire('خطأ!', errorMsg, 'error');
        } else {
            Swal.fire('خطأ!', 'حدث خطأ أثناء حفظ المنتج.', 'error');
        }
    }
};

// Fetch the data and initialize it as an empty array if fetching fails
const { data: fetchedData, refresh } = await useFetch('http://localhost:5000/api/stores');
</script>
