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
            <>Loading...</>
        )
    }


    return(
        <div className={styles.page__background}>
            <h1 className={styles.page__header}>Список пользователей</h1>
            <div className={styles.page__body}>
                <div className={styles.users__item}>
                <h2>Имя пользователя</h2>
                <p>Email</p>
                <p>Статус</p>
                </div>
            {users.map(user =>(
                <div key={user.id} className={styles.users__item}>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <p>{statusTransform(user.status)}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Users;