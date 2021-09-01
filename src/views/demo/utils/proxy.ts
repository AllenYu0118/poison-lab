export const proxyDemo = () => {
  const person = {
    like: 'vuejs',
  }

  const obj = new Proxy(person, {
    get(target, propKey) {
      if (propKey in target) {
        console.log('propKey: ', propKey)
        return target[propKey]
      } else {
        throw new ReferenceError(`Prop name ${String(propKey)} does not exist.`)
      }
    },
  })

  return obj
}
