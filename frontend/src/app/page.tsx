'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import "@/app/globals.css"

const appointments = [
    { id: 1, customer: "John Doe", service: "AC Repair", date: "2024-08-01", time: "10:00 AM", technician: "Alice Smith", status: "Scheduled" },
    { id: 2, customer: "Jane Smith", service: "Heating Maintenance", date: "2024-08-02", time: "2:00 PM", technician: "Bob Johnson", status: "In Progress" },
    { id: 3, customer: "Mike Brown", service: "Duct Cleaning", date: "2024-08-03", time: "11:30 AM", technician: "Charlie Davis", status: "Completed" },
];

const technicians = [
    { id: 1, name: "Alice Smith", appointments: 5, utilization: "85%", availability: "Available" },
    { id: 2, name: "Bob Johnson", appointments: 4, utilization: "75%", availability: "On Job" },
    { id: 3, name: "Charlie Davis", appointments: 6, utilization: "90%", availability: "Available" },
];

const ChatMessage = ({ message, isUser }: { message: string, isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`rounded-lg p-3 max-w-[70%] ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
      {message}
    </div>
  </div>
);

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([
        { text: "Welcome to our HVAC Assistant. How can I help you today?", isUser: false }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatOptions, setChatOptions] = useState<string[]>([
        "Book an appointment", "Check appointment status", "Get a quote", "Emergency service"
    ]);

    const handleSendMessage = (message: string = inputMessage) => {
        if (message.trim()) {
            setMessages([...messages, { text: message, isUser: true }]);
            setInputMessage('');
            
            setTimeout(() => {
                let botResponse = '';
                let newOptions: string[] = [];

                switch (message.toLowerCase()) {
                    case "book an appointment":
                        botResponse = "Certainly, I can help you book an appointment. What type of service are you looking for?";
                        newOptions = ["AC repair", "Heating maintenance", "Duct cleaning"];
                        break;
                    case "ac repair":
                        botResponse = "I understand you need AC repair. When would you like to schedule the appointment?";
                        newOptions = ["Tomorrow", "This week", "Next week"];
                        break;
                    case "check appointment status":
                        botResponse = "I'd be happy to check your appointment status. Could you please provide your booking reference number or contact information?";
                        break;
                    case "get a quote":
                        botResponse = "Certainly, I can help you get a quote. What type of service are you interested in?";
                        newOptions = ["New installation", "Repair", "Maintenance"];
                        break;
                    case "emergency service":
                        botResponse = "I understand this is an emergency. Can you please describe the issue you're experiencing?";
                        newOptions = ["No heat", "No cooling", "Strange noises", "Water leakage"];
                        break;
                    default:
                        botResponse = "I apologize, I didn't quite understand. Could you please choose one of these options or rephrase your request?";
                        newOptions = ["Book an appointment", "Check appointment status", "Get a quote", "Emergency service"];
                }

                setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
                setChatOptions(newOptions);
            }, 1000);
        }
    };

    useEffect(() => {
        if (activeTab === "chatbot") {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [activeTab]);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">HVAC Scheduling System</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="technicians">Technicians</TabsTrigger>
                    <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Overall Utilization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">83%</p>
                                <Progress value={83} className="mt-2" />
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
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
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
                                                    <Badge variant={appointment.status === "Completed" ? "secondary" : "outline"}>
                                                        {appointment.status}
                                                    </Badge>
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
                                        <TableHead>Availability</TableHead>
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
                                            <TableCell>
                                                <Badge variant={technician.availability === "Available" ? "success" : "secondary"}>
                                                    {technician.availability}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="chatbot">
                    <Card>
                        <CardHeader>
                            <CardTitle>Chat with HVAC Assistant</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px] pr-4 mb-4">
                                {messages.map((msg, index) => (
                                    <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                                ))}
                            </ScrollArea>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {chatOptions.map((option, index) => (
                                    <Button key={index} variant="outline" onClick={() => handleSendMessage(option)}>
                                        {option}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex">
                                <Input
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <Button onClick={() => handleSendMessage()} className="ml-2">Send</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;