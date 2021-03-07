/**
    Vamos a crear un carrusel para la página de noticias con la intención de hacerlo más llamativo
*/
//Primero definimos los arrays que se van a usar de manera universal
var Imagenes = ['../img/ps5.jpg','../img/smash.jpg','../img/NVIDIA.jpg' ,'../img/artifact.jpg'], cont = 0;
var noticiasLinks = ["https://www.theverge.com/2021/3/5/22311269/playstation-5-ps5-restock-digital-edition-console-best-buy","https://www.theverge.com/2021/3/4/22313445/super-smash-bros-ultimates-pyra-mythra-dlc-xenoblade-chronicles-2-fighters-pass","https://www.theverge.com/2021/3/5/22315175/nvidia-rtx-3050-ti-gpu-asus-leak-rumor","https://www.theverge.com/2021/3/4/22314103/valve-ending-development-artifact-tcg-dota-2"];
var noticiasNombre = ["Sony vuelve a tener stock de la PS5","Mira cual es el nuevo DLC de Suer Smash Bros Ultimate","Se filtra nueva trajeta de NVIDIA en el sitio de ASUS","Artifact: Un juego hecho por Valve"];
function carrusel(contenedor){
    //ahora creamos un evento en el cual se lea el click dentro del contenedor
    contenedor.addEventListener('click', e =>{
        //vamos a definir variables las cuales seran las partes dentro del contenedor principal
        let atras = contenedor.querySelector(".atras"),//este es el botón de atras
        adelante = contenedor.querySelector(".adelante"),//Este es ell botón de adelante
        img= contenedor.querySelector("img"),//esta variable es la imagen
        url = contenedor.querySelector("a"),// este es la variable de los links
        tgt= e.target;//este es para obtener el objeto clickeado
        let p = url.querySelector("p");//aquí seleccionamos el parrafo dentro de el link
      //vamos a hacer unas condiciones en las cuales vemos que botón se toca
      //dependeidendo de lo que se toque se restara o aumentara una a la contadora. 
      if(tgt==atras){
            if(cont > 0){
                //vamos a usar la contadora dentro de los arrays para sacar su contenido y mostrarlo
                img.src = Imagenes[cont-1];
                url.href = noticiasLinks[cont-1];
                p.innerHTML = noticiasNombre[cont-1];
                cont-=1;
            }else{
                img.src = Imagenes[cont+3];
                url.href = noticiasLinks[cont+3];
                p.innerHTML = noticiasNombre[cont+3];
                cont=3;
            }
        }else if(tgt == adelante){
            if(cont < 3){
                img.src = Imagenes[cont+1];
                url.href = noticiasLinks[cont+1];
                p.innerHTML = noticiasNombre[cont+1];
                cont+=1;
            }else{
                cont=0;
                img.src = Imagenes[cont];
                url.href = noticiasLinks[cont];
                p.innerHTML = noticiasNombre[cont];
            }
        }
    });
}
//vamos a hacer una funcion en la que se active cuando ya este completamente cargada la casa
window.onload = full;
function full (){
    var contenedor = document.querySelector(".carrusel");
    carrusel(contenedor);
}