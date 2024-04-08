<script setup lang="ts">
import { ref } from "vue";
const orders = ref([
  {
    id: "#2632",
    name: "Brooklyn Zoe",
    address: "302 Snider Street, RUTLAND, VT, 05701",
    instagram: "chopchops",
    date: 'hoy',
    status: "Pending",
  },
]);
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
          v-for="order in orders" 
          :key="order.id"
          class="container-table-body-items"
          >
					<td class="container-table-body-items-item">{{ order.id }}</td>
					<td class="container-table-body-items-item">{{ order.name }}</td>
					<td class="container-table-body-items-item">{{ order.instagram }}</td>
					<td class="container-table-body-items-item">{{ order.date }}</td>
					<td class="container-table-body-items-item">{{ order.status }}</td>
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
