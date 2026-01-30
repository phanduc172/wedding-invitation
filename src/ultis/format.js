// Regex format số tiền: 3000 -> 3.000
export const formatPrice = (value) => {
    if (value === null || value === undefined) return ''

    // đảm bảo là số
    const number = Number(value)
    if (isNaN(number)) return value

    // thêm dấu chấm ngăn cách hàng nghìn
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
