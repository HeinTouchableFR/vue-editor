import {ref} from "vue";

export function useToggle(
    initialValue: boolean = false,
) {
    const value = ref(initialValue)

    function toggle() {
        value.value = !value.value
    }

    return [value, toggle] as const
}

export function useState(initialValue: any) {
    const value = ref(initialValue)

    function set(newValue: any) {
        value.value = newValue
    }

    return [value, set] as const
}