<script setup>
import CrushHeader from "@nabux-crush/crush-header";

import logo from '@/assets/fudi-bot-logo.png'

import { webMenuItems } from "@/utils/menuItems";
</script>

<template>
	<header class="header">
		<CrushHeader
			:brandName="'fudibot'"
			:logoSrc="logo"
		>
			<template #menu-buttons="{ toggleMenu }">
				<a
					v-for="(item, index) in webMenuItems"
					:key="index"
					:href="item.link"
					class="header-buttons-button"
					@click="toggleMenu"
				>
					{{ item.name }}
				</a>
			</template>
		</CrushHeader>
	</header>
</template>

<style lang="scss" scoped>
.header {
  :deep(.header) {
    background-color: $white;
  }
  :deep(.header-buttons) {
    font-family: $primary-font;
  }
  :deep(.header-buttons-button) {
    font-family: $primary-font;
    text-decoration: none;
  }
}
</style>