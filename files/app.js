const userInputBtn = () =>{
    const userInput = document.getElementById('userInput').value;

    // get data to api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${userInput}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
} 

    // displayResults 
const displayData = (data) =>{
    const phonesContainer = document.getElementById('phoneContainer');
    if(data[0] == undefined ){
        phonesContainer.innerHTML = '';
        phonesContainer.innerHTML = 
        `
        <p id="notFound" class="text-center w-75 m-auto mt-5 bg-danger rounded-3 text-white bg-opacity-75"><span class="fs-2 ">N</span>O Result found <span class="text-warning" ><i class="fas fa-exclamation-triangle"></i></span>  </p>
        `
        ;
    }
    else{
        phonesContainer.innerHTML = '';
        for(const singleData of data ){
        const phonesContainer = document.getElementById('phoneContainer');
        
        const div = document.createElement('div');
        // div.classList = ("col , shadow , mx-a , py-2");
        const playerId = singleData.slug; 

        div.innerHTML = 
        `
        
        <div class="col shadow mx-a py-2">
        <div class="card h-100">
          <img src="${singleData.image}" class="w-50 mt-3 m-auto " alt="...">
          <div class="card-body  border border-1 mt-3">
            <h5 class="card-title">${singleData.phone_name}</h5>
            <p class="card-text">Phonedetails</p>
          </div>
          <div class="card-footer m-auto">
            <button class=" btn-info btn"  onclick="detailsBtn('${playerId}')"  data-bs-toggle="modal" href="#exampleModalToggle" role="button" >viwe details</button>
          </div>
        </div>
      </div>

        `;
        
        phonesContainer.appendChild(div);
        }
    }



}   
  const detailsBtn = (playerIdData) =>{


    const url = `https://openapi.programming-hero.com/api/phone/${playerIdData}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getDetails(data))

    const getDetails = (data) => {
        
    const detailModalContainer = document.getElementById('modalContainer');

const releseDate = () => {
    const getreleseDate = data.data.releaseDate;
        
    if(getreleseDate == ''){
        const notFound = "no relese date found"; 
        return notFound;
    }else{
        return getreleseDate;

    }
    
    }

    const releseData = releseDate();

    detailModalContainer.innerHTML = '';
    detailModalContainer.innerHTML = 
    `
    <div class="modal-header flex-column">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <h5 class="modal-title" id="exampleModalToggleLabel">Device Name: <span class="text-white p-2 rounded-3 bg-info"> ${data.data.name} </span> </h5> <br>
    <h6 class="text-muted">Relese date: ${releseData}</h6>
 </div>
         
 <div class="modal-body">
 <div class="card mb-3" style="max-width: 1000px;">

   <div class="row g-0">
     <div class="col-md-4 m-auto w-25">
       <img class="img-fluid" src="${data.data.image}" alt="...">
     </div>

     <div class="col-md-8 w">
       <div class="card-body">
         <ul class="list-group">
           <li class="list-group-item list-group-item-danger">Storage: <br> ${data.data.mainFeatures.storage}</li>
           <li class="list-group-item list-group-item-warning"> Display: <br>  ${data.data.mainFeatures.displaySize} </li>
           <li class="list-group-item list-group-item-info"> ChipSet: <br> ${data.data.mainFeatures.chipSet}</li>
           <li class="list-group-item list-group-item-light"> Memory: <br> ${data.data.mainFeatures.memory}</li>
           <li class="list-group-item list-group-item-dark">A simple dark list group item</li>
         </ul>
       </div>
     </div>

   </div>

 </div>
</div>
<div class="modal-footer">

'footer'
</div>
    ` ;
        console.log();
    }
    

}

//display result 

