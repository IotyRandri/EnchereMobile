import { IonContent, IonRow, IonCol, IonIcon, IonItem, IonLabel, IonInput, IonButton, useIonAlert, IonPage } from '@ionic/react'
import Header from './Header'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import MenuHome from '../../components/MenuHome';


const Inscription:React.FC = () => {  
        const [nom,setNom]=useState<string>('');
        const[prenom,setPrenom]=useState<string>('');
        const [date_naissance,setDate_Naissance]=useState<string>('');
        const [adresse,setAdresse]=useState<string>('');
        const[email,setEmail]=useState<string>('');
        const[password,setPassword]=useState<string>('');
  
        const history = useHistory();
        
        function handleRoute(dataForm: any){
            var dataResponse = dataForm["data"];
            var status = dataForm["status"];
            if( status === "200" ){
              
             // sessionStorage.setItem("id",dataResponse);
              //router.push('/Home');
      
            }  
          }     

            function HandleSubmit (){

                const inscriData ={
                    nom:nom,
                    prenom:prenom,
                    datenaissance:date_naissance,
                    adresse:adresse,
                    email:email,
                    password:password,
                };

                const request={
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(inscriData),
                }


                fetch('https://wsfrontofficemobile-production-f9f5.up.railway.app/user/save', request).then(response => response.json())
                .then(data => { handleRoute(data); });
            }
    
    

    return (
      <IonPage>
        <IonContent className="ion-padding">
          <MenuHome/>
          <Header />
          <IonRow>
            <IonCol>
              <IonIcon name="person-circle-outline"/>
            </IonCol>
          </IonRow>
          <IonRow>
        <IonCol>
          <IonItem>
          <IonLabel position="floating"> Nom</IonLabel>
          <IonInput  type="text" value={nom} onIonChange={e =>setNom(e.detail.value!)}  ></IonInput>          
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
          <IonLabel position="floating"> Prenom</IonLabel>
            <IonInput  type="text" value={prenom} onIonChange={e => setPrenom(e.detail.value!)} ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
        <IonItem>
        <IonLabel position="floating"> Date Naissance</IonLabel>
            <IonInput  type="date"  value={date_naissance} onIonChange={e => setDate_Naissance(e.detail.value!)}  ></IonInput>
            </IonItem>
        </IonCol>
        <IonCol>
        <IonItem>
        <IonLabel position="floating"> Adresse</IonLabel>
            <IonInput  type="text"  value={adresse} onIonChange={e => setAdresse(e.detail.value!)} ></IonInput>
            </IonItem>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
        <IonItem>
        <IonLabel position="floating"> Email</IonLabel>
            <IonInput  type="text"  value={email} onIonChange={e => setEmail(e.detail.value!)}  ></IonInput>

        </IonItem>
        </IonCol>
        <IonCol>
        <IonItem>
        <IonLabel position="floating">Password</IonLabel>
            <IonInput  type="text"  value={password} onIonChange={e => setPassword(e.detail.value!)}  ></IonInput>

        </IonItem>
        </IonCol>
      </IonRow>

      <IonRow class='ion-justify-content-center'>
          <IonCol>
            <IonButton expand='block' color="success" onClick={HandleSubmit}>Valider</IonButton>
          </IonCol>
      </IonRow>

      <IonRow class='ion-justify-content-center'>
        <IonCol>
          <IonButton expand='block' color="primary" onClick={() => history.goBack()}>Se Connecter</IonButton>
        </IonCol>
      </IonRow>
         
        </IonContent>
      </IonPage>
      )
} 
export default Inscription