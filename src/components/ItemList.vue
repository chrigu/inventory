<template>
    <div>
      <ion-list v-if="hasItems">
        <ion-item v-for="item in items" :key="item.id" @click="openModal(item)">
          <ion-label>{{item.name}}</ion-label>
        </ion-item>
      </ion-list>
      <div v-else id="container">
        <strong class="capitalize">No items added, add one</strong>
      </div>
    </div>
</template>

<script lang="ts">
  import {
    IonList,
    IonLabel,
    IonItem,
    modalController,
    toastController
  } from "@ionic/vue";
  import { computed } from "vue"

  import ItemDetailModal from "../components/ItemDetailModal.vue";

  export default {
    name: "ItemList",
    components: {
      IonLabel,
      IonList,
      IonItem
    },
    props: {
      items: { type: Array, default: () => [] },
    },
    setup(props: Readonly<{items: unknown[]}>) {
      const hasItems = computed(() => (props as any).items.length > 0)

      const openToast = async () => {
        const toast = await toastController
          .create({
            message: 'Item was deleted.',
            duration: 2000
          })
        return toast.present();
      }

      const openModal = async (item: any) => {
        console.log('open', item, item.value)
        const modal = await modalController.create({
          component: ItemDetailModal,
          cssClass: "my-custom-class",
          componentProps: {
            item: item
          },
        });
        modal.onDidDismiss().then(async (data) => {
          console.log("didDismess", data.data)
          if (data.data === 'itemDeleted') {
            await openToast()
          }
        })
        return modal.present();
      }

      return {
        hasItems,
        openModal
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
