import Bot from "../bot/Bot";

export const checkUser = (id: number) => {
    if (!Bot.getUsers(id)) {
        Bot.setUsers({
            id: id,
            thanks: false
        })
    }
}
