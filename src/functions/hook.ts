import {onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import type {EditorComponentData} from "@/types";
import {debounce} from "@/functions/timers";

export function useToggle(
    initialValue: boolean = false,
) {
    const value = ref(initialValue)

    function toggle() {
        value.value = !value.value
    }

    return [value, toggle] as const
}

export function useState<T>(initialValue: any) {
    const value = ref<T>(initialValue)

    function set(newValue: any) {
        value.value = newValue
    }

    return [value, set] as const
}

export function useEffectDebounced(
    callback: Function,
    deps: any[],
    time: number,
) {
    const callbackRef = ref<Function>(callback)
    const debouncedCallback = () => {
        return debounce((...args: any[]) => callbackRef.value(...args), time)
    }
    callbackRef.value = callback

    watchEffect(debouncedCallback)
}

export function usePreview(
    data: EditorComponentData,
    previewUrl: string,
    initialHTML: string,
): { loading: boolean; html: string } {
    const [loading, setLoading] = useState(false)
    const [html, setHTML] = useState(initialHTML)
    const isFirstRender = ref(!!initialHTML)

    const callback = () => {
        if (isFirstRender.value) {
            isFirstRender.value = false
            return
        }
        const timer = window.setTimeout(() => setLoading(true), 200)
        fetch(previewUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ ...data, preview: true }),
        })
            .then(r => r.text())
            .then(setHTML)
            .finally(() => {
                clearTimeout(timer)
                setLoading(false)
            })
        return () => clearTimeout(timer)
    }

    useEffectDebounced(
        callback,
        [data],
        500,
    )
    return {
        loading,
        html,
    }
}