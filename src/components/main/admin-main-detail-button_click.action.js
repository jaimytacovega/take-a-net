const click = ({ e, srcElement }) => {
    const summary = srcElement?.parentNode
    summary.click()
}

export {
    click,
}