import { useEffect, useState } from "react";
import UsersService from "../../../services/users/users";
import styles from './users.module.css';
import ReactModal from "react-modal";
import CheckModal from "../../../ui/modals/checkmodal/checkmodal";


ReactModal.setAppElement("#root");

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
    const [isOpen, setOpen] = useState(false);
    const [userModal, setUserModal] = useState(null);
    const modalOpen = (user) => {
        setUserModal(user);
        setOpen(true);
    }
    const modalClose = () =>{
        setUserModal(null);
        setOpen(false);
    }
    const confirmHandle = () =>{
        console.log("delete");
        setOpen(false);
    }
    

    useEffect(()=>{
        const fetchData = async () =>{
            const data = await UsersService.getAll();
            setUsers(data);
        }

        fetchData();
    },[])
    const userMapper =() =>{
        return users.map(user =>(
                <div key={user.id} className={styles.users__item}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{statusTransform(user.status)}</p>
                <img src="/edit.svg" alt="Изменение" width="24" height="24"/>
                <img onClick={()=>modalOpen(user)} src="/delete.svg" alt="Удаление" width="24" height="24"/>
                </div>
            ))
    }


    return(
        <div className={styles.page__background}>
        <CheckModal isOpen={isOpen} closeHandle={modalClose} submitHandle={confirmHandle} />
            <h1 className={styles.page__header}>Список пользователей</h1>
            <div className={styles.page__body}>
                <div className={styles.users__item}>
                <p>Имя пользователя</p>
                <p>Email</p>
                <p>Статус</p>
                <p> </p>
                <p> </p>
                </div>
            {users === null? <>Загрузка...</> : userMapper()}
            </div>
        </div>
    )
}

export default Users;