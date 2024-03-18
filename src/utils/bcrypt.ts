import bcrypt from "bcrypt";
export const hashPassword =async (password:any)=>{
    const salt=10;
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}