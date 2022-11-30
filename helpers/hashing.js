const bcrypt = require("bcryptjs");


const hashGenerate =  async (plainPassword)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword,salt);
    return hash;
}

const hashValidator = async (plainpassword,hashpasswordd)=>{
    try{
        const result = await bcrypt.compare(plainpassword,hashpasswordd);
        return result; 
    }catch(error){
        return false;
    }
  
}

module.exports.hashGenerate = hashGenerate;
module.exports.hashValidator = hashValidator;