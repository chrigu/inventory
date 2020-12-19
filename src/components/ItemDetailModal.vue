<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Item</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-margin">
        <ion-item>
            <Barcode :barcode="modalItem.id" :text="modalItem.name"/>
        </ion-item>
      <ItemForm :name="modalItem.name" :description="modalItem.description" :amount="modalItem.amount" />
      <ion-button color="primary" @click="saveItem()">Save</ion-button>
      <ion-button color="secondary" @click="print()">Print</ion-button>
      <ion-button :color="buttonType" @click="deleteItem()">{{deleteButtonText}}</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonButton, 
    IonContent, 
    modalController, 
    IonPage } from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useFirestore from "../hooks/firestore"
import ItemForm from "./ItemForm.vue"

import Barcode from '@/components/Barcode.vue'

export default defineComponent({
  name: 'Modal',
  props: {
    item: { 
        type: Object, 
        default: () => ({
            name: '',
            description: '',
            amount: 0,
            id: ''
        })
    }
},
setup(props) {

  const store = useFirestore()
  const modalItem = ref<any>({...(props.item)})
  const router = useRouter()
  const deleteButtonState = ref('DELETE')
  const deleteButtonText = computed(() => deleteButtonState.value === 'DELETE' ? 'Delete' : 'Confirm delete')
  const buttonType = computed(() => deleteButtonState.value === 'DELETE' ? 'warning' : 'danger')

  const handleChange = (e: CustomEvent) => {
      const name: string = (e?.target as any)?.name;
      modalItem.value[name as string] = e.detail.value;
  };

  const saveItem = async () => {
    await store.addItem({
      name: modalItem.value.name,
      description: modalItem.value.description,
      amount: modalItem.value.amount,
    })
    modalController.dismiss()
  }

  const deleteItem = () => {
      if (deleteButtonState.value === 'DELETE') {
        deleteButtonState.value = 'CONFIRM'
      } else {
        store.deleteItem(modalItem.value.id).then(() => {
            modalController.dismiss('itemDeleted')
            deleteButtonState.value = 'DELETE'
        })
      }
  }

  const print = () => {
    const route = router.resolve({
        name: 'print', 
        params: {id: modalItem.value.id},
        query: { text: modalItem.value.name }
    })
    window.open(route.href, '_blank');
  }

  return {
    modalItem,
    saveItem,
    handleChange,
    print,
    deleteItem,
    buttonType,
    deleteButtonText
  };
  },
  components: { 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonPage, 
    IonItem, 
    IonContent, 
    Barcode,
    ItemForm
  }
});
</script>
