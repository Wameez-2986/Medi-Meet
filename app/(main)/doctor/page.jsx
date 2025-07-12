import { getCurrentUser } from '@/actions/onboarding'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CreditCard, DollarSign } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import AvailabilitySettings from './_components/availability-settings';
import { getDoctorAppointments, getDoctorAvailability } from '@/actions/doctor';

const DoctorDashboard = async () => {
  const user = await getCurrentUser();

  const [appointmentsData, availabilityData] = await Promise.all([
      getDoctorAppointments(),
      getDoctorAvailability(),
    ]);

  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

   if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  return (
    <Tabs
        defaultValue="appointments"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <TabsList className="md:col-span-1 bg-muted/30 border h-14 md:h-40 flex sm:flex-row md:flex-col w-full p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0">
          <TabsTrigger
            value="appointments"
            className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
          >
            <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Appointments</span>
          </TabsTrigger>
          <TabsTrigger
            value="availability"
            className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
          >
            <Clock className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Availability</span>
          </TabsTrigger>
          <TabsTrigger
            value="payouts"
            className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
          >
            <CreditCard className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Payouts</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="border-none p-0">
           Todo
        </TabsContent>
        <TabsContent value="availability" className="border-none p-0">
          <AvailabilitySettings slots={availabilityData.slots || []} />
        </TabsContent>
      </Tabs>
  );
};

export default DoctorDashboard
