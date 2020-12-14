<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Logs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Logs</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-searchbar></ion-searchbar>
      <LogList :logs="logs" />
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
    IonButton,
    modalController,
    IonSearchbar
  } from "@ionic/vue";
  import { useRoute } from "vue-router";
  import { ref, computed, onBeforeMount } from "vue";

  import useFirestore from "../hooks/firestore";
  import LogList from "../components/LogList.vue";

  export default {
    name: "Inventory",
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
      IonSearchbar,
      LogList
    },
    setup() {

      const store = useFirestore()
      const logs = ref([])

      onBeforeMount(async () => {
        // (items.value as any) = await store.getItems();
        store.subscribeLogs((updateLogs: any) => {
          logs.value = updateLogs
          console.log(logs.value);
        })
      })

      const hasLogs = computed(() => logs.value.length > 0)

      return {
        logs,
        hasLogs
      };
    },
  };
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
