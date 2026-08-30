import { PhoneCTA } from "@/components/ui/PhoneCTA";

export function ReservationBlock({
  phoneNumber,
  phoneNumberDisplay,
  id = "disponibilites",
}: {
  phoneNumber: string;
  phoneNumberDisplay: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-2xl bg-primary p-8 text-center text-white sm:p-10">
      <h3 className="text-2xl text-white sm:text-3xl">Réserver / Disponibilités</h3>
      <p className="mx-auto mt-3 max-w-lg text-white/90">
        Pour vérifier les disponibilités et réserver un box, appelez-nous au :
      </p>
      <p className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{phoneNumberDisplay}</p>
      <div className="mt-6 flex justify-center">
        <PhoneCTA phoneNumber={phoneNumber} phoneNumberDisplay={phoneNumberDisplay} />
      </div>
    </div>
  );
}
