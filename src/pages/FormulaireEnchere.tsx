import { IonButton, IonCol, IonContent, IonDatetime, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import { useEffect, useState } from 'react';
import {Camera,CameraOptions, CameraResultType, CameraSource, ImageOptions} from '@capacitor/camera';
import './FormulaireEnchere.css';
import { useHistory } from 'react-router';
import Header from './Login_Ionic/Header';
import { File } from '@ionic-native/file';
import { reload } from '../components/context';


const FormulaireEnchere: React.FC = () => {

    const [description,setdescription]:any = useState();
    const [prixmise,setprixmise]:any = useState();
    const [dureeenchere,setdureeenchere]:any = useState();
    const [dateenchere,setdateenchere]:any = useState();
    const [categorieid,setcategorieid]:any = useState();
    const [categorie,setcategorie]:any[] = useState([]);
    var idenchere = '';
    const history = useHistory();

    // Get Photos From Device
    const [newimage,setnewimage]:any[] = useState([]);
    const [photourl,setphotourl]:any[] = useState([]);
    var base64img = '';

    var baseimgurl = 'data:image/jpeg;base64,';

    var dataphoto = {
        enchereID : parseInt(idenchere),
        photourl : photourl
    };
    
    const getCamera = () => {
        const options: CameraOptions ={
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
          quality: 100,
          correctOrientation: true,
          saveToGallery: true
        }
    
        Camera.getPhoto(options)
        .then(res => {
            console.log(res);
            let imagebase64 = res.base64String;
            console.log(imagebase64);
            photourl.push(imagebase64);

            // photourl.push(res);
            newimage.push(imagebase64);
            alert("Images Ajoutees");
        } )
        .catch( e => console.log(e));
    }
    const getGallery = () => {
    
        const options: ImageOptions = { 
        resultType: CameraResultType.Uri,
        quality: 100,      
        correctOrientation: true,
    }
    
    Camera.pickImages(options)
    .then(res => {
        console.log(res);

        var images = res.photos;

            // Get Info Image
            for (let i=0;i<images.length;i++){
                console.log(images[i]);
                // Get path and imagename
                let temp = images[i].path+"";
                let filepath = temp.substr(0,temp.lastIndexOf('/') + 1);
                let filename = temp.substr(temp.lastIndexOf('/') + 1);
                readasBase64(filepath,filename);
            }
            setnewimage(newimage);
            alert("Images Ajoutees");
    } )
    .catch( e => console.log(e));
    }

    // Get base64 string from file
    async function readasBase64(filepath:string,filename:string){
        return await File.readAsDataURL(filepath,filename)
        .then((result) => {
            base64img = result;
            var link = base64img.split(",")[1];
            console.log(link);
            newimage.push(link);
            photourl.push(link);
        })
        .catch(e => console.log(e));
    }

    const uploadphotos = async() =>{
        console.log(dataphoto);
        await fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/enchere/photo",{
            method:'POST',
            body:JSON.stringify(dataphoto),
            headers:{'Content-Type':'application/json'}
        })
        .then((response) => console.log(response.json()))
        .then((data)=> {
            console.log(data);
            alert("Nouvelle Enchere Cree");

            // Push index
            history.replace("/page/formenchere");
        })
        .catch((e) => console.log(e))
    }


    async function createnewEnchere(description:any,dateenchere:any,prixdemise:any,dureeenchere:any,idutilisateur:any,idcategorie:any){

        const data = {
            description: description,
            dateetheure: dateenchere,
            prixdemise: prixdemise,
            dureeenchere: getTimeDureeEnchere(dureeenchere),
            utilisateursid: idutilisateur,
            categorieid: idcategorie 
        }

        console.log("Duree Enchere: "+data.dureeenchere);

        var id = 0;

        await fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/enchere",{
            method:'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then( (response) => response.json())
        .then((data)=> {
            console.log(data.data);

            console.log("idenchere: "+data.data.id);
            
            // Set idenchere
            dataphoto.enchereID = data.data.id;
            
        })
        .catch((e) => alert(e));

        
        uploadphotos();
    }

    function getTimeDureeEnchere(dureeenchere:any){
        var dateduree = new Date(dureeenchere);
        var time = dateduree.toLocaleTimeString().trim().slice(0,-3);
        return time;
    }

    async function getAllCategorie(){
        await fetch("https://wsfrontofficemobile-production-f9f5.up.railway.app/enchere/categories",{
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Categories Enchere:");
            console.log(data);

            setcategorie(data.data);
        })
        .catch((e) => console.log(e));
    }

    useEffect(() => {
        reload();
        getAllCategorie();
    },[])


    return (
        <IonPage>
            <Header/>
            <IonContent>
                <IonRow class='ion-justify-content-center'>
                    <IonLabel>Ajouter Une Enchere</IonLabel>
                </IonRow>
                <form>
                    <IonList>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position='floating'>Description</IonLabel>
                                    <IonTextarea placeholder='Decrivez votre produit' autoGrow={true} value={description} onIonChange={(e) => setdescription(e.detail.value)} ></IonTextarea>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position='fixed'>Date</IonLabel>
                                    <IonDatetime presentation='date-time' value={dateenchere} onIonChange={(e) => {setdateenchere(e.detail.value)}}></IonDatetime>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position='floating'>Prix de Mise</IonLabel>
                                    <IonInput type='number' value={prixmise} onIonChange={(e) => setprixmise(e.detail.value)} ></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position='fixed'>Duree</IonLabel>
                                    <IonDatetime presentation='time' hourCycle='h23' value={dureeenchere} onIonChange={(e) => setdureeenchere(e.detail.value)}></IonDatetime>
                                </IonItem>
                                <IonItem>
                                    <IonSelect  placeholder='Categorie' value={categorieid} onIonChange={(e) => setcategorieid(e.detail.value)}>
                                        {
                                            categorie.map((c:any)=> {
                                                return (
                                                    <IonSelectOption key={c.id} value={c.id}>{c.nom}</IonSelectOption>
                                                )
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    {/* Camera */}
                                    <IonRow>
                                        <IonCol>
                                            <IonButton onClick={getCamera}>Prendre une Photo</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonItem>
                                <IonItem>
                                    {/* Gallery */}
                                    <IonRow>
                                        <IonCol>
                                            <IonButton onClick={getGallery}>Gallerie</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonList>    
                    <IonRow>
                        <IonCol>
                            <IonButton expand='block' shape="round" fill="solid" color={"success"} onClick={(e) => createnewEnchere(description,dateenchere,prixmise,dureeenchere,1,categorieid)}>Ajouter</IonButton>
                        </IonCol>
                    </IonRow>                
                </form>
            </IonContent>
            
        </IonPage>
    );

}

export default FormulaireEnchere;