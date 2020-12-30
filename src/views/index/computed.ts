
import { ref, computed } from 'vue'

export function useComputed (count: number) {
    const counter = ref(count)

    const plusOne = computed({
        get: () => counter.value + 1,
        set: val => {
            counter.value = val - 1
        }
    })

    return {
        plusOne
    }
}

