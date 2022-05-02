

export const shortenAddress = (address) => {
    const shortAddress = address.slice(0, 5) + '...' + address.slice(-4)
    return shortAddress
}