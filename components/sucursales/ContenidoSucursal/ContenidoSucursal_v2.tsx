import { MapPin, Phone, Mail, Clock } from "lucide-react";

type Props = {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;   
    phone: string;
    email: string;
    hours: string;
    image: string;
    about: string;
    maps: string;
}

export default function ContenidoSucursal_v2({id, name, description, address, city, phone, email, hours, image, about, maps}: Props) {
  return (
    <section className="h-screen w-full"
            aria-labelledby={`sucursal-${id}-title`}
    >    
        <div
            style={{backgroundImage:`url(${image})`}} 
            className="
                w-full h-[70vh]
                bg-cover bg-center bg-blend-multiply bg-[#666]
                flex items-center
                p-20
            "
        >
            <h2 id={`sucursal-${id}-title`}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
                Sucursal {name}
            </h2>
        </div>


        <div>

            <p className="text-lg mb-8">
                {description}
            </p>
            <dl className="space-y-4">
                <div className="flex items-start">
                    <dt className="sr-only">Dirección</dt>
                    <dd className="flex items-center">
                        <span className="mr-3 mt-1">
                        <MapPin className="h-6 w-6 text-accent" />
                        </span>
                        <div>
                        <span className="font-medium block">{address}</span>
                        <span className="text-muted-foreground block">{city}</span>
                        </div>
                    </dd>
                    </div>
                    <div className="flex items-center">
                    <dt className="sr-only">Teléfono</dt>
                    <dd className="flex items-center">
                        <span className="mr-3">
                        <Phone className="h-6 w-6 text-accent" />
                        </span>
                        <span>{phone}</span>
                    </dd>
                    </div>
                    <div className="flex items-center">
                    <dt className="sr-only">Email</dt>
                    <dd className="flex items-center">
                        <span className="mr-3">
                        <Mail className="h-6 w-6 text-accent" />
                        </span>
                        <span>{email}</span>
                    </dd>
                    </div>
                    <div className="flex items-center">
                    <dt className="sr-only">Horarios</dt>
                    <dd className="flex items-center">
                        <span className="mr-3">
                        <Clock className="h-6 w-6 text-accent" />
                        </span>
                        <span>{hours}</span>
                    </dd>
                </div>
            </dl>
            <div className="mt-8">
                <h2 className="font-semibold mb-2 text-lg">Sobre la sucursal</h2>
                <p className="text-muted-foreground">
                {about}
                </p>
            </div>
        </div>

        <iframe 
            width="600" 
            height="450" 
            style={{border:"0"}} 
            src={maps} 
            allowFullScreen
            loading="eager" 
            referrerPolicy="no-referrer-when-downgrade">
            
        </iframe>


        </section>
  )
}