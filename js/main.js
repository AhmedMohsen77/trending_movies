const searchInput1 = document.querySelector('#search .inputSearch-1 input');   // Input Search 1
const searchInput2 = document.querySelector('#search .inputSearch-2 input');   // Input Search 2
let result;               // API Object
let apiLink;            // API LINK
let searchList       // Array Search
const nameInput = document.getElementById('nameInput');         // Input name 
const PhoneInput = document.getElementById('phoneInput');       // Input phone 
const emailInput = document.getElementById('emailInput');       // Input email 
const ageInput = document.getElementById('ageInput');              // Input age
const passwordInput = document.getElementById('passwordInput');     // Input pass
const repasswordInput = document.getElementById('repasswordInput');     // Input repass
$('nav .nav-info-1 ul').click(function (e) {
    if ($(e.target).text() == 'Now playing') {
        apiLink = 'https://api.themoviedb.org/3/movie/now_playing?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1'
        callBack();  
    }else if($(e.target).text() == 'Popular'){
        apiLink = 'https://api.themoviedb.org/3/movie/popular?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1'
        callBack();  
    }else if ($(e.target).text() == 'Top Rated') {
        apiLink = 'https://api.themoviedb.org/3/movie/top_rated?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1'
        callBack();  
    }else if ($(e.target).text() == 'Trending') {
        apiLink = 'https://api.themoviedb.org/3/trending/movie/week?api_key=0cd92cbd67230c972df7a07a3cd42ac5'
        callBack();  
    }else if ($(e.target).text() == 'Upcoming') {
        apiLink = 'https://api.themoviedb.org/3/movie/upcoming?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1'
        callBack();  
    }
})
async function getApi(apiLink = 'https://api.themoviedb.org/3/movie/now_playing?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1') {
    const response = await fetch(apiLink);
    const objectApi = await response.json();
    result = objectApi.results;
}
function displayData(arrayList) {
    let cartona = ``;
    for (let i = 0; i < arrayList.length; i++) {
        cartona += `
                    <div class=" col-xl-4 col-lg-6">
                        <div class="cards rounded-3">
                            <div class="image-card">
                                <img class="w-100" src="https://image.tmdb.org/t/p/original${arrayList[i].poster_path}" alt="">
                            </div>
                            <div class="caption-card text-center p-3">
                                <div class="info-card">
                                    <h4 class="fw-bold title">${arrayList[i].title}</h4>
                                    <p class="fs-4"> ${arrayList[i].overview}</p>
                                    <p class="fs-5">rate: ${arrayList[i].vote_average}</p>
                                    <p class="fs-5"> Date: ${arrayList[i].release_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
    $('#cardMovie .row').html(cartona);
}
$('nav .nav-info-2 .fa').click(function (e) {
    const widthNav = $('nav .nav-info-1').outerWidth(true) ;
    const offsetNavbar = $(e.target).offset().left ;
    if (offsetNavbar > widthNav ) {                 // close navbar
        $('nav').animate({left :`-${widthNav}px`},400);
        $('nav .nav-info-2 i').removeClass('d-none');
        $(e.target).addClass('d-none');
        // $('nav .nav-info-1 ul li').hide(400);
        $('nav .nav-info-1 ul li').eq(0).animate({ top : '100%', opacity: '0%'},400)
        $('nav .nav-info-1 ul li').eq(1).animate({ top : '100%', opacity: '0%'},400)
        $('nav .nav-info-1 ul li').eq(2).animate({ top : '100%', opacity: '0%'},400)
        $('nav .nav-info-1 ul li').eq(3).animate({ top : '100%', opacity: '0%'},400)
        $('nav .nav-info-1 ul li').eq(4).animate({ top : '100%', opacity: '0%'},400)
        $('nav .nav-info-1 ul li').eq(5).animate({ top : '100%', opacity: '0%'},400)
    }else{                                  // open navbar
        $('nav').animate({left :`0px`},400);
        $('nav .nav-info-2 i').removeClass('d-none');
        $(e.target).addClass('d-none');
        $('nav .nav-info-1 ul li').eq(0).animate({ top : '0%', opacity: '100%'},580, () => {
            $('nav .nav-info-1 ul li').eq(1).animate({ top : '0%', opacity: '100%'},550,() => {
                $('nav .nav-info-1 ul li').eq(2).animate({ top : '0%', opacity: '100%'},510,() => {
                    $('nav .nav-info-1 ul li').eq(3).animate({ top : '0%', opacity: '100%'},480,() => {
                        $('nav .nav-info-1 ul li').eq(4).animate({ top : '0%', opacity: '100%'},450, () => {
                            $('nav .nav-info-1 ul li').eq(5).animate({ top : '0%', opacity: '100%'},420, () => {
                                $('nav .nav-info-1 ul li').eq(6).animate({ top : '0%', opacity: '100%'},400)
                            })
                        })
                    })
                })
            })
        })
    }
});
searchInput2.addEventListener('input', function () {
    searchList = []
    for (let i = 0; i < result.length; i++) { 
        if (result[i].title.toLowerCase().includes(searchInput2.value.toLowerCase())) {
            searchList.push(result[i]) 
        }
    }
    displayData(searchList)
})
searchInput1.addEventListener('input', async function () {
    if (searchInput1.value.length >= 3) {
        apiLink = 'https://api.themoviedb.org/3/movie/top_rated?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1'
        await getApi(apiLink);
        searchList = []
        for (let i = 0; i < result.length; i++) { 
            if (result[i].title.toLowerCase().includes(searchInput1.value.toLowerCase())) {
                searchList.push(result[i]) 
            }
        }
        displayData(searchList);
    }else if(searchInput1.value.length == 0){
        apiLink = 'https://api.themoviedb.org/3/movie/now_playing?api_key=0cd92cbd67230c972df7a07a3cd42ac5&language=en-US&page=1'
        callBack()
    }
})
async function callBack() {
    await getApi(apiLink);
    displayData(result);
};
callBack();
$('nav .nav-info-1 ul .contact').click(function () {
    const offsetContact = $('#contactUs').offset().top
    $('html,body').animate({scrollTop:`${offsetContact}px`},500)
})
                            // REGEX
nameInput.addEventListener('input', function () {
    const regexName = /^\D+/;
    const wName =$('#w-name')
    if (regexName.test(nameInput.value)) {
        wName.addClass("d-none")
    }else
    {
        wName.removeClass('d-none');
    }
});
PhoneInput.addEventListener('input', function () {
    const regexPhone = /^\d{10,11}$/;
    const wPhone =$('#w-phone')
    if (regexPhone.test(PhoneInput.value)) {
        wPhone.addClass("d-none")
    }else
    {
        wPhone.removeClass('d-none');
    }
});
emailInput.addEventListener('input', function () {
    const regexEmail = /^([a-z]|[0-9]).*([@]\D+[.]\D{2})/i;
    const wEmail =$('#w-email')
    if (regexEmail.test(emailInput.value)) {
        wEmail.addClass("d-none")
    }else
    {
        wEmail.removeClass('d-none');
    }
});
ageInput.addEventListener('input', function () {
    const regexAge = /^\d+$/;
    const wAge =$('#w-age')
    if (regexAge.test(ageInput.value)) {
        wAge.addClass("d-none")
    }else
    {
        wAge.removeClass('d-none');
    }
});
passwordInput.addEventListener('input', function () {
    const regexPassword = /[a-z](\d){1}/ig
    const wPassword =$('#w-password')
    if (regexPassword.test(passwordInput.value) && passwordInput.value.length >= 8 ) {
        wPassword.addClass("d-none")
    }else
    {
        wPassword.removeClass('d-none');
    }
});
repasswordInput.addEventListener('input', function () {
    const wRepassword =$('#w-repassword')
    if (passwordInput.value == repasswordInput.value) {
        wRepassword.addClass("d-none")
    }else
    {
        wRepassword.removeClass('d-none');
    }
});
                    // loading Document
$(document).ready(function () {
    $(".sk-cube-grid").fadeOut(100, function () {
      $(".screen").fadeOut(100, function () {
        $(".screen").remove();
        $("body").css("overflow-y", "auto");
      });
    });
  });