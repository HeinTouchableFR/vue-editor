import {createApp} from "vue";
import VueEditor from "@/components/VueEditor.vue";

import {
    type EditorComponentData,
    type EditorComponentDefinition,
    type EditorComponentDefinitions,
    type EditorComponentTemplate,
    type Translation
} from "@/types";
import {InsertPosition} from "@/enum";

import {Translations as EN} from '@/langs/en'
import {Translations as FR} from '@/langs/fr'

import {fillDefaults} from "@/functions/fields";
import {indexify} from "@/functions/object";
import {jsonFetchOrFlash} from "@/functions/api";
import {createPinia} from "pinia";

const components: EditorComponentDefinitions = {}
const templates: EditorComponentTemplate[] = []

export class VisualEditor {
    static i18n: Translation = EN

    jsonFetchOrFlash = jsonFetchOrFlash

    constructor(options: { lang?: Translation } = {}) {
        VisualEditor.i18n = options.lang || EN
    }

    toFrench() {
        VisualEditor.i18n = FR
    }

    toEnglish() {
        VisualEditor.i18n = EN
    }

    onBrowse = async () => {
        function setAttachment(attachment: any) {
            const changeEvent = document.createEvent('HTMLEvents')
            changeEvent.initEvent('change', false, true)
            return attachment.id
        }

        return new Promise(function (resolve) {
            const modal = document.createElement('modal-dialog')
            modal.style.zIndex = '20000'
            modal.setAttribute('overlay-close', 'overlay-close')
            const fm = document.createElement('file-manager')
            fm.setAttribute('data-endpoint', '/admin/attachment')
            modal.appendChild(fm)
            fm.addEventListener('file', (e: any) => {
                resolve(setAttachment(e.detail))
                //@ts-ignore
                modal.close()
            })
            document.body.appendChild(modal)
        })
    }

    defineElement(elementName: string = 'editor-builder') {

        class EditorElement extends HTMLElement {
            static changeEventName = 'change'
            private _mounted: boolean = false
            private _data: EditorComponentData[] | null = null

            static get observedAttributes() {
                return ['hidden', 'value']
            }

            private _value = ''

            get value(): string {
                return this._value
            }

            set value(v: string) {
                if (v === this._value) {
                    return
                }
                this._value = v
                this._data = null
                this.renderComponent()
            }

            connectedCallback() {
                this._value = this.getAttribute('value') || '[]'
                this.renderComponent()
                this._mounted = true
            }

            attributeChangedCallback(
                name: string,
                oldValue?: string,
                newValue?: string,
            ) {
                if (!this._mounted) {
                    return false
                }
                // Si la valeur change, on réinitialise la version traduite du JSON
                if (name === 'value') {
                    // Saute le nouveau rendu si la valeur n'est pas nouvelle
                    if (newValue === this._value) {
                        return
                    }
                    this._value = newValue!
                }
                this.renderComponent()
            }

            disconnectedCallback() {
                this._mounted = false
            }

            private parseValue(value: string): EditorComponentData[] {
                if (this._data === null) {
                    try {
                        const json = JSON.parse(value)
                        this._data = indexify(json).map((value: EditorComponentData) => {
                            return fillDefaults(value, components[value._name]?.fields ?? [])
                        })
                    } catch (e) {
                        console.error('Impossible de parser les données', value, e)
                        alert("Impossible de parser les données de l'éditeur visuel")
                        this._data = []
                    }
                }
                return this._data!
            }

            private renderComponent() {
                const data = this.parseValue(this._value)
                const hiddenCategories =
                    this.getAttribute('hidden-categories')?.split(';') ?? []

                const pinia = createPinia();

                const app = createApp(VueEditor, {
                    data: data,
                    definitions: components,
                    templates: templates,
                    hiddenCategories: hiddenCategories,
                    insertPosition: (this.getAttribute('insertPosition') ??
                        InsertPosition.Start) as InsertPosition
                })

                app.use(pinia)
                app.mount(this)
            }
        }

        customElements.define(elementName, EditorElement)
    }

    registerComponent(name: string, definition: EditorComponentDefinition) {
        components[name] = {label: 'title', ...definition}
    }

    registerTemplate(template: EditorComponentTemplate) {
        templates.push(template)
    }
}
