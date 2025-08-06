export default {
  getQuotes: async () => {
    const startOfDay = new Date(new Date().setUTCHours(0,0,0,0)).toISOString()
    const endOfDay = new Date(new Date().setUTCHours(23,59,59,999)).toISOString()

    const response = await fetch(`https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=${startOfDay}&departure_date_to=${endOfDay}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  },
  getTrip: async (id: string) => {
    const response = await fetch(`https://api.ember.to/v1/trips/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch trip')
    }
    return response.json()
  }
}