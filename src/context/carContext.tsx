import { createContext, useContext, useState, useCallback, useRef } from "react";
import createCarStreamer from "../api/car-data-streamer";
import { CarData } from "../api/data-generator";
import createStreamerFrom from "../api/streamer";

export type Vin = {
  vin: string;
  checked: boolean;
  color: string;
}
type ICarData = CarData & { color: string }
type VinStreamer = { [vin: string]: ReturnType<typeof createStreamerFrom> }

interface CarContextType {
  /* States */
  carData: ICarData[];
  vinStreamer: VinStreamer;

  /* Handlers */
  handleNewVin: (vin: Vin) => void;
  handleCheckVin: (vin: Vin) => void;
  handleFilter: (toggleFilter: boolean) => void;
}

const CarContext = createContext<CarContextType>({} as CarContextType);
export const useCarContext = () => useContext(CarContext);

export const CarContextProvider = ({ children }: { children: React.PropsWithChildren<{}> }) => {
  const [carData, setCarData] = useState<ICarData[]>([]);
  const [vinStreamer, setVinStreamer] = useState<VinStreamer>({});

  /* Ref obj for saving the previous car data array when user click filter */
  const unFilteredData = useRef<ICarData[]>([])

  const handleNewVin = useCallback((vin) => {
      if(vinStreamer[vin.vin]) {
        return;
      }
      const carStreamer = createCarStreamer(vin.vin);
      carStreamer.subscribe((data) => setCarData(prev => [{...data, color: vin.color}, ...prev]));
      carStreamer.start();
      setVinStreamer(prev => ({ ...prev,[vin.vin]: carStreamer }))
  }, [vinStreamer]);

  const handleCheckVin = useCallback((vin) => {
    if (vin.checked) {
      vinStreamer[vin.vin]?.start();
      return;
    }
    vinStreamer[vin.vin]?.stop();
  }, [vinStreamer]);

  const handleFilter = (toggleFilter: boolean) => {
    if (!toggleFilter) {
      unFilteredData.current = [...carData];
      const filteredCars = carData.filter(car => car.fuel < 0.15);
      setCarData(filteredCars);
      return;
    }
    setCarData([...unFilteredData.current]);
  }

  return (
    <CarContext.Provider value={{
      /* States */
      carData,
      vinStreamer,

      /* Handlers */
      handleNewVin,
      handleCheckVin,
      handleFilter,
    }}>
      {children}
    </CarContext.Provider>
  )
}
