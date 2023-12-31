const express = require('express');
// const configurarRotas = require('./rotas');
const jwt = require('jsonwebtoken');
const SECRET = 'secret';
const path = require('path');
// Se necessário, inclua a extensão do arquivo
const config = require('./config_modelo.js');

const Paciente = require('../back/modelos/Paciente');
 const Medico = require('../back/modelos/Medico');
const Enfermeiro = require('../back/modelos/Enfermeiro');
const Agendamentos = require('../back/modelos/Agendamentos');

// const Agendamento = require('./back/modelos/Agendamento');

const app = express();
const port = 3000;

// Configure a conexão com o banco de dados
// Configure a conexão com o banco de dados usando o sequelize importado

// Middleware para processar dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos, incluindo o CSS
app.use(express.static(path.join(__dirname, '/public')));

// Rota para a página inicial
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'));
 });

 // Rota para a página de cadastro
 app.get('/cadastro', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/cadastro.html'));
 });

 // Rota para a página de cadastro médico
 app.get('/cadastro-medico', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/cadastromedico.html'));
 });

 // Rota para a página de castro Enfermeiro
 app.get('/cadastro-enfermeiro', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/cadastroenfermeiro.html'));
 });

 // Rota para a página de login
 app.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/login.html'));
 });

 // Rota para a página de login médico
 app.get('/loginMedico', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/loginMedico.html'));
 });


 // Rota para a página de login enfermeiro
 app.get('/loginEnfermeiro', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/loginEnfermeiro.html'));
 });

// // Rota para a página de recuperação de senha
 app.get('/recuperar-senha', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/recuperar-senha.html'));
 });

// // Rota para a página de busca
 app.get('/busca', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/busca.html'));
 });

// // Rota para a página de medicamentos
 app.get('/medicamentos', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/medicamentos.html'));
 });

// // Rota para a página de agendamentos
 app.get('/agendamentos', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/agendamentos.html'));
 });

// // Rota para a página de marcar consulta
 app.get('/marcar-consulta', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/marcarconsulta.html'));
 });

// // Rota para a página de perfil do paciente
 app.get('/perfilPaciente', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/perfilPaciente.html'));
 });

// // Rota para a página de atendimento do medico
 app.get('/perfil-medico', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/atendimentoMedico.html'));
 });

// // Rota para a página de fila de atendimento do enfermeiro
 app.get('/perfil-enfermeiro', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/filaEnfermeiro.html'));
 });

// Rota de exemplo que requer autenticação
app.get('/rota-protegida', verificarToken, (req, res) => {
  // Esta rota requer autenticação; o paciente está autenticado
  res.json({ mensagem: 'Rota protegida acessada com sucesso' });
});


// Rota para a requisição de novo cadastro de paciente
app.post("/cadastrar-paciente", async (req, res) => {
  try {
    const { nome, email, senha, convenio, sus, rua, numero, cep, cidade, estado, rg, cpf, concordouCheckbox } = req.body;

    // Faça as validações necessárias antes de criar o paciente

    // Crie o paciente com os dados extraídos
    const novoPaciente = await Paciente.create({
      nome,
      email,
      senha,
      convenio,
      sus,
      rua,
      numero,
      cep,
      cidade,
      estado,
      rg,
      cpf,
      concordou: concordouCheckbox === 'on', // checkbox é enviado apenas se marcado
    });

     // Após o cadastro bem-sucedido, redirecione para a página de login
  res.redirect('/login');
} catch (error) {
  console.error("Erro ao cadastrar paciente:", error);

  // Mantenha mensagens de erro consistentes
  return res.status(400).json({
    erro: true,
    mensagem: "Erro ao cadastrar paciente. Verifique os dados e tente novamente.",
  });
}
});
// Rota para a requisição de novo cadastro de medico
app.post("/cadastrar-medico", async (req, res) => {
  try {
    const { nome, email, senha, crm, especialidade, concordouCheckbox } = req.body;

    // Faça as validações necessárias antes de criar o paciente

   // Crie o paciente com os dados extraídos
   const novoMedico = await Medico.create({
    nome,
    email,
    senha,
    crm,
    especialidade,
    concordou: concordouCheckbox === 'on', // checkbox é enviado apenas se marcado
  });

  // Após o cadastro bem-sucedido, redirecione para a página de login do médico
  res.redirect('/loginMedico');
} catch (error) {
  console.error("Erro ao cadastrar médico:", error);

  // Mantenha mensagens de erro consistentes
  return res.status(400).json({
    erro: true,
    mensagem: "Erro ao cadastrar médico. Verifique os dados e tente novamente.",
  });
}
});

