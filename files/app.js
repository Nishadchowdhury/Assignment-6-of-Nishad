const userInputBtn = () =>{
  // display spinner
  toggleSpinner('block');
  const userInput = () => {
    const input = document.getElementById('userInput').value
    if (!isNaN(input)){
      return '';
    }else if  (isNaN(input)){
      return input;
    }
  } 
    // get data to api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${userInput()}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data));
    
};
//spinner
const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
  const aboutResults = displayStyle;
  if(displayStyle == 'block'){
  document.getElementById('mainResultContainer').style.display = 'none';
  }
  else if(displayStyle == 'none'){
  document.getElementById('mainResultContainer').style.display = 'block';
  }
};

    // displayResults 
const displayData = (data) =>{
    const phonesContainer = document.getElementById('phoneContainer');
    if(data[0] == undefined ){
        phonesContainer.innerHTML = '';
        phonesContainer.innerHTML = 
        `
        <p id="notFound" class="text-center w-75 m-auto mt-5 bg-danger rounded-3 text-white 
        bg-opacity-75"><span class="fs-2 ">N</span>O Result found <span class="text-warning" >
        <i class="fas fa-exclamation-triangle"></i></span>  </p>
        `
        ;
        toggleSpinner('none');
    }
    else{
        let counter = 0;
        phonesContainer.innerHTML = '';
        for(const singleData of data ){
        const phonesContainer = document.getElementById('phoneContainer');
        
        const div = document.createElement('div');
        const playerId = singleData.slug;
        div.innerHTML = 
        `
        <div class="col shadow mx-a py-2">
        <div class="card h-100">
          <img src="${singleData.image}" class="w-50 mt-3 m-auto " alt="...">
          <div class="card-body  border border-1 mt-3">
            <h5 class="card-title">${singleData.phone_name}</h5>
            <p class="card-text">${singleData.brand}</p>
          </div>
          <div class="card-footer m-auto">
            <button class="btn btn-outline-primary" 
            onclick="detailsBtn('${playerId}')"  data-bs-toggle="modal" href="#exampleModalToggle" role="button" >viwe details</button>
          </div>
        </div>
      </div>
        `;
        phonesContainer.appendChild(div);
        //for break the loop 
          counter ++
          if(counter == 20){
            break;
          }
        } toggleSpinner('none');
    }
}   
  const detailsBtn = (playerIdData) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${playerIdData}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getDetails(data))

    const getDetails = (data) => {
        
    const detailModalContainer = document.getElementById('modalContainer');
    const detailModalContainer2 = document.getElementById('modalContainer2');
    const releseDate = () => {

    // getting date info
    const getreleseDate = data.data.releaseDate;  
    if(getreleseDate == ''){
        const notFound = "no relese date found"; 
        return notFound;
    }else{
        return getreleseDate;
    }}

    //getting other info of device
    const otherData = data.data.others;
    let otherDetail = '';
    for(const singleData in otherData){
        otherDetail = otherDetail + (singleData + ' : ' + otherData[singleData] + '<br><br>' );
    }

    // getting all the sensors list as a string
    const sensores = data.data.mainFeatures.sensors.join(` , `);
    // getting releseDate 
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
               <li class="list-group-item list-group-item-dark"> Memory: <br> ${data.data.mainFeatures.memory}</li>
             </ul>
           </div>
         </div>
        </div>
        </div>
      </div>
        <div class="modal-footer justify-content-center"> 
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">See More Info</button>
    </div>
    ` ;
    
    //it's for second modal 
    detailModalContainer2.innerHTML = '';
    detailModalContainer2.innerHTML = 
    `
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalToggleLabel2">Other Facilities Of  <span  style="background-color:rgba(255, 0, 0, 0.4);" class="p-2 rounded-3 text-white"> 
        ${data.data.name} </span> </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      
        <ul class="list-group">
            <li class="list-group-item list-group-item-success">   <span class="p-1 mb-2 mt-2 d-inline-block rounded-3 bg-white  text-dark">Sensores : &    #8675;  &#8675; </span>  <br> ${sensores} . </li>
        </ul>
     <ul class="list-group mt-3">
             <li class="list-group-item list-group-item-danger text-dark  ">  <span class="p-2 mt-2 d-inline-block rounded-3 bg-white  text-dark">    Other Features  : &#8675;  &#8675; </span> <br> <br> ${otherDetail} </li>
     </ul>
    </div>
    <div class="modal-footer justify-content-center">
       <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">See The Basic Info</button>
    </div>
    `;
    }
}
