<template>
    <div>
      <ion-list v-if="hasItems">
        <ion-item v-for="item in items" :key="item.id">
          <ion-label>{{item.name}}</ion-label>
          <ion-icon slot="end" :ios="pencilIcon.iosIcon" :md="pencilIcon.mdIcon"></ion-icon>
        </ion-item>
      </ion-list>
      <div v-else id="container">
        <strong class="capitalize">No items added, add one</strong>
      </div>
    </div>
</template>

<script lang="ts">
  import {
    IonIcon,
    IonList,
    IonLabel,
    IonItem
  } from "@ionic/vue";
  import { pencilOutline, pencilSharp } from "ionicons/icons";
  import { computed } from "vue";

  export default {
    name: "ItemList",
    components: {
      IonIcon,
      IonLabel,
      IonList,
      IonItem
    },
    props: {
      items: { type: Array, default: () => [] },
    },
    setup(props: Readonly<{items: unknown[]}>) {
      
      const hasItems = computed(() => (props as any).items.length > 0)

      return {
        pencilIcon: {
          iosIcon: pencilOutline,
          mdIcon: pencilSharp,
        },
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
