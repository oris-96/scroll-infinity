const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let ready = false
let imagesLoaded = 0
let totalImages = 0

let photosArray = []


// unsplash api
let count = 5;
const apiKey = '3h4niADaplacTTmyJBtTzzuHDxS6cKJM5_A86GigyQs'
const proxyUrl = 'https://hidden-depths-81158.herokuapp.com/'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images loaded
function imageLoaded(){
    imagesLoaded++
    if(imagesLoaded===totalImages){
        ready = true
        loader.hidden = true
        count = 30
    }
}

//helper function
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// create elements for links and photos and add to dom
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo)=>{
        //create a link to unsplash
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        //create <img> for photo
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })
        const img = document.createElement('img')
        // img.setAttribute('src',photo.urls.regular)
        // img.setAttribute('alt',photo.alt_description)
        // img.setAttribute('title',photo.alt_description)
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title: photo.alt_description
        })
        //check when each image is finished loading
        img.addEventListener('load',imageLoaded)

        // put <img> inside <a>, then put both inside image container element
        item.appendChild(img)
        imageContainer.appendChild(item)

    })
}



//get photos from unsplash api 

async function getPhotos(){
    try {
        const response = await fetch(proxyUrl + apiUrl)
        photosArray = await response.json()
        displayPhotos()
        
    } catch (error) {

        console.log(error)
        
    }
}

//check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        //load more
        ready = false
        getPhotos()
    }
})

//on load

getPhotos()