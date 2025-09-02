"use client";

import React, { useState } from "react";
import { CoursePriceProps } from "./CoursePrice.types";
import { TitleBlock } from "../TitleBlock";
import { DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export function CoursePrice(props: CoursePriceProps) {
  const { idCourse, priceCourse } = props;
  const [price, setPrice] = useState<string>(
    priceCourse || "Gratis"
  );
  const [isLoading, setIsLoading] = useState(false);

  const onChangePrice = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/course/${idCourse}`, { price });

      toast("Precio actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el precio del curso");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock title="Precio del curso" icon={DollarSign} />

      <Select onValueChange={setPrice} value={price}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un precio del curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Precio del curso</SelectLabel>
            <SelectItem value="Gratis" className="cursor-pointer">
              Gratis
            </SelectItem>
            <SelectItem value="19.99" className="cursor-pointer">
              19.99
            </SelectItem>
            <SelectItem value="49.99" className="cursor-pointer">
              49.99
            </SelectItem>
            <SelectItem value="99.99" className="cursor-pointer">
              99.99
            </SelectItem>
            <SelectItem value="199.99" className="cursor-pointer">
              199.99
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button 
        className="mt-3" 
        onClick={onChangePrice} 
        disabled={!price || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar precio"}
      </Button>
    </div>
  );
}
