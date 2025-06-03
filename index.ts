import express from 'express';
import { connect } from './bd'
import { Connection } from 'mysql2/promise';

const app = express();
const port = 3000;

app.use(express.json())
connect()
.then((db) => {api(db)})
.catch(err=>console.error("falha ao connectar no mysql ", err))

function api(db: Connection) {

  app.post('/user', async (req, res) => {
    const user = req.body as IUsuarios;

    const query = `INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`
    const values = [user.nome, user.email, user.senha];
    const users = await db.query(query, values)
    console.log(users)

    res.status(201).json({ mensagem: 'Usuário criado!', usuario: user });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}