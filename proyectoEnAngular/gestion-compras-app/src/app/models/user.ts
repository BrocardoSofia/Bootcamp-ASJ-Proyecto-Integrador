export interface User{
    id: number,
    userAlias: string,
    password: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}