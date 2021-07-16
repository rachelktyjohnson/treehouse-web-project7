
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
activities_fieldset.addEventListener('change', (e)=>{
    let total_cost_string = document.getElementById('activities-cost');
    let total_cost_int = parseInt(total_cost_string.innerText.replace(/\D/g, ''));
    //console.log(e.target); //e.target is the input
    let day_and_time = e.target.dataset.dayAndTime;

    //loop over all the activities
    let all_activities = document.querySelectorAll('#activities-box label input');

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
form.addEventListener('submit', (e)=>{
    let all_validated = true;
    all_validated *= checkName(document.getElementById('name').value);
    all_validated *= checkEmail(document.getElementById('email').value);
    all_validated *= checkActivities();
    if (payment.value==="credit-card"){
        all_validated *= checkCardNumber(document.getElementById('cc-num').value)
        all_validated *= checkZip(document.getElementById('zip').value)
        all_validated *= checkCVV(document.getElementById('cvv').value)
    }
    if(!all_validated){
        e.preventDefault();
    };

})

//check name function
function checkName(name){
    return name!=="" || name==null;
}

//check email addresss
function checkEmail(email) {
    //woo regex!
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function checkActivities(){
    let all_activities = document.querySelectorAll('#activities-box label input');
    for (let i=0; i<all_activities.length; i++){
        if (all_activities[i].checked){
            return true;
        }
    }
    return false;
}

function checkCardNumber(card_number){
    return /^\d+$/.test(card_number) && card_number.length<=16 && card_number.length>=13;
}

function checkZip(zip){
    return /^\d+$/.test(zip) && zip.length===5;
}
function checkCVV(cvv){
    return /^\d+$/.test(cvv) && cvv.length===3;
}