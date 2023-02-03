import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react'
import React from 'react'

type Props = {}

const Header:React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Mada-Enchere</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header