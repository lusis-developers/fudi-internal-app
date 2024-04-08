<script setup lang="ts">
import useBusinessStore from '@/store/businessStore';


const businessStore = useBusinessStore()
</script>

<template>
	<div class="container">
		<table class="container-table">
			<thead class="container-table-sections">
				<tr class="container-table-sections-section">
					<th class="container-table-sections-section-name">Id</th>
					<th class="container-table-sections-section-name">Nombre</th>
					<th class="container-table-sections-section-name">Instagram</th>
					<th class="container-table-sections-section-name">fecha de inicio </th>
					<th class="container-table-sections-section-name">Status</th>
					<th class="container-table-sections-section-name">Detalles</th>
				</tr>
			</thead>
			<tbody class="container-table-body">
				<tr 
          v-for="business in businessStore.businesses" 
          :key="business.id"
          class="container-table-body-items"
          >
					<td class="container-table-body-items-item">{{ business.id }}</td>
					<td class="container-table-body-items-item">{{ business.name }}</td>
					<td class="container-table-body-items-item">{{ business.instagram }}</td>
					<td class="container-table-body-items-item">{{ business.startDate }}</td>
					<td class="container-table-body-items-item">{{ business.status }}</td>
					<td class="container-table-body-items-item">
						<button>verr</button>
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
        &-item {
          padding: 0.5rem;
          border-bottom: 1px solid $purple;
          color: #333;
          &:hover {
            background-color: darken($white, 10%);
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
