document.getElementById('send-button').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        let chatLog = document.getElementById('chat-log');
        let userMessage = document.createElement('div');
        userMessage.textContent = 'Usuario: ' + userInput;
        chatLog.appendChild(userMessage);

        let botResponse = document.createElement('div');
        botResponse.textContent = 'Bot: ' + generateBotResponse(userInput);
        chatLog.appendChild(botResponse);

        document.getElementById('user-input').value = '';
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});

function generateBotResponse(input) {
    // Normalizar el input del usuario para ignorar mayúsculas y tildes
    let normalizedInput = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // Expresiones regulares para capturar variaciones en las preguntas
    const responses = [
        { pattern: /hola|buenos dias|buenas tardes|buenas noches/, response: '¡Hola! ¿Cómo puedo ayudarte?' },
        { pattern: /precio|costo|cuanto cuesta/, response: 'El lavado básico cuesta $10. ¿Te gustaría programar una cita?' },
        { pattern: /adios|chau|hasta luego/, response: '¡Adiós! Que tengas un buen día.' },
        { pattern: /registrarme|cómo me puedo registrar|como registrarme/, response: 'Puedes registrarte llenando el formulario en la sección de "Registrar Cita" con tu nombre, correo, teléfono, fecha y hora.' },
        { pattern: /ayúdame a registrarme|ayudame a registrarme|ayúdame|ayudame/, response: 'Claro, ve a la sección de "Registrar Cita", llena todos los campos requeridos y presiona "Programar Cita".' },
        { pattern: /métodos de pago|metodos de pago|pago|formas de pago|formas pago/, response: 'Aceptamos pagos en efectivo, tarjeta de crédito y débito, y transferencias bancarias.' }
    ];

    // Buscar la respuesta en las respuestas predefinidas
    for (let i = 0; i < responses.length; i++) {
        if (responses[i].pattern.test(normalizedInput)) {
            return responses[i].response;
        }
    }

    return 'Lo siento, no entiendo tu pregunta. ¿Puedes reformularla?';
}
