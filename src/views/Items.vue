<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Items</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openModal">
            <ion-icon slot="icon-only" :ios="addIcon.iosIcon" :md="addIcon.mdIcon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ folder }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ItemList :items="items" />
      <!-- <ion-list v-if="hasItems">
        <ion-item v-for="item in items" :key="item.id">
          <ion-label>{{item.name}}</ion-label>
          <ion-icon slot="end" :ios="pencilIcon.iosIcon" :md="pencilIcon.mdIcon"></ion-icon>
        </ion-item>
      </ion-list>
      <div v-else id="container">
        <strong class="capitalize">No items added, add one</strong>
      </div> -->
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
    IonIcon,
    IonModal,
    modalController,
  } from "@ionic/vue";
  import { addCircleOutline, addCircleSharp, pencilOutline, pencilSharp } from "ionicons/icons";
  import { useRoute } from "vue-router";
  import { ref, computed, watch, onBeforeMount } from "vue";

  import useFirestore from "../hooks/firestore";

  import ItemModal from "../components/ItemModal.vue";
  import ItemList from "../components/ItemList.vue";

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
      IonButton,
      IonIcon,
      ItemList
      // IonModal
    },
    setup() {
      const route = useRoute();
      const folder = ref(route.params.id || "Inbox");
      const matchedFolder = computed(() => route.params.id);

      const store = useFirestore()
      const items = ref([])

      const openModal = async () => {
        const modal = await modalController.create({
          component: ItemModal,
          cssClass: "my-custom-class",
          componentProps: {
            propsData: {
              title: "New title",
            },
          },
        });
        modal.onDidDismiss().then(() => {
          console.log("didDismess");
        });
        return modal.present();
      };

      onBeforeMount(async () => {
        // (items.value as any) = await store.getItems();
        store.subscribeItems((updatedItems: any) => {
          items.value = updatedItems
          console.log(items.value);
          })

      })

      const hasItems = computed(() => items.value.length > 0)

      watch(matchedFolder, () => {
        folder.value = matchedFolder.value as string;
      });

      return {
        folder,
        addIcon: {
          iosIcon: addCircleOutline,
          mdIcon: addCircleSharp,
        },
        pencilIcon: {
          iosIcon: pencilOutline,
          mdIcon: pencilSharp,
        },
        openModal,
        items,
        hasItems
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
