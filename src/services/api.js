const BASE_URL = process.env.VUE_APP_API_BASE_URL
const USER_KEY = process.env.VUE_APP_API_USER_KEY
const LIB_KEY = process.env.VUE_APP_API_LIB

export async function fetchSheet(sheet) {
    const params = new URLSearchParams({
        user_content_key: USER_KEY,
        lib: LIB_KEY,
        sheet
    })

    const url = `${BASE_URL}?${params.toString()}`

    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Google Sheet API error')
    }

    return await res.json()
}
