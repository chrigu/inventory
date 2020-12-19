<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-margin">
            <ItemForm @save="saveItem" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    modalController,
    IonPage
} from "@ionic/vue";
import { defineComponent } from "vue"

import ItemForm from "./ItemForm.vue"

import useFirestore from "../hooks/firestore";

export default defineComponent({
    name: "ItemModal",
    props: {
        title: { type: String, default: "Super Modal" }
    },
    setup() {
        const store = useFirestore();

        const saveItem = async (formItem) => {
            console.log("saved", formItem);
            await store.addItem({
                name: formItem.name,
                description: formItem.description,
                amount: formItem.amount
            });

            modalController.dismiss("itemSaved");
        };

        return {
            saveItem
        };
    },
    components: {
      IonHeader,
      IonTitle,
      IonToolbar,
      IonPage,
      IonContent,
      ItemForm
    }
});
</script>
