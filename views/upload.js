const url = "http://192.168.1.45/api/users/uploadImage"
const url2 = "http://192.168.1.45/api/users/getImages"

const btnUpload = document.querySelector('#upload');
const imageResult = document.querySelector('#image');
const error = document.getElementById('error');
const errorImage = document.getElementById('errorImage')
//const linkDownload = document.querySelector('#link');

btnUpload.addEventListener('click', async e=>{
    e.preventDefault()
    const file = document.querySelector('#file').files[0];

    const formData = new FormData();
    formData.append('file',file);

    let response = await fetch(url,{
            method:'POST',
            body:formData
        });
    let data = await response.json()
    if (response.status !== 200) {
        error.innerHTML = data.msg
        return
    } 
    error.innerHTML = "Successfully uploaded";
    setTimeout(()=>{
        window.location.reload(false)
    },1000)
});


const images = async () =>{
    const response = await fetch(url2,{
        method: 'GET'
    })
    const data = await response.json()
    const lengthImages = Object.keys(data).length
    if (lengthImages == 0){
        errorImage.innerHTML = 'No images available'
    }
    else{
        errorImage.innerHTML = 'Images: '
        for(let i = 0; i<lengthImages; i++){
            const row = document.createElement('div')
            row.className = 'row align-items-center'
            const col1 = document.createElement('div')
            col1.className = 'col'
            const col2 = document.createElement('div')
            col2.className = 'col'
            const img = document.createElement('img');
            img.src = data[i]
            img.className = 'img-thumbnail'
            img.alt = "1000"
            const button = document.createElement('a')
            button.className = 'btn btn-primary'
            button.textContent = 'Download'
            button.href = data[i]
            row.appendChild(col1)
            row.appendChild(col2)
            col1.appendChild(img)
            col2.appendChild(button)
            document.getElementById('images-container').appendChild(row)
        }
    }
}
images()



// const divRow = document.createElement('div')
// div.className = 'row'

// const divCol1 = document.createElement('col')
// divCol1.className = 'col'

// const divCol2 = document.createElement('col')
// divCol2.className = 'col'









// fetch(url2,{
//     method: 'GET'
// })
// .then(responseImages => responseImages.json())
// .then(dataImages => {
//     images = dataImages
// });

