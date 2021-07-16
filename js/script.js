
//job roles
let other_job_role = document.getElementById('other-job-role');
other_job_role.style.display="none";

let job_role = document.getElementById('title');
job_role.addEventListener('change', (e)=>{
    if(e.target.value === 'other'){
        other_job_role.style.display="block";
    } else {
        other_job_role.style.display="none";
    }
})


//shirt color & design
let shirt_colors = document.getElementById('shirt-colors');
shirt_colors.style.display = "none";

let shirt_designs = document.getElementById('shirt-designs');
shirt_designs.addEventListener('change',(e)=>{
    shirt_colors.style.display = "block";
    let all_colors = document.querySelectorAll('[data-theme]');
    for (let i=0; i<all_colors.length; i++){
        all_colors[i].removeAttribute('hidden');
    }
    if (e.target.value === 'js puns'){
        document.querySelector('[data-theme="js puns"]').selected = true;
        let all_heart = document.querySelectorAll('[data-theme="heart js"]')
        for (let i=0; i<all_heart.length; i++){
            all_heart[i].setAttribute('hidden', "hidden");
        }
    } else if (e.target.value === 'heart js'){
        document.querySelector('[data-theme="heart js"]').selected = true;
        let all_puns = document.querySelectorAll('[data-theme="js puns"]')
        for (let i=0; i<all_puns.length; i++){
            all_puns[i].setAttribute('hidden', "hidden");
        }
    } else {
        shirt_colors.style.display = "none";
    }
})


//activities
let activities_fieldset = document.getElementById('activities');
let all_activities = document.querySelectorAll('#activities-box label input');
activities_fieldset.addEventListener('change', (e)=>{
    checkActivities();
    let total_cost_string = document.getElementById('activities-cost');
    let total_cost_int = parseInt(total_cost_string.innerText.replace(/\D/g, ''));
    //console.log(e.target); //e.target is the input
    let day_and_time = e.target.dataset.dayAndTime;

    //loop over all the activities

    if (e.target.checked){

        //add to total
        total_cost_int += parseInt(e.target.dataset.cost);

        //loop over all activities and disable other options with the same data-day-and-time
        for (let i=0; i<all_activities.length; i++){
            if (all_activities[i].dataset.dayAndTime===day_and_time && all_activities[i]!==e.target){
                all_activities[i].parentNode.classList.add('disabled');
                all_activities[i].setAttribute('disabled','disabled');
            }
        }

    } else {

        //remove from total
        total_cost_int -= parseInt(e.target.dataset.cost);

        //loop over all activities and enable other options with the same data-day-and-time
        for (let i=0; i<all_activities.length; i++){
            if (all_activities[i].dataset.dayAndTime===day_and_time){
                all_activities[i].parentNode.classList.remove('disabled');
                all_activities[i].removeAttribute('disabled');
            }
        }

    }
    total_cost_string.innerText = `Total: $${total_cost_int}`;
})


//payment
let payment = document.getElementById('payment');
document.getElementById('paypal').style.display = "none";
document.getElementById('bitcoin').style.display = "none";

payment.addEventListener('change', (e)=>{
    //console.log(e.target.value);
    document.getElementById('paypal').style.display = "none";
    document.getElementById('bitcoin').style.display = "none";
    document.getElementById('credit-card').style.display = "none";
    if (e.target.value === 'credit-card'){
        document.getElementById('credit-card').style.display = "block";
    } else if (e.target.value === 'paypal'){
        document.getElementById('paypal').style.display = "block";
    } else if (e.target.value === 'bitcoin'){
        document.getElementById('bitcoin').style.display = "block";
    }
})


//////////form validation

let form = document.querySelector('form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let card_number = document.getElementById('cc-num');
let zip = document.getElementById('zip');
let cvv = document.getElementById('cvv');

form.addEventListener('submit', (e)=>{
    let all_validated = true;
    all_validated *= checkName(name);
    all_validated *= checkEmail(email);
    all_validated *= checkActivities();
    if (payment.value==="credit-card"){
        all_validated *= checkCardNumber(card_number)
        all_validated *= checkZip(zip)
        all_validated *= checkCVV(cvv)
    }
    if(!all_validated){
        e.preventDefault();
    }

})

/// CHECKING HELPERS

//check name is not empty
function checkName(name){
    if( name.value==="" || name.value==null){
        return setParentValid(name, false);
    } else {
        return setParentValid(name, true);
    }
}

//check email address is valid email string
function checkEmail(email) {
    //woo regex!
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value===""){
        return setParentValid(email, false, "Email field should be filled in")
    } else if (regex.test(String(email.value).toLowerCase()) === false){
        return setParentValid(email, false, "Email address must be formatted correctly");
    } else {
        return setParentValid(email, true);
    }
}

//check activities
function checkActivities(){

    let all_activities = document.querySelectorAll('#activities-box label input');
    for (let i=0; i<all_activities.length; i++){
        if (all_activities[i].checked){
            all_activities[i].parentNode.parentNode.parentNode.classList.add('valid');
            all_activities[i].parentNode.parentNode.parentNode.classList.remove('not-valid')
            all_activities[i].parentNode.parentNode.parentNode.lastElementChild.style.display = "none";
            return true;
        }
    }
    all_activities[0].parentNode.parentNode.parentNode.classList.add('not-valid');
    all_activities[0].parentNode.parentNode.parentNode.classList.remove('valid')
    all_activities[0].parentNode.parentNode.parentNode.lastElementChild.style.display = "block";
    return false;
}

//check card is all numbers are 13-16 digits long inclusive
function checkCardNumber(card_number){
    let value = card_number.value;
    if (/^\d+$/.test(value) && value.length<=16 && value.length>=13){
        return setParentValid(card_number, true);
    } else {
        return setParentValid(card_number, false);
    }
}

//check zip code is all numbers and 5 length
function checkZip(zip){
    if(/^\d+$/.test(zip.value) && zip.value.length===5){
        return setParentValid(zip, true)
    } else {
        return setParentValid(zip, false);
    }
}

//check zip code is all numbers and 3 length
function checkCVV(cvv){
    if (/^\d+$/.test(cvv.value) && cvv.value.length===3){
        return setParentValid(cvv, true);
    } else {
        return setParentValid(cvv, false);
    }
}

//sets all the classes and adds hint box for parent elements (basic input fields with labels)
function setParentValid(element, setValid, message=""){
    if (setValid){
        element.parentNode.classList.add('valid');
        element.parentNode.classList.remove('not-valid')
        element.parentNode.lastElementChild.style.display = "none";
        return true;
    } else {
        element.parentNode.classList.add('not-valid');
        element.parentNode.classList.remove('valid')
        element.parentNode.lastElementChild.style.display = "block";
        if (message!==""){
            element.parentNode.lastElementChild.innerHTML = message;
        }
        return false;
    }
}

//keyup listeners
name.addEventListener('keyup',()=>{
    checkName(name);
})
email.addEventListener('keyup', ()=>{
    checkEmail(email);
})

card_number.addEventListener('keyup', ()=>{
    checkCardNumber(card_number);
})

zip.addEventListener('keyup', ()=>{
    checkZip(zip);
})

cvv.addEventListener('keyup', ()=> {
    checkCVV(cvv);
})

///focus and blur
for (let i=0; i<all_activities.length; i++){
    all_activities[i].addEventListener('focus', (e)=>{
        e.target.parentNode.classList.add('focus');
    })

    all_activities[i].addEventListener('blur', (e)=>{
        e.target.parentNode.classList.remove('focus');
    })
}
