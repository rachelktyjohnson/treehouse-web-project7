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

let activities_fieldset = document.getElementById('activities');
activities_fieldset.addEventListener('change', (e)=>{
    let total_cost_string = document.getElementById('activities-cost');
    let total_cost_int = parseInt(total_cost_string.innerText.replace(/\D/g, ''));
    if (e.target.checked){
        total_cost_int += parseInt(e.target.dataset.cost);
    } else {
        total_cost_int -= parseInt(e.target.dataset.cost);
    }
    total_cost_string.innerText = `Total: $${total_cost_int}`;
})