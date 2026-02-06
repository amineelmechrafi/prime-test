<template>
  <div style="box-shadow: 0 1px 5px rgb(0,0,0,0.2);" class="w-full max-w-7xl mx-auto px-4 py-6 rounded-md ">
    <h2 class="text-xl font-semibold mb-4">Create BIN</h2>

    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="grid grid-cols-6 gap-4"
    >
      <!-- Start Range -->
      <div class="col-span-2 flex flex-col gap-1">
        <label>Start Range</label>
        <InputText name="startRange" placeholder="Enter minimum BIN value" fluid />
        <Message v-if="$form.startRange?.invalid" severity="error" size="small" variant="simple">
          {{ $form.startRange.error.message }}
        </Message>
      </div>

      <!-- End Range -->
      <div class="col-span-2 flex flex-col gap-1">
        <label>End Range</label>
        <InputText name="endRange" placeholder="Enter maximum BIN value" fluid />
        <Message v-if="$form.endRange?.invalid" severity="error" size="small" variant="simple">
          {{ $form.endRange.error.message }}
        </Message>
      </div>

      <!-- BIN Size -->
      <div class="col-span-2 flex flex-col gap-1">
        <label>BIN Size</label>
        <InputText name="binLength" placeholder="6" fluid />
      </div>

      <!-- Min PAN Length -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Min PAN Length</label>
        <InputText name="minPanLength" placeholder="16" fluid />
      </div>

      <!-- Max PAN Length -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Max PAN Length</label>
        <InputText name="maxPanLength" placeholder="16" fluid />
      </div>

      <!-- Card Type -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Card Type</label>
        <Select  :options="cardTypes" optionLabel="name" placeholder="Select Card Type" />
      </div>

      <!-- Card Technology -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Card Technology</label>
        <Select  :options="cardTEchnologies" optionLabel="name" placeholder="Select Card Technology" />
      </div>

      <!-- Bank Name -->
      <div class="col-span-full flex flex-col gap-1">
        <label>Bank Name</label>
        <InputText name="bank" placeholder="Enter bank name" fluid />
      </div>

      <!-- Country -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Country</label>
        <Select  :options="countries" optionLabel="name" placeholder="Select Country" />
      </div>

      <!-- Scheme -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Scheme</label>
        <Select  :options="schemes" optionLabel="name" placeholder="Select Scheme" />
      </div>

      <!-- Risk Flag -->
      <div class="col-span-3 flex flex-col gap-1">
        <label>Risk Flag</label>
        <Select  :options="riskFlags" optionLabel="name" placeholder="Select Risk Flag" />
      </div>

      <!-- Force 3DS -->
      <div class="col-span-3 flex flex-col gap-3">
        <label>Force 3DS Challenge</label>
        <div class="flex flex-row items-center gap-2">
        <template v-for="option in threedOptions">
                <RadioButton inputId="threed" name="threed" :value="option.code" />
                <label for="ingredient2">{{option.name}}</label>
        </template>        
        </div>
      </div>
    </Form>

    <div class="flex gap-2 mt-4">
      <Button class="col-span-1" type="submit" label="Submit" />
      <Button severity="secondary" class="col-span-1" label="Cancel" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form } from '@primevue/forms'
import { InputText, Button, Message ,RadioButton } from 'primevue'
import { useToast } from 'primevue/usetoast'
import Select from 'primevue/select';


const toast = useToast()

const initialValues = ref({
  startRange: '4000000000000000',
  endRange: '4000999999999999',
  binLength: 6,
  issuerBin: '400000',
  minPanLength: 16,
  maxPanLength: 16,
  bank: 'Global Bank Corporation',
  scheme: 'VISA',
  country: 'US',
  cardType: 'CREDIT',
  cardTechnology: 'EMV',
  riskFlag: 'normal',
  challengeThreeDs: 'required',
  locked: false
});

const cardTypes = ref ([
    { name: 'Credit', code: 'CREDIT' },
    { name: 'Debit', code: 'DEBIT' },
    { name: 'Prepaid', code: 'PREPAID' },
]);
const cardTEchnologies = ref ([
    { name: 'CONTACTLESS', code: 'Contactless' },
    { name: 'EMV', code: 'EMV' },
]);

const countries = ref([
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'UK' }
])

const riskFlags = ref([
  { name: 'Normal', code: 'normal' },
  { name: 'High', code: 'high' },
  { name: 'Low', code: 'low' }
])

const threedOptions = ref([
  { name: 'Required', code: 'required' },
  { name: 'Optional', code: 'optional' },
  { name: 'Not Required', code: 'not_required' }
])


const schemes = ref([
  { name: 'Visa', code: 'VISA' },
  { name: 'MasterCard', code: 'MASTERCARD' },
  { name: 'Amex', code: 'AMEX' }
])

const resolver = zodResolver(
  z.object({
    startRange: z.string()
    .regex(/^\d+$/, "Only numbers are allowed"),
    endRange: z.string().min(1),
    binLength: z.coerce.number().min(4).max(8),
    minPanLength: z.coerce.number(),
    maxPanLength: z.coerce.number(),
    bank: z.string().min(1),
    scheme: z.string().min(1),
    country: z.string().length(2),
    cardType: z.string(),
    cardTechnology: z.string(),
    riskFlag: z.string(),
    challengeThreeDs: z.string()
  })
)

const onFormSubmit = (e) => {
  if (e.valid) {
    console.log('BIN payload:', e.values)
    toast.add({
      severity: 'success',
      summary: 'BIN created successfully',
      life: 3000
    })
  }
}
</script>
