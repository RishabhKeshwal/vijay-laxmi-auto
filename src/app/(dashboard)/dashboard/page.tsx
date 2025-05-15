import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from 'lucide-react'; // Lucide outline icon
import { FaUsers, FaDollarSign, FaArrowTrendUp } from "react-icons/fa6";
import { FaTachometerAlt, FaUserFriends, FaShoppingCart } from 'react-icons/fa'
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";


const stats = [
    {
        title: "Total Users",
        value: "1,245",
        icon: <FaUsers className="text-indigo-600" />,
    },
    {
        title: "Orders",
        value: "578",
        icon: <FaShoppingCart className="text-green-600" />,
    },
    {
        title: "Revenue",
        value: "₹92,500",
        icon: <FaDollarSign className="text-yellow-500" />,
    },
    {
        title: "Growth",
        value: "+12.4%",
        icon: <FaArrowTrendUp className="text-rose-500" />,
    },
];

const activities = [
    { user: "Ravi", activity: "Placed an order", time: "2 mins ago" },
    { user: "Anjali", activity: "Signed up", time: "10 mins ago" },
    { user: "Suresh", activity: "Queried service", time: "30 mins ago" },
    { user: "Preeti", activity: "Updated profile", time: "1 hour ago" },
];

const DashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                    <Gauge className="text-indigo-600 h-7 w-7" strokeWidth={1.5} />
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                </div>
                <p className="text-gray-500 text-sm">
                    Welcome back! Here's what's happening today.
                </p>
            </div>
            <Separator className="my-4" />
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="shadow hover:shadow-md transition">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-semibold">{stat.value}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                {stat.icon}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <ScrollArea className="h-64">
                            {activities.map((item, idx) => (
                                <div key={idx} className="mb-4">
                                    <p className="text-sm font-medium text-gray-800">{item.user}</p>
                                    <p className="text-sm text-gray-500">{item.activity}</p>
                                    <p className="text-xs text-gray-400">{item.time}</p>
                                    <Separator className="my-2" />
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Chart Placeholder */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center text-gray-400">
                        [Chart will be displayed here]
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
