import { useEffect, useState } from "react";
import UsersService from "../../../services/users/users";
import styles from './users.module.css';


const statusTransform = (statusNum) =>{
    switch(statusNum){
        case 1:
            return "Активен";
        case 2:
            return "Заблокирован";
        case 3:
            return "Удален";
        default:
            return "Ошибка";
    }
}

const Users = () =>{
    const [users, setUsers] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
            const data = await UsersService.getAll();
            setUsers(data);
        }

        fetchData();
    },[])
    if(users === null){
        return(
            <div className={styles.page__background}>
                <h1 className={styles.page__header}>Список пользователей</h1>
                <div className={styles.page__body}>
                    Загрузка...
                </div>
            </div>
        )
    }


    return(
        <div className={styles.page__background}>
            <h1 className={styles.page__header}>Список пользователей</h1>
            <div className={styles.page__body}>
                <div className={styles.users__item}>
                <p>Имя пользователя</p>
                <p>Email</p>
                <p>Статус</p>
                <p> </p>
                <p> </p>
                </div>
            {users.map(user =>(
                <div key={user.id} className={styles.users__item}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{statusTransform(user.status)}</p>
                <img src="/edit.svg" alt="Изменение" width="24" height="24"/>
                <img src="/delete.svg" alt="Удаление" width="24" height="24"/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Users;