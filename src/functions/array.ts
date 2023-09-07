export const applyDrag = (arr: any, dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}

export function insertItem<T extends Array<any>>(
    items: T,
    index: number,
    value: any
) {
    const clone = [...items];
    clone.splice(index, 0, value)
    return clone
}