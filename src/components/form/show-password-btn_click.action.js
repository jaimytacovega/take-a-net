const click = ({ e, srcElement }) => {
    const passwordInput = srcElement?.parentNode?.querySelector('[data-input-password]')
    const type = passwordInput?.type
    if (passwordInput) passwordInput.type = type === 'password' ? 'text' : 'password'

    const img = srcElement?.querySelector('img')
    const imgSrc = img?.src
    const isOff = imgSrc?.includes('eye-off')
    img.src = imgSrc?.replace(`eye${isOff ? '-off' : ''}`, `eye${isOff ? '' : '-off'}`)
}

export {
    click,
}