import {API} from './config';

// Function for checking is there any chat with these users in;
export const doesChatExist = async (firstUser, secondUser) => {
    try {

        // 1) Get all chats
        const {data: allChats} = await API.get('/chats');
    
        // 2) Try to find those that contains the same users
        const filteredChats = allChats.find(chat=>{
            if(
                (chat.first_user.id===firstUser.id || chat.first_user.id===secondUser.id) 
                &&
                (chat.second_user.id===firstUser.id || chat.second_user.id===secondUser.id)
            ) return chat;
        });
        
        // 3) Return it
        return filteredChats;

    }catch(err){
        throw err;
    }
}


// Function that is going to check is there user with same details as a user from parametar (the user we are trying to register)

export const checkForMultipleAccs = async (userToCheck) => {

    // 1) All users
    const {data: allUsers} = await API.get('/users');
  
    // 2) Check 
    const userExist = allUsers.some(user=>user.email===userToCheck.email);
  
    // 3) Return boolean value
    return userExist;
  }
  