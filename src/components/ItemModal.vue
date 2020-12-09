<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

            <ion-item>
        <ion-label>Name</ion-label>
        <ion-input name="username" type="text" placeholder="username"  />
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-input
          name="password"
          type="password"
          placeholder="password"
        />
      </ion-item>
    </ion-content>
  </div>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar }
});
</script>