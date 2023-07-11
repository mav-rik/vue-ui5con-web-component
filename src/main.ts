import './Assets'
import './assets/main.css'

import Icon from "@ui5/webcomponents/dist/Icon.js"
import "@ui5/webcomponents-icons/dist/decline.js"
import "@ui5/webcomponents-icons/dist/show.js"
import "@ui5/webcomponents-icons/dist/hide.js"

import { registerVueComponent } from './vue-utils'

Icon.define()

import tokenizer from './components/tokenizer.ce.vue'
import token from './components/token.ce.vue'
registerVueComponent('my-tokenizer', tokenizer)
registerVueComponent('my-token', token)

