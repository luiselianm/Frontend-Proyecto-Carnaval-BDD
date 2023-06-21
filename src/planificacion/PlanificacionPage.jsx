import { AddEvent } from "./AddEvent"
import { EventList } from "./EventList"

export const PlanificacionPage = () => {
  return (
    <>
      <hr/>
      <h2 className="px-4">Planificacion de Eventos</h2>
      <hr/>

      <EventList/>

    <hr />

      <AddEvent/>

    <hr />
    </>
  )
}
