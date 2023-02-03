import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonThumbnail } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import './EncherebyUtilisateur.css';
import Header from "./Login_Ionic/Header";
import { reload } from "../components/context";

const EnchereByUtilisateur:React.FC = (props) => {
    const [listenchere,setlisteenchere] = useState([]);
    const imageproperty = {width: '130px', height:'170px'};
    var photosenchere = '';


    let token = localStorage.getItem("token");

    const utilisateur = {
        "token": token
    }

    const history = useHistory();

    const getEncherebyUser = async() => {
        await fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/enchere/listeDeMesEncheres",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(utilisateur)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Enchere by User");
            console.log(data);

            setlisteenchere(data.data);
        })
        .catch((e) => console.log(e));
    }

    useEffect( () => {
        reload();
        getEncherebyUser();
    },[])

    const getDateEnchere = (dateenchere:any) =>{
        return new Date(dateenchere).toLocaleString('fr-FR',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day:'numeric'
        });
    }

    const getTimeEnchere = (dateenchere:any) => {
        return new Date(dateenchere).toLocaleString('fr-FR',{
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    }

    const prix = new Intl.NumberFormat('de-DE',{
        minimumFractionDigits: 0
    });

    const updateImage = (idenchere:any) => {
        // Push to Ajout Image
        history.push("/page/ajoutphotoenchere/"+idenchere);
    }

    return (
        <IonPage>
            <IonHeader>
                <Header></Header>
            </IonHeader>
            <IonContent>
                {
                    listenchere.map((encherebyuser:any) => {
                        return (
                            <IonCard key={encherebyuser.id} color={"light"}>
                                <IonCardHeader>
                                    <IonCardSubtitle>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <IonGrid>
                                                        <IonCol>
                                                            <IonThumbnail>
                                                                <IonImg src={"https://wsfrontofficemobile-production-f9f5.up.railway.app/images/"+encherebyuser.coverphoto} style={imageproperty}></IonImg>
                                                            </IonThumbnail>
                                                        </IonCol>
                                                    </IonGrid>
                                                </IonCol>
                                                <IonCol>
                                                    <p>Date: {getDateEnchere(encherebyuser.dateetheure)}</p>
                                                    <p>Heure: {getTimeEnchere(encherebyuser.dateetheure)}</p>
                                                    <p>Prix de Mise: {prix.format(encherebyuser.prixdemise)} Ar</p>
                                                    <p>Categorie: {encherebyuser.categorie.nom}</p>
                                                    <p>Duree: {encherebyuser.dureeenchere}</p>
                                                    <h5><strong>{encherebyuser.designationstatus}</strong></h5>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonRow>
                                        <p>{encherebyuser.description}</p>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>

                                        </IonCol>
                                        <IonCol>
                                            <IonButton expand="block" shape="round" fill="solid" color={"success"} onClick={() => updateImage(encherebyuser.id)}>Voir Photos</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        )
                        
                    })
                }
            </IonContent>
        </IonPage>
    )
}

export default EnchereByUtilisateur;