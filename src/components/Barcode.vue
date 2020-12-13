<template>
    <div>
        <svg class="barcode">
            <p>Cannot display barcode</p>
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import JsBarcode from 'jsbarcode'

export default defineComponent({
  name: 'Barcode',
  props: {
    barcode: { 
        type: String, 
        default: 'test'
    },
    text: { 
        type: String, 
        default: ''
    }
},
mounted () {
    JsBarcode(this.$el.querySelector('.barcode'), this.barcode, {text: `${this.barcode} ${this.text}`})
}
});
</script>
