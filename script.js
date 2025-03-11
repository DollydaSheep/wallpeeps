
const search = document.querySelector(".searchbar");
const submit = document.querySelector(".submit");
const photospace = document.querySelector(".photos");
const viewImage = document.querySelector('.view-img');
const viewSection = document.querySelector('.view');
const squareColor = document.querySelector('.square-color');
const mainPage = document.querySelector('.main-page');
const exitButton = document.querySelector('.exit');
const descAlt = document.querySelector('.desc-alt');

let imageSelect;
let images = {};

function downloadImage(url){
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = url.split("/").pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(err => {
            console.error("download failed", err);
        })
}

search.addEventListener('keypress',(e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        submit.click();
    }
})

submit.addEventListener("click",async ()=>{
    try{
        const response = await fetch(`https://nodejswallpeeps.netlify.app/.netlify/functions/api/curated?search=${search.value}`,{
            method: 'GET',
            headers:{
                "Content-Type" : "application/json"
            }
        })
        const data = await response.json();
        console.log(data);
        let photos = data.photos;
        const gallery = document.querySelectorAll(".gallery");
        if(gallery.length != 0){
            gallery.forEach(photo => {
                photo.remove();
            });
        }
        images = {};
        photos.forEach((photo,index) => {
            console.log(photo.width + photo.height);
            images[index] = photo;
            if(photo.width < photo.height){
                photospace.insertAdjacentHTML('afterbegin',`<div class="tall gallery"><img src="${photo.src.medium}" loading="lazy"></img><div onclick="downloadImage('${photo.src.original}')">download</a></div></div>`);
            }else{
                photospace.insertAdjacentHTML('afterbegin',`<div class="gallery"><img src="${photo.src.medium}" loading="lazy"></img><div onclick="downloadImage('${photo.src.original}')">download</a></div></div>`);
            }
        });
        imageSelect = document.querySelectorAll(".gallery");
        imageSelect.forEach((img,index) => {
            img.addEventListener("click",()=>{
                mainPage.style.width = "calc(100% - 500px)"
                viewSection.style.transform = "translateX(0%)";
                console.log((Object.keys(images).length)-1-index);
                viewImage.src = images[(Object.keys(images).length)-1-index].src.original;
                squareColor.style.backgroundColor = images[(Object.keys(images).length)-1-index].avg_color;
                descAlt.innerText = images[(Object.keys(images).length)-1-index].alt;
            })
        });
    }catch(err){
        console.error(err);
    }
})

exitButton.addEventListener("click",()=>{
    viewSection.style.transform = "translateX(120%)";
    mainPage.style.width = "100%";
})
