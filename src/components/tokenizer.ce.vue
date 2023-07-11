<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSlot, useHostAttribute } from '../vue-utils'
defineProps<{ showAll?: boolean }>()
const root = ref<HTMLDivElement>()
const slot = useSlot()
const hasOverflowTokens = computed(() => (slot.value?.length || 0) > 3)
const showAll = useHostAttribute('show-all')
const activeIcon = computed(() => showAll.value ? 'hide' : 'show')
</script>


<template>
    <div class="root" :class="{ showAll }" ref="root">
        <div class="overflow-area">
            <slot></slot>
        </div>
        <ui5-icon v-if="hasOverflowTokens" interactive :name="activeIcon" @click="showAll = !showAll"></ui5-icon>
    </div>
</template>


<style>
:host {
	display: inline-flex;
	border: 0.0625rem solid var(--sapContent_ForegroundBorderColor);
	border-radius: 0.375rem;
	padding: 0.5rem;
	position: relative;
	box-sizing: border-box;
}

.root {
	display: flex;
	align-items: center;
}

.overflow-area {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	overflow: hidden;
	gap: 0.5rem;
}

ui5-icon {
	margin-inline-start: 0.5rem;
	flex-shrink: 0;
}

::slotted(my-token:nth-child(n + 4)) {
	display: none;
}

:host([show-all]) ::slotted(my-token) {
	display: inline-flex;
}
</style>