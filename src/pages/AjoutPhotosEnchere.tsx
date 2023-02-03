import { IonContent, IonGrid, IonHeader, IonPage, IonRow, IonThumbnail } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "./Login_Ionic/Header";
import { reload } from "../components/context";

const AjoutPhotosEnchere:React.FC = () => {
    const [newimage,setnewimage]:any[] = useState([]);
    const [photourl,setphotourl]:any[] = useState([]);
    const [photosenchere,setphotosenchere]:any[] = useState([]);

    var baseimgurl = 'data:image/jpeg;base64,';
    const getPhotosEnchere = (idenchere:any) => {
        fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/enchere/photos/"+idenchere,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then( (data) => {
            console.log("Photo Enchere: ");
            console.log(data);

            setphotosenchere(data.data.photourl);
            console.log("p: "+photosenchere);
        })
        .catch((e) => console.log(e));
    }

    const {id}:any = useParams();
    

    useEffect(()=> {
        reload();
        getPhotosEnchere(id);
    },[]);


    return (
        <IonPage>
            <IonHeader>
                <Header></Header>
            </IonHeader>
            <IonContent>
                <IonGrid class="ion-justify-content-center">
                    <IonRow>
                        <h3>Photos</h3>
                    </IonRow>
                    <IonRow>
                        {
                            photosenchere.map((image:any) => {
                                return (
                                    <img key={image} src={"https://wsfrontofficemobile-production-f9f5.up.railway.app/images/"+image} width={200} height={200}></img>
                                )
                            })
                        }
                    </IonRow>
                    <IonRow>
                        <IonRow>
                            {
                                newimage.map((image:any) => {
                                    return (
                                        <IonThumbnail>
                                            <img key={image} src={baseimgurl+image} width={200} height={200}></img>
                                        </IonThumbnail>
                                    )
                                })
                            }
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default AjoutPhotosEnchere;