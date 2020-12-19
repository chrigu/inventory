<template>
     <v-form @submit="onSubmit" :initialValues="item">
        <div>
            <ion-item>
                <ion-label>Name</ion-label>
                <v-field name="name" v-slot="{ field }" :rules="isRequired">
                    <ion-input v-bind="field" type="text" name="name" placeholder="Name" />
                </v-field>
            </ion-item>
            <v-error-message as="div" name="name" v-slot="{ message }" class="ion-margin">
                <div v-if="message" class="error">{{`"Name" ${message}` }}</div>
            </v-error-message>
        </div>
        <div>
            <ion-item>
                <ion-label>description</ion-label>
                <v-field name="description" v-slot="{ field }" :rules="isRequired">
                    <ion-input v-bind="field" type="text" name="description" placeholder="Cat food" />
                </v-field>
            </ion-item>
            <v-error-message as="div" name="description" v-slot="{ message }" class="ion-margin">
                <div v-if="message" class="error">{{`"Description" ${message}` }}</div>
            </v-error-message>
        </div>
        <div>
            <ion-item>
                <ion-label>Amount</ion-label>
                <v-field name="amount" v-slot="{ field }" :rules="isRequired">
                    <ion-input v-bind="field" type="number" name="amount" />
                </v-field>
            </ion-item>
            <v-error-message as="div" name="amount" v-slot="{ message }" class="ion-margin">
                <div v-if="message" class="error">{{`"Description" ${message}` }}</div>
            </v-error-message>
        </div>
      <ion-button type="submit" color="primary">Save</ion-button>
    </v-form>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import * as V from "vee-validate/dist/vee-validate";
// https://gist.github.com/aaronksaunders/53f1a8a41b2f27e650f4cd258ceb9843
import useFirestore from "../hooks/firestore";

type FormDataType = {
  name?: string | null;
  description?: string | null;
  amount?: number | null;
};

export default defineComponent({
  name: 'ItemModal',
  props: {
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    amount: { type: Number, default: 0 },
  },
  emits: ['save'],
  setup(props, context) {

    const store = useFirestore()
    const item = ref<FormDataType>({
      name: props.name,
      description: props.description,
      amount: props.amount
    })

    // custom validator
    const isRequired = (value: any) => {
      if (!value) {
        return "is a required field";
      }
      return true
    };

    const handleChange = (e: CustomEvent) => {
      const name: string = (e?.target as any)?.name;
      item.value[name as string] = e.detail.value;
    };

    const onSubmit = (data: FormDataType) => {
      console.log(data);
      context.emit('save', data)
    };

    return {
      item,
      onSubmit,
      handleChange,
      isRequired
    };
  },
  components: { 
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
    }
});
</script>
<style scoped>
.error {
    color: var(--ion-color-danger, #36454f);
}
</style>
