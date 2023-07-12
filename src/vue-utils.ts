/**
 * Needed to come up with a few workarounds when working
 * with WebComponents from Vue
 */
import { defineCustomElement, getCurrentInstance, onMounted, ref, useSlots, computed, type VNode } from 'vue'

export function registerVueComponent(name: string, vueComponent: Parameters<typeof defineCustomElement>[0]) {
    customElements.define(name, defineCustomElement(vueComponent))
}

/**
 * Vue does not cover slots when used from WebComponent
 * (issue https://github.com/vuejs/core/issues/8734)
 * 
 * I fixed it with this workaround
 */
export function useSlot() {
    const instance = getCurrentInstance()
    const slot = ref<VNode[] | HTMLCollection | undefined>()
    if (instance) {
        onMounted(() => {
            const root = instance.root.vnode.el
            const isWebComponent = root?.parentNode instanceof ShadowRoot
            if (!isWebComponent) {
                const slots = useSlots()
                slot.value = slots.default && slots.default()
            } else if (root) {
                const host = root.parentNode.host as HTMLElement
                slot.value = host.children
            }
        })
    }
    return slot
}

/**
 * Since Vuejs stands for one-way data flow
 * it's not a good practice to change root node attributes
 * which can be represented as a model.
 * 
 * With this workaround I was able to mimic
 * UI5 behavior with changing root attributes.
 */
export function useHostAttribute(name: string) {
    const instance = getCurrentInstance()
    function getRoot() {
        const root = instance?.root.vnode.el
        if (root?.parentNode instanceof ShadowRoot) {
            return root.parentNode.host as HTMLElement
        } else {
            return root as HTMLElement
        }
    }
    const innerRef = ref<string | boolean>()
    onMounted(() => {
        const root = getRoot()
        if (root) {
            const has = root.hasAttribute(name)
            const val = root.getAttribute(name)
            innerRef.value = val || has
            const observer = new MutationObserver((mutationsList) => {
                // Handle attribute changes
                for (const mutation of mutationsList) {
                  if (mutation.type === 'attributes' && mutation.attributeName === name) {
                    const has = root.hasAttribute(name)
                    const val = root.getAttribute(name)
                    innerRef.value = val || has
                  }
                }
              })
              const config = { attributes: true };
              observer.observe(root, config);
        }
    })
    return computed({
        set: (value?: string | boolean) => { 
            innerRef.value = value
            if (typeof value === 'boolean') {
                if (value) getRoot()?.setAttribute(name, '')
                else getRoot()?.removeAttribute(name)
            } else if (typeof value === 'string') {
                getRoot()?.setAttribute(name, value)
            } else {
                getRoot()?.removeAttribute(name)
            }
        },
        get: () => innerRef.value,
    })
}