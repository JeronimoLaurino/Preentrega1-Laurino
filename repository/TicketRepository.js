import Ticket from '../models/Ticket.js';

class TicketRepository {
  static async create(ticketData) {
    const ticket = new Ticket(ticketData);
    await ticket.save();
    return ticket;
  }
}

export default TicketRepository;