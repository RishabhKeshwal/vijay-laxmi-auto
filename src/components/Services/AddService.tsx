// components/forms/AddService.tsx
'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

const bikeData: Record<string, string[]> = {
    Honda: ["Shine", "CB350", "Unicorn", "Hornet"],
    Yamaha: ["FZ", "MT15", "R15", "Fascino"],
    Bajaj: ["Pulsar", "Dominar", "Avenger", "CT100"],
    Suzuki: ["Gixxer", "Access", "Burgman"],
    Hero: ["Splendor", "HF Deluxe", "Xtreme", "Glamour"],
    TVS: ["Apache", "Jupiter", "Ntorq", "Sport"],
    RoyalEnfield: ["Classic 350", "Hunter 350", "Meteor", "Bullet 350"],
};

interface AddServiceProps {
    onSuccess?: () => void;
}

const AddService: React.FC<AddServiceProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        company: "",
        model: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCompanyChange = (value: string) => {
        setFormData((prev) => ({ ...prev, company: value, model: "" }));
    };

    const handleModelChange = (value: string) => {
        setFormData((prev) => ({ ...prev, model: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{10}$/;
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (!phoneRegex.test(formData.contact)) {
            return toast.error("Contact number must be exactly 10 digits.");
        }

        if (!timeRegex.test(formData.preferredTime)) {
            return toast.error("Time must be in HH:MM format.");
        }

        setLoading(true);
        try {
            const res = await fetch("/api/services/schedule-service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("✅ Service scheduled successfully!");
                setFormData({
                    name: "",
                    contact: "",
                    company: "",
                    model: "",
                    serviceType: "",
                    preferredDate: "",
                    preferredTime: "",
                    notes: "",
                });
                if (onSuccess) onSuccess();
            } else {
                toast.error(data?.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
                    { id: "contact", label: "Contact Number", type: "text", placeholder: "10-digit phone number" },
                    { id: "serviceType", label: "Service Type", type: "text", placeholder: "Eg: Oil change" },
                    { id: "preferredDate", label: "Preferred Date", type: "date" },
                    { id: "preferredTime", label: "Preferred Time", type: "time" },
                ].map(({ id, label, ...rest }) => (
                    <div key={id}>
                        <Label htmlFor={id}>{label}</Label>
                        <Input
                            id={id}
                            name={id}
                            value={(formData as any)[id]}
                            onChange={handleChange}
                            className="mt-1"
                            required
                            {...rest}
                        />
                    </div>
                ))}

                <div>
                    <Label htmlFor="company">Company</Label>
                    <Combobox
                        id="company"
                        options={Object.keys(bikeData)}
                        value={formData.company}
                        onChange={handleCompanyChange}
                        placeholder="Select Brand"
                    />
                </div>

                <div>
                    <Label htmlFor="model">Model</Label>
                    <Combobox
                        id="model"
                        options={formData.company ? bikeData[formData.company] : []}
                        value={formData.model}
                        onChange={handleModelChange}
                        placeholder="Select Model"
                        disabled={!formData.company}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1"
                    placeholder="Mention any issues or extra details"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-primary hover:bg-primary/90 font-medium text-lg py-3 rounded-xl transition-all"
            >
                {loading ? "Submitting..." : "Schedule Service"}
            </Button>
        </form>
    );
};

export default AddService;
