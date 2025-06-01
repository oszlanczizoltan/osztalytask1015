import axios from "axios"
import { useEffect, useState } from "react"

interface Cars {
    model: string
    id: number
    daily_cost: number
    brand: string
    license_plate_number: string

}

function Home(){
    const [cars, setCars]= useState<Cars[]>([])
    const [error, setError] = useState<string |null>(null)
      const [success, setSuccess] = useState<string |null>(null)
      const [loading, setLoading]= useState<boolean>(false)

      const handlerent = async (id: number)=> {
        try{
            const response = await axios.post(`http://localhost:3000/api/cars/${id}/rent`)

            setSuccess(response.data.message|| 'sikeres hozzáadás')
            setError(null)
        }catch(err:any){
            setError(err.response.data.message)
            setSuccess(null)
        }
      }

      useEffect(()=>{
        const fetchcars = async () =>{
            setLoading(true)
            try{
                const response = await axios.get('http://localhost:3000/api/cars')

                if(response.status !==200){
                    setError('hiba')
                }
                setCars(response.data)
            }catch(err:any){
                setError(`${err} hiba`)
            }finally{
                setLoading(false)
            }
        }
        fetchcars()
      },[])
return(
    <div className="container">
        <div className="row g-3">
            {error && <p style={{color:'red'}}>{error}</p>}
                   {success && <p style={{color:'green'}}>{success}</p>}
                   {loading && <p>Loading...</p>}
                   {cars.length ===0 && !loading && <p>Nincsenek autók</p>}

                   {cars.map((cars)=>
                    <div className="col-lg-4 col-md-6" key={cars.id}>
                        <div className="card  ">
                            <h2>{cars.license_plate_number}</h2>
                            <p>brand: {cars.brand}</p>
                            <p>Modell: {cars.model}</p>
                            <p>daily_cost: {cars.daily_cost} forint</p>
                            <img src={`${cars.brand.toLowerCase()}_${cars.model.toLowerCase()}.png`} ></img>
                            <button className="btn btn-success" onClick={()=>handlerent(cars.id)}>Foglalás</button>
                            </div>
                    </div>
                )}
        </div>
    </div>
)

}
export default Home