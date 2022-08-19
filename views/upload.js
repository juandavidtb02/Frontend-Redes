const url = "http://localhost:4000/api/users/uploadImage"
const url2 = "http://localhost:4000/api/users/getImages"

const btnUpload = document.querySelector('#upload');
const imageResult = document.querySelector('#image');
const error = document.getElementById('error');
const errorImage = document.getElementById('errorImage');


btnUpload.addEventListener('click', async e=>{
    e.preventDefault()
    const file = document.querySelector('#file').files[0];
    //console.log(file.name)
    
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    const formData = new FormData();
    formData.append('file',file);
    try{
        if(!allowedExtensions.exec(file.name)){
            error.innerHTML = "Only images are allowed, please try again! ";
            return
        }
    }
    catch(error){
        console.log('No file chosen!')
    }
    error.innerHTML = "Uploading file..."
    let response = await fetch(url,{
            method:'POST',
            body:formData
        });
    let data = await response.json()
    if (response.status !== 200) {
        error.innerHTML = data.msg
        return
    } 
    error.innerHTML = "Succesfully uploaded!";
    setTimeout(()=>{
        window.location.reload(false)
    },1200);

});


const images = async () =>{
    try{
        const response = await fetch(url2,{
            method: 'GET'
        })
        const data = await response.json()
        //console.log(data)
        const lengthImages = Object.keys(data).length
        if (lengthImages == 0){
            errorImage.innerHTML = 'No images available'
        }
        else{
            errorImage.innerHTML = 'Images: '
            for(let i = 0; i<lengthImages; i++){
                const card = document.createElement('div')
                card.className = 'card text-center'
                card.style = 'width:18rem;'
                const cardbody = document.createElement('div')
                cardbody.className = 'card-body'
                //const col2 = document.createElement('div')
                //col2.className = 'col'
                const img = document.createElement('img');
                img.src = data[i].url_imagen
                img.className = 'img-thumbnail'

                //const formDelete = document.createElement('form')
                const input = document.createElement('input')
                input.value = data[i].id
                input.name = 'id';
                input.id = 'id';
                input.type = 'hidden'

                const submit = document.createElement('input')
                submit.type = 'submit'
                submit.value = 'Delete'
                submit.className = 'btn btn-danger'
                submit.id = 'delete'

                const button = document.createElement('a')
                button.className = 'btn btn-primary'
                button.textContent = 'Download'
                button.href = data[i].url_imagen
                
                card.appendChild(cardbody)
                //card.appendChild(col2)
                cardbody.appendChild(img)
                cardbody.appendChild(button)
                //cardbody.appendChild(formDelete)
                cardbody.appendChild(input)
                cardbody.appendChild(submit)
                document.getElementById('images-container').appendChild(card)
            }
            const btnDelete = document.querySelectorAll('#delete');
            const dataImage = document.querySelectorAll('#id');
            //console.log(dataImage[1],dataImage[0]) 
            for(let i = 0;i<btnDelete.length;i++){
                btnDelete[i].addEventListener('click',async e=>{
                    e.preventDefault()
                    let response = await fetch(`http://localhost:4000/api/users/deleteObject/${dataImage[i].value}`,{
                        method:'GET'
                    });
                    console.log(response.status)
                    if(response.status != 200){
                        alert("Could not delete the file correctly")
                        return
                    }
                        alert("File deleted successfully")
                    
                    window.location.reload();
                    //console.log(data)
                })
            }

        }
    }catch(error){
        errorImage.innerHTML = 'Database connection error'
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

