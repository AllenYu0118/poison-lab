import { customRef } from 'vue'

export function useDebouncedRef(value: string | number, delay = 2000) {
    let timeout:NodeJS.Timeout
    return customRef((track, trigger) => {
        return {
            get(): string | number {
                track()
                return value
            },
            set(newValue:  string | number) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    value = newValue
                    trigger()
                }, delay)
            }
        }
    })
}
