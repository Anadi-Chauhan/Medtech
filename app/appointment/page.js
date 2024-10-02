"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(1, "Age must be a positive number"),
  mobile: z.string().min(10, "must be 10 digits"),
  locality: z.string().min(5, "must have an address"),
  gender: z.enum(["male", "female", "other"]),
  date: z.date(),
  hospital: z.string().min(1, "Select a hospital"),
});

const Page = () => {
  const [hospitals, setHospitals] = useState([]);
  const [date, setDate] = useState();
  const [userLocation, setUserLocation] = useState(null); // Store user location
  const [selectedHospitalCoords, setSelectedHospitalCoords] = useState(null); // Hospital coordinates

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Fetch hospitals using Overpass API with fetch
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const overpassQuery = `
          [out:json];
          area[name="Sangrur"]->.searchArea;
          node["amenity"="hospital"](area.searchArea);
          out body;
        `;

        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `data=${encodeURIComponent(overpassQuery)}`,
          }
        );

        const data = await response.json();
        const fetchedHospitals = data.elements.map((hospital) => ({
          name: hospital.tags.name,
          lat: hospital.lat,
          lon: hospital.lon,
        }));
        setHospitals(fetchedHospitals);
      } catch (error) {
        toast.error("Error fetching hospitals");
      }
    };

    fetchHospitals();

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Form submitted successfully!");
  };

  const handleHospitalSelect = (hospital) => {
    const selectedHospital = hospitals.find((h) => h.name === hospital);
    if (selectedHospital) {
      setSelectedHospitalCoords([selectedHospital.lat, selectedHospital.lon]);
    }
  };

  return (
    <div className="container mx-auto mt-10 h-3/4 flex justify-center items-center gap-10">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mt-10 border-2 border-gray-200 ">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Patient Appointment Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Age */}
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              {...register("age")}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Number*/}
          <div className="grid gap-2">
            <Label htmlFor="mobile">Phone No.</Label>
            <Input
              id="mobile"
              type="number"
              placeholder="Enter your phone number"
              {...register("mobile")}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date of Appointment</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal rounded-none",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>

      {/* Map */}
      <div className="w-full relative max-w-lg bg-white shadow-md rounded-lg p-6 border-2 border-gray-200 z-20 ">
        <div className="grid gap-2">
          <Label htmlFor="hospital">Hospital</Label>
          <Select onValueChange={handleHospitalSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Hospital" />
            </SelectTrigger>
            <SelectContent>
              {hospitals.length > 0 ? (
                hospitals.map((hospital, index) => (
                  <SelectItem key={index} value={hospital.name}>
                    {hospital.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No hospitals found</SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors.hospital && (
            <p className="text-red-500 text-sm">{errors.hospital.message}</p>
          )}
        </div>
        {userLocation && selectedHospitalCoords ? (
          <MapContainer
            center={userLocation}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-96 mt-4"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userLocation} />
            <Marker position={selectedHospitalCoords} />
            <Polyline
              positions={[userLocation, selectedHospitalCoords]}
              color="blue"
            />
          </MapContainer>
        ) : (
          <p className="mt-10 font-medium text-xl font-serif">
            A map will pop up when you select a hospital so you can see the
            direction of Hospital.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
