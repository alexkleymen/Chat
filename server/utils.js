const allUsers = []

const addUser = ({id,name,room}) => {
    if(allUsers.find(user=>user.name===name)) return ('user already exist')
    const user = {id,name,room}
    allUsers.push(user)
    
}

const deleteUser = (id) =>{
    let indexToDelete=allUsers.findIndex(user=>user.id===id)
    allUsers.splice(indexToDelete)
}


module.exports ={addUser,deleteUser,allUsers};