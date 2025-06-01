import axios from "axios"
import React, { useState, type HTMLInputTypeAttribute } from "react"

interface Cars {
    model: string

    daily_cost: number
    brand: string
    license_plate_number: string

}
function Ujcar({onCarAdded}: {onCarAdded: ()=>void}){
    const [cars, setCars] = useState<Cars>({
        model:"",
        daily_cost:0,
        brand:"",
        license_plate_number:""
    })
    const [error, setError] = useState<string |null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading]= useState<boolean>(false)

      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setCars({
            ...cars,
            [name]: name ==='daily_cost' ? Number(value) : value
        })
      }

      const handleForm = async (e: React.FormEvent)=>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        setSuccess(false)
try{
        const formatted = {
            ...cars
        }
        await axios.post('http://localhost:3000/api/cars',formatted)
        setCars({
            model:"",
        daily_cost:0,
        brand:"",
        license_plate_number:""
        })
        setSuccess(true)
        onCarAdded()
      } catch(err:any){
        setError(err?.response?.data?.message)
      } finally{
        setLoading(false)
      }
    }

    return( 
        <div className="container mt-5">
            <div className="row justify-content-center">
                        <div className="col-md-6">
                  {success && <div className="alert alert-success">Sikeres hozzáadás</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleForm}>
                     
                            <div className="mb-3">
                                <label htmlFor="license_plate_number" className="form-label" >license_plate_number</label>
                                 <input
                                 type="text"
                                 name="license_plate_number"
                                 id="license_plate_number"
                                 className="form-control"
                                 required
                                 onChange={handleInput}
                                 value={cars.license_plate_number}></input>
                            </div>
                               <div className="mb-3">
                                <label htmlFor="brand" className="form-label" >brand</label>
                                 <input
                                 type="text"
                                 name="brand"
                                 id="brand"
                                 className="form-control"
                                 required
                                 onChange={handleInput}
                                 value={cars.brand}></input>
                            </div>
                               <div className="mb-3">
                                <label htmlFor="model" className="form-label" >model</label>
                                 <input
                                 type="text"
                                 name="model"
                                 id="model"
                                 className="form-control"
                                 required
                                 onChange={handleInput}
                                 value={cars.model}></input>
                            </div>
                               <div className="mb-3">
                                <label htmlFor="daily_cost" className="form-label" >daily_cost</label>
                                 <input
                                 type="number"
                                 name="daily_cost"
                                 id="daily_cost"
                                 className="form-control"
                                 required
                                 onChange={handleInput}
                                 value={cars.daily_cost}></input>
                            </div>
                            <div >
                                <button className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'hozzáadás':'hozzáadás'}
                                </button>
                            </div>
                       
                    </form>
                    </div>
            </div>
        </div>
    )

}
export default Ujcar