import prisma from "@/lib/prismadb";
import getUserSessions from "./getUserSession";

const getCurrentUser = async() =>{
    try {
        const session = await getUserSessions();
        if(!session?.user?.email){
            return null
        }
        
        const currentUser = await prisma.user.findUnique({
            where: {email: session.user.email}
        })

        if(!currentUser){
            return null
        }

        return currentUser
    } catch (error:any) {
        return null
    }
}

export default getCurrentUser;