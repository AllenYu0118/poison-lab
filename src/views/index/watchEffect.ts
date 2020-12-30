
import { Ref, watchEffect } from 'vue'

export function useWatchEffect (ref: Ref) {
    watchEffect(() => {
        console.log(ref.value)
    })
}

