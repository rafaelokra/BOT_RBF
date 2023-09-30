const wppconnect = require('@wppconnect-team/wppconnect');




// Função para criar a sessão do WhatsApp
async function createWhatsAppSession() {
  try {
    const client = await wppconnect.create({
      session: 'sessionName',
      catchQR: handleQRCode,
      logQR: false,
    });

    start(client); // Inicia a função start quando a sessão é criada
  } catch (error) {
    console.error('Erro ao criar a sessão:', error);
  }
}

// Função para lidar com o código QR
function handleQRCode(base64Qr, asciiQR) {
  console.log(asciiQR); // Exibe o código QR no terminal
  saveQRCodeImage(base64Qr);
}

// Função para salvar a imagem do código QR
function saveQRCodeImage(base64Qr) {
  const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches && matches.length === 3) {
    const [, type, data] = matches;
    const imageBuffer = new Buffer.from(data, 'base64');

    fs.writeFile('out.png', imageBuffer, 'binary', (err) => {
      if (err) {
        console.error('Erro ao salvar o código QR:', err);
      }
    });
  } else {
    console.error('Código QR inválido.');
  }
}

// Função para iniciar o chatbot
function start(client) {
  client.onMessage((message) => {
    const userMessage = message.body.toLowerCase();

    switch (userMessage) {
      case 'menu':
        sendMenu(client, message.from);
        break;
      case '1':
        sendResponse(
          client,
          message.from,
          'Você precisa ter uma CNH A (para motos) em dia com menos de 40 pontos. Também é possível alugar com habilitação provisória.'
        );
        break;
      case '2':
        sendResponse(
          client,
          message.from,
          'Documentos Necessários:\n- Carteira de Motorista Válida\n- Comprovante de Endereço'
        );
        break;
      case '3':
        sendResponse(
          client,
          message.from,
          'O valor do caução é R$ 600, esse valor é uma garantia em caso de danos à moto ou atrasos no pagamento.'
        );
        break;
      case '4':
        sendResponse(
          client,
          message.from,
          'Quais modelos de motocicleta estão disponíveis para aluguel?\n- Honda Pop 110\n- Honda Start 160'
        );
        break;
      case '5':
        sendResponse(
          client,
          message.from,
          'Sim, oferecemos descontos especiais para aluguel de longo prazo. Entre em contato conosco para discutir as opções disponíveis.'
        );
        break;
      case '6':
        // Envia a localização da RBF Motos
        sendLocation(client, message.from);
        break;
      case '7':
        sendResponse(
          client,
          message.from,
          'Forneceremos um número de contato de emergência no momento da reserva. Você pode nos contatar a qualquer momento em caso de problemas ou emergências.'
        );
        break;
      case '8':
        sendResponse(
          client,
          message.from,
          'Para fazer uma reserva de moto, entre em contato conosco pelo telefone (71992724383).'
        );
        break;
      default:
        sendResponse(
          client,
          message.from,
          'Olá! Bem-vindo à RBF Motos, sua Oficina  de motos favorita.  Envie "menu" para ver as opções disponíveis');
        break;
    }
  });
}

// Função para enviar o menu como mensagens de texto
function sendMenu(client, recipient) {
  const menuOptions =
    'Escolha uma opção:\n' +
    '1. Revisao \n' +
    '2. Oleo motor\n' +
    '3. Reparo amortecedor\n' +
    '4. Horario de funcionamento?\n' +
    '5. Kits transmissao?\n' +
    '6. Localização\n' +
    '7. Outro\n' +
    '8. Fala  diretamente com Rafael\n'+
    '9. Olá, como você está?';

  sendResponse(client, recipient, menuOptions);
}

// Função para enviar uma resposta
function sendResponse(client, recipient, response) {
  client
    .sendText(recipient, response)
    .then((result) => {
      console.log('Mensagem enviada com sucesso:', result);
    })
    .catch((error) => {
      console.error('Erro ao enviar mensagem:', error);
    });
}

// Função para enviar a localização
function sendLocation(client, recipient) {
  client
    .sendLocation(recipient, '-12.701761', '-38.335233', 'RBF Motos, Brasil')
    .then((result) => {
      console.log('Localização enviada com sucesso:', result);
    })
    .catch((error) => {
      console.error('Erro ao enviar localização:', error);
    });
}

// Inicia a sessão do WhatsApp quando o script é executado
createWhatsAppSession();