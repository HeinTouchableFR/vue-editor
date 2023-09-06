import {type EditorComponentData, type EditorComponentDefinitions, type EditorComponentTemplate} from "@/types";
import {defineStore} from "pinia";
import {state} from "vue-tsc/out/shared";
import {clamp} from "@/functions/number";
import {deepSet} from "@/functions/object";

export enum PreviewModes {
    PHONE,
    DESKTOP,
}

const sidebarWidth =
    typeof localStorage !== "undefined"
        ? localStorage.getItem("veSidebarWidth")
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
        ) as number,
    }),
    getters: {
    },
    actions: {
        updateData (newData: any, path?: string) {
            return this.data = deepSet(this.data, path, newData)
        }
    }
})