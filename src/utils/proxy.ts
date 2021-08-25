// 针对嵌套的引用类型优化
export const observe = data => {
  if (!data || typeof data !== 'object') return false

  Object.keys(data).forEach(key => {
    let currentVal = data[key]

    observe(currentVal)

    if (typeof currentVal === 'object') {
      data[key] = new Proxy(currentVal, {
        set(target, property, value, receiver) {
          if (property !== 'length') {
            console.log(`setting ${key} value now, settting value is`, currentVal)
          }

          return Reflect.set(target, property, value, receiver)
        },
      })
    } else {
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
          return currentVal
        },
        set(newVal) {
          currentVal = newVal
        },
      })
    }
  })
}