// Rota para a requisição de novo cadastro de Enfermeiro
app.post("/cadastrar-enfermeiro", async (req, res) => {
  try {
    const { nome, email, senha, coren, concordouCheckbox } = req.body;

    // Faça as validações necessárias antes de criar o paciente

   // Crie o paciente com os dados extraídos
   const novoEnfermeiro = await Enfermeiro.create({
    nome,
    email,
    senha,
    coren,
    concordou: concordouCheckbox === 'on', // checkbox é enviado apenas se marcado
  });

  // Após o cadastro bem-sucedido, redirecione para a página de login do enfermeiro
  res.redirect('/loginEnfermeiro');
} catch (error) {
  console.error("Erro ao cadastrar enfermeiro:", error);

  // Mantenha mensagens de erro consistentes
  return res.status(400).json({
    erro: true,
    mensagem: "Erro ao cadastrar enfermeiro. Verifique os dados e tente novamente.",
  });
}
});

// Rota de login
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Procurar o paciente no banco de dados pelo email
    const paciente = await Paciente.findOne({
      where: { email },
    });

    // Se o paciente não for encontrado, retorne um erro
    if (!paciente) {
      return res.status(400).json({
        erro: true,
        mensagem: "Email não encontrado. Verifique os dados e tente novamente.",
      });
    }

    // Verifique se a senha corresponde à senha no banco de dados
    if (paciente.senha !== senha) {
      return res.status(400).json({
        erro: true,
        mensagem: "Senha incorreta. Verifique os dados e tente novamente.",
      });
    }

    // Gere um token de autenticação
    const token = jwt.sign({ pacienteId: paciente.id }, SECRET); // Use o segredo definido

    // Envie o token no corpo da resposta
    return res.json({
      erro: false,
      mensagem: "Login efetuado com sucesso",
      paciente,
      token, // Envie o token
    });
  } catch (error) {
    console.error("Erro no login:", error);

    // Mantenha mensagens de erro consistentes
    return res.status(400).json({
      erro: true,
      mensagem: "Erro no login. Verifique os dados e tente novamente.",
    
    });
  }
});

// Rota de login para médico
app.post('/login-medico', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Procurar o médico no banco de dados pelo email
    const medico = await Medico.findOne({
      where: { email },
    });

    // Se o médico não for encontrado, retorne um erro
    if (!medico) {
      return res.status(400).json({
        erro: true,
        mensagem: "Email não encontrado. Verifique os dados e tente novamente.",
      });
    }

    // Verifique se a senha corresponde à senha no banco de dados
    if (medico.senha !== senha) {
      return res.status(400).json({
        erro: true,
        mensagem: "Senha incorreta. Verifique os dados e tente novamente.",
      });
    }

    // Gere um token de autenticação
    const token = jwt.sign({ medicoId: medico.id }, SECRET);

    // Envie o token no corpo da resposta
    return res.json({
      erro: false,
      mensagem: "Login efetuado com sucesso",
      medico,
      token,
    });
  } catch (error) {
    console.error("Erro no login médico:", error);
    return res.status(400).json({
      erro: true,
      mensagem: "Erro no login médico. Verifique os dados e tente novamente.",
    });
  }
});

// Rota de login para enfermeiro
app.post('/login-enfermeiro', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Procurar o enfermeiro no banco de dados pelo email
    const enfermeiro = await Enfermeiro.findOne({
      where: { email },
    });

    // Se o enfermeiro não for encontrado, retorne um erro
    if (!enfermeiro) {
      return res.status(400).json({
        erro: true,
        mensagem: "Email não encontrado. Verifique os dados e tente novamente.",
      });
    }

    // Verifique se a senha corresponde à senha no banco de dados
    if (enfermeiro.senha !== senha) {
      return res.status(400).json({
        erro: true,
        mensagem: "Senha incorreta. Verifique os dados e tente novamente.",
      });
    }

    // Gere um token de autenticação
    const token = jwt.sign({ enfermeiroId: enfermeiro.id }, SECRET);

    // Envie o token no corpo da resposta
    return res.json({
      erro: false,
      mensagem: "Login efetuado com sucesso",
      enfermeiro,
      token,
    });
  } catch (error) {
    console.error("Erro no login enfermeiro:", error);
    return res.status(400).json({
      erro: true,
      mensagem: "Erro no login enfermeiro. Verifique os dados e tente novamente.",
    });
  }
});


