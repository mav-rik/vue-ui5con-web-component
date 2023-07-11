<script setup lang="ts">
defineProps<{ readonly?: boolean }>()
</script>


<template>
<div class="my-token-root"> 
	<slot></slot>
    <ui5-icon
        v-if="!readonly"
        name="decline"
        interactive
        @click="$emit('delete')"
    >
    </ui5-icon>
</div>
</template>


<style>
:host {
	display: inline-flex;
	color: var(--sapTextColor);
	background: var(--sapBaseColor);
	border: 1px solid var(--sapContent_ForegroundBorderColor);
	border-radius: 0.5rem;
	font-size: var(--sapFontSize);
	font-family: var(--sapFontFamily);
	padding: 0.3125rem;
}

:host(:hover) {
	background: var(--sapButton_Hover_Background);
	cursor: default;
}

.my-token-root {
	display: flex;
	align-items: center;
}

ui5-icon {
	color: var(--sapInformationColor);
	background: var(--sapHoverColor);
	border-radius: 50%;
	margin-inline-start: 0.5rem;
}

</style>