import { Connection } from "mysql2";

export class UsuarioRepository{

    constructor(public db: Connection){}
    async create(usuario : IUsuarios){
    const query = `INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`
    const values = [usuario.nome, usuario.email, usuario.senha];
    const users = await this.db.query(query, values)
    }
}