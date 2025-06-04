import express from 'express';
import { connect } from './bd'
import { Connection } from 'mysql2/promise';
import { UsuarioRepository } from './repository/usuario.repository';

const app = express();
const port = 3000;

app.use(express.json())
connect()
.then((db) => {api(db)})
.catch(err=>console.error("falha ao connectar no mysql ", err))

function api(db: Connection) {

  const usuarioRepository = new UsuarioRepository(db)

  app.post('/user', async (req, res) => {
    const usuario = await usuarioRepository.create(req.body as IUsuario)
    res.status(201).json(usuario);
  });

    app.get('/user', async (req, res) => {
    const users = await usuarioRepository.getAll()
    res.status(200).json({users});
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}