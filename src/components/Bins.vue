<template>
    <div class="card">
        <DataTable lazy :totalRecords="totalRecords" @page="onPage" :value="bins" v-model:filters="filters" 
        :globalFilterFields="['bank', 'country', 'cardType']" 
        paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 70rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
          
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">BIN Management</span>
                </div>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <Column field="id" header="id" />
            <Column field="issuerBin" header="Issuer BIN" />
            <Column field="binLength" header="BIN Length" />

            <Column header="Range">
                <template #body="{ data }">
                    <div class="flex flex-column gap-2">
                        <small>{{ data.startRange }}</small><small>→</small>
                        <small>{{ data.endRange }}</small>
                    </div>
                </template>
            </Column>

            <Column header="Scheme" >
                <template #body="{ data }">
                    <img :src="`/images/${data.scheme.toLowerCase ()}.png`"  class="w-7 rounded" />
                </template>
            </Column>
            <Column field="bank" header="Bank" />
            <Column field="country" header="Country" />
            <Column field="cardType" header="Card Type" />
            <Column field="cardTechnology" header="Technology" />

            <Column header="3DS Challenge">
                <template #body="{ data }">
                    <Tag :value="data.challengeThreeDs" severity="info" />
                </template>
            </Column>

            <Column header="Risk">
                <template #body="{ data }">
                    <Tag
                        :value="data.riskFlag"
                        :severity="getRiskSeverity(data.riskFlag)"
                    />
                </template>
            </Column>

            <Column header="Status">
                <template #body="{ data }">
                    <Tag
                        :value="data.status"
                        :severity="getStatusSeverity(data)"
                    />
                </template>
            </Column>

            
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { BinService } from '@/services/BinService';
import { BinService2 } from '@/services/BinService2';
import { FilterMatchMode } from '@primevue/core/api';
import InputText from 'primevue/inputtext';

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const bins = ref([]);

const lazyParams = ref({
  start: 0,
  limit: 5,
  sortField: null,
  sortOrder: null,
  filters: {}
})

const onPage = (event) => {
  lazyParams.value.start = event.page * event.rows
  lazyParams.value.limit = event.rows
  loadBins()
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const totalRecords = ref(0)

const loadBins = async () => {
  const result = await BinService2.getBins(
    lazyParams.value.start,
    lazyParams.value.limit
  )

  bins.value = result.data
  totalRecords.value = result.total
}


onMounted(async () => {
    await loadBins();
    console.log(bins.value); // now it prints the actual data
});

const getStatusSeverity = (bin) => {
    if (bin.deleted) return 'danger';
    if (bin.locked) return 'warn';

    switch (bin.status) {
        case 'active':
            return 'success';
        case 'inactive':
            return 'secondary';
        default:
            return null;
    }
};

const getRiskSeverity = (risk) => {
    switch (risk) {
        case 'normal':
            return 'success';
        case 'medium':
            return 'warn';
        case 'high':
            return 'danger';
        default:
            return 'info';
    }
};
</script>
