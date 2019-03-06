import { Pipe, PipeTransform } from '@angular/core';
import IEvent from '../../interfaces/IEvent';

@Pipe({
  name: 'eventFilter'
})
export class EventPipePipe implements PipeTransform {

  transform(events: IEvent[], filterBy: string): IEvent[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : false;

    console.log(events);

    return filter ? events.filter(e =>  String(e.title).toLowerCase().includes(filter)
      || String(e.description).toLowerCase().includes(filter)) : events;
  }
}
