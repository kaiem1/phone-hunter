const loadPhone = async (searchText='samsung', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhone(phones, isShowAll);
}


const displayPhone = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones 
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);
    // display only first 12 phones if not show All
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        console.log(phone)
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML =`
         <figure>
        <img
        src="${phone.image}" />
        </figure>
         <div class="card-body">
             <h2 class="card-title ">${phone.phone_name}</h2>
             <p class="text-center">There are many variations of <br> passages of available, but the <br> majority have suffered</p>
            <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}');
        " class="btn btn-primary">Show Details</button>
        </div>
         </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spiner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async (id) =>{
    console.log('clicked show details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML =`
    <div class="text-center justify-center">
    <img class="text-center justify-center" src="${phone.image}" alt="">
    </div>
    <p><span>Storage:</span>${phone.mainFeatures.storage}</p>
    <p><span>GPS:</span>${phone?.others?.GPS || 'no GPS available'}</p>
    <p><span>Display size:</span>${phone?.mainFeatures?.displaySize
    }</p>
    <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>Release data:</span>${phone?.releaseDate}</p>
    <p><span>Brand:</span>${phone?.brand}</p>
    



    `



    // show the modal
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// handle search recap
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField2 = document.getElementById('search-field2');
//     const searchText = searchField2.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingspinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingspinner.classList.remove('hidden')
    }
    else{
        loadingspinner.classList.add('hidden')
    }
}


// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone()