// Middleware de verificação de token (jwt.verify)
function verificarToken(req, res, next) {
  const token = req.headers.authorization; // Recupere o token do cabeçalho

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], SECRET, (err, decoded) => { // Use o mesmo segredo aqui
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Token válido, o paciente está autenticado
    req.pacienteId = decoded.pacienteId;
    next();
  });
}

// Rota para a página de perfil do médico
app.get('/perfil-medico', verificarTokenMedico, (req, res) => {
  // Esta rota requer autenticação; o médico está autenticado
  res.sendFile(path.join(__dirname, '/public/perfilMedico.html'));
});

// Rota para a página de perfil do enfermeiro
app.get('/perfil-enfermeiro', verificarTokenEnfermeiro, (req, res) => {
  // Esta rota requer autenticação; o enfermeiro está autenticado
  res.sendFile(path.join(__dirname, '/public/perfilEnfermeiro.html'));
});

// Middleware de verificação de token para médico (jwt.verify)
function verificarTokenMedico(req, res, next) {
  const token = req.headers.authorization; // Recupere o token do cabeçalho

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Token válido, o médico está autenticado
    req.medicoId = decoded.medicoId;
    next();
  });
}

// Middleware de verificação de token para enfermeiro (jwt.verify)
function verificarTokenEnfermeiro(req, res, next) {
  const token = req.headers.authorization; // Recupere o token do cabeçalho

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Token válido, o enfermeiro está autenticado
    req.enfermeiroId = decoded.enfermeiroId;
    next();
  });
}

// Rota para marcar uma nova consulta
app.post('/marcar-consulta', verificarToken, async (req, res) => {
  try {
    const { data, hora, especialidade } = req.body;

    // Recupere o ID do paciente do token
    const pacienteId = req.pacienteId;

    // Combine a data e a hora em um formato de data e hora
    const dataConsulta = new Date(data + ' ' + hora);

    // Validação da data e hora
    const dataHoraAtual = new Date();
    if (dataConsulta <= dataHoraAtual) {
      return res.status(400).json({
        erro: true,
        mensagem: 'A data e hora da consulta devem ser futuras.',
      });
    } 

    // Verifique a disponibilidade da data e hora
    const consultaExistente = await Agendamento.findOne({
      where: {
        data_consulta: dataConsulta,
      },
    });

    if (consultaExistente) {
      return res.status(400).json({
        erro: true,
        mensagem: 'Já existe uma consulta marcada para esta data e hora.',
      });
    }

    // Inserir os dados da consulta na tabela "Agendamentos"
    const novoAgendamento = await Agendamento.create({
      paciente_id: pacienteId,
      data_consulta: dataConsulta,
      especialidade,
    });

    return res.json({
      erro: false,
      mensagem: 'Consulta marcada com sucesso',
      agendamento: novoAgendamento,
    });
  } catch (error) {
    console.error('Erro ao marcar consulta:', error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao marcar consulta. Verifique os dados e tente novamente.',
    });
  }
});

// Rota para listar todas as consultas agendadas
app.get('/consultas-agendadas', verificarToken, async (req, res) => {
  try {
    // Consulte o banco de dados para obter todas as consultas agendadas para o paciente autenticado
    const pacienteId = req.pacienteId;
    const consultasAgendadas = await Agendamento.findAll({
      where: { paciente_id: pacienteId },
      order: [['data_consulta', 'ASC']], // Ordenar por data da consulta em ordem ascendente
    });

    return res.json(consultasAgendadas);
  } catch (error) {
    console.error('Erro ao listar consultas agendadas:', error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao listar consultas agendadas.',
    });
  }
});

// Rota para buscar todas as consultas agendadas
app.get('/consultas-agendadas', verificarToken, async (req, res) => {
  try {
    const pacienteId = req.pacienteId;

    // Consulte o banco de dados para obter todas as consultas agendadas para o paciente autenticado
    const consultasAgendadas = await Agendamento.findAll({
      where: { paciente_id: pacienteId },
      order: [['data_consulta', 'ASC']], // Ordenar por data da consulta em ordem ascendente
    });

    return res.json(consultasAgendadas);
  } catch (error) {
    console.error('Erro ao listar consultas agendadas:', error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao listar consultas agendadas.',
    });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
