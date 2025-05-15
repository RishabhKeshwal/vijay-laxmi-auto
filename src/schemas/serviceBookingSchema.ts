// schemas/serviceBookingSchema.ts
import { z } from "zod";

export const serviceBookingSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  contact: z.string().min(10, "Invalid contact number"),
  company: z.enum([
    "Honda",
    "Yamaha",
    "Bajaj",
    "Suzuki",
    "Hero",
    "TVS",
    "RoyalEnfield",
  ]),
  model: z.string().min(1, "Model is required"),
  serviceType: z.string().min(1, "Service Type is required"),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  notes: z.string().optional(),
});

export type ServiceBookingData = z.infer<typeof serviceBookingSchema>;
