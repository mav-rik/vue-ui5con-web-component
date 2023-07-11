# vue-vs-ui5

Inspired by [UI5 Web Components](https://github.com/ilhan007/ui5con-web-component) example.

Here I try to use vuejs to re-create similar ui5 components (token and tokenizer) as in the example.

## Run

```bash
npm install
npm run dev
```

## Coding

I didn't invest too much time to investigation of how to properly prepare ui5 theme assets, I just copied it from the original example already prebuilt.

### Token Component

In vue SFC it looks quite different to UI5 version, at the same time it has vue flexibility.
```html
<script setup lang="ts">
// ./src/components/token.ce.vue
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
```
