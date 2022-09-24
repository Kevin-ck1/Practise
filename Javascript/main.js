const myform = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myform.addEventListener('submit', onSubmit);

function onSubmit(event){
    event.preventDefault();
    console.log(nameInput.value);

    //Validating the form inputs
    if(nameInput.value == '' || emailInput == ''){
        alert('Please Fill in all fields')
    } else {
        const li = document.createElement('li');
        //li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        li.innerText = `${nameInput.value} : ${emailInput.value}`;
        userList.appendChild(li);

        //clear the fields
        nameInput.value = '';
        emailInput.value = '';
    }
}





