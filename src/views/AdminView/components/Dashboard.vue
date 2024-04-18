<script setup lang="ts">
import useBusinessStore from '@/store/businessStore';
import { onMounted } from 'vue';


const businessStore = useBusinessStore()

function updateBusinessStatusColor(status: string) {
  switch (status) {
    case 'pendiente':
      return 'background-color: #ffff00';
    case 'desplegado':
      return 'background-color: #008000';
    case 'inactivo':
      return 'background-color: #ff0000';
  }
}
onMounted(async () => {
  await businessStore.fetchBusiness();
})

</script>

<template>
	<div class="container">
		<table class="container-table">
			<thead class="container-table-sections">
				<tr class="container-table-sections-section">
					<th class="container-table-sections-section-name">Id</th>
					<th class="container-table-sections-section-name">Nombre</th>
					<th class="container-table-sections-section-name">Sitio web</th>
					<th class="container-table-sections-section-name">Fecha de inicio </th>
					<th class="container-table-sections-section-name">Status</th>
					<th class="container-table-sections-section-name">Detalles</th>
				</tr>
			</thead>
			<tbody class="container-table-body">
				<tr 
          v-for="business in businessStore.businesses" 
          :key="business._id"
          class="container-table-body-items"
          >
					<td class="container-table-body-items-item">{{ business._id }}</td>
					<td class="container-table-body-items-item">{{ business.name }}</td>
					<td class="container-table-body-items-item">
            <a 
              :href="business.website"
              class="container-table-body-items-item-link" 
              target="_blank">
              {{ business.website }}
            </a>
          </td>
					<td class="container-table-body-items-item">{{ business.startDate }}</td>
					<td 
            class="container-table-body-items-item"
            :style="updateBusinessStatusColor(business.status)"
          >{{ business.status }}</td>
					<td class="container-table-body-items-item">
						<RouterLink :to="{ name: 'editBusiness', params: { id: business._id } }">ver</RouterLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss" scoped>
.container {
  overflow-x: auto;
  &-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border-radius: 8px;
    &-sections {
      &-section {
        border-radius: 8px;
        font-family: $primary-font;
        &-name {
          background-color: $pink;
          color: $white;
          font-weight: bold;
          text-align: left;
          padding: 0.5rem;
        }
      }
    }
    &-body {
      &-items {
        font-family: $secondary-font;
        font-size: .9rem;
        &-item {
          padding: 0.5rem;
          border-bottom: 1px solid $purple;
          &:hover {
            background-color: darken($white, 10%);
          }
          &-link {
            color: $black;
          }
          button {
            background-color: #fff;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
