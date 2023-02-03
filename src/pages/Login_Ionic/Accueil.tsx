import { IonContent, IonRow, IonCol, IonIcon, IonItem, IonLabel, IonInput, IonButton, useIonAlert, IonPage } from '@ionic/react'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import Header from './Header';


const Accueil:React.FC = () => {
 
    return (
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol>
              <IonIcon name="person-circle-outline"/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonButton color="success" href="/Inscri" >Inscription</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonButton color="success" href="/home" >Login</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
      )
} 
export default Accueil;