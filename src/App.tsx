import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import FormulaireEnchere from './pages/FormulaireEnchere';
import EnchereByUtilisateur from './pages/EncherebyUtilisateur';
import AjoutPhotosEnchere from './pages/AjoutPhotosEnchere';
import Login from './pages/Login_Ionic/Login';
import Accueil from './pages/Login_Ionic/Accueil';
import Inscription from './pages/Login_Ionic/Inscription';
import RechargeCompte from './pages/RechargeCompte';
import Menu from './components/Menu';
import OneSignal from "onesignal-cordova-plugin";

setupIonicReact();

const App: React.FC = () => {

  function OneSignalinit(): void {
    const appid = '51533bda-7d07-4a70-91e6-dcf1b90fcb9a';
    OneSignal.setAppId(appid);
    OneSignal.setNotificationOpenedHandler(function (jsonData){
      console.log("notificationOpenedCallBack: " + JSON.stringify(jsonData));
    })
  }

  OneSignalinit();

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu/>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect from='/' to="/home" />
            </Route>
            <Route path="/page/formenchere">
              <FormulaireEnchere />
            </Route>
            <Route exact path="/page/encherebyuser">
              <EnchereByUtilisateur />
            </Route>
            <Route exact path="/page/ajoutphotoenchere/:id">
              <AjoutPhotosEnchere />
            </Route>
            <Route exact path="/home">
              <Login />
            </Route>
            <Route path="/accueil">
              <Accueil />
            </Route>  
            <Route exact path="/Inscri">
              <Inscription />
            </Route>
            <Route path="/rechargecompte">
              <RechargeCompte/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
