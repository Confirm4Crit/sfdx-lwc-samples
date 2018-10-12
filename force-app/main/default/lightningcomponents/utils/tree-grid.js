/** Unique id counter for lightning-tree-grid data ids. */
let id = 0;

/** Column descriptions for lightning-tree-grid. */
export const treeGridColumns = [
    { type: 'text', label: 'Key', fieldName: 'key' },
    { type: 'text', label: 'Value', fieldName: 'value' },
];

/**
 * Generate a lightning-tree-grid representation of a Javascript object.
 * @param {Object} o the object to convert.
 * @return {Object} tree-grid compatible data.
 */
export function objectToTreeGridData(o) {
    const keys = Object.keys(o);

    return keys.map(key => {
        id++;
        let value = o[key];

        // if an object/array, then recurse into the children
        let _children;
        if (value && typeof value === 'object') {
            _children = objectToTreeGridData(value);
            value = '';
        } else {
            value = value && value.toString ? value.toString() : '' + value;
        }

        // assemble this item
        const result = { key, value, id };
        // only add children if there are some
        if (_children && _children.length) {
            result._children = _children;
        }
        return result;
    });
}
