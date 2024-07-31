
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import "@/app/globals.css"


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
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">HVAC Scheduling System</h1>

            <Tabs defaultValue="overview" className="mb-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="technicians">Technicians</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
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
                </TabsContent>

                <TabsContent value="appointments">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appointment Calendar</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Calendar 
                                    mode="single"
                                    selected={new Date()}
                                    className="rounded-md border"
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Appointments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Service</TableHead>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {appointments.map((appointment) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell>{appointment.customer}</TableCell>
                                                <TableCell>{appointment.service}</TableCell>
                                                <TableCell>{`${appointment.date} ${appointment.time}`}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Scheduled</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="technicians">
                    <Card>
                        <CardHeader>
                            <CardTitle>Technician Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Appointments</TableHead>
                                        <TableHead>Utilization</TableHead>
                                        <TableHead>Performance</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {technicians.map((technician) => (
                                        <TableRow key={technician.id}>
                                            <TableCell>{technician.name}</TableCell>
                                            <TableCell>{technician.appointments}</TableCell>
                                            <TableCell>{technician.utilization}</TableCell>
                                            <TableCell>
                                                <Progress value={parseInt(technician.utilization)} className="w-[60%]" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;