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
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input name="name" type="text" placeholder="name"  @ionChange="handleChange" :value="modalItem.name"/>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-input
          name="description"
          type="text"
          placeholder="Cat food"
          @ionChange="handleChange"
          :value="modalItem.description"
        />
      </ion-item>
      <ion-item>
        <ion-label>Amount</ion-label>
        <ion-input
          name="amount"
          type="number"
          @ionChange="handleChange"
          :value="modalItem.amount"
        />
      </ion-item>
      <ion-button color="primary" @click="saveItem()">Save</ion-button>
      <ion-button color="secondary" @click="print()">Print</ion-button>
      <ion-button color="warning" @click="deleteItem()">Delete</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonContent, 
    modalController, 
    IonPage } from '@ionic/vue';
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import useFirestore from "../hooks/firestore"

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
    store.deleteItem(modalItem.value.id).then(() => {
        modalController.dismiss('itemDeleted')
    })

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
    deleteItem
  };
  },
  components: { 
      IonHeader, 
      IonTitle, 
      IonToolbar, 
      IonButton, 
      IonPage, 
      IonItem, 
      IonLabel, 
      IonContent, 
      IonInput,
      Barcode
  }
});
</script>
