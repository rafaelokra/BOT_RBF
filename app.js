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
const listaDeItens = [
  "Kit transmissao titan 150",
  "Kit transmissao titan 160",
  "Kit transmissao Biz 125"
];



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
          'Na revisão  além da troca de óleo, são realizados diversos serviços de manutenção para garantir o bom funcionamento da moto, como Verificação e ajuste dos freios: Verificamos o desgaste das lonas de freio e, se necessário, realizamos a troca. Também ajustamos a regulagem para garantir uma frenagem eficiente e segura Verificação e limpeza do filtro de ar: Removemos o filtro de ar, o limpamos e o substituímos, caso necessário. Isso garante uma entrada de ar limpa para o motor, contribuindo para um bom desempenho. Verificação dos pneus: Verificamos a pressão dos pneus e a profundidade dos sulcos, garantindo a segurança e a aderência adequada Verificação da suspensão dianteira: Verificamos o nível do óleo da suspensão e, se necessário, realizamos a troca. Isso garante um melhor desempenho da suspensão. Verificação dos cabos e lubrificamos realizamos a troca se necessario'

      
        );
        break;
      case '2':
        sendResponse(
          client,
          message.from,
          'Trabalhamos atualmente com o óleo de motor da Motul. É um óleo de alta qualidade e recomendado para diversos modelos de motos.Gerar menos gases poluentes, Diminuir o consumo de combustível,  Aumentar a performance do motor e a potência'
        );
        break;
      case '3':
        sendResponse(
          client,
          message.from,
          'Trabalhamos com reparo de amortecedores traseiros. Realizamos o serviço de manutenção e reparo em amortecedores de diversos modelos, como Tornado, Bros, CRF 250 e 230. Utilizamos óleo próprio para suspensão e peças de alta qualidade. Se você estiver com algum problema no amortecedor da sua moto, podemos ajudar a resolver. Basta trazer sua moto até nossa oficina para que possamos avaliar e realizar o reparo necessário.'
        );
        break;
      case '4':
        sendResponse(
          client,
          message.from,
          'Nosso horário de funcionamento é de segunda a sexta-feira, das 8:00 às 18:00. Aos sábados, estamos abertos das 8:00 às 14:00. Estamos disponíveis para atendê-lo dentro desses horários. Se tiver alguma dúvida ou precisar agendar um serviço, fique à vontade para entrar em contato conosco durante nosso horário de funcionamento.'
        );
        break;
      case '5':
        sendResponse(client, message.from, `Aqui estão alguns itens:\n${listaDeItens.join('\n')}`);
        break;
      
      case '6':
        // Envia a localização da RBF Motos
        sendLocation(client, message.from);
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
// Função para enviar o menu como mensagens de texto
function sendMenu(client, recipient) {
  const menuOptions =
    'Escolha uma opção:\n' +
    '1. Revisao \n' +
    '2. Oleo motor\n' +
    '3. Reparo amortecedor\n' +
    '4. Horario de funcionamento?\n' +
    '5. itens?\n' +
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
