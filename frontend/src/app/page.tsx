import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const appointments = [
    { id: 1, customer: "John Doe", service: "AC Repair", date: "2024-08-01", time: "10:00 AM", technician: "Alice Smith" },
    { id: 2, customer: "Jane Smith", service: "Heating Maintenance", date: "2024-08-02", time: "2:00 PM", technician: "Bob Johnson" },
    { id: 3, customer: "Mike Brown", service: "Duct Cleaning", date: "2024-08-03", time: "11:30 AM", technician: "Charlie Davis" },
];

const technicians = [
    { id: 1, name: "Alice Smith", appointments: 5, utilization: "85%" },
    { id: 2, name: "Bob Johnson", appointments: 4, utilization: "75%" },
    { id: 3, name: "Charlie Davis", appointments: 6, utilization: "90%" },
];

const Dashboard = () => {
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">HVAC Scheduling System</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{appointments.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Technicians</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{technicians.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="p-2 bg-gray-100 rounded">
                                <p><strong>{appointment.customer}</strong> - {appointment.service}</p>
                                <p>{appointment.date} at {appointment.time}</p>
                                <p>Technician: {appointment.technician}</p>
                                <Button size="sm" variant="outline" className="mt-2">
                                    Reschedule
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Technician Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {technicians.map((technician) => (
                            <div key={technician.id} className="p-2 bg-gray-100 rounded">
                                <p><strong>{technician.name}</strong></p>
                                <p>Appointments: {technician.appointments}</p>
                                <p>Utilization: {technician.utilization}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;