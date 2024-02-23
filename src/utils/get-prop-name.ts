function getPropName<T extends object>(obj: T, propValue: T[keyof T]) {
  for (const propName in obj) {
    if (obj.hasOwnProperty(propName) && obj[propName] === propValue) {
      return propName
    }
  }
  throw new Error("Property not found in object")
}
