import { Connection } from "mysql2/promise";

export class UsuarioRepository {

    constructor(private db: Connection){}

    async create(usuario: IUsuario): Promise<IUsuario> {
        const query = `INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`
        const values = [usuario.nome, usuario.email, usuario.senha];
        const [result] = await this.db.query(query, values)
        usuario.id = (result as any).insertId
        return usuario
    }

        async getAll(): Promise<IUsuario[]> {
        const query = `SELECT * FROM usuarios`
        const [users] = await this.db.query(query)
        return users as IUsuario[]
        
    }
}