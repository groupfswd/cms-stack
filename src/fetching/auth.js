import BASE_URL from "@/lib/baseUrl"

export async function auth(params) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
  }
}