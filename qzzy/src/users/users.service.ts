import { Injectable } from '@nestjs/common';


let allUsers = [{
    id: 1,
    name: 'Artur',
    surname: 'Haluch',
    mail: 'ahaluch@mail.to',
    password: '$#$#$hash',
},
{
    id: 2,
    name: 'Bartosz',
    surname: 'Kartosz',
    mail: 'bkartosz@mail.to',
    password: '$#$#$hash',
}]


@Injectable()
export class UsersService {
    getUsers() {
        return allUsers;
    }

    getById(id: number) {
        return allUsers.find(x => x.id === id);
    }

    addUser(name: string, surname: string, mail: string, password: string) {
        const id = Math.round(Math.random() * 100) + 1
        const newUser = { id, name, surname, mail, password }
        allUsers.push(newUser);

        return newUser;
    }

    removeById(id: number){
        allUsers = allUsers.filter(x=>x.id!== id);
    }

    editUserPassword(id: number, password: string){
        const user = allUsers.find(x=>x.id===id);
        user.password=password
        return user
    }
}
