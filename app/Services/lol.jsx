<div
  className="card bg-white md:h-80 lg:w-3/4 rounded-2xl leading-[30px] lg:leading-[60px] flex flex-col md:flex-row py-10 pr-3"
  key={id}
>
  <div className="md:w-2/3 h-full">
    <h1 className="text-bg font-ubuntu font-extrabold tracking-tight text-left text-4xl md:text-6xl lg:text-7xl leading-[30px] lg:leading-[60px] px-4 md:px-10">
      {service}
    </h1>
    <h1 className="text-green font-ubuntu font-extrabold tracking-tight text-left text-4xl md:text-6xl lg:text-7xl leading-[30px] lg:leading-[60px] px-4 md:px-10">
      {title2}
    </h1>
    <Image
      src={img}
      alt={service}
      width={500}
      height={500}
      className="object-cover"
    />
  </div>

  <div className="md:w-1/3 md:h-full self-end md:content-end">
    <Link href={`/Services/${id}`} className="">
      <Button className="xl:w-56 p-7 md:p-10 text-xl md:text-2xl rounded-full text-green bg-bg hover:text-bg hover:bg-green">
        Ver Servicio
      </Button>
    </Link>
  </div>
</div>;
