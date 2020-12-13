<template>
    <div>
        <Barcode :barcode="barcode" :text="text" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import Barcode from '@/components/Barcode.vue'

export default defineComponent({
  name: 'Print',
     setup() {
    const route = useRoute();
    const barcode = route.params.id || 'test'
    const text = route.query.text || ''

    return { 
        barcode, 
        text
    }
  },
    components: { Barcode }
});
</script>
