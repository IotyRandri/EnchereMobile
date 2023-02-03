import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react";
import { person, personAddSharp, personCircle, personCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { Redirect, useLocation, withRouter } from "react-router";

const MenuHome:React.FC = () => {
    const [activepage,setactivepage] = useState();
    const location = useLocation();

    const goto = (path:string) => {
        <Redirect to={path}/>
    }

    return (
        <IonMenu contentId="main" type="overlay">
        <IonContent>
            <IonList id="inbox-list">
                <IonMenuToggle key={"inscription"} autoHide={false}>
                <IonItem className={location.pathname === "/Inscri" ? 'selected' : ''} onClick={() => goto("/Inscri")} routerDirection="forward" lines="none" detail={false}>
                    <IonIcon slot="start" ios={personCircle} md={personCircleOutline} />
                    <IonLabel>Inscription</IonLabel>
                </IonItem>
                <IonItem key={"login"} className={location.pathname === "/home" ? 'selected' : ''} onClick={() => goto("/home")} routerDirection="forward" lines="none" detail={false}>
                    <IonIcon slot="start" ios={person} md={personAddSharp} />
                    <IonLabel>Login</IonLabel>
                </IonItem>
                </IonMenuToggle>
            </IonList>
        </IonContent>
        </IonMenu>
    )
}

export default withRouter(
    MenuHome
);