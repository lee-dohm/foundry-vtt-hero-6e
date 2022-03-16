/**
 * Returns the formatted HTML to render a named FontAwesome icon.
 *
 * The name can be given either with or without the `fa-` prefix.
 *
 * @param name Name of the icon to render
 * @returns HTML string to render the named icon
 */
export function faIcon(name) {
    return icon('fa', name);
}
/**
 * Returns the formatted HTML to render a named FontAwesome icon.
 *
 * The name can be given either with or without the `fa-` prefix.
 *
 * @param name Name of the icon to render
 * @returns HTML string to render the named icon
 */
export function fasIcon(name) {
    return icon('fas', name);
}
function icon(prefix, name) {
    const iconName = name.startsWith('fa-') ? name : `fa-${name}`;
    return `<i class="${prefix} ${iconName}"></i>`;
}
//# sourceMappingURL=icon-helpers.js.map