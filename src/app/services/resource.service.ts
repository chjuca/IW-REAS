import { Resources } from './../models/resources.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  uploadPercent: Observable<number>;
  uploadPercentBanner: Observable<number>;
  resourcesCollection: AngularFirestoreCollection;
  resourcesDocument: AngularFirestoreDocument;
  resources: Observable<Resources[]>;
  resource = {} as Resources;
  COLLECTION_NAME = 'resources'
  banners = {
    "Gastronomía": "https://corbuse.edu.mx/blog/wp-content/uploads/2018/11/qu%C3%A9-es-gastronom%C3%ADa.jpeg",
    "Finanzas": "https://www.cesuma.mx/images/easyblog_articles/203/b2ap3_large_Relaciones-financieras-de-los-sujetos-econmicos.jpg",
    "Turismo": "https://economipedia.com/wp-content/uploads/Turismo-y-empleo.jpg",
    "Economía": "https://cursos.aiu.edu/images/Economia-1280x720.jpg",
    "Administración de Empresas": "https://www.usfq.edu.ec/sites/default/files/styles/full/public/2021-06/banner_administracion_de_empresas_01.jpg?itok=knih1x_8",
    "Administración Pública": "https://www.economia360.org/wp-content/uploads/2020/10/Administracion-Publica-600x315.jpg",
    "Ingeniería Ambiental": "http://formacionib.org/noticias/IMG/arton2526.jpg?1584458704",
    "Gestión Ambiental": "https://encolombia.com/wp-content/uploads/2018/01/Gesti%C3%B3n-Ambiental.jpg",
    "Alimentos": "https://encolombia.com/wp-content/uploads/2019/04/Carrera-Ingenieria-Alimentos-Carreras-Profesionales.jpg",
    "Bioquímica y Farmacia": "https://1.bp.blogspot.com/-PG5W2B-oWnY/WeosVgPvUwI/AAAAAAAAAk8/duAFW2PUJ9YDq3l7Hh7bXEFUXpOCdnHwgCLcBGAs/s1600/unifranz_farmacia_bioquimica.jpg",
    "Agronegocios": "https://agriculturers.com/wp-content/uploads/2018/11/Los-agronegocios-mas-rentables.jpg",
    "Seguridad y Salud Ocupacional": "data:image/jpeg;base64,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",
    "Agropecuaria": "https://orientacion.universia.edu.pe/imgs2011/imagenes/agropecuar-2020_01_27_221544@2x.jpg",
    "Ingeniería Química": "https://www.usfq.edu.ec/sites/default/files/styles/min_mobile/public/2020-05/ingenieria_quimica_01.jpg?itok=__-oGiWS",
    "Ingeniería Industrial": "https://etac.edu.mx/blog-etac/wp-content/uploads/2018/08/ingenieria-industrial.jpeg",
    "Biología": "data:image/jpeg;base64,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",
    "Nutrición y Dietética": "https://www.hospitallapaloma.com/wp-content/uploads/2017/12/nutricion-y-dietetica.jpg",
    "Fisioterapia": "https://www.clinicasguadalhorce.com/wp-content/uploads/2020/03/ventajas-fisioterapia-1024x474.jpg",
    "Artes Visuales": "https://www.utpl.edu.ec/carreras/sites/default/files/img-artes-visuales-por-que-estudiar.png",
    "Comunicación": "https://lh3.googleusercontent.com/proxy/SU7j2kbq84rA09kKHicnDC-kcssY5NAaKljyKYyKqpoYrvA86JsC0acg5_ymbrKp0-fwrWbMqPArVCdFwAsoPWnG_gPLl9z0YxUh0XJ5kXQlVhuMmx8sWAKtji442qWsfXly2E8EZKI3_QIia56oEhUumwjc-fYrL6uWvs_egH5AJ9amUX0mo5Mhhjdtbm3fzv43-ZoED3hy",
    "Psicología": "https://pqs.pe/wp-content/uploads/2018/02/pqs-psicologia-perfiles-de-carrera-800x533.jpg",
    "Artes Escénicas": "https://noticias.utpl.edu.ec/sites/default/files/bp_artes.jpg",
    "Psicopedagogía": "https://www.buscouniversidad.com.ar/orientacion/wp-content/uploads/2016/11/carrera-de-Psicopedagog%C3%ADa.jpg",
    "Arquitectura": "https://blogs.unitec.mx/content/dam/blogs/imagenes/corp_samara/en-donde-trabaja-un-arquitecto-1-compressor.jpeg",
    "Geología": "https://blogs.upn.edu.pe/ingenieria/wp-content/uploads/sites/4/2016/02/upn_blog_ing_ing-geol%C3%B3gica_10-feb.jpg",
    "Ingeniería Civil": "https://uvg.edu.mx/blog/wp-content/uploads/2016/08/UVG-La-carrera-de-Ingenier%C3%ADa-Civil-es-dif%C3%ADcil.jpg",
    "Tecnologías de la Información": "https://unamglobal.unam.mx/wp-content/uploads/2018/02/aplicaciones_espaciales__0-990x556.jpg",
    "Medicina": "https://hospitalveugenia.com/wp-content/uploads/2015/10/Videos-de-salud-Vimeo-Hospital-Victoria-Eugenia-Sevilla-1280x720.jpg",
    "Enfermeria": "http://blogs.upn.edu.pe/salud/wp-content/uploads/sites/7/2016/11/upn_blog_sal_tareas-profesionales-enfermer%C3%ADa_28-nov.jpg",
    "Contabilidad y Auditoría": "https://www.certus.edu.pe/blog/wp-content/uploads/2019/01/Contabilidad-empezar-tu-carrera-CERTUS-1200x720.jpg",
    "Derecho": "https://concepto.de/wp-content/uploads/2012/03/derecho-ley-e1552664252875.jpg",
    "Telecomunicaciones": "https://concepto.de/wp-content/uploads/2018/08/electronica-estudios-e1534781588887.jpg",
    "Computación": "https://www.galdon.com/wp-content/uploads/2013/05/profesion-informatica-galdon-software-1024x576.jpg"
  };

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', true));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  findAllResources() {
    return this.resources;
  }

  findAllMultimedia() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('type', '==', 'Video').where('isPublic', '==', false));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }


  findResourceByID(id: string) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    return this.resourcesCollection.doc(id).valueChanges();
  }

  addResource(resource: Resources) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME);
    console.log("Mi banner es: "+resource.banner)
    if(resource.type == 'Video'){
      resource.banner = this.banners[resource.category]; 
    }else{
      if(resource.banner.includes("https:")){
        console.log("Imagen cargada correctamente")
      }else{
        resource.banner = this.banners[resource.category]; 
      }
    }
   

    resource.creationDate = new Date();
    resource.isPublic = false;
    resource.avgCalification = 0;
    resource.califications = [];
    this.resourcesCollection.add(resource);
  }

  updateResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    this.resourcesDocument.update(resource);
  }

  publicResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    resource.isPublic = true
    this.resourcesDocument.update(resource);
  }


  deleteResource(resource: Resources) {
    this.resourcesDocument = this.db.collection(this.COLLECTION_NAME).doc(`${resource.id}`);
    this.resourcesDocument.delete();

  }

  onUpload(resource: Resources, e: any, d?: any) {
    const id = Math.random().toString(36).substring(2);

    if (d != undefined){
      const banner = d.target.files[0];
      const filePathBanner = `banners/${id}`;
      const refBanner = this.storage.ref(filePathBanner);
      const taskBanner = this.storage.upload(filePathBanner, banner);
      this.uploadPercentBanner = taskBanner.percentageChanges();
      taskBanner.snapshotChanges().pipe(finalize(() =>{
        refBanner.getDownloadURL().subscribe(url =>{
          resource.banner = url;
        })
      })).subscribe();

    }else{
      console.log("Se debe cargar una imagen")
    }

    if (e) {
      resource.resourceName = id;
      resource.banner = id;
      const file = e.target.files[0];
      const filePath = `resources/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => {
        ref.getDownloadURL().subscribe(urlFile => {
          resource.url = urlFile;
          setTimeout( ()  => {
            (resource.id) ? this.updateResource(resource) : this.addResource(resource);
          }, 5000);

        });
      })
      ).subscribe();
    } else {
      if (resource.type == "Video") {
        console.log(resource.url);
        this.addResource(resource)
      } else {
        console.log("ERRROR SE DEBE CARGAR UN URL")
      }
    }
  }

  //============================
  // FILTROS DE LOS RECURSOS
  //============================


  findAllResourcesIsNoPublic() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', false));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByCategory(category: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('category', '==', category).where('isPublic', '==', true));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByTitle(title: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.orderBy("title").startAt(title).endAt(title + '\uf8ff'));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByType(type: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.orderBy("type").startAt(type).endAt(type + '\uf8ff'));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllResourcesByKeyword(keyword: String) {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where("keywords", "array-contains", keyword).where('isPublic', '==', true));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.resources;
  }

  findAllresourcesOrderByCreatedAt() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', true).orderBy('creationDate', 'desc').limit(8));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.resources;
  }

  findAllResourcesOrderByCalification() {
    this.resourcesCollection = this.db.collection(this.COLLECTION_NAME, ref => ref.where('isPublic', '==', true).orderBy('avgCalification', 'desc').limit(8));
    this.resources = this.resourcesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Resources;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.resources;
  }



}
