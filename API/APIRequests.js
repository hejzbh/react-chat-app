import {API} from './config';

// API helpers
import { checkForMultipleAccs } from './APIHelpers';
import { doesChatExist } from './APIHelpers';

// CTRL + F keywords 
// $1 - User api requests
// $2 - Login & Register api requests
// $3 - Chats api requests
// $4 - Messages api requests
// $5 - Contact api requests

///////////////////////////////////////////////////////////
         /////////// F O R   U S E R /////////// $1
///////////////////////////////////////////////////////////

// Function for all users
export const getAllUsers = async (signal) => {
    try {

        // 1) Get all users
        const {data: allUsers} = await API.get('/users', {
            signal:signal
        });

        // 2) Return them
        return allUsers;

    }catch(err){
        throw err;
    }
}

// Function for updating user data, such as (first_name, email, pw...)

export const updateUserAPI = async (user, name, value) => {
    try {
        
        // 1) Update
        const updating = await API.put(`/users/${user.id}`, {
           ...user,
           [name]:value
        });

        // 2) Return updated user data
        return updating.data;

    } catch(err){
        throw err;
    }
}


///////////////////////////////////////////////////////////
        ///// L O G I N  &  R E G I S T E R ///// $2
///////////////////////////////////////////////////////////

// Function for login
export const findUserToLogin = async (loginInfo) => {
    try {
      
        // 1) Get all users
        const {data:allUsers} = await API.get('/users');

        // 2) Try to find a user with pw and mail that matches inputs from LOGIN form

        const user = allUsers.find(user => user.email===loginInfo.email && user.password===loginInfo.password);

        // 3) there is user, return it.
        if(user) return user;

        
        // 4) there is no user, throw new Error
        throw new Error('User does not exist');
       
    } catch(err){
        throw err;
    }
}



// Function for register
export const crateNewUserAPI = async (newUser) => {
    try {

        // 1) Check if there is a user with same data as a newUser (email & pw)
        const userExists = await checkForMultipleAccs(newUser);

        // 2) If user exists, throw new Error
        if(userExists) throw new Error('The user already exists');

        // continue... (in case that user does not exist)

        // 3) Create new account
        const createAccount = await API.post('/users', newUser);

    }catch(err){
     throw err;
    }
}



////////////////////////////////////////////////////////////
         ///////////// C H A T S ////////////////// $3
////////////////////////////////////////////////////////////

export const getUserActiveChatsAPI = async (currentUserID) => {
    try {

        // 1) All chats
        const {data: allChats} = await API.get('/chats');

        // 3) Chats where is user in
        const userChats = allChats.filter(chat => chat.first_user.id===currentUserID || chat.second_user.id===currentUserID
        );

        // 3) Return all of them
        return userChats;

    }catch(err){
        throw err;
    }
}

// Function - get specific chat by ID

export const getChatAPI = async (id) => {
    try {
        
        // 1) Get chat
        const {data:chat} = await API.get(`/chats/${id}`);

        // 2) Return chat
        return chat;

      }
      catch(err){
         throw err;
    }
}


// Function for creating new chat 

export const postNewChatAPI = async ({user, loggedUser}) => {
    try {

        // 1) Create new chat 
        const {data} = await API.post(`/chats`, {
            first_user:{...loggedUser},
            second_user:{...user},
            messages:[]
        });

        // 2) Return that chat
        return data;

    }catch(err){
        throw err;
    }
}

// Function - delete chat by ID

export const deleteChatFromAPI = async (ID) => {
    // 1) Delete
    const deleting = API.delete(`/chats/${ID}`);
}



////////////////////////////////////////////////////////////
    /////////////  M E S S A G E S  ////////////////// $4
////////////////////////////////////////////////////////////

export const postNewMessageAPI = async (msg, chatID) => {
    try {

        // 1) Get current chat that will be pervious, down.
        const {data: perviousChat} = await API.get(`/chats/${chatID}`)
     
        // 2) Update chat 
        const sending = await API.put(`/chats/${chatID}`, {
          ...perviousChat,
          messages:[...perviousChat.messages, msg]
        });

        
    }catch(err){
        throw err;
    }
}




///////////////////////////////////////////////////////////
           //////// C O N T A C T S ///////     $5
///////////////////////////////////////////////////////////

export const deleteContactAPI = async (userID, contactID) => {
    // 1) Delete contact
    const deleting = await API.delete(`/users/${userID}/friends/${contactID}`);
    
}


export const addContactAPI = async( userID, newContact ) => {
    // 1) Add contact
    const adding = await API.post(`/users/${userID}/friends`, {
        id:newContact.id,
        first_name:newContact.first_name,
        last_name:newContact.last_name 
    });
    
}

export const getAllContacts = async (userID) => {

    // 1) Get user contacts
    const {data: allContacts} = await API.get(`/users/${userID}/friends`);

    return allContacts;

}