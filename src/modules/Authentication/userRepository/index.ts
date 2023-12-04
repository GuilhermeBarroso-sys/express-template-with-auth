export interface IUser {
  id: string
  name: string
  email: string
  password: string
}
export interface ICreateUserParams {
  id?: string
  name: string
  email: string
  password: string
}
export interface IFindUserParams {
  id: string
}

export interface IFindByEmail {
  email: string
}

export type IFindUser = IUser | null

export interface IUserRepository {
  create: (params : ICreateUserParams) => Promise<string>
  find: (params : IFindUserParams) => Promise<IFindUser>
  findByEmail: (params: IFindByEmail) => Promise<IFindUser>

}