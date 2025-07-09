"use server";

export async function checkAndAllocateCredits(user) {
    try {
      if (!user) {
        return null;
      }

      if (user.role !== "PATIENT") {
        return user;
      }

      const { has } = await auth();

      
    } catch (error) {
        
    }
}