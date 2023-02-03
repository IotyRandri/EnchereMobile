import { IonContent, IonRow, IonCol, IonIcon, IonItem, IonLabel, IonInput, IonButton, useIonAlert, IonPage } from '@ionic/react'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import MenuHome from '../../components/MenuHome';
import Header from './Header';

type ResponseProps = {
  data: string
  status: string
}

const Login:React.FC = () => {
  var emailRef = useRef<HTMLIonInputElement>(null);
  var mdpRef = useRef<HTMLIonInputElement>(null);
  const [presentAlert] = useIonAlert();
  const router = useHistory();

  function handleLogin() {
    const loginData = {
      email: emailRef.current?.value,
      password: mdpRef.current?.value,
    };

    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData),
    }

    function handleRoute(dataForm: any){
      var dataResponse = dataForm["data"];
      var status = dataForm["status"];
      if( status === "200" ){
       // const token = dataResponse["token"];
       console.log(dataResponse);
        localStorage.setItem('token', dataResponse);
        router.replace('/page/encherebyuser');

      } else if( status === "500" ){
        presentAlert({
          header: 'Erreur',
          message: dataForm["data"],
          buttons: ['OK'],
      })
      }
    }
    fetch('https://wsfrontofficemobile-production-f9f5.up.railway.app/user/login', request).then(response => response.json())
    .then(data => { handleRoute(data); });
  }

  function gotoInscription(){
    router.push("/Inscri");
  }

  return (
    <IonPage>
        <Header />
      <IonContent className="ion-padding">
        <MenuHome/>
        <IonRow>
          <IonCol>
            <IonIcon name="person-circle-outline"/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Email</IonLabel>
              <IonInput  type="email" value={"rakotosonjean@gmail.com"} ref={emailRef}  ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating"> Pasword</IonLabel>
              <IonInput  type="password" value={"jean"} ref={mdpRef} ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
        <IonCol>
          <IonButton expand="block" color="success" onClick={handleLogin}>Login</IonButton>   
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton expand='block' color={"primary"} onClick={gotoInscription}>S'inscrire</IonButton>
        </IonCol>
      </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default Login;