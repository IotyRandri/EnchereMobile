import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  useIonAlert,
} from '@ionic/react';

import { Link, Redirect, useHistory, useLocation, withRouter } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, card, cardOutline, carSport, cash, cashOutline, heartOutline, heartSharp, home, homeSharp, key, keyOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Nouvelle Enchere',
    url: '/page/formenchere',
    iosIcon: cash,
    mdIcon: cashOutline
  },
  {
    title: 'Vos Enchere',
    url: '/page/encherebyuser',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Recharger Compte',
    url: '/rechargecompte',
    iosIcon: card,
    mdIcon: cardOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [confirmdeconnection]  = useIonAlert();
  const history = useHistory();

  const deconnection = async() => {
    await confirmdeconnection({
      header:'Deconnexion',
      message:'Vous allez vous deconnectez',
      buttons:[
        {
          text:'Annuler',
          handler: (response) => {
            console.log("deconnection annule");
          }
        },
        {
          text:'Confirmer',
          handler: (response) => {
            localStorage.removeItem("token");
            history.replace("/home");
            console.log("Deconnection ok");
          }
        }]
    })
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url}  routerDirection="forward" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
            <IonMenuToggle key={"deconnection"} autoHide={false}>
                <IonItem className={location.pathname === "/home" ? 'selected' : ''}  routerDirection="forward" lines="none" detail={false}>
                  <IonIcon slot="start" ios={key} md={keyOutline} />
                  <IonLabel onClick={deconnection}>Se Deconnecter</IonLabel>
                </IonItem>
            </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(
  Menu
);
