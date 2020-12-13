<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-margin">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input name="name" type="text" placeholder="name"  @ionChange="handleChange"/>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-input
          name="description"
          type="text"
          placeholder="Cat food"
          @ionChange="handleChange"
        />
      </ion-item>
      <ion-item>
        <ion-label>Amount</ion-label>
        <ion-input
          name="amount"
          type="number"
          @ionChange="handleChange"
        />
      </ion-item>
      <ion-button color="primary" @click="saveItem()">Save</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonContent, modalController, IonPage } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import useFirestore from "../hooks/firestore";

export default defineComponent({
  name: 'ItemModal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  setup() {

    const store = useFirestore()

    const item = ref<any>({
      name: '',
      description: '',
      amount: 0
    })

    const handleChange = (e: CustomEvent) => {
      const name: string = (e?.target as any)?.name;
      item.value[name as string] = e.detail.value;
    };

    // const handleAlert = (message: string, isError = false) => {
    //   alertController
    //     .create({
    //       header: isError ? "Error Message" : "Notice",
    //       message: message,
    //       buttons: ["OK"],
    //     })
    //     .then((t) => t.present());
    // };

    const saveItem = async () => {
      console.log('save', item)
      await store.addItem({
        name: item.value.name,
        description: item.value.description,
        amount: item.value.amount,
      })
      modalController.dismiss()
    };

    return {
      item,
      saveItem,
      handleChange
    };
  },
  components: { IonHeader, IonTitle, IonToolbar, IonButton, IonPage, IonItem, IonLabel, IonContent, IonInput }
});
</script>