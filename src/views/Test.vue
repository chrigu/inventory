<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-button @click="openModal">Open Modal</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonButton, IonContent, IonPage, modalController } from "@ionic/vue";
  import Modal from "../components/ItemModal.vue";

  export default {
    components: { IonButton, IonContent, IonPage },
    methods: {
      async openModal() {
        const modal = await modalController.create({
          component: Modal,
          cssClass: "my-custom-class",
          componentProps: {
            data: {
              content: "New Content",
            },
            propsData: {
              title: "New title",
            },
          },
        });
        return modal.present();
      },
    },
  };
</script>
