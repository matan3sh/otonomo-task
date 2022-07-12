import { createContext, useContext, useState } from "react";
import generateCarData from "../api/data-generator";
import createStreamerFrom from "../api/streamer";
import createRandomColor from "../dom-utils/colors";

type CarItem = {
  vin: string;
  checked: boolean;
  color: string;
  streamer: ReturnType<typeof createStreamerFrom>;
}

interface CarContextType {
  /* States */
  value: string;
  cars: CarItem[];
  streamCars: CarItem[];
  error: string | null;

  /* Setters */
  setValue: (value: string) => void;
  setCars: (cars: CarItem[]) => void;
  setError: (error: string | null) => void;

  /* Handlers */
  handleAddCar: () => void;
  handleCheck: (car: CarItem) => void;
}

const CarContext = createContext<CarContextType>({} as CarContextType);
export const useCarContext = () => useContext(CarContext);

export const CarContextProvider = ({ children }: { children: React.PropsWithChildren<{}> }) => {
  const [value, setValue] = useState<string>('');
  const [cars, setCars] = useState<CarItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isValidInput = () => {
    const vin = value.trim();
    let isValid = true;

    /* Check if the vin is not empty and at least 7 characters */
    if (!value.length || vin.length < 7) {
      setError('VIN must be at least 7 characters long');
      isValid = false;
    }

    /* Check if the vin is already exists */
    if (cars.some((car) => car.vin === vin)) {
      setError('VIN already exists');
      isValid = false;
    }
    return isValid;
  }

  const handleAddCar = () => {
    if (!isValidInput()) {
      return;
    }

    const newVin = {
      vin: value,
      checked: false,
      color: createRandomColor(),
      streamer: createStreamerFrom(() => generateCarData(value)),
    }
    setCars(prev => [...prev, newVin]);
    setValue('');
  }

  const handleCheck = (car: CarItem) => {
    const updatedCar = {...car, checked: !car.checked};
    const updatedCars = cars.map(currentCar => currentCar.vin === car.vin ? updatedCar : currentCar);
    setCars(updatedCars);
  }

  return (
    <CarContext.Provider value={{

      /* States */
      value,
      cars,
      streamCars: cars.filter(car => car.checked),
      error,

      /* Setters */
      setValue,
      setCars,
      setError,

      /* Handlers */
      handleAddCar,
      handleCheck,
    }}>
      {children}
    </CarContext.Provider>
  )
}
