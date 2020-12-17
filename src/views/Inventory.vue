<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Iventory</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ folder }}</ion-title>
        </ion-toolbar>
      </ion-header>
    
    <ion-card v-for="item in items" :key="item.id">
        <ion-card-header>
        <ion-card-title>{{item.name}}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
        {{item.description}}
        </ion-card-content>
    </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader
    } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

import useFirestore from "../hooks/firestore";

export default {
  name: 'Inventory',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader
  },
  setup() {

    const store = useFirestore()
    const items = ref([])

    onBeforeMount(async () => {
        store.subscribeItems((updatedItems: any) => {
            items.value = updatedItems
            console.log(items.value);
        })
    })

    return { items }
  }
}
</script>

<style scoped>
ion-menu-button {
  color: var(--ion-color-primary);
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
