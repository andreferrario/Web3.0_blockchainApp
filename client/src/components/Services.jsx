import React from 'react'

import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'


const ServiceCard = ( { color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 my-2 mx-6 cursors-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className="mt-2 text-white text-lg ">{title}</h1>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
)

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col ">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Servizi che 
            <br />
            continuiamo a migliorare
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-cemter">
        <ServiceCard
          color ="bg-[#2952E3]"
          title ="Sicurezza Garantita"
          icon ={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Il nostro sistema di sicurezza ti garantisce la privacy e la sicurezza dei dati."
        />
        <ServiceCard
          color ="bg-[#8945F8]"
          title ="Miglior Exchange"
          icon ={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Scambia Crypto con altri utenti e ottieni il miglior prezzo."
        />
        <ServiceCard
          color ="bg-[#F84550]"
          title ="Transazioni Veloci"
          icon ={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Invia e ricevi i tuoi fondi in pochi secondi e con tasse basse."
        />
          </div>
    </div>
  )
}

export default Services