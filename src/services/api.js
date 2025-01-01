const BASE_URL = 'https://code.clube.ai/webhook/infrasistema';

export const searchContact = async (phone) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Tenta parsear o JSON
    let data;
    try {
      const text = await response.text();
      
      // Tenta parsear como JSON
      try {
        data = JSON.parse(text);
      } catch {
        // Se falhar, tenta extrair o summary manualmente
        const summaryMatch = text.match(/"summary":\s*"([^"]+)"/);
        data = {
          summary: summaryMatch ? summaryMatch[1] : 'Resumo não disponível'
        };
      }
    } catch (error) {
      console.error('Error parsing response:', error);
      throw new Error('Erro ao processar a resposta do servidor');
    }

    return {
      profile: {
        name: 'Contato',
        status: 'Online',
        profilePicture: ''
      },
      messages: [],
      summary: data.summary || 'Resumo não disponível',
      id: phone
    };
  } catch (error) {
    console.error('Error searching contact:', error);
    throw error;
  }
};
