<template>
    <div>
      <ion-list v-if="hasLogs">
        <ion-item v-for="log in logs" :key="log.id">
          <ion-label>{{log.type}}</ion-label>
        </ion-item>
      </ion-list>
      <div v-else id="container">
        <strong class="capitalize">No Logs</strong>
      </div>
    </div>
</template>

<script lang="ts">
  import {
    IonList,
    IonLabel,
    IonItem
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
      logs: { type: Array, default: () => [] },
    },
    setup(props: Readonly<{logs: unknown[]}>) {
            console.log(props.logs)

      const hasLogs = computed(() => (props as any).logs.length > 0)

      return {
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
