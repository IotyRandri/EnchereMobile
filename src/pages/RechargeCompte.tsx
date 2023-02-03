import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "./Login_Ionic/Header";

const RechargeCompte:React.FC = () => {
    const [montant,setmontant]:any = useState();
    const [soldeactuel,setsoldeactuel]:any = useState();
    const [presentAlert] = useIonAlert();
    const [showRechargeok] = useIonAlert();
    const history = useHistory();

    let token = localStorage.getItem("token");

    const getSolde = async() => {
        

        const datasolde = {
            "token" : token
        }

        // Get Solde from Ws
        await fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/user/solde",{
            method:'POST',
            body:JSON.stringify(datasolde),
            headers:{'Content-Type':'application/json'}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Donnees Utilisateurs for Solde");
            console.log(data);
            setsoldeactuel(data.data);
        })
        .catch(e => console.log(e))
    }

    const rechargeecompte = () => {

        presentAlert({
            header:'Recharge Solde',
            message: 'Recharger votre compte de '+montant+' Ar',
            buttons: [{
                text:'Annuler',
                handler: response => {
                    console.log("annulee");
                }
                },
                {
                    text:'Ok',
                    handler: async response => {

                        
                        const datarecharge = {
                            token: token,
                            montant: montant
                        }

                        // Call Ws to Recharge Compte
                        await fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/erecharge",{
                            method:'POST',
                            body: JSON.stringify(datarecharge),
                            headers: {'Content-Type':'application/json'}
                        })
                        .then((response) => console.log(response))
                        .catch(e => console.log(e))
                        // Show Alert that compte is reloaded
                        showRechargeok({
                            header: 'Compte',
                            message: 'Demande Envoyee',
                            buttons:['Ok']
                        })
                    }
                }]
        })
    }

    useEffect(()=> {
        getSolde();
    })

    return (
        <IonPage>
            <Header/>
                <IonContent>
                    <IonGrid>
                        {/* Display Solde Client */}
                        <IonRow class="ion-justify-content-center">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Votre Solde Actuel:</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonCardSubtitle>{soldeactuel} Ar</IonCardSubtitle>
                                </IonCardContent>
                            </IonCard>
                        </IonRow>

                        {/* Form to Reload Solde */}
                        
                        <IonRow class='ion-justify-content-center'>
                            <form>
                                <IonRow>
                                    <IonItem>
                                        <IonLabel position="fixed">Montant</IonLabel>
                                        <IonInput value={montant} type="number" onIonChange={(e) => setmontant(e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton expand="block" onClick={rechargeecompte} color="success">Recharger</IonButton>
                                    </IonCol>
                                </IonRow>
                            </form>
                        </IonRow>
                    </IonGrid>
                </IonContent>
        </IonPage>
    )
}

export default RechargeCompte;