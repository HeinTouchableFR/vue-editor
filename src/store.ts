import {type EditorComponentData, type EditorComponentDefinitions, type EditorComponentTemplate} from "@/types";
import {defineStore} from "pinia";
import {clamp} from "@/functions/number";
import {deepSet, indexify} from "@/functions/object";
import {t} from '@/functions/i18n'


export enum PreviewModes {
    PHONE,
    DESKTOP,
}

const sidebarWidth =
    typeof localStorage !== "undefined"
        ? localStorage.getItem("sidebarWidth")
        : 0;

export const useStore = defineStore('vue-editor', {
    // arrow function recommended for full type inference
    state: () => ({
        data: [] as EditorComponentData[],
        definitions: {} as EditorComponentDefinitions,
        templates: [] as EditorComponentTemplate[],
        hiddenCategories: [] as string[],
        insertPosition: "" as InsertPosition,
        previousData: [] as EditorComponentData[],
        rollbackMessage: null as null | string,
        addBlockIndex: null as number | null,
        focusIndex: null as null | string,
        previewMode: PreviewModes.DESKTOP as PreviewModes,
        sidebarWidth: clamp(
            sidebarWidth ? parseInt(sidebarWidth, 10) : 33,
            0,
            window.innerWidth - 375
        ) + 'vw' as string,
    }),
    getters: {
        getData(store) {
            return store.data
        }
    },
    actions: {
        updateData(newData: any, path?: string) {
            return this.data = deepSet(this.data, path, newData)
        },
        togglePreviewMode() {
            this.previewMode = this.previewMode === PreviewModes.DESKTOP
                ? PreviewModes.PHONE
                : PreviewModes.DESKTOP
        },
        setData(newData: Omit<EditorComponentData, "_id">[]): void {
            this.data = (indexify(newData) as EditorComponentData[])
            this.focusIndex = null
        },
        removeBloc (removedData: EditorComponentData) {
            this.previousData = this.data
            this.rollbackMessage = t("deleteItemConfirm")
            this.data =  this.data.filter((d) => d !== removedData)
        },
    }
})