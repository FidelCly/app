### Utilisation de Redux dans un composant React

Dans cet exemple, nous allons utiliser Redux pour gérer l'état d'un composant ProfilScreen. Ce composant récupère les informations d'un utilisateur en fonction de l'ID utilisateur et affiche les informations de profil et un QR code.

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/reducers/user.reducer";

const ProfilScreen = () => {
const userId = 1;
const user = useSelector((state) => state.users.currentUser);
const userLoader = useSelector((state) => state.users.userLoader);
const dispatch = useDispatch();

    const fetchUser = (userId) => {
    	dispatch(getUser(userId));
    };

    useEffect(() => {
    	fetchUser(userId);
    }, []);

}

export default ProfilScreen;

Dans cet exemple, nous utilisons useSelector pour accéder aux informations de l'utilisateur et à l'état du loader, et useDispatch pour déclencher l'action getUser. L'effet secondaire useEffect est utilisé pour récupérer les informations de l'utilisateur lors de la première exécution du composant.
