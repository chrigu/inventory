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
      <ion-searchbar @ionChange="handleChange"></ion-searchbar>
      <div class="ion-margin">Filter</div>
      <ItemList :items="items" />
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
    modalController,
    IonSearchbar,
    toastController
  } from "@ionic/vue";
  import { addCircleOutline, addCircleSharp, pencilOutline, pencilSharp } from "ionicons/icons";
  import { useRoute } from "vue-router";
  import { ref, computed, watch, onBeforeMount } from "vue";

  import useFirestore from "../hooks/firestore";
  import useItems from "../hooks/items";

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
      ItemList,
      IonSearchbar
    },
    setup() {
      const route = useRoute()
      const itemsStore = useItems()
      const folder = ref(route.params.id || "Inbox");
      const matchedFolder = computed(() => route.params.id);

      const store = useFirestore()
      const items = itemsStore.filteredItems
      const hasItems = itemsStore.hasItems

      const openModal = async () => {
        const modal = await modalController.create({
          component: ItemModal,
          cssClass: "my-custom-class",
          componentProps: {
            title: 'Add item',
          },
        });

        const openToast = async () => {
            const toast = await toastController
            .create({
                message: 'Yay! Item was added.',
                duration: 2000
            })
            return toast.present();
        }

        modal.onDidDismiss().then(async (data) => {
          console.log("didDismess", data.data)
          if (data.data === 'itemSaved') {
            await openToast()
          }
        })
        return modal.present();
      }

      onBeforeMount(async () => {
        // (items.value as any) = await store.getItems();
        store.subscribeItems((updatedItems: any) => {
          itemsStore.setItems(updatedItems)
        //   items.value = updatedItems
        //   console.log(items.value);
        })
      })

      const handleChange = (e: CustomEvent) => {
        const name: string = (e?.target as any)?.name;
        itemsStore.setSearchTerm(e.detail.value)
      };

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
        hasItems,
        handleChange
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
