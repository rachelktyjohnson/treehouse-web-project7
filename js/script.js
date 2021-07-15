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