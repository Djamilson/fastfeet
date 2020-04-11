import { parseISO, format, subHours } from 'date-fns';

function formatDateInit(created_at) {
  return format(new Date(created_at), "yyyy-MM-dd'T'HH:mm:ssxxx");
}

function formatDat(end_date) {
  return format(new Date(end_date), 'dd/MM/yyyy');
}

class FormatDataLocal {
  subHours_time({ date_at }) {
    const date = formatDateInit(date_at);
    const parsedDate = parseISO(date);
    const end_date = subHours(parsedDate, 3);

    const created_at_ = formatDat(end_date);

    return created_at_;
  }

  async trataOrder({ order }) {
    const { created_at, start_date, end_date } = order.dataValues;
    //formata data
    let date_start_date;
    let date_end_date;

    if (order.dataValues.start_date !== null) {
      date_start_date = this.subHours_time({ date_at: start_date });
    }

    if (order.dataValues.end_date !== null) {
      date_end_date = this.subHours_time({ date_at: end_date });
    }

    const date_created_at = this.subHours_time({ date_at: created_at });

    return {
      ord: order,
      created_at: date_created_at,
      start_date: date_start_date,
      end_date: date_end_date,
    };
  }

  async trataData({ orders }) {
    const results = orders.map(async order_obj => {
      const { created_at, start_date, end_date } = order_obj.dataValues;

      //formata data
      let date_start_date;
      let date_end_date;

      if (order_obj.dataValues.start_date !== null) {
        date_start_date = this.subHours_time({ date_at: start_date });
      }

      if (order_obj.dataValues.end_date !== null) {
        date_end_date = this.subHours_time({ date_at: end_date });
      }

      const date_created_at = this.subHours_time({ date_at: created_at });

      return {
        ord: order_obj,
        created_at: date_created_at,
        start_date: date_start_date,
        end_date: date_end_date,
      };
    });

    return Promise.all(results).then(completed => {
      return completed;
    });
  }

  async trataCreate_at({ problems }) {
    const results = problems.map(async problem => {
      const { created_at } = problem.dataValues;

      const date_created_at = this.subHours_time({ date_at: created_at });

      return {
        problem,
        created_at: date_created_at,
      };
    });

    return Promise.all(results).then(completed => {
      return completed;
    });
  }
}
export default new FormatDataLocal();
