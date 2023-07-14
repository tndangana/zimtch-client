/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useAthentication } from 'hooks/api/authentication';
import { usePatient } from 'hooks/api/patient';
import { useDiebetic } from 'hooks/api/diabeticscreening'



export const OnLoad = () => {
  const { getCurrentRegistrant } = useAthentication();
  const { getAdultPatientList18, GetAllPatientList } = usePatient();
  const { GetDiebeticList } = useDiebetic();

  const [isLoading, setIsLoading] = useState(true);


  const token = getCurrentRegistrant();
  useEffect(() => {
    if (token?.registrantNumber) {
      Promise.all([
        getAdultPatientList18(),
        GetDiebeticList(),
        GetAllPatientList()
      ]).then(() => {
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
        setIsLoading(false);
      });
    }
  }, [token]);
  return null;
}
