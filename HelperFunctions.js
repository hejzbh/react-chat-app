export const checkPasswordLength = (password)=>password.length>=8;

export const fixEmail = (email) => email.toLowerCase().trim().replaceAll(' ', '');

export const isEmailCorrect = (email) => {
    const criteries = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return criteries.test(email);
};


export const cutBlankSpace = (str) =>str.replaceAll(' ', '');


export const inputsHasValue = (obj) => Object.values(obj).every(item=>item!=='');


// str && - for prevent bug while input is empty
export const firstLetterUpper = (str) => str && `${str[0].toUpperCase()+str.slice(1).toLowerCase()}`.replaceAll(' ', '');


export const checkErrors = (inputsObject) => {
    let objectForTest = inputsObject;

  	const isObjectFromEdit = inputsObject.hasOwnProperty('createdAt');

    if(isObjectFromEdit){
      delete objectForTest.id;
      delete objectForTest.createdAt;
    }

    const errors = document.querySelectorAll('.error_message'); //all errors messages (<p> below inputs)

    const inputsNotEmpty = inputsHasValue(objectForTest); // check if the inputs are empty

    if(!inputsNotEmpty){
      // Map loop that finds empty inputs and then set an error message for them
      const propertyNames = Object.keys(objectForTest);

      Object.values(objectForTest).map((value, i)=>{
    
        // index of error message is equal to index of input
        if(value==='')errors[i].innerHTML=`Please insert your ${propertyNames[i].split('_').join(' ')}`;
      
      })
      return false;
    }


    // Check if there is any error message for incorrect input
    const noInputMistakes = [...errors].every(item=>item.innerHTML==='');

    if(!noInputMistakes){
      return false;
    };


    // everything is okay ?
    return true;
  }


  // stranger in chat (person who's not the loggedUser)
  export const stangerInChat = (chat, currentUserID) => chat.first_user.id!==currentUserID ? chat.first_user : chat.second_user;
 

  // last massage from chat
  export const messagePreview = (msg) => msg ? msg.slice(0, 20)+'...' : 'No messages';


  // Remember login (automatically runs when we sign up)
  export const rememberLogin = (user) => {
    localStorage.setItem('session', JSON.stringify({
      remember: user ? true : false,
      user
    }));
  }

  // ...
  export const getSession = () => {
        return JSON.parse(localStorage.getItem('session'));
  };


  // Different between two dates
  export const dateDifferently = (firstDate, secondDate) => {
    if(isNaN(secondDate.getTime())) return;

  


    const endDate = (()=>firstDate.getTime()-secondDate.getTime())();

    const days = Math.floor(endDate / (1000 * 60 * 60 * 24));
    const hours = Math.floor(endDate / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(Math.abs(endDate) / (1000 * 60) % 60);
  



   if(days!==0) return `${days} ${days>1 ? 'days' : 'day'} ago`;
   if(hours>=1) return `${hours}h ago`
   if(minutes>0) return `${minutes}m ago`;


   return 'Just now'
  }




  // Function that returns instruction message for one specific type, example (value===pasword - this has to be more than 8 charachers)
export const instructionMessage = (name, value) => {

  let error;

  switch(name){
    case 'email':
      error = isEmailCorrect(value);

      return !error ? 'Please enter your email in format: name@example.com' : '';
    break;

    case 'first_name':
      error = value.length>1;

      return !error ? 'First name is too short' : '';
    break;

    case 'last_name':
      error = value.length>=2;

      return !error ? 'Last name is too short' : '';
    break;

    case 'password':
      error = checkPasswordLength(value);
      return !error ? 'Use at least 8 charachers' : '';
    break;

    default: return true;
  }
}