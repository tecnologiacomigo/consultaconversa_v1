// Este arquivo foi removido pois não estamos mais usando Supabase
export const getContactAnalytics = async (phone) => {
  return {
    total_messages: 0,
    avg_message_length: 0,
    response_time_hours: 0,
    most_active_hour: 0
  }
}

export const getContactWithHistory = async (phone) => {
  return {
    contact_info: {},
    messages: []
  }
}

export const updateContactData = async (phone, contactData) => {
  return contactData
}
