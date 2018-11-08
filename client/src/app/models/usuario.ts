export class User{
  constructor(
    public _id: string,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public password: string,
    public role: string,
    public imagen: string
  ){}
}
